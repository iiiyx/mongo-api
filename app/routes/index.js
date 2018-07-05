const listRoutes = require('./note-routes');

module.exports = (app, db) => {
  listRoutes(app, db);
};
