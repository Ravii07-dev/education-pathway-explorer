const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const path = require('path');
const { createServer } = require('vite');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://ravilochanbhandari07:lvKFZ5fbEW3Z6zXm@shopit.ylbdj.mongodb.net/education_pathway?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function seedAll() {
  console.log('--- Connecting to MongoDB Atlas Cluster (ShopIt) ---');
  await client.connect();
  const db = client.db('education_pathway');
  console.log('✓ Successfully connected to MongoDB Atlas database: education_pathway');

  // Load TypeScript pathway data via Vite runtime
  const rootDir = path.resolve(__dirname, '..');
  const vite = await createServer({
    root: rootDir,
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const pathwayDataModule = await vite.ssrLoadModule(path.resolve(rootDir, 'src/data/pathwayData.ts'));
  const { EDUCATION_LEVELS, COURSES, ENTRANCE_EXAMS, CAREERS, SWITCHING_ROUTES } = pathwayDataModule;
  await vite.close();

  console.log(`Loaded dataset from TypeScript matrix:`);
  console.log(`  - Levels: ${EDUCATION_LEVELS.length}`);
  console.log(`  - Courses: ${COURSES.length}`);
  console.log(`  - Exams: ${ENTRANCE_EXAMS.length}`);
  console.log(`  - Careers: ${CAREERS.length}`);
  console.log(`  - Switching Routes: ${SWITCHING_ROUTES.length}`);

  // 1. Seed education_levels
  const colLevels = db.collection('education_levels');
  for (const item of EDUCATION_LEVELS) {
    await colLevels.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }
  console.log(`✓ Seeded collection 'education_levels': ${await colLevels.countDocuments()} documents`);

  // 2. Seed courses
  const colCourses = db.collection('courses');
  for (const item of COURSES) {
    await colCourses.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }
  console.log(`✓ Seeded collection 'courses': ${await colCourses.countDocuments()} documents`);

  // 3. Seed entrance_exams
  const colExams = db.collection('entrance_exams');
  for (const item of ENTRANCE_EXAMS) {
    await colExams.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }
  console.log(`✓ Seeded collection 'entrance_exams': ${await colExams.countDocuments()} documents`);

  // 4. Seed careers
  const colCareers = db.collection('careers');
  for (const item of CAREERS) {
    await colCareers.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }
  console.log(`✓ Seeded collection 'careers': ${await colCareers.countDocuments()} documents`);

  // 5. Seed switching_routes
  const colSwitches = db.collection('switching_routes');
  for (const item of SWITCHING_ROUTES) {
    await colSwitches.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }
  console.log(`✓ Seeded collection 'switching_routes': ${await colSwitches.countDocuments()} documents`);

  // 6. Ensure user_shortlists has curated initial entries
  const colShortlists = db.collection('user_shortlists');
  const initialShortlists = [
    {
      id: 'bdes_design',
      type: 'course',
      title: 'B.Des (Interaction & UX)',
      subtitle: 'Bachelor of Design',
      domain: 'Design & Creative',
      dateAdded: new Date().toISOString(),
      userNotes: 'Curious about HCI and product design after 12th PCM.'
    },
    {
      id: 'ai_engineer',
      type: 'career',
      title: 'AI / ML Engineer',
      subtitle: 'Deep Learning, LLMs, Neural Networks',
      domain: 'Computer Science & Software',
      dateAdded: new Date().toISOString(),
      userNotes: 'Target career path - High demand, research & deployment.'
    },
    {
      id: 'jee_advanced',
      type: 'exam',
      title: 'JEE Advanced',
      subtitle: 'Joint Entrance Examination for IITs',
      domain: 'Engineering',
      dateAdded: new Date().toISOString(),
      userNotes: 'National gateway to Indian Institutes of Technology.'
    }
  ];

  for (const item of initialShortlists) {
    await colShortlists.updateOne(
      { id: item.id, type: item.type },
      { $set: { ...item, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  }
  console.log(`✓ Seeded collection 'user_shortlists': ${await colShortlists.countDocuments()} documents`);

  console.log('\n======================================================');
  console.log('MongoDB Atlas Database: education_pathway');
  const collections = await db.listCollections().toArray();
  console.log('Collections present:');
  for (const col of collections) {
    const count = await db.collection(col.name).countDocuments();
    console.log(`  - ${col.name} (${count} documents)`);
  }
  console.log('======================================================\n');
}

seedAll()
  .catch(err => {
    console.error('SEEDING FAILED:', err);
    process.exit(1);
  })
  .finally(() => client.close());
