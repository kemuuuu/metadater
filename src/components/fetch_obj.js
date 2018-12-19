import React from 'react'
import { Label, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { ipcRenderer } from 'electron'

export default class FetchObj extends React.Component {

  constructor() {
    super()
    this.state = {
      obj: '',
      path: '',
    }
  }

  handleClick() {
    const pr = new Promise((resolve, reject) => {
      const result = ipcRenderer.sendSync('fetch-obj', this.state)
      resolve(result)
    })
    pr.then((result) => { return new Notification(result+'!')})
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value})
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
          <Label>Fetch metadata</Label>
        </h1>
        <form>
          <FormGroup>
            <ControlLabel>Enter sObject name</ControlLabel>
            <FormControl
              name='obj'
              type="text"
              placeholder="SObject name..."
              value={this.state.obj}
              onChange={e => this.handleChange(e)}
            />
            <ControlLabel>Enter path to directory to save</ControlLabel>
            <FormControl
              name='path'
              type="text"
              placeholder="path..."
              value={this.state.path}
              onChange={e => this.handleChange(e)}
            />
            <div className="btn">
              <Button bsStyle="primary" onClick={e => this.handleClick()}>Fetch!!</Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}