import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbcards.js';
import Cors from 'cors';

// App Configurations
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:vGnm6PJWSPvG3fXt@cluster0.a2jpa.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middlewares
app.use(express.json());
app.use(Cors());

// Database Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,

});


// API Endpoints
app.get('/',(req, res) => res.status(200).send('Hello World!!!'));

// Post data to DB
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// Get data from DB
app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);

        } else {
            res.status(200).send(data);
        }
    });
});

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));

