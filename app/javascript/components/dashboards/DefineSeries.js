import React from "react";
import PropTypes from "prop-types";
class DefineSeries extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedCopolymer: ''
    }
  }
  render () {
    const { name, id, description, copolymers } = this.props.selectedSeries;
    return (
      <React.Fragment>
        <p>{name}</p>
        <p>{id}</p>
        <p>{description}</p>
        {copolymers.map((copolymer, i) => <CopolymerTile { ...{ copolymerData: copolymer, series_name: name, num: i + 1 } } />)}
      </React.Fragment>
    );
  }
}

DefineSeries.propTypes = {
  selectedSeries: PropTypes.object
};

class CopolymerTile extends React.Component {
  render () {
    const { total_mass, total_moles, groupA, groupB } = this.props.copolymerData;
    const { series_name, num } = this.props;
    return (
      <React.Fragment>
        <div style={ { color: 'purple', fontWeight: 'bold' } }>{series_name + ' Copolymers | ' + num}</div>
        {[ groupA, groupB ].map((comonomers, i) => {
          return (
            <div key={`${series_name}_${i}`}>
              {comonomers.map(comonomer => {
                const { name, mass, wpercent, mpercent, moles, molar_mass } = comonomer;
                return (
                  <div key={name}>
                    <h1>{name}</h1>
                    <p>Mass (g): {mass}</p>
                    <p>Weight Percent (%): {wpercent}</p>
                    <p>Mole Percent (%): {mpercent}</p>
                    <p>Moles (mol): {moles}</p>
                    <p>Molar Mass (g/mol): {molar_mass}</p>
                  </div>
                )
              })}
            </div>
          );
        })}
        <p>Total Mass (g): {total_mass}</p>
        <p>Total Moles (mol): {total_moles}</p>
      </React.Fragment>
    );
  }
}

DefineSeries.propTypes = {
  copolymerData: PropTypes.object,
  series_name: PropTypes.string,
  num: PropTypes.number
};

export default DefineSeries
