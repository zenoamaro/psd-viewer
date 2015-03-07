/* @flow */
import React from 'react';
import cx from 'react/lib/cx';
import getLayerId from '../utils/get-layer-id';
let T = React.PropTypes;


let Layer = React.createClass({

	propTypes: {
		layer: T.object.isRequired,
		highlightedLayer: T.string,
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
		let offsets = layer.parent?
			layer.parent.coords
			: { left:0, top:0 };
		return {
			position: 'absolute',
			left:   scale * (layer.left - offsets.left),
			top:    scale * (layer.top - offsets.top),
			width:  scale * (layer.width),
			height: scale * (layer.height),
		};
	},

	isVisible(layer) {
		return this.props.visible !== false
		       && layer.visible() !== false;
	},

	isHighlighted(layer) {
		return getLayerId(layer) === this.props.highlightedLayer;
	},

	getClassName(layer) {
		return cx({
			'layer':    true,
			'is-group': layer.isGroup(),
			'is-layer': layer.isLayer(),
			'is-highlighted': this.isHighlighted(layer),
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
			       visible={this.isVisible(layer)}
			       highlightedLayer={this.props.highlightedLayer} />
		);
	},

});

export default Layer;