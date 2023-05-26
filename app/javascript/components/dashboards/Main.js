import React from "react";
import PropTypes from "prop-types";
import ModalMenu from "../ModalMenu";

class Main extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div>
          THIS WOULD BE MAIN. NOT A WHOLE LOT RIGHT NOW.
          <ModalMenu { ...{ 
            dialog_id: 'test_modal',
            formFields: {
              'Text Field': { type: 'text', className: 'input_field string' }, 
              'Number Field': { type: 'text', inputMode: 'decimal', pattern: '[0-9]', className: 'input_field float' }
            }
          } } />
        </div>
      </React.Fragment>
    );
  }
}

export default Main
