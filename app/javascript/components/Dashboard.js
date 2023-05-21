import React from "react"
import PropTypes from "prop-types"
import ActionBanner from "./ActionBanner";
// Import Dashboards
import { MAIN, CREATE_SERIES } from "./utils/dashboard_pages";
import Main from './dashboards/Main';
import CreateSeries from './dashboards/CreateSeries';

function renderDashboard(dashboard)
{
  switch(dashboard)
  {
    case MAIN:          return <Main/>;
    case CREATE_SERIES: return <CreateSeries/>;
    default:            return <Main/>;
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dashboard: MAIN
    }
    this.setDashboard = (action) => {
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
              {renderDashboard(this.state.dashboard)}
            </div>
          </React.Fragment>
      );
    }
}

Dashboard.propTypes = {
	copolymer_series: PropTypes.array
};
export default Dashboard;
