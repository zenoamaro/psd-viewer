/* @flow */

let defaults = {
	left:  0, right:  0,
	top:   0, bottom: 0,
	width: 0, height: 0,
};

export default function(layer, scale=1) {
	if (!layer) return defaults;
	let offset = layer.parent || defaults;
	return {
		left:   scale * (layer.left - offset.left),
		top:    scale * (layer.top - offset.top),
		width:  scale * (layer.width),
		height: scale * (layer.height),
	};
};
