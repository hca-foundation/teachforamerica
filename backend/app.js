var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy

const { compare } = require('./lib/hashing')

const { Admin } = require('./models/index')

passport.use(
  new BasicStrategy((username, password, done) => {
    Admin.findOne({
      where: {
        username: username
      }
    }).then(admin => {
      if (!admin || !admin.password) {
        return done(null, false)
      }

      compare(password, admin.password)
        .then(isAMatch => {
          if (isAMatch) {
            return done(null, admin)
          } else {
            return done(null, false)
          }
        })
        .catch(e => {
          return done(e)
        })
    })
  })
)

var cors = require('cors')
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')

var classroomsRouter = require('./routes/classrooms')
var contactsRouter = require('./routes/contacts')
var householdsRouter = require('./routes/households')
var locationsRouter = require('./routes/locations')
var studentsRouter = require('./routes/students')
var adminsRouter = require('./routes/admins')
var smsRouter = require('./routes/sms')

var app = express()

app.use(cors())
// Comment out to add initial user
app.use(passport.authenticate('basic', { session: false }))

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json')
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')))

app.use('/classrooms', classroomsRouter)
app.use('/contacts', contactsRouter)
app.use('/households', householdsRouter)
app.use('/locations', locationsRouter)
app.use('/students', studentsRouter)
app.use('/admins', adminsRouter)
app.use('/sms', smsRouter)

app.use('/chaos', (req, res) => {
  process.exit()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ error: err.message })
})

app.set('hostname', process.env.HOSTNAME || '0.0.0.0')
app.listen(process.env.PORT || '3000')
