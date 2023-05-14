import React from "react";
import PropTypes from "prop-types";

/*** TEST VARIABLES ***/
const funcGroups = [
	'Diester',
	'Diol',
	'Nitrile'
];

const funcGroupMonomers = {
	Diester: ['DMOB', 'Tartaric acid'],
	Diol: ['CHDM'],
	Nitrile: ['Acrylonitrile', 'NBR']
}

// Add default starting option to available functional groups
const DEFAULT_OPTION = 'Select Item';
funcGroups.unshift(DEFAULT_OPTION);

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
		// Set default fields
		const { funcgroup_a, funcgroup_b } = formFields
		this.state = { ...this.state, formData: { 
				...this.state.formData, 
				[funcgroup_a]: DEFAULT_OPTION, 
				[funcgroup_b]: DEFAULT_OPTION
			}
		}
		debugger;
		this.handleFormChange = (event) => {
			const { name, value } = event.target;
			const updatedFormFields = { ...this.state.formData, [name]: value };
			
			this.setState({ ...this.state, formData: updatedFormFields });
		}
	}
	render() {
		const { series_name, series_description, funcgroup_a, funcgroup_a_monomers, funcgroup_b, funcgroup_b_monomers } = formFields;
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
						<label htmlFor={funcgroup_a}>
							Functional Group A
							<select name={funcgroup_a} value={formData[funcgroup_a]} onChange={this.handleFormChange}>
								{funcGroups.map((funcGroup, i) => <option value={funcGroup} key={i}>{funcGroup}</option>)}
							</select>
						</label>

						{formData[funcgroup_a] != DEFAULT_OPTION 
							? // Display monomers available for the selected functional group
							(() => {
								const monomers = funcGroupMonomers[formData[funcgroup_a]];
								monomers.unshift(DEFAULT_OPTION);
								
								return (
									<div className="input_block">
										<label htmlFor={funcgroup_a_monomers}>{formData[funcgroup_a]} Monomers</label>
										<select name={funcgroup_a_monomers} value={formData[funcgroup_a_monomers]} onChange={this.handleFormChange}>
											{monomers.map((monomer) => <option value={monomer}>{monomer}</option>)}
										</select>
									</div>
								)
							})()
							: // No functional group selected, display nothing
							''
						}

						<FuncGroupDropdown { ...{ funcGroupsData: funcGroupMonomers, funcGroupLabel: funcgroup_a } } />

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
		const { funcGroupsData, funcGroupLabel } = this.props;
		const funcGroupNames = Object.keys(funcGroupsData);
		
		return (
			<div className="input_block">
				<label htmlFor={funcGroupLabel}>Select Monomer by Functional Group</label>
				<select name={funcGroupLabel} id={funcGroupLabel}>
					{funcGroupNames.map((name) => 
						<optgroup label={name} key={name}>
							{funcGroupsData[name].map(monomer => <option value={`${name}-${monomer}`} key={`${name}-${monomer}`}>{monomer}</option>)}
						</optgroup>
					)}
				</select>
			</div>
		);
	}
}
FuncGroupDropdown.propTypes = {
	funcGroupsData: PropTypes.object,
	funcGroupLabel: PropTypes.string
};

export default CreateSeries
