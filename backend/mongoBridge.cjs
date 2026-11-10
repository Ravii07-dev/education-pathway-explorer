const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://ravilochanbhandari07:lvKFZ5fbEW3Z6zXm@shopit.ylbdj.mongodb.net/education_pathway?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function syncItem(item) {
  try {
    await client.connect();
    const db = client.db('education_pathway');
    const col = db.collection('user_shortlists');
    await col.updateOne(
      { id: item.id, type: item.type },
      { $set: { ...item, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
    console.log('SYNC_SUCCESS:', item.id);
  } catch (err) {
    console.error('SYNC_ERROR:', err.message);
  } finally {
    await client.close();
  }
}

async function deleteItem(type, id) {
  try {
    await client.connect();
    const db = client.db('education_pathway');
    const col = db.collection('user_shortlists');
    const res = await col.deleteOne({ id, type });
    console.log('DELETE_SUCCESS:', id, 'deleted count:', res.deletedCount);
  } catch (err) {
    console.error('DELETE_ERROR:', err.message);
  } finally {
    await client.close();
  }
}

async function syncAllFromDatabaseFile() {
  const dbFile = path.resolve(__dirname, 'data/pathway_database.json');
  if (!fs.existsSync(dbFile)) {
    console.log('NOTICE: No local database file found at', dbFile);
    return;
  }
  try {
    const content = fs.readFileSync(dbFile, 'utf8');
    const items = JSON.parse(content);
    if (!Array.isArray(items)) return;
    await client.connect();
    const db = client.db('education_pathway');
    const col = db.collection('user_shortlists');

    for (const item of items) {
      await col.updateOne(
        { id: item.id, type: item.type },
        { $set: { ...item, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
    console.log('SYNC_ALL_SUCCESS: Synced', items.length, 'items to user_shortlists');
  } catch (err) {
    console.error('SYNC_ALL_ERROR:', err.message);
  } finally {
    await client.close();
  }
}

async function main() {
  const action = process.argv[2];
  if (action === 'delete' && process.argv[3] && process.argv[4]) {
    await deleteItem(process.argv[3], process.argv[4]);
  } else if (action === 'insert-base64' && process.argv[3]) {
    try {
      const decoded = Buffer.from(process.argv[3], 'base64').toString('utf8');
      const item = JSON.parse(decoded);
      await syncItem(item);
    } catch (e) {
      console.error('BASE64_PARSE_ERROR:', e.message);
    }
  } else {
    // Default: sync all items from data/pathway_database.json
    await syncAllFromDatabaseFile();
  }
}

main();
