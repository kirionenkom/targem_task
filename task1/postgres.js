const pg = require('pg');

const client = new pg.Client('postgresql://misha.kirionenko03:tbA8rmJCiIP0@ep-royal-unit-a25q7yh4.eu-central-1.aws.neon.tech/targem?sslmode=require');

client.connect(err => {
  if (err) {
    console.log(err)
  }
  initializeTable()
});


function initializeTable() {
  const query = `
          DROP TABLE IF EXISTS players;
          CREATE TABLE players (nick VARCHAR(50), email VARCHAR(50), registered INTEGER, status VARCHAR(4));
`

  client.query(query)
    .catch(err => console.log(err))
}

exports.addPlayer = async function(nick, email, registered, status) {
  const query = `INSERT INTO players (nick, email, registered, status) VALUES (\'${nick}\', \'${email}\', ${registered}, \'${status}\');`
  client.query(query)

}

exports.printWithOnStatus = async function() {
   await client.query('SELECT nick, email, registered, status FROM players WHERE status = \'On\';').then(res => {
    const players = res.rows.map(player => ({...player, registered: player.registered * 1000}))
    players.forEach(player => console.log(`${player.nick}, ${player.email}, ${player.registered}, ${player.status}`))
  })
}