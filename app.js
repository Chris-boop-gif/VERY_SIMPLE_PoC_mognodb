const { MongoClient } = require('mongodb');
const express = require('express');
const path = require('path'); 
const router = require('./router');
const app = express();
const port = 3000;

// TODO: remove cors before deploying
const cors = require('cors');
app.use(cors());

const uri = "mongodb+srv://christianluescher:AdGjLéà7@cluster0.48xxs.mongodb.net/GEWA_Carpool";
const client = new MongoClient(uri);

const mongoose = require("mongoose");
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Mongoose connected to MongoDB"))
    .catch((err) => console.error("Mongoose connection error:", err));


async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);

// Middleware to parse JSON request bodies
app.use(express.json());

/* // Serve static files from the current directory
app.use(express.static(path.join(__dirname))); */



app.use("/", router);



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});