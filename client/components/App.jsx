import React from 'react'

import Home from './Home'
import Login from './Login'
import Options from './Options'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render () {
    return (
      <div className='app'>
        <Home />
        <Login />
      </div>
    )
  }
}

export default App
