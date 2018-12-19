import React from 'react'
import { Label, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { ipcRenderer } from 'electron'

export default class Auth extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      pass: '',
    }
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  handleClick() {
    console.log(this.state.user + this.state.pass)
    const pr = new Promise((resolve, reject) => {
      const result = ipcRenderer.sendSync('auth-org', this.state)
      resolve(result)
    })
    pr.then((result) => {
      console.log(result)
      return new Notification(result+'!')
    })
  }

  render() {
    const styles = {
      btn: {
        paddingTop: '10px'
      }
    }
    return(
      <div style={{paddingTop: '20px'}}>
        <h1>
          <Label>Authoraize an org</Label>
        </h1>
        <form>
          <FormGroup>
            <ControlLabel>Enter user name</ControlLabel>
            <FormControl
              name='user'
              type="email"
              placeholder="User name..."
              value={this.state.user}
              onChange={e => this.handleChange(e)}
            />
            <ControlLabel>Enter password</ControlLabel>
            <FormControl
              name='pass'
              type="password"
              placeholder="password..."
              value={this.state.pass}
              onChange={e => this.handleChange(e)}
            />
            <div className="btn">
              <Button bsStyle="primary" onClick={e => this.handleClick()}>Log in</Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}