const db = require('../models')
const Prize = db.Prize

const prizeController = {
  admin: (req, res) => {
    const {username} = req.session
    if (!username) {
      return res.redirect('/login')
    }
    Prize.findAll().then(prizes => {
      res.render('admin', {prizes})
    })
  },
  getPrize: (req, res) => {
    Prize.findAll().then(prizes => {
      let arr = []
      let idArr = []
      prizes.forEach(prize => {
        arr.push(prize.probability)
        idArr.push(prize.id)
      })
      const id = idArr[calProbability(arr)]
      Prize.findOne({
        where: {
          id
        }
      }).then(prize => {
        res.json({
          prize
        })
      })
    })
    function calProbability(chances) { // 傳進來的會是陣列
      let sum = 0 // chances 的總和，未來當分母算機率
      chances.forEach(chance => {
        sum += Number(chance)
      })
      const rand = Math.random()
      let chance = 0
      for(var i = 0; i < chances.length; i += 1) {
          chance += chances[i] / sum
          if (rand < chance) {
              return i
          }
      }
      return -1
    }
  },
  add: (req, res) => {
    const {username} = req.session
    if (!username) {
      return res.redirect('/login')
    }
    res.render('add-prizes')
  },
  handleAdd: (req, res) => {
    const {title, content, url, probability} = req.body
    if (!title || !content || !url || !probability) {
      return res.redirect('/add-prizes')
    }
    if (title.trim() == '' && content.trim() == '' && url.trim() == '') {
      return res.redirect('/add-prizes')
    }
    Prize.create({
      title,
      content,
      url,
      probability
    }).then(() => {
      return res.redirect('/admin')
    })
  },
  delete: (req, res) => {
    const {username} = req.session
    if (!username) {
      return res.redirect('/login')
    }
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      return prize.destroy()
    }).then(() => {
      return redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  },
  update: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      res.render('update', {prize})
    })
  },
  handleUpdate: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(Prize => {
      return Prize.update({
        title: req.body.title,
        content: req.body.content,
        url: req.body.url,
        probability: req.body.probability,
      })
    }).then(() => {
      return res.redirect('/admin')
    }).catch(() => {
      res.redirect('/admin')
    })
  }
}

module.exports = prizeController