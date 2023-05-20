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
			formData: {},
			remainingMonomers: {}
		}
		this.handleFormChange = (event) => {
			const { name, value } = event.target;
			
			switch(name)
			{
				case 'funcgroup_a':
				case 'funcgroup_b':
					
					this.setState({ ...this.state, 
						formData: { 
							...this.state.formData, 
							[name]: value
						},
						// Set monomer options for this functional group
						remainingMonomers: {
							...this.state.remainingMonomers,
							[name + '_monomers']: funcGroupMonomers[value]
						}
					});
					break;
				case 'funcgroup_a_monomers':
				case 'funcgroup_b_monomers':
					const { formData, remainingMonomers } = this.state;
					// Get selected comonomers and update remaining monomers object
					const comonomers = formData[name] ? formData[name] : [];
					
					// Create update object by first copying current monomers then removing selected monomer
					const updatedMonomersRemaining = [ ...remainingMonomers[name] ];
					const monomerIndex = updatedMonomersRemaining.indexOf(value);
					updatedMonomersRemaining.splice(monomerIndex, 1);

					this.setState({ ...this.state, 
						formData: { 
							...formData, 
							[name]: [ ...comonomers, value ]
						},
						remainingMonomers: {
							...remainingMonomers,
							[name]: updatedMonomersRemaining
						} 
					});
					break;
				default:
					const updatedFormFields = { ...this.state.formData, [name]: value };
					this.setState({ ...this.state, formData: updatedFormFields });
					break;
			}
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

						{(() => {
							// Get selected functional groups
							const funcA = formData[funcgroup_a];
							const funcB = formData[funcgroup_b];

							// Check that functional groups have been selected
							if ((funcA !== 'Select Group' && funcA !== undefined) && (funcB !== 'Select Group' && funcB !== undefined)) {
								// Get set method for updating monomers in form data
								const { handleFormChange } = this;

								const createMonomerProps = (funcGroup, comonomerLabel) => ({
									funcGroup,
									comonomerLabel
								});

								// Create props for Functional Group A Monomers
								const labelA = funcgroup_a + '_monomers';
								const optionsMonomersA = {
									handleFormChange,
									comonomerOptions: funcGroupMonomers[funcA],
									options: createMonomerProps(funcA, labelA)
								};

								// Create props for Functional Group B Monomers
								const labelB = funcgroup_b + '_monomers';
								const optionsMonomersB = {
									handleFormChange,
									comonomerOptions: funcGroupMonomers[funcB],
									options: createMonomerProps(funcB, labelB)
								};
								
								return (
									<div>
										<ComonomerDropdown { ...optionsMonomersA } />
										<ComonomerDropdown { ...optionsMonomersB } />
									</div>
								)
							}
							else {
								return '';
							}
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
		const DEFAULT_OPTION = 'Select Group';
		
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

class ComonomerDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Stores name of monomer selected
			selectedMonomer: this.props.comonomerOptions[0]
		}
		this.handleMonomerChange = (event) => {
			// Update the selected monomer based on the dropdown's current value
			this.setState({ ...this.state, selectedMonomer: event.target.value });
		}
		this.addSelectedMonomer = (e) => {
			// Prevent the page from reloading upon button click
			e.preventDefault();

			// Update remaining monomers and form fields
			this.props.handleFormChange({ 
				target: {
					name: this.props.options.comonomerLabel, 
					value: this.state.selectedMonomer
				}
			});
		}
	}
	render () {
		const { comonomerOptions } = this.props;
		const { funcGroup, comonomerLabel } = this.props.options;
		
		const DEFAULT_OPTION = 'Select Comonomer';

		return (
			<div className="input_block" key={funcGroup + '_monomers'}>
				<label htmlFor={comonomerLabel}>Comonomer</label>
				<select 
					name={comonomerLabel} 
					id={comonomerLabel} 
					onChange={this.handleMonomerChange} 
					defaultValue={DEFAULT_OPTION}
				>
					<option disabled="disabled" value={DEFAULT_OPTION} >{DEFAULT_OPTION}</option>
					{comonomerOptions.map((monomer, i) => <option value={monomer} key={`${funcGroup}_${monomer}-${i}`}>{monomer}</option>)}
				</select>

				<button onClick={this.addSelectedMonomer}>Add Selected</button>
			</div>
		);
	}
}
ComonomerDropdown.propTypes = {
	handleFormChange: PropTypes.func,
	comonomerOptions: PropTypes.array,
	options: PropTypes.object
}

export default CreateSeries
