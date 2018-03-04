import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


class InputDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      input: ''
    };
  }

  handleButtonClick = () => {
    this.setState({open: false});
    this.props.onSave(this.state.input);
  }

  handleChange = (value) => {
    this.setState({input: value});
  }

  render() {
    const inputStyle = {
      margin: '30px'
    }
    return (
      <Dialog onClose={this.props.handleClose} open={this.props.open}>
        <DialogTitle id="dialog-title">{this.props.title}</DialogTitle>
        <TextField
          style={inputStyle}
          label="value"
          onChange={(e) => this.handleChange(e.target.value)}
        />
        <Button onClick={this.handleButtonClick}>Save</Button>
      </Dialog>
    );
  };
}

export default InputDialog;
