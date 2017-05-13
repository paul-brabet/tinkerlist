const express = require('express')
const request = require('request')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')

const router2 = express.Router()

const client_id = ''
const client_secret = ''
const redirect_uri = 'http://localhost:3000/callback'

// Random string generator
function generateRandomString (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

// Omitted express.static(__dirname + '/public')) in the below as it is already in ./server
router2.use(cookieParser())

router2.get('/login', (req, res) => {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)

  // Requests authorization
  const scope = 'user-read-private user-read-email'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }))
})

router2.get('/callback', (req, res) => {

  // requests refresh and access token after checking the state parameter
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
    } else {
      res.clearCookie(stateKey)
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      }

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token
          const refresh_token = body.refresh_token

          const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          }

          // Use the access token to access the Spotify Web API
          request.get(options, (error, response, body) => {
            console.log(body)
          })

          // pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }))
        } else {
          res.redirect('/#' +
            querystring.stringify({
              err: 'invalid_token'
            }))
        }
      })
  }
})

router2.get('/refresh_token', (req, res) => {

  // request access token from refresh token
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      referesh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({
        'access_token': access_token
      })
    }
  })
})

module.exports = router2
