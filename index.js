const express = require('express')
const bodyParser = require('body-parser')
const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{YOUR_OKTA_DOMAIN}/oauth2/default'
})

const authenticationRequired = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  oktaJwtVerifier.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(err => {
      res.status(401).send(err.message)
    })
}

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))

// store in memory
let meals = []

app.get('/meals', authenticationRequired, (req, res) => {
  return res.send(meals)
})

app.post('/meals', authenticationRequired, (req, res) => {
  let meal = req.body
  meal.id = Date.now()
  meals.push(meal)
  return res.send(meal)
})

app.delete('/meals/:id', authenticationRequired, (req, res) => {
  let id = parseInt(req.params.id)
  const index = meals.map(o => o.id).indexOf(id)
  if (index !== -1) {
    meals.splice(index, 1)
  }
  return res.send()
})

app.listen(8080, () => {
  console.log('App listening on port 8080!')
})
