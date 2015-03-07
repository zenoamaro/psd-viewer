/* @flow */

export default function(layer) {
	if (!layer) return;
	let pos = layer.layer.layerEnd || 0;
	let path = layer.path();
	return `${pos}-${path}`;
};