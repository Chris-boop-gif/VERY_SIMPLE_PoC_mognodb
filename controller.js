const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://christianluescher:AdGjLéà7@cluster0.48xxs.mongodb.net/GEWA_Carpool";
const client = new MongoClient(uri);

const Test = require('./model');

const database = client.db('GEWA_Carpool');
const collection = database.collection('tests');

exports.postName = async (req, res, next) => {
    try {
        const newEntry = new Test(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error adding name to database");
    }
}

exports.getName = async (req, res, next) => {
    try {        
        const user = await Test.findOne({ name: req.query.id });
        if (!user) {
            return res.status(404).json("User not found");
        }
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error retrieving name from database");
    }
}