/**
 *
 * Toaster
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Toaster(props) {

    const { id } = props;

    if (props.duration) {
        setTimeout(() => {
                props.closeToaster(props.id)
            },
            props.duration
        );
    }

  return props.open ? (
      <div className="toast" role="alert"  aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
              <strong className="mr-auto">{props.title}</strong>
              <small className="text-muted ml-5">{props.titleSmall}</small>
              <button type="button" className="ml-2 mb-1 close" aria-label="Close" onClick={() => props.closeToaster(props.id)}>
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="toast-body">
              {props.message}
          </div>
      </div>
  ) : '';
}

Toaster.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  titleSmall: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.string,
  closeToaster: PropTypes.func
};

export default Toaster;