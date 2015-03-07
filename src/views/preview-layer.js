/* @flow */
import React from 'react';
import cx from 'react/lib/cx';
import getLayerId from '../utils/get-layer-id';
import getLayerOffset from '../utils/get-layer-offset';
let T = React.PropTypes;


let Layer = React.createClass({

	propTypes: {
		layer: T.object.isRequired,
		scale: T.number,
	},

	getInitialState() {
		return {};
	},

	getDefaultProps() {
		return {
			scale: 1
		};
	},

	componentDidMount() {
		this.cacheImage();
	},

	cacheImage() {
		let {layer} = this.props;
		if (!layer.isLayer()) return;
		this.setState({ image: layer.toPng().src });
	},

	render() {
		let {layer} = this.props;
		if (layer.isRoot() || layer.isGroup()) {
			return this.renderGroup(layer);
		} else {
			return this.renderLayer(layer);
		}
	},

	getStyle(layer) {
		let scale = this.props.scale;
		return getLayerOffset(layer, scale);
	},

	isVisible(layer) {
		return this.props.visible !== false
		       && layer.visible() !== false;
	},

	getClassName(layer) {
		return cx({
			'layer':    true,
			'is-group': layer.isGroup(),
			'is-layer': layer.isLayer(),
		});
	},

	renderGroup(layer) {
		return (
			<div className={this.getClassName(layer)}
			     style={this.getStyle(layer)}>
					{layer.children().reverse().map(this.renderChild)}
			</div>
		);
	},

	renderLayer(layer) {
		return (
			<div className={this.getClassName(layer)}
			     style={this.getStyle(layer)}>
					{this.isVisible(layer)? <img src={this.state.image} /> : ''}
			</div>
		);
	},

	renderChild(layer) {
		return (
			<Layer key={getLayerId(layer)}
			       layer={layer}
			       scale={this.props.scale}
			       visible={this.isVisible(layer)} />
		);
	},

});

export default Layer;