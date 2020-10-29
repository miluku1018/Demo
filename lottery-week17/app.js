const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = 5001

const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

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

app.get('/', userController.index)

function redirectBack(req, res) {
  res.redirect('back')
}

function checkIsLogin(req, res, next) {
  // 沒有登入，導回首頁
  if (!req.session.username) {
    res.redirect('/admin')
    return
  }
  // 有登入，放行
  next()
}
app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

app.get('/admin', prizeController.admin, checkIsLogin)
app.get('/get-prize', prizeController.getPrize)
app.get('/add-prizes', prizeController.add, checkIsLogin)
app.post('/add-prizes', prizeController.handleAdd, checkIsLogin)
app.get('/delete-prizes/:id', prizeController.delete, checkIsLogin) 
app.get('/update-prizes/:id', prizeController.update, checkIsLogin)
app.post('/update-prizes/:id', prizeController.handleUpdate, checkIsLogin)


app.listen(port, () => {
  console.log(`Example app listenig on port ${port}!`)
})

