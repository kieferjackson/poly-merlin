import React from "react"
import PropTypes from "prop-types"
import ActionBanner from "./ActionBanner";

const dashboards = {
  MAIN: 'Main',
  CREATE_SERIES: 'Create New Series'
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dashboard: dashboards.MAIN
    }
    this.setDashboard = (action) => {
      const { MAIN, CREATE_SERIES } = dashboards;
      
      switch(action)
      {
        case MAIN:
          this.setState({ ...this.state, dashboard: MAIN });
          break;
        case CREATE_SERIES:
          this.setState({ ...this.state, dashboard: CREATE_SERIES });
          break;
        default:
          this.setState({ ...this.state, dashboard: '[UNKNOWN ACTION]' });
          break;
      }
    }
  }
    render () {
      return (
          <React.Fragment>
            <ActionBanner { ...{ ...this.state, setDashboard: this.setDashboard } } />
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
export default Dashboard;
