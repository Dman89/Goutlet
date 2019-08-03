import React from 'react';
class Input extends React.Component {
  componentWillMount() {
    const key = this.props.value.toLowerCase();
    this.setState({
      key,
      editing: key === this.props.editMode.key
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      editing: this.state.key === newProps.editMode.key
    });
  }

  render() {
    const staticInput = (<div onClick={this.props.onClick.bind(this, this.props.index)} className="pointer">{this.props.value}: {this.props.item[this.state.key]}</div>);
    const dynamicInput = (<input type="text" value={this.props.item[this.state.key]} onChange={(e) => this.props.onChange(e, this.state.key)}/>)
    return (
      <div>
        {this.state.editing ? dynamicInput : staticInput}
      </div>
    );
  }
}

export default Input;
