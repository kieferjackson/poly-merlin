import React from "react"
import PropTypes from "prop-types"
import ActionBanner from "./ActionBanner";
// Import Dashboards
import { MAIN, CREATE_SERIES, DEFINE_SERIES } from "./utils/dashboard_pages";
import Main from './dashboards/Main';
import CreateSeries from './dashboards/CreateSeries';
import DefineSeries from "./dashboards/DefineSeries";

const copolymer_series_data = [
  {
    name: 'PET Substitute',
    id: 1,
    description: "It's a substitute for PET.",
    groupA: {
      name: 'Diester',
      copolymers: [
        {
          mass: 2,
          wpercent: 40,
          mpercent: 50,
          moles: 0.02,
          molar_mass: 100
        },
        {
          mass: 3,
          wpercent: 60,
          mpercent: 50,
          moles: 0.03,
          molar_mass: 100
        }
      ]
    },
    groupB: {
      name: 'Diol',
      copolymers: [
        {
          mass: 4,
          wpercent: 100,
          mpercent: 100,
          moles: 0.05,
          molar_mass: 200
        }
      ]
    }
  }
]

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dashboard: MAIN,
      selectedSeries: {}
    }
    this.setDashboard = (action, data = null) => {
      switch(action)
      {
        case MAIN:
          this.setState({ ...this.state, dashboard: MAIN });
          break;
        case CREATE_SERIES:
          this.setState({ ...this.state, dashboard: CREATE_SERIES });
          break;
        case DEFINE_SERIES:
        this.setState({ ...this.state, dashboard: DEFINE_SERIES, selectedSeries: copolymer_series_data.find(series => series.name === data) });
          break;
        default:
          this.setState({ ...this.state, dashboard: '[UNKNOWN ACTION]' });
          break;
      }
    }
    this.renderDashboard = (dashboard) => {
      switch(dashboard)
      {
        case MAIN:          return <Main { ...{ series_data: copolymer_series_data, setDashboard: this.setDashboard} } />;
        case CREATE_SERIES: return <CreateSeries/>;
        case DEFINE_SERIES: return <DefineSeries { ...{ selectedSeries: this.state.selectedSeries } } />
        default:            return <Main/>;
      }
    }
  }
  render () {
    const { setDashboard, renderDashboard } = this;
    return (
        <React.Fragment>
          <ActionBanner { ...{ ...this.state, setDashboard } } />
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
