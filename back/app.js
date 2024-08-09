var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const shortid = require('shortid');
const cors = require('cors');

var app = express();
const adapter = new FileAsync('db.json');
app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

low(adapter).then(db => {
    app.get('/notes', (req, res) => {
        const notes = db.get('notes').value();

        res.send(notes);
    });

    app.get('/notes/favourites', (req, res) => {
        const notes = db.get('notes').filter({ fav: 'true' }).value();

        res.send(notes || {});
    });

    app.get('/notes/:id', (req, res) => {
        const notes = db.get('notes').find({ id: req.params.id }).value();

        res.send(notes);
    });

    app.get('/notes/tags/:tag', (req, res) => {
        let notes = db.get('notes').value();
        notes = notes.filter(n => n.tags !== undefined).filter(n => n.tags.indexOf(req.params.tag) >= 0);
        res.send(notes);
    });

    app.get('/search', (req, res) => {
        let notes = db.get('notes').value();
        let search = req.query.q;
        notes = notes.filter(n => Object.values(n).some(k => k.toString().indexOf(search) >= 0));
        res.send(notes);
    });

    app.get('/tags', (req, res) => {
        let notes = db.get('notes').value();
        let tags = notes
            .filter(n => n.tags !== undefined)
            .map(n => n.tags.split(','))
            .reduce((a, b) => [...a, ...b], []);
        tags = tags.filter(function (item, pos) {
            return tags.indexOf(item) === pos;
        });
        res.send(tags);
    });

    app.post('/notes', (req, res) => {
        db.get('notes')
            .push(req.body)
            .last()
            .assign({ id: shortid.generate() })
            .write()
            .then(note => res.send(note));
    });

    app.put('/notes/:id', (req, res) => {
        db.get('notes')
            .find({ id: req.params.id })
            .assign(req.body)
            .write()
            .then(() => res.sendStatus(200));
    });

    app.delete('/notes/:id', (req, res) => {
        db.get('notes')
            .remove({ id: req.params.id })
            .write()
            .then(() => res.sendStatus(200));
    });

    // Set db default values
    return db.defaults({ notes: [] }).write();
});

module.exports = app;
