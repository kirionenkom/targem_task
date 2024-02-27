const fs = require("fs");
const { parse} = require("csv-parse");
const pg = require('./postgres.js')

fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", async function (row) {
    const milliseconds = Date.parse(`${row[2].slice(3, 5)}.${row[2].slice(0, 2)}${row[2].slice(5)}`) / 1000
    console.log(milliseconds)
    await pg.addPlayer(row[0], row[1], milliseconds, row[3])
  })
  .on('end', async () => {
    await pg.printWithOnStatus()
    process.exit()
  })






