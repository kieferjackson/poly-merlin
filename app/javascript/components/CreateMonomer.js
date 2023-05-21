import React from "react";
import PropTypes from "prop-types";
import { isValidDecimal, cleanInvalidDecimal } from "./utils/validators";

const formFields = {
	monomer_name: 'monomer_name',
	molar_mass: 'molar_mass'
}

class CreateMonomer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monomer_name: '',
			molar_mass: ''
		}
		this.getModal = () => document.getElementById(this.props.dialog_id);
		this.handleFormChange = ({ target }) => {
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
		}
		this.handleClose = (e) => {
			// Prevent the page from reloading upon button click
			e.preventDefault();
			
			if (e.target.value === 'cancel') {
				// Close the modal with no return value
				this.getModal().close('');
			}
			else if (e.target.type === 'submit') {
				// Get the modal's return value
				console.log(this.getModal().returnValue);
			}
		}
		this.handleSubmit = (e) => {
			// Prevent the page from reloading upon button click
			e.preventDefault();

			// Get the monomer modal and close it, returning the form data contained in the state
			this.getModal().close(e.target.value);
		}
	}
	render() {
		const { monomer_name, molar_mass } = formFields;
		const { dialog_id } = this.props;
		return (
			<React.Fragment>
				<div className="form_container">
					<dialog id={dialog_id}>
						<div className="input_block">
							<label>
								Name
								<input
									type="text"
									value={this.state[monomer_name]}
									onChange={this.handleFormChange}
									name={monomer_name}
									className="input_field string"
								/>
							</label>
						</div>
						<div className="input_block">
							<label>
								Molar Mass (g/mol)
								<input
									type="text"
									inputMode="decimal"
									pattern="[0-9]"
									value={this.state[molar_mass]}
									onChange={this.handleFormChange}
									name={molar_mass}
									className="input_field float"
								/>
							</label>
						</div>

						<button onClick={this.handleClose} value="cancel">Cancel</button>
						<button type="submit" onClick={this.handleSubmit} value={JSON.stringify(this.state)}>Submit</button>
					</dialog>
				</div>
			</React.Fragment>
		);
	}
}
CreateMonomer.propTypes = {
	dialog_id: PropTypes.string
}

export default CreateMonomer
