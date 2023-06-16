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
    groupA: 'Diester',
    groupB: 'Diol',
    copolymers: [
      // Copolymer 1
      {
        total_mass: 9,
        total_moles: 0.10,
        groupA: [
          {
            name: 'CHDM',
            mass: 4,
            wpercent: 100,
            mpercent: 100,
            moles: 0.05,
            molar_mass: 200
          }
        ],
        groupB: [
          {
            name: 'DMOB',
            mass: 2,
            wpercent: 40,
            mpercent: 50,
            moles: 0.02,
            molar_mass: 100
          },
          {
            name: '1,2-something',
            mass: 3,
            wpercent: 60,
            mpercent: 50,
            moles: 0.03,
            molar_mass: 100
          }
        ]
      },
      // Copolymer 2
      {
        total_mass: 15,
        total_moles: 0.125,
        groupA: [
          {
            name: 'CHDM',
            mass: 5,
            wpercent: 100,
            mpercent: 100,
            moles: 0.025,
            molar_mass: 200
          }
        ],
        groupB: [
          {
            name: 'DMOB',
            mass: 3.33,
            wpercent: 33.3,
            mpercent: 10,
            moles: 0.0333,
            molar_mass: 100
          },
          {
            name: '1,2-something',
            mass: 6.66,
            wpercent: 66.6,
            mpercent: 90,
            moles: 0.0666,
            molar_mass: 100
          }
        ]
      }
    ]
  }
]

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dashboard: MAIN,
      selectedSeries: {}
    }
    this.refs = {
      create_series_auth_token: this.props.create_series_auth_token,
      create_copolymer_auth_token: this.props.create_copolymer_auth_token
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
          this.setState({ 
              ...this.state, 
              dashboard: DEFINE_SERIES, 
              // `data` in this context is the given name for the copolymer series
              selectedSeries: copolymer_series_data.find(series => series.name === data) 
          });
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
        case CREATE_SERIES: return <CreateSeries { ...{ auth_token: this.refs.create_series_auth_token }} />;
        case DEFINE_SERIES: return <DefineSeries { ...{ selectedSeries: this.state.selectedSeries, auth_token: this.refs.create_copolymer_auth_token } } />
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
