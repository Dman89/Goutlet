import React from 'react';
import AddIngredient from './AddIngredient';
import BarcodeScannerApi from '../services/BarcodeScannerApi';

class Camera extends React.Component {
  componentWillMount() {
    this.props = this.props || {};
    this.setState({
      ...this.props,
      step: 0
      /*
      step: 1,
      data: { codeResult: { code: 602652176517 } }
      */
    });
  }

  componentDidMount() {
    this.startCamera();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  componentWillUnmount() {
    const { type } = this.state;
      this.setState({
        ...this.state,
        step: 0
      });
    if (type === 'barcode') {
      BarcodeScannerApi.stop();
    }
  }

  startCamera() {
    const { type } = this.state;
    if (type === 'barcode') {
      this.startScanner();
    }
  }

  startScanner() {
    BarcodeScannerApi.setSuccessCB(function(data) {
      this.setState({ ...this.state, data, step: this.state.step + 1 });
    }.bind(this));
    BarcodeScannerApi.init();
  }

  renderCorrectComponent() {
    const { step, data } = this.state;
    let answer = <div id="interactive" className="viewport"></div>;
    if (step === 1) {
      answer = <AddIngredient ingredient={data} />;
    }
    return answer;
  }

  render() {
    return (
      <div className="Camera-Modal">
        {this.renderCorrectComponent.call(this)}
      </div>
    );
  }
}

export default Camera;
