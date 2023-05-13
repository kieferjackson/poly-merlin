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
    return (
      <React.Fragment>
        <section className="action_banner">
					<div className="dashboard_title">
            {this.state.dashboard}
					</div>
					<button onClick={() => this.setState({ ...this.state, dashboard: 'Create New Series' })}>Create New Series</button>
				</section>
      </React.Fragment>
    );
  }
}

export default ActionBanner