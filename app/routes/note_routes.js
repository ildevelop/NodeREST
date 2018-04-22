var ObjectId = require('mongodb').ObjectID;
let IDtweets = 0;
module.exports = function (app, db) {

	app.get('/tweets', (req, res) => {
		db.collection('notes').find().toArray(function (err, item) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send(item);
			}
		})
	});
	app.get('/retweets', (req, res) => {
		db.collection('notes').find().toArray(function (err, item) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send(item);
			}
		})
	});
	app.post('/tweets/:id/likes', (req, res) => {
		const id = parseInt(req.params.id);
		console.log('ID:', id);
		db.collection('notes').findOneAndUpdate({'id':  id },{$set: {"likes_count": 2}}, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {

				console.log('ITEMS::',item);
				res.send({"username:" :item.username});
			}
		});
	});
	app.post('/tweets/:id/retweet', (req, res) => {
		const id = parseInt(req.params.id);
		console.log('ID:', id);
		db.collection('notes').findOne({'id':  id }, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {

				console.log('ITEMS::',item);
				res.send(item.username);
			}
		});
	});
	app.post('/tweets', (req, res) => {
		let date = new Date();
		let id = IDtweets;
		let likes_count = 0;
		let retweets_count = 0;

		date.toISOString();
		const note = {
			id,
			content: req.body.content,
			username: req.body.username,
			timestamp: date,
			likes_count,
			retweets_count
		};
		IDtweets ++;
		db.collection('notes').insertOne(note, (err, result) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.sendStatus(200);
			}
		});
	});
	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		db.collection('notes').removeOne({'_id': ObjectId(id)}, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send('Note ' + id + ' deleted!');
			}
		});
	});
	app.put ('/notes/:id', (req, res) => {
		const id = req.params.id;
		const note = { text: req.body.body, title: req.body.title };
		db.collection('notes').findOneAndUpdate({ '_id': ObjectId(id) }, note, (err, result) => {
			console.log('result:',result);
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(note);
			}
		});
	});
};