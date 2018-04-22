const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:postgres@localhost:5432/mydb'
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
	connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
	console.log(res)
	pool.end()
})
const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TEMP TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);
`
// create our temp table
await client.query(createTableText)

const newUser = { email: 'brian.m.carlson@gmail.com' }
// create a new user
await client.query('INSERT INTO users(data) VALUES($1)', [newUser])

const { rows } = await client.query('SELECT * FROM users')

console.log(rows)
