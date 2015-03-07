psd-viewer ![](https://travis-ci.org/zenoamaro/psd-viewer.svg?branch=master)
============================================================================

**psd-viewer** is a simple viewer for photoshop documents, based on [psd.js].

Play with the [live demo].

[psd.js]: https://github.com/meltingice/psd.js
[live demo]: https://zenoamaro.github.io/psd-viewer/

1. [Quick start](#quick-start)
2. [Building and testing](#building-and-testing)
3. [Compatibility](#compatibility)
4. [Roadmap](#roadmap)
5. [Changelog](#changelog)
6. [License](#license)


Quick start
-----------
	git clone https://github.com/zenoamaro/psd-viewer.git
	cd psd-viewer/dist
	open index.html


Building and testing
--------------------
You can run the automated test suite:

	$ npm test

And re-build the distributable version of the source:

	$ npm run build

To run tasks in development mode simply set the environment:

	$ ENV=development npm run build

More tasks are available on the [Makefile](Makefile), including:

	docs: build docs from sources
	lint: lints the source
	test: runs the test specs
	coverage: runs the code coverage test


Compatibility
-------------
Mostly untested at this stage.


Roadmap
-------
- Add more inspection capabilities.
- Pure rendering.
- Failure modes.
- Tests.


Changelog
---------
#### v0.1.0
- Initial version

[Full changelog](CHANGELOG.md)


License
-------
The MIT License (MIT)

Copyright (c) 2015, zenoamaro <zenoamaro@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.