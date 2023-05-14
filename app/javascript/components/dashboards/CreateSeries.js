import React from "react";
import PropTypes from "prop-types";

const formFields = {
	series_name: 'series_name',
	series_description: 'series_name'
}

class CreateSeries extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {}
		}
		this.handleFormChange = (event) => {
			const { name, value } = event.target;
			const updatedFormFields = { ...this.state.formData, [name]: value };
			
			this.setState({ ...this.state, formData: updatedFormFields });
		}
	}
	render() {
		const { series_name, series_description } = formFields;
		const { formData } = this.state;
		
		return (
			<React.Fragment>
				<div className="form_container">
					<form id="create_new_series">
						<h1>Create New Copolymer Series</h1>
						<section className="percent_type">
							<label>
								Weight %
								<input type="radio" name="proportion" value="wpercent" id="wpercent" className="input_field" defaultChecked={true} />
							</label>
							<label>
								Mole %
								<input type="radio" name="proportion" value="mpercent" id="mpercent" className="input_field" />
							</label>
						</section>
						
						<div className="input_block">
							<label>
								Name
								<input
									type="text"
									value={formData[series_name]}
									onChange={this.handleFormChange}
									placeholder={`e.g. 'PET Substitute'`}
									name={series_name}
									className="input_field string"
								/>
							</label>
						</div>

						<div className="input_block">
							<label>
								Description
								<input
									type="text"
									value={formData[series_description]}
									onChange={this.handleFormChange}
									placeholder={`e.g. 'Excellent thermomechanical properties up to 130 C'`}
									name={series_description}
									className="input_field string"
								/>
							</label>
						</div>

						<button
							type="button" name="plus"
							onClick={() => 1}
							className="square_button" tabIndex="-1"
						>
							<div>+</div>
						</button>

						<div className="submit_container">
							<button type="button" onClick={() => 2} id="initial_submit" className="submit_button">Submit</button>
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateSeries
