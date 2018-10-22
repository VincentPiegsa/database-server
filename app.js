const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 80;
const databaseFile = './db/data.db';

app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static(path.join(__dirname, '/db')));
app.use(express.static(path.join(__dirname, '/images')));
app.use(bodyParser());

let db = new sqlite3.Database(databaseFile, (error) => {
    if (error) throw error;
    console.log('Connected to SQLite3 database.');
});

const fetchDatabase = function(sql, res) {
    db.all(sql, (error, rows) => {
        if (error) {
            res.status(404);
            res.send(`${error}`);
        } else {
            res.status(200);
            res.send(rows);
        }
    });
};

app.get(['/', '/home'], (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/home.html');
});

app.get('/project/sensor', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/project_sensor.html');
});

app.get('/project/server', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/project_server.html');
});

app.get('/project/analysis', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/project_analysis.html');
});

app.get('/database', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/database.html');
});

app.post('/database/query', (req, res) => {
    fetchDatabase(req.body.sql, res);
});

app.get('/contact', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/static/contact.html');
});

app.get('/images/wetterstation1.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/wetterstation1.jpg');
});

app.get('/images/wetterstation2.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/wetterstation2.jpg');
});

app.get('/images/arduinoMega.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/arduino_mega.jpg');
});

app.get('/images/dataAVG.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/combinedAVG.jpg');
});

app.get('/images/tmpAVG.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/temperatureAVG.jpg');
});

const server = app.listen(port, () => {console.log(`Listening on Port ${port}...`)});