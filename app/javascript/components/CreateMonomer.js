import React from "react";
import PropTypes from "prop-types";
import ModalMenu from "./ModalMenu";
import { isValidDecimal, cleanInvalidDecimal } from "./utils/validators";

const formFields = {
	'Monomer Name': {
		type: 'text',
		className: 'input_field string'
	},
	'Molar Mass': {
		type: 'text', 
		inputMode: 'decimal', 
		pattern: '[0-9]', 
		className: 'input_field float'
	}
}

class CreateMonomer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { dialog_id } = this.props;
		return (
			<React.Fragment>
				<ModalMenu { ...{ dialog_id, formFields, handleFormChange: function ({ target }) {
					const { name, value } = target;
					if (name === formFields.molar_mass) {
						// Check that molar mass only contains numeric characters
						const molar_mass_value = isValidDecimal(value) ? value : (() => {
							// Remove invalid character and return cleaned string
							return cleanInvalidDecimal(value);
						})();
						
						this.setState({ ...this.state, [name]: molar_mass_value });
					}
					else {
						// Update form state
						this.setState({ ...this.state, [name]: value });
					}
				} } } />
			</React.Fragment>
		);
	}
}
CreateMonomer.propTypes = {
	dialog_id: PropTypes.string
}

export default CreateMonomer
