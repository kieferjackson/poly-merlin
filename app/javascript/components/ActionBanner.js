import React from "react";
import PropTypes from "prop-types"
import { MAIN, CREATE_SERIES } from "./utils/dashboard_pages";

function determineDashboardNav(current_dashboard)
{
  switch(current_dashboard)
  {
    case MAIN:          return CREATE_SERIES;
    case CREATE_SERIES: return MAIN;
    default:            return MAIN;
  }
}

class ActionBanner extends React.Component {
  render () {
    const { dashboard, setDashboard } = this.props;
    const dashboardNav = determineDashboardNav(dashboard);
    
    return (
      <React.Fragment>
        <section className="action_banner">
					<div className="dashboard_title">
            {dashboard}
					</div>
					<button onClick={() => setDashboard(dashboardNav)}>{dashboardNav}</button>
				</section>
      </React.Fragment>
    );
  }
}

ActionBanner.propTypes = {
	dashboard: PropTypes.string,
  setDashboard: PropTypes.func
};
export default ActionBanner