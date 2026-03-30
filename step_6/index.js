const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const client = new MongoClient('mongodb://127.0.0.1:27017');
let db;

client.connect().then(() => db = client.db('shelfshare'));

app.use(express.static('public'));

app.get('/getUsers', async (req, res) => res.json(await db.collection('users').find().limit(2).toArray()));
app.post('/addUser', async (req, res) => res.json(await db.collection('users').insertOne({ name: "Test User" })));
app.post('/updateUser', async (req, res) => res.json(await db.collection('users').updateOne({ name: "Test User" }, { $set: { edited: true } })));
app.post('/deleteUser', async (req, res) => res.json(await db.collection('users').deleteOne({ name: "Test User" })));

app.get('/getBooks', async (req, res) => res.json(await db.collection('books').find().limit(2).toArray()));
app.post('/addBook', async (req, res) => res.json(await db.collection('books').insertOne({ title: "Test Book" })));
app.post('/updateBook', async (req, res) => res.json(await db.collection('books').updateOne({ title: "Test Book" }, { $set: { edited: true } })));
app.post('/deleteBook', async (req, res) => res.json(await db.collection('books').deleteOne({ title: "Test Book" })));

app.get('/getAggregation', async (req, res) => {
    const result = await db.collection('loans').aggregate([
        { $match: { status: { $in: ["ACTIVE", "OVERDUE"] } } },
        { $group: { _id: "$lenderId", outstanding_loans: { $sum: 1 } } },
        { $sort: { outstanding_loans: -1 } }
    ]).toArray();
    res.json(result);
});

app.listen(3000);
