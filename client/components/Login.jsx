import React from 'react'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      name: '',
      data: {}
    }
  }
  
  handleClick () {
    this.setState({data: showSpotifyLogin()})
    console.log('is it now in state? ' + this.state.data.name)
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
        <p>{this.state.data !== undefined ? this.state.data.name : null}</p>
      </div>
    )
  }
}

function showSpotifyLogin () {
  OAuth.popup('spotify')
    .done(function(result) {
      // use result.access_token in API request
      result.me().done(function(data) {
        console.log('Successful login for ' + data.name)
        // this.setState({name: data.name})
        return data
      })
    })
    .fail(function(err) {
      console.log('Oops: ' + err)
    })
}

export default Login
