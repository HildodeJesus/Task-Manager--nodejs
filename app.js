const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect.js')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(process.env.PORT || 3000, () =>
      console.log('Serve inicializado na porta 3000...')
    )
  } catch (err) {
    console.log(err)
  }
}

start()
