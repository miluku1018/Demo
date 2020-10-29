const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('../models')
const User = db.User

const userController = {
  index: (req, res) => {
    res.render('index')
  },
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填喔！')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.password, function(err, isSuccess) {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = username 
        req.session.userId = user.id
        res.redirect('/admin')
      }) 
    }).catch(err => {
      req.flash('errorMessage', err.toString())
        return next()
    })
  },
  logout: (req, res) => {
    req.session.username = null 
    res.redirect('/admin')
  },
  register: (req, res) => {
    res.render('register')
  },
  handleRegister: (req, res, next) => {
    const {username, password, nickname} = req.body
    if (!username || !password || !nickname) {
      req.flash('errorMessage', '缺少必要欄位') 
      return next()
    }
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
      User.create({
        username, 
        nickname, 
        password: hash
      }).then(user => {
        req.session.username = username 
        req.session.userId = user.id
        res.redirect('/admin')  
      }).catch(err => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    })
  },
}

module.exports = userController
