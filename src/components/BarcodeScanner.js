import React from 'react';

class BarcodeScanner extends React.Component {
  componentWillMount() {
    this.props = this.props || {};
    this.setState({
      ...this.props
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  render() {
    return (
      <div className="Barcode-Scanner pointer" onClick={this.props.openCamera.bind(this)}>
        +
      </div>
    );
  }
}

export default BarcodeScanner;
