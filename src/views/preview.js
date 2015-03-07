/* @flow */
import React from 'react';
import PSD from 'psd';
import Layer from './preview-layer';
let T = React.PropTypes;


export default React.createClass({

	propTypes: {
		psd: T.instanceOf(PSD).isRequired,
		highlightedLayer: T.string
	},

	getInitialState() {
		return {};
	},

	getScale() {
		let {maxWidth} = this.state;
		let image = this.props.psd.tree().width;
		if (maxWidth && image > maxWidth) {
			return maxWidth / image;
		} else {
			return 1;
		}
	},

	componentDidMount() {
		let container = this.refs.layers.getDOMNode().clientWidth;
		this.setState({ maxWidth: container });
	},

	render() {
		let root = this.props.psd.tree();
		let {highlightedLayer} = this.props;
		return (
			<div className='preview'>
				<div ref="layers"
				     className='preview--layers'>
					<Layer layer={root}
					       scale={this.getScale()}
					       highlightedLayer={highlightedLayer} />
				</div>
			</div>
		);
	},

});