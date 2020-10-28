var modelRouter = (Model, validFields, methodOverrides = {}) => {
  var express = require('express')
  var router = express.Router()

  const index =
    methodOverrides.index ||
    function(req, res, next) {
      Model.findAll()
        .then(models => res.send(models.map(model => model.toJSON())))
        .catch(error => res.status(500).send(error))
    }

  const create =
    methodOverrides.create ||
    function(req, res, next) {
      Model.create(req.body, validFields)
        .then(model => res.send(model.toJSON()))
        .catch(error => res.status(500).send(error))
    }

  const show =
    methodOverrides.show ||
    function(req, res, next) {
      Model.findById(req.params.id, { include: [{ all: true }] })
        .then(model => res.send(model.toJSON()))
        .catch(error => res.status(404).send({ error: 'Not found.' }))
    }

  const update =
    methodOverrides.update ||
    function(req, res, next) {
      Model.findById(req.params.id)
        .then(model => {
          model
            .update(req.body, validFields)
            .then(model => res.send(model.toJSON()))
            .catch(error => res.status(500).send(error))
        })
        .catch(error => res.status(404).send({ error: 'Not found.' }))
    }

  const destroy =
    methodOverrides.destroy ||
    function(req, res, next) {
      Model.findById(req.params.id)
        .then(model => {
          model
            .destroy()
            .then(result => res.status(204).end())
            .catch(error => res.status(501).send(error.message))
        })
        .catch(error => res.status(404).send({ error: 'Not found.' }))
    }

  router.get('/', index)
  router.post('/', create)
  router.get('/:id', show)
  router.put('/:id', update)
  router.delete('/:id', destroy)

  return router
}

module.exports = modelRouter
