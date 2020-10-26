const { render } = require('ejs')
const db = require('../models')
const Category = db.Category


const categoryController = {
  getCategory: (req, res) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    Category.findAll().then(categories => {
      res.render('categories', {
        categories
      })
    })  
  },
  addCategory: (req, res) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    res.render('add_categories')
  },
  handleAddCategory: (req, res) => {
    const {userId} = req.session
    const {name} = req.body
    if (!userId || !name) {
      return res.redirect('add_categories')
    }
    Category.create({
      name
    }).then(() => {
      return res.redirect('categories')
    })
  }
}

module.exports = categoryController