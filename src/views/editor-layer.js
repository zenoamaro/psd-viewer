/* @flow */
import React from 'react';
import getLayerId from '../utils/get-layer-id';
let T = React.PropTypes;


let Layer = React.createClass({

	propTypes: {
		layer: T.object.isRequired,
		onToggle: T.func,
		onHover: T.func,
		onLeave: T.func,
	},

	getDefaultProps() {
		return {
			onToggle() {},
			onHover() {},
			onLeave() {},
		};
	},

	isHidden() {
		return this.props.layer.visible() === false;
	},

	render() {
		let {layer} = this.props;
		return (
			<div className={`layer ${this.isHidden()? 'is-hidden' : ''}`}>
				{this.renderInfo(layer)}
				{this.renderChildren(layer.children())}
			</div>
		);
	},

	renderInfo(layer) {
		let onClick = () => this.props.onToggle(layer);
		let onHover = () => this.props.onHover(layer);
		let onLeave = () => this.props.onLeave();
		return (
			<div className="layer--info"
			     onMouseEnter={onHover}
			     onMouseLeave={onLeave}>
					<span className="layer--visibility" onClick={onClick}>
						<span className={
							`fa ${this.isHidden()? 'fa-eye-slash' : 'fa-eye'}`
						}/>
					</span>
					<span className="layer--name">
						{layer.name || 'Root layer'}
					</span>
			</div>
		);
	},

	renderChildren(layers) {
		return (
			<ul className="layer--children">
				{layers.map(function(layer) {
					return <Layer key={getLayerId(layer)}
					              layer={layer}
					              onHover ={this.props.onHover}
					              onLeave ={this.props.onLeave}
					              onToggle={this.props.onToggle} />;
				}, this)}
			</ul>
		);
	},

});

export default Layer;