import { MongoClient } from 'mongodb';
const connection = 'mongodb://localhost:27017';
const client = new MongoClient(connection);

async function run() {
  try {
    await client.connect();
    const db = client.db('test');
    const testCollection = await db.collection('test');
    await testCollection.dropIndexes();
    const indexResult = await testCollection.createIndex({ name: 1 });
    console.log(indexResult);
    await testCollection.deleteMany({});
    const result = await testCollection.insertMany([
      { _id: 1, name: 'apples', qty: 5, rating: 3 },
      { _id: 2, name: 'bananas', qty: 7, rating: 1 },
      { _id: 3, name: 'oranges', qty: 6, rating: 2 },
      { _id: 4, name: 'avocados', qty: 3, rating: 5 },
    ]);
    console.log(result);
    const query = {};
    const sort = { name: 1 };
    const cursor = testCollection.find(query).sort(sort);
    cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
