DOCS=./node_modules/.bin/jsdoc
NODE=node --harmony
LINT=./node_modules/.bin/eslint
TEST=./node_modules/.bin/mocha --harmony
TEST_DIRECT=./node_modules/.bin/_mocha
COVERAGE=$(NODE) ./node_modules/.bin/istanbul
BUILD=./node_modules/.bin/gulp

usage:
	@echo BROWSER
	@echo - build ......... builds and optimizes browser assets.
	@echo - watch ......... rebuilds on file change.
	@echo - serve ......... serves files and rebuilds on file change.
	@echo - clean ......... removes the built artifacts.
	@echo
	@echo META
	@echo - docs .......... compiles the docs from the sources.
	@echo - lint .......... lints the source.
	@echo - test .......... runs the unit tests.
	@echo - test-watch .... reruns the unit tests on file change.
	@echo - coverage ...... runs the coverage tests.
	@echo - benchmarks .... runs the benchmark suites.

lint:
	@$(LINT) src

test:
	@$(TEST) test/index

test-watch:
	@$(TEST) -bw -R min test/index

coverage:
	@$(COVERAGE) cover\
		$(TEST_DIRECT) -- -R dot test/index

benchmarks:
	@$(NODE) bench/index

travis:
	@$(LINT) src\
		&& $(COVERAGE) cover --report lcovonly \
			$(TEST_DIRECT) -- -R dot test/index \
		&& $(COVERAGE) check-coverage \
			--statements 80 \
			--functions 80 \
			--branches 80 \
			--lines 80

build:
	@$(BUILD) build

watch:
	@$(BUILD) watch

serve:
	@$(BUILD) serve

docs:
	@$(DOCS) --configure .jsdocrc

clean:
	@if [ -d coverage ]; then rm -r coverage; fi; \
	 if [ -d docs ]; then rm -r docs; fi; \
	 gulp clean

.PHONY: usage lint test test-watch coverage ci-travis \
        build watch serve docs clean
