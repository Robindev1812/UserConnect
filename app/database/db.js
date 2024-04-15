import mysql2 from 'mysql2/promise'

export const conecction = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'Robinson2020.',
  database: 'register_user_admin'
})


