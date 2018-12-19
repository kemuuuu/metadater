import React, { Component } from "react"
import ReactDOM from 'react-dom'
import Auth from './components/auth'
import FetchObj from './components/fetch_obj'

class App extends Component {

  constructor() {
    super()
    this.state = {
      mode: '', 
    }
  }

  handleSelect(e) {
    this.setState({
      mode: e.target.id
    })
  }

  render() {
    const styles = {
      box1: {
        paddingTop: '100px',
        textAlign: 'center'
      },
      box2: {
        display: 'inline-block'
      },
      main: {
        display: 'block',
        top: 0,
      },
      about: {
        
      }
    }
    console.log('mode: ' + this.state.mode)
    return (
      <div>
        <div className="menu">
          <div onClick={e => this.handleSelect(e)} id="auth" className="menuItem uno">1<span id="auth">Authoraization</span></div>
          <div onClick={e => this.handleSelect(e)} id="fetch" className="menuItem dos">2<span id="fetch">Fetch Object</span></div>
        </div>
        <div style={styles.box1}>
          <div style={styles.box2}>
            {(() => {
              const mode = this.state.mode
              switch(mode) {
                case 'auth': 
                  return <Auth />
                case 'fetch':  
                  return <FetchObj />
                default: return(
                  <div style={styles.about}>
                    <h1>metadater</h1>
                    <p>metadater is a tool to help you get metadata</p>
                  </div>
                )
              }
            })()}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)