/* @flow */
import PSD from 'psd';
import React from 'react';
import Preview from './preview';
import Editor from './editor';
import getLayerId from '../utils/get-layer-id';


export default React.createClass({

	getInitialState() {
		return {};
	},

	enableFileDrop(event) {
		event.preventDefault();
	},

	async dropFile(event) {
		event.preventDefault();
		this.setState({ loading:true, psd:null });
		let psd = await PSD.fromEvent(event);
		this.setState({ loading:false, psd });
	},

	toggleLayer(layer) {
		layer.layer.visible = !layer.visible();
		this.forceUpdate();
	},

	highlightLayer(layer) {
		this.setState({ highlightedLayer: layer });
	},

	currentState() {
		if (this.state.loading) return 'loading';
		else if (this.state.psd) return 'ready';
		else return 'accepting';
	},

	render() {
		return (
			<div className={`application is-${this.currentState()}`}
			     onDragOver={this.enableFileDrop}
			     onDragEnter={this.enableFileDrop}
			     onDrop={this.dropFile}>
					{this.renderContent()}
			</div>
		);
	},

	renderContent() {
		return {
			accepting: this.renderAcceptor(),
			loading: this.renderLoader(),
			ready: this.renderApplication(),
		}[this.currentState()];
	},

	renderApplication() {
		return {
			preview: <Preview psd={this.state.psd}
			                  highlightedLayer={this.state.highlightedLayer} />,
			editor: <Editor psd={this.state.psd}
			                onHoverLayer={this.highlightLayer}
			                onLeaveLayer={this.highlightLayer}
			                onToggleLayer={this.toggleLayer} />,
		};
	},

	renderAcceptor() {
		return <div className="application--acceptor">
			Drop a PSD document here.
		</div>;
	},

	renderLoader() {
		return <div className="application--loader" />;
	},

});