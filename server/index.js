const http = require('http')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const app = express()
const { Client } = require('pg')

const server = http.createServer(app);

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

client.connect()
  .then(() => {
    server.listen(3000, () => {
      console.log('Server open on port 3000')
    })
  })
  .catch(() => {
    console.log('Server failed')
  })

app.use(express.json())
app.use(express.urlencoded({ extended: false, }))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

async function getCountryData(input) {
  try {
    const res = await client.query(input)
    return res.rows
  } catch (error) {
    console.log('here in errro')
    return error.stack;
  }
}

app.post('/api/getData', async (req, res) => {
  const firstQuery = req.body.query[0]
  let multipleQueries = ''
  req.body.query.forEach(country => {
    if (country !== firstQuery)
      multipleQueries += `OR country_name LIKE '${country}' `
  })

  let query = `
  SELECT country_name, year, value
  FROM countries
  WHERE country_name LIKE '${firstQuery}'
  ${multipleQueries}
  `;
  const finalData = await getCountryData(query);
  if (typeof finalData === String) {
    await client.end();
    res.status(400).json({ error: finalData })
  } else {
    res.status(200).json(finalData)
  }
})

module.exports = app
