import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button'

class NewUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: ''}
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit() {
    if (this.state.name.length) { 
      this.props.createUser(this.state.name)
    }
    this.setState({name:''  })
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  render() {
    const { title, buttonText } = this.props
    return (
      <Paper onKeyDown={this.handleKeyDown.bind(this)} style={{marginTop:'18px', padding: '4px'}} elevation={4}>
        <Typography variant="headline" component="h3">
          { title }
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
            margin="normal"
          />
        </form>
        <Button
          onClick={this.handleSubmit.bind(this)}
        >{buttonText}</Button>
      </Paper>
    );
  }
}

export default NewUser