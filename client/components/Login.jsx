import React from 'react'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {}
  }
  
  handleClick () {
    showSpotifyLogin()
  }

  componentDidMount () {
    OAuth.initialize('Ytaxzgb4tAqbgkOd3QWSK_6n9Ts')
  }

  render() {
    return (
      <div>
        <button data-provider='spotify' onClick={this.handleClick}>
          <img src='https://oauth.io/api/providers/spotify/logo' width='32' height='32' />
        </button>
      </div>
    )
  }
}

function showSpotifyLogin () {
  OAuth.popup('spotify')
    .done(function(result) {
      // use result.access_token in API request
      console.log('Successful login methinks. Here is the result: ' + result)
    })
    .fail(function(err) {
      console.log('Oops: ' + err)
    })
}

export default Login