const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://ravilochanbhandari07:lvKFZ5fbEW3Z6zXm@shopit.ylbdj.mongodb.net/education_pathway?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function migrate() {
  try {
    await client.connect();
    const db = client.db('education_pathway');
    const col = db.collection('user_shortlists');

    try {
      await col.dropIndex('user_item_idx');
    } catch (e) {}

    const docs = await col.find().toArray();
    for (const d of docs) {
      const itemId = d.itemId || d.id;
      const itemType = d.itemType || d.type;
      await col.updateOne(
        { _id: d._id },
        { $set: { userId: d.userId || 'anonymous', itemId: itemId, itemType: itemType } }
      );
    }
    console.log('MIGRATION_SUCCESS: Updated', docs.length, 'shortlist docs to new schema');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    await client.close();
  }
}

migrate();
