const { Admin } = require('../models/index')
const validFields = {
  fields: ['username', 'password', 'super']
}
const mustBeSuperAdminError = res => {
  res.status(403).send({ error: 'Must be a super admin' })
}
const router = require('./base')(Admin, validFields, {
  index: (req, res, next) => {
    if (!req.user.dataValues.super) {
      return mustBeSuperAdminError(res)
    }

    Admin.findAll({
      order: ['username']
    })
      .then(admins => res.send(admins.map(admin => admin.toJSON())))
      .catch(error => res.status(500).send(error))
  },
  create: (req, res, next) => {
    if (!req.user.dataValues.super) {
      return mustBeSuperAdminError(res)
    }

    Admin.create(req.body, validFields)
      .then(admin => res.send(admin.toJSON()))
      .catch(error => res.status(500).send(error))
  },
  show: (req, res, next) => {
    if (!req.user.dataValues.super) {
      return mustBeSuperAdminError(res)
    }

    Admin.findById(req.params.id, { include: [{ all: true }] })
      .then(admin => res.send(admin.toJSON()))
      .catch(error => res.status(404).send({ error: 'Not found.' }))
  },
  update: (req, res, next) => {
    if (!req.user.dataValues.super) {
      return mustBeSuperAdminError(res)
    }

    Admin.findById(req.params.id)
      .then(admin => {
        let fields = validFields

        if (!req.body.password) {
          fields = ['username', 'super']
        }

        admin
          .update(req.body, fields)
          .then(admin => res.send(admin.toJSON()))
          .catch(error => res.status(500).send(error))
      })
      .catch(error => res.status(404).send({ error: 'Not found.' }))
  },
  destroy: (req, res, next) => {
    if (!req.user.dataValues.super) {
      return mustBeSuperAdminError(res)
    }

    Admin.findById(req.params.id)
      .then(admin => {
        admin
          .destroy()
          .then(result => res.status(204).end())
          .catch(error => res.status(501).send(error.message))
      })
      .catch(error => res.status(404).send({ error: 'Not found.' }))
  }
})

router.post('/search', function(req, res, next) {
  var { username } = req.body

  Admin.findOne({
    where: { username }
  })
    .then(function(admin) {
      if (admin === null) {
        return res.status(404).send({ error: 'Not found.' })
      }

      return res.send(admin)
    })
    .catch(error => res.status(500).send({ error: error.message }))
})

module.exports = router
