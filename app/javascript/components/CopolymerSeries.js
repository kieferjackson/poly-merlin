import React from "react";
import PropTypes from "prop-types";
import { DEFINE_SERIES } from "./utils/dashboard_pages";
class CopolymerSeries extends React.Component {
	render() {
		const { series_data: { name, description, id, groupA, groupB }, setDashboard } = this.props;
		console.log(
			'name: ', name,
			'description: ', description,
			'id: ', id,
			'groupA: ', groupA,
			'groupB: ', groupB,
		)
		return (
			<React.Fragment>
				<section className="copolymer-series-container">
					<div className="copolymer-series-title">
						<p>{name}</p>
						<button onClick={(e) => {
							e.preventDefault();
							setDashboard(DEFINE_SERIES, name);
						}}>Open</button>
					</div>
					<div className="copolymer-series-info">
						<p className="copolymer-series-description">
							<strong>Description: </strong>
							{description}
						</p>
						<div className="copolymer-series-groups">
							<div className="copolymer-series-group-a">
								<strong>{groupA.name}</strong>
								<p></p>
							</div>
							<div className="copolymer-series-group-b">
								<strong>{groupB.name}</strong>
								<p></p>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

CopolymerSeries.propTypes = {
	series_data: PropTypes.object,
	setDashboard: PropTypes.func
};
export default CopolymerSeries
