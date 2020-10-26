const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = process.env.PORT || 3000

const userController = require('./controllers/user')
const articleController = require('./controllers/article')
const categoryController = require('./controllers/category')


app.set('view engine','ejs')
app.use(express.static('public'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(flash())

app.use((req, res, next) => {
  res.locals.username = req.session.username 
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.get('/', articleController.index)

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/about', userController.about)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

app.get('/add_articles', articleController.add)
app.post('/add_articles', articleController.handleAdd)
app.get('/list', articleController.list)
app.get('/article/:id', articleController.singlePage)
app.get('/admin', articleController.admin)
app.get('/delete_articles/:id', articleController.delete) 
app.get('/update_articles/:id', articleController.update)
app.post('/update_articles/:id', articleController.handleUpdate)

app.get('/categories', categoryController.getCategory)
app.get('/add_categories', categoryController.addCategory)
app.post('/add_categories', categoryController.handleAddCategory)



app.listen(port, () => {
  console.log(`Example app listenig on port ${port}!`)
})

