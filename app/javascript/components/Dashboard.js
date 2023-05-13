import React from "react"
import PropTypes from "prop-types"
class Dashboard extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div>
          {this.props.copolymer_series.map((series) => <div key={series}>{series}</div>)}
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
	copolymer_series: PropTypes.array
};
export default Dashboard
