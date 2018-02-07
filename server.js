import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
const port = process.env.PORT || 8080

const theCheapestDatabaseInTheWorld = {
  users: [{id:1, name:'Steve'}, {id:2, name:'Sarah'}, {id:3, name:'Zhangsan'}, {id:4, name:'Maria'}],
  rooms: [{id:1, room:'Fun'}, {id:2, room:'Sports'}, {id:3, room:'Comedy'}, {id:4, room:'Travel'}]
}

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, './public')))
app.use(bodyParser.json())

app.get('/users', (req, res) => res.send(theCheapestDatabaseInTheWorld.users))
app.post('/users', (req, res) => {
  if (req.body.you) {
    theCheapestDatabaseInTheWorld.users.push({id:Math.random()*1000,name:req.body.name, you:true});
  } else {
    theCheapestDatabaseInTheWorld.users.push({id:Math.random()*1000,name:req.body.name})
  }
  res.send(theCheapestDatabaseInTheWorld.users)
})

app.post('/delete', (req, res) => {
  console.log('req: ', req)
  const others = theCheapestDatabaseInTheWorld.users.filter(user => user.id !== req.body.id)
  theCheapestDatabaseInTheWorld.users = others
  res.send(others)
})

app.get('/rooms', (req, res) => res.send(theCheapestDatabaseInTheWorld.rooms))

app.listen(port, () => console.log('Welcome!  Please navigate to http://localhost:' + port))