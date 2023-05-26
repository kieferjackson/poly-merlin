import React from "react"
import PropTypes from "prop-types"
class ModalMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.keys(this.props.formFields).reduce((fields, fieldName) => ({ ...fields, [fieldName]: '' }), {});
		this.getModal = () => document.getElementById(this.props.dialog_id);
		this.handleFormChange = this.props.handleFormChange.bind(this);
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

			// Get the modal element and close it, returning the form data contained in the state
			this.getModal().close(e.target.value);
		}
		this.displayModal = (e) => {
			// Prevent the page from reloading upon button click
			e.preventDefault();
			// Display modal menu
			const modalEl = this.getModal();
			modalEl.showModal();
		}
	}
	render() {
		return (
			<React.Fragment>
				<button onClick={this.displayModal}>Show</button>
				<dialog id={this.props.dialog_id}>
					{Object.keys(this.props.formFields).map(fieldName => {
						return (
							<div className="input_block" key={this.props.dialog_id + fieldName}>
								<label>
									{fieldName}
									<input { ...this.props.formFields[fieldName] } name={fieldName} value={this.state[fieldName]} onChange={this.handleFormChange} />
								</label>
							</div>
						)
					})}

					<button onClick={this.handleClose} value="cancel">Cancel</button>
					<button type="submit" onClick={this.handleSubmit} value={JSON.stringify(this.state)}>Submit</button>
				</dialog>
			</React.Fragment>
		);
	}
	getReturnValue () {
		console.log('The test function was called!!!');
		return 'test';
	}
}

ModalMenu.propTypes = {
	dialog_id: PropTypes.string,
	formFields: PropTypes.object,
	handleFormChange: PropTypes.func
};
export default ModalMenu
