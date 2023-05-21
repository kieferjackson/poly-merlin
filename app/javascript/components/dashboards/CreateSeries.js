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
		this.delimiter = '|';
		this.handleFormChange = (event) => {
			const { name, value } = event.target;
			const { formData } = this.state;
			
			switch(name)
			{
				case 'funcgroup_a':
				case 'funcgroup_b':
					const monomers_field_name = name + '_monomers';
					this.setState({ ...this.state, 
						formData: { 
							...formData, 
							[name]: value,
							[monomers_field_name]: []
						},
						// Set monomer options for this functional group
						remainingMonomers: {
							...this.state.remainingMonomers,
							[monomers_field_name]: funcGroupMonomers[value]
						}
					});
					break;
				case 'funcgroup_a_monomers':
				case 'funcgroup_b_monomers':
					// Get selected comonomers and update remaining monomers object
					const comonomers = formData[name] ? formData[name] : [];
					
					// Create update object by first copying current monomers then removing selected monomer
					const updatedMonomersRemaining = [ ...this.state.remainingMonomers[name] ];
					const monomerIndex = updatedMonomersRemaining.indexOf(value);
					updatedMonomersRemaining.splice(monomerIndex, 1);

					this.setState({ ...this.state, 
						formData: { 
							...formData, 
							[name]: [ ...comonomers, value ]
						},
						remainingMonomers: {
							...this.state.remainingMonomers,
							[name]: updatedMonomersRemaining
						} 
					});
					break;
				case 'funcgroup_a_monomers' + this.delimiter + 'remove':
				case 'funcgroup_b_monomers' + this.delimiter + 'remove':
					const [ funcgroup_fieldname ] = name.split(this.delimiter);
					
					// Get selected comonomers and index of monomer to remove
					const selectedComonomers = [ ...formData[funcgroup_fieldname] ];
					const remainingMonomers = [ ...this.state.remainingMonomers[funcgroup_fieldname] ];
					const monomerToRemove = selectedComonomers.indexOf(value);
					
					// Remove monomer from list and add back to available options
					selectedComonomers.splice(monomerToRemove, 1);
					remainingMonomers.push(value);
					
					this.setState({ ...this.state, 
						formData: { 
							...formData, 
							[funcgroup_fieldname]: selectedComonomers
						},
						remainingMonomers: {
							...this.state.remainingMonomers,
							[funcgroup_fieldname]: remainingMonomers
						} 
					});
					break;
				default:
					const updatedFormFields = { ...formData, [name]: value };
					this.setState({ ...this.state, formData: updatedFormFields });
					break;
			}
		}
	}
	render() {
		const { 
			series_name, series_description, 
			funcgroup_a, funcgroup_b, 
			funcgroup_a_monomers, funcgroup_b_monomers 
		} = formFields;
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
								// Get selected monomers for both functional groups
								const monomersFuncA = formData[funcgroup_a_monomers];
								const monomersFuncB = formData[funcgroup_b_monomers];

								// Get monomer options for both functional groups
								const monomerOptionsA = this.state.remainingMonomers[funcgroup_a_monomers];
								const monomerOptionsB = this.state.remainingMonomers[funcgroup_b_monomers];
								
								// Get set method for updating monomers in form data
								const { handleFormChange, delimiter } = this;

								const createMonomerProps = (funcGroup, comonomerLabel, comonomers) => ({
									funcGroup,
									comonomerLabel,
									comonomers,
									delimiter
								});

								// Create props for Functional Group A Monomers
								const optionsMonomersA = {
									handleFormChange,
									comonomerOptions: monomerOptionsA,
									options: createMonomerProps(funcA, funcgroup_a_monomers, monomersFuncA)
								};

								// Create props for Functional Group B Monomers
								const optionsMonomersB = {
									handleFormChange,
									comonomerOptions: monomerOptionsB,
									options: createMonomerProps(funcB, funcgroup_b_monomers, monomersFuncB)
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
		this.delimiter = '|';
		this.DEFAULT_OPTION = 'Select Comonomer';
		this.handleMonomerChange = (event) => {
			// Update the selected monomer based on the dropdown's current value
			this.setState({ ...this.state, selectedMonomer: event.target.value });
		}
		this.addSelectedMonomer = (e) => {
			// Prevent the page from reloading upon button click
			e.preventDefault();

			// Only add monomer if default not selected
			const { selectedMonomer } = this.state;
			if (selectedMonomer !== this.DEFAULT_OPTION) {
				// Update the selected monomer to the next available option
				const { comonomerOptions } = this.props;
				const selectedMonomerIndex = comonomerOptions.indexOf(selectedMonomer);

				const nextOption = comonomerOptions.length > 1 && selectedMonomerIndex === 0
					? comonomerOptions[selectedMonomerIndex + 1]
					: comonomerOptions.length > 1 && selectedMonomerIndex > 0 
						? comonomerOptions[0] 
						: this.DEFAULT_OPTION;
				this.setState({ ...this.state, selectedMonomer: nextOption });

				// Update remaining monomers and form fields
				this.props.handleFormChange({ 
					target: {
						name: this.props.options.comonomerLabel, 
						value: selectedMonomer
					}
				});
			}
		}
		this.removeMonomer = (e) => {
			// Prevent the page from reloading upon button click
			e.preventDefault();

			const { comonomerOptions } = this.props;
			const { comonomerLabel, delimiter } = this.props.options

			// Get next selectable option for dropdown
			const nextOption = comonomerOptions.length === 0 ? e.target.name : comonomerOptions[0];
			this.setState({ ...this.state, selectedMonomer: nextOption });
			
			// Update remaining monomers and form fields
			this.props.handleFormChange({ 
				target: {
					name: comonomerLabel + delimiter + 'remove', 
					value: e.target.name
				}
			});
		}
	}
	render () {
		const { DEFAULT_OPTION } = this;
		const { comonomerOptions } = this.props;
		const { funcGroup, comonomerLabel, comonomers } = this.props.options;

		return (
			<div className="input_block" key={funcGroup + '_monomers'}>
				<label htmlFor={comonomerLabel}>Comonomer</label>
				<select 
					name={comonomerLabel} 
					id={comonomerLabel} 
					onChange={this.handleMonomerChange} 
					defaultValue={DEFAULT_OPTION}
				>
					<option disabled="disabled" value={DEFAULT_OPTION}>{DEFAULT_OPTION}</option>
					{comonomerOptions.map((monomer) => <option value={monomer} key={`${funcGroup}_${monomer}_option`}>{monomer}</option>)}
				</select>

				<button 
					onClick={this.addSelectedMonomer} 
					disabled={comonomerOptions.length === 0} 
					style={comonomerOptions.length === 0 ? { backgroundColor: 'red' }: {}}
				>
					Add Selected
				</button>

				<div className="comonomer_display">
					{comonomers.map(monomer => <button key={`${funcGroup}_${monomer}`} name={monomer} onClick={this.removeMonomer}>{monomer}</button>)}
				</div>
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
