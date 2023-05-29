import React from "react";
import PropTypes from "prop-types";
import ModalMenu from "../ModalMenu";
import CopolymerSeries from "../CopolymerSeries";

class Main extends React.Component {
  render () {
    const { setDashboard } = this.props;
    debugger;
    return (
      <React.Fragment>
        {this.props.series_data.map(series => <CopolymerSeries { ...{ series_data: series, setDashboard } } key={series.name} />)}
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  series_data: PropTypes.array,
  setDashboard: PropTypes.func
};
export default Main
