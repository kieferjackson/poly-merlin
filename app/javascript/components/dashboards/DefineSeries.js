import React from "react";
import PropTypes from "prop-types";
class DefineSeries extends React.Component {
  render () {
    const { name, id, description, groupA, groupB } = this.props.selectedSeries;
    return (
      <React.Fragment>
        <p>{name}</p>
        <p>{id}</p>
        <p>{description}</p>
        {[ groupA, groupB ].map(group => {
          const { name, copolymers } = group;
          return (
            <div key={name}>
              <h1>{name}</h1>
              {copolymers.map((copolymer, i) => {
                return <div key={name + i}>
                  <strong>Comonomer {i + 1}</strong>
                  <p>Mass (g): {copolymer.mass}</p>
                  <p>Weight Percent (%): {copolymer.wpercent}</p>
                  <p>Mole Percent (%): {copolymer.mpercent}</p>
                  <p>Moles (mol): {copolymer.moles}</p>
                  <p>Molar Mass (g/mol): {copolymer.molar_mass}</p>
                </div>
              })}
            </div>
          )
        })}
      </React.Fragment>
    );
  }
}

DefineSeries.propTypes = {
  selectedSeries: PropTypes.object
};
export default DefineSeries
