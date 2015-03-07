/* @flow */

export default function getLayerId(layer) {
	if (!layer) return;
	let pos = layer.layer.layerEnd || 0;
	let path = layer.path();
	return `${pos}-${path}`;
};