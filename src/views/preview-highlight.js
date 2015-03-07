/* @flow */
import React from 'react';
import getLayerPosition from '../utils/get-layer-position';
let T = React.PropTypes;


export default React.createClass({

	propTypes: {
		layer: T.object,
		scale: T.number,
	},

	getStyle(layer) {
		let scale = this.props.scale;
		return getLayerPosition(layer, scale);
	},

	getLayerHeader(layer) {
		return `${layer.name || 'Root'} — `
		     + `${layer.left} x ${layer.top} - `
		     + `${layer.width} x ${layer.height}`;
	},

	render() {
		if (!this.props.layer) return false;
		let {layer} = this.props;
		let style = this.getStyle(layer);
		return (
			<div className='highlight'
			     style={style}>
					<div className='highlight--coords'>
						{this.getLayerHeader(layer)}
					</div>
			</div>
		);
	},

});
