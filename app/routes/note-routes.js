const middleWare = require('../tools/middleWare');
const { ObjectID } = require('mongodb');

module.exports = (app, db) => {
  //CREATE
  app.put(
    '/notes',
    middleWare(async (req, res) => {
      if (!req.body.content || !req.body.title) {
        throw new Error('Wrong or empty request');
      }

      const note = { content: req.body.content, title: req.body.title };
      const result = await db.collection('notes').insert(note);
      res.send(result.ops[0]);
    }),
  );

  //READ one
  app.get(
    '/notes/:id',
    middleWare(async (req, res) => {
      const id = req.params.id;
      const details = { _id: new ObjectID(id) };
      const item = await db.collection('notes').findOne(details);
      if (!item) {
        throw new Error(`note with _id=${id} is not found`);
      }
      res.send(item);
    }),
  );

  //READ list
  app.post(
    '/notes',
    middleWare(async (req, res) => {
      let details = {};
      if (req.body.search) {
        details.$text = {
          $search: req.body.search,
          $caseSensitive: false,
          $diacriticSensitive: false,
        };
      }
      const items = await db
        .collection('notes')
        .find(details)
        .toArray();
      items.forEach(item => {
        item.id = item._id;
        delete item._id;
      });
      res.send(items);
    }),
  );

  //UPDATE
  app.post(
    '/notes/:id',
    middleWare(async (req, res) => {
      if (!req.body.id || !req.body.content || !req.body.title) {
        throw new Error('Wrong or empty request');
      }

      const id = req.params.id;
      const details = { _id: new ObjectID(id) };
      const note = { content: req.body.content, title: req.body.title };
      const cmdResult = await db.collection('notes').update(details, note);
      if (!cmdResult || !cmdResult.result || !cmdResult.result.n) {
        throw new Error(`Update failed. Check Note with _id=${id} exists.`);
      }
      res.send(note);
    }),
  );

  //DELETE
  app.delete(
    '/notes/:id',
    middleWare(async (req, res) => {
      const id = req.params.id;
      const details = { _id: new ObjectID(id) };
      const cmdResult = await db.collection('notes').remove(details);
      // console.log(result);
      if (!cmdResult || !cmdResult.result || !cmdResult.result.n) {
        throw new Error(`Deletion failed. Check Note with _id=${id} exists.`);
      }
      res.send({ res: 1, id: id });
    }),
  );
};
