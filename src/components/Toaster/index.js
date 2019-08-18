import React, { Component } from 'react';
  
class Toaster extends Component {
    componentWillMount() {
        this.propsLogic.call(this, this.props);
    }

    componentWillReceiveProps(newProps) {
      this.propsLogic.call(this, newProps);
    }

    propsLogic(props) {
        this.setState({
            ...this.state,
            ...props
        });
    }

    render() {
        return this.state.open ? (
            <div className="toast" role="alert"  aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="mr-auto">{this.props.title}</strong>
                    <small className="text-muted">{this.props.titleSmall}</small>
                    <button type="button" className="ml-2 mb-1 close" aria-label="Close" onClick={() => this.props.closeToaster()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {this.props.message}
                </div>
            </div>
        ) : '';
    }
}

export default Toaster;