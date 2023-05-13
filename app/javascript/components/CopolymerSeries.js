import React from "react"
import PropTypes from "prop-types"
class CopolymerSeries extends React.Component {
	render() {
		const { name, description, id, groupA, groupB } = this.props;
		return (
			<React.Fragment>
				<section className="copolymer-series-container" key={name}>
					<div className="copolymer-series-title">
						<p>{name}</p>
						<a href={window.location.href + '/' + id}>Open</a>
					</div>
					<div className="copolymer-series-info">
						<p className="copolymer-series-description">
							<strong>Description: </strong>
							{description}
						</p>
						<div className="copolymer-series-groups">
							<div className="copolymer-series-group-a">
								<strong>{groupA.name}</strong>
								<p>Comonomers: {groupA.num}</p>
							</div>
							<div className="copolymer-series-group-b">
								<strong>{groupB.name}</strong>
								<p>Comonomers: {groupB.num}</p>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

CopolymerSeries.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	description: PropTypes.string,
	groupA: PropTypes.object,
	groupB: PropTypes.object
};
export default CopolymerSeries
