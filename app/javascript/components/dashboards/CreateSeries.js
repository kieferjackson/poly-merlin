import React from "react";
import PropTypes from "prop-types";

/*** TEST VARIABLES ***/
const funcGroupMonomers = {
	Diester: ['DMOB', 'Tartaric acid'],
	Diol: ['CHDM'],
	Nitrile: ['Acrylonitrile', 'NBR']
}

const formFields = {
	series_name: 'series_name',
	series_description: 'series_name',
	funcgroup_a: 'funcgroup_a',
	funcgroup_a_monomers: 'funcgroup_a_monomers',
	funcgroup_b: 'funcgroup_b',
	funcgroup_b_monomers: 'funcgroup_b_monomers'
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
		const { series_name, series_description, funcgroup_a, funcgroup_b } = formFields;
		const { formData } = this.state;
		
		return (
			<React.Fragment>
				<div className="form_container">
					<form id="create_new_series">
						<h1>Create New Copolymer Series</h1>
						<section className="percent_type">
							<label>
								Percent Type
								<label>
									Weight %
									<input type="radio" name="proportion" value="wpercent" id="wpercent" className="input_field" defaultChecked={true} />
								</label>
								<label>
									Mole %
									<input type="radio" name="proportion" value="mpercent" id="mpercent" className="input_field" />
								</label>
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
								<textarea
									value={formData[series_description]}
									onChange={this.handleFormChange}
									placeholder={`e.g. 'Excellent thermomechanical properties up to 130 C'`}
									name={series_description}
									className="input_field string"
								>
								</textarea>
							</label>
						</div>

						<h2>Define Functional Groups</h2>
						{(() => {
							const funcA = formData[funcgroup_a];
							const funcB = formData[funcgroup_b];
							const  { [funcB]: funcGroupA, ...groupMonomersA } = funcGroupMonomers;
							const  { [funcA]: funcGroupB, ...groupMonomersB } = funcGroupMonomers;

							// Get set method for updating monomers in form data
							const { handleFormChange } = this;

							// Add field names to options object
							const optionsFuncA = {
								handleFormChange,
								funcGroup: funcA,
								funcGroupNames: Object.keys(groupMonomersA),
								funcGroupLabel: funcgroup_a
							};
							const optionsFuncB = {
								handleFormChange,
								funcGroup: funcB,
								funcGroupNames: Object.keys(groupMonomersB),
								funcGroupLabel: funcgroup_b
							};

							return (
								<div>
									<FuncGroupDropdown { ...optionsFuncA } />
									<FuncGroupDropdown { ...optionsFuncB } />
								</div>
							)
						})()}
						

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

class FuncGroupDropdown extends React.Component {
	render () {
		// Get functional group names from object keys
		const { handleFormChange, funcGroup, funcGroupNames, funcGroupLabel } = this.props;
		const isFuncA = funcGroupLabel[funcGroupLabel.length - 1] == 'a';
		
		// Default dropdown option
		const DEFAULT_OPTION = 'Select Monomer';
		
		return (
			<section className="monomer_selection" key={funcGroupLabel + '_monomer_selection'}>
				<div className="input_block">
					<label htmlFor={funcGroupLabel}>Functional Group {isFuncA ? 'A' : 'B'}</label>
					<select 
						name={funcGroupLabel} 
						id={funcGroupLabel} 
						onChange={handleFormChange} 
						defaultValue={DEFAULT_OPTION}
						value={funcGroup}
					>
						<option disabled="disabled" value={DEFAULT_OPTION} >{DEFAULT_OPTION}</option>
						{funcGroupNames.map((funcGroupName, i) => <option value={funcGroupName} key={funcGroupName + i}>{funcGroupName}</option>)}
					</select>
				</div>
			</section>
		);
	}
}
FuncGroupDropdown.propTypes = {
	handleFormChange: PropTypes.func,
	funcGroup: PropTypes.string,
	funcGroupNames: PropTypes.array,
	funcGroupLabel: PropTypes.string
};

export default CreateSeries
