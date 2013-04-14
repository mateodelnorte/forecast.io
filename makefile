test:
	DEBUG= ./node_modules/.bin/mocha -R spec -t 5000

test-debug:
	DEBUG=forecast.io ./node_modules/.bin/mocha -R spec -t 5000

.PHONY: test
