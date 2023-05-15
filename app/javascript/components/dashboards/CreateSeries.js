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
		this.setMonomers = (groupType, name, monomers) => {
			// Set monomers, grouped by functional groups
			const updatedMonomers = { ...this.state.formData, 
				[groupType]: name, 
				[groupType + '_monomers']: monomers
			};
			
			// Update form data with functional group and its monomer(s)
			this.setState({ ...this.state, formData: updatedMonomers });
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
							const { setMonomers } = this;

							// Add field names to options object
							const optionsFuncA = {
								setMonomers,
								funcGroupsData: groupMonomersA,
								funcGroupLabel: funcgroup_a
							};
							const optionsFuncB = {
								setMonomers,
								funcGroupsData: groupMonomersB,
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
	constructor(props) {
		super(props);
		this.state = {
			monomers: []
		}
		this.delimiter = '|';
		this.handleMonomersChange = (event) => {
			const { name, value } = event.target;
			const { setMonomers } = this.props;
			
			const [ funcGroupName, monomerName ] = value.split(this.delimiter);
			// Determine if monomer previously selected
			const monomerSelected = this.state.monomers.indexOf(monomerName) > -1;
			if (!monomerSelected) {
				// Add monomer to list of monomers and update state for both this and parent component
				const updatedMonomerList = this.state.monomers.push(monomerName);
				this.setState({ ...this.state, monomers: updatedMonomerList })
				setMonomers(name, funcGroupName, updatedMonomerList);
			}
		}
	}
	render () {
		// Get functional group names from object keys
		const { funcGroupsData, funcGroupLabel } = this.props;
		const funcGroupNames = Object.keys(funcGroupsData);

		// Default dropdown option
		const DEFAULT_OPTION = 'Select Item';
		
		return (
			<section className="monomer_selection" key={funcGroupLabel + '_monomer_selection'}>
				<div className="input_block">
					<label htmlFor={funcGroupLabel}>Select Monomer by Functional Group</label>
					<select name={funcGroupLabel} id={funcGroupLabel} onChange={this.handleMonomersChange}>
						{funcGroupNames.map((name) => 
							<optgroup label={name} key={name}>
								{funcGroupsData[name].map(monomer => {
									const funcMonomer = name + this.delimiter + monomer;
									return <option value={funcMonomer} key={funcMonomer}>{monomer}</option>
								})}
							</optgroup>
						)}
					</select>
				</div>
			</section>
		);
	}
}
FuncGroupDropdown.propTypes = {
	setMonomers: PropTypes.func,
	funcGroupsData: PropTypes.object,
	funcGroupLabel: PropTypes.string
};

export default CreateSeries
