import React from "react";
import PropTypes from "prop-types"

class ActionBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: 'Copolymer Series'
    }
  }
  render () {
    const { dashboard, setDashboard } = this.props;
    
    return (
      <React.Fragment>
        <section className="action_banner">
					<div className="dashboard_title">
            {dashboard}
					</div>
					<button onClick={() => setDashboard('Create New Series')}>Create New Series</button>
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