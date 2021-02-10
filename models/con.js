const host = 'ziggy.db.elephantsql.com',
  database = 'cgivyqhg',
  user = 'cgivyqhg',
  password = 'lnjbf3yo0YF8qq_6aSgwnXUZLwgjgC1i';

const pgp = require('pg-promise')({
  query: function(e) {
    console.log('QUERY:', e.query);
  }
});

const options = {
  host: host,
  database: database,
  user: user,
  password: password
};

const db = pgp(options);

module.exports = db;