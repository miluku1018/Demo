const bcrypt = require('bcrypt')
const db = require('../models')
const User = db.User

const userController = {
  about: (req, res) => {
    res.render('about')
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
        req.session.username = username // 當使用者存在，自動登入
        req.session.userId = user.id
        res.redirect('/')
      }) 
    }).catch(err => {
      req.flash('errorMessage', err.toString())
        return next()
    })
  },
  logout: (req, res) => {
    req.session.username = null // 把 username reset掉，當作登出
    res.redirect('/')
  }
}

module.exports = userController
