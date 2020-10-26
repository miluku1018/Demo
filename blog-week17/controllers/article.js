const { render } = require('ejs')
const db = require('../models')
const {Article, Category, User} = db

const articleController = {
  add: (req, res) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    Category.findAll().then((categories => {
      res.render('add_articles', {categories})
    }))
  },
  handleAdd: (req, res) => {
    const {userId} = req.session
    const {content, title, categoryId} = req.body
    if (!userId || !content || !title) {
      return res.redirect('/');
    }
    if (content.trim() == '' && !title.trim() == '') {
      return res.redirect('/add_articles')
    }
    Article.create({
      content,
      title,
      UserId: userId,
      CategoryId: categoryId
    }).then(() => {
      return res.redirect('/admin')
    })
  },
  index: (req, res) => {
    Article.findAll({
      include: [User,Category]
    }).then(articles => {
    res.render('index', {
      articles
      })
    })
  },
  admin: (req, res) => {
    const {username} = req.session
    if (!username) {
      return res.redirect('/')
    }
    Article.findAll({
    include: User
    }).then(articles => {
    res.render('admin', {
      articles
      })
    })
  },
  list: (req, res) => {
    Article.findAll({
    include: [User,Category]
    }).then(articles => {
    res.render('list', {
      articles
      })
    })
  },
  delete: (req,res) => {
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(article => {
      return article.destroy()
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },
  update: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      }
    }).then(article => {
      res.render('update', {
        article
      })
    })
  },
  handleUpdate: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(Article => {
      return Article.update({
        content: req.body.content,
        title: req.body.title
      })
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },
  singlePage: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
      include: [User,Category]
    }).then(article => {
      res.render('article', {
        article
      })
    })
  },   
}

module.exports = articleController