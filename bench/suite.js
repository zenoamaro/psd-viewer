var benchmark = require('benchmark');
var lodash = require('lodash');

// Disable compilation to allow accessing
// the scope on Node.
benchmark.support.decompilation = false;

function header() {
	console.log('  ' + this.name);
}

function cycle(event) {
	console.log('    ' + event.target);
}

function complete() {
	var fastest = this.filter('fastest').pluck('name');
	console.log('    Fastest is ' + fastest + '\n');
}

function error(err) {
	throw err.target.error;
}

module.exports = function Suite(spec) {
	// Extract handlers
	var name = spec.name; delete spec.name;
	var setup = spec.setup; delete spec.setup;
	var teardown = spec.teardown; delete spec.teardown;
	//
	var s = new benchmark.Suite({
		name: name,
		setup: setup,
		teardown: teardown,
		onStart: header,
		onCycle: cycle,
		onError: error,
		onComplete: complete
	});
	//
	for (var rule in spec) {
		s.add(rule, spec[rule], {
			setup: setup,
			teardown: teardown
		});
	}
	s.run();
};