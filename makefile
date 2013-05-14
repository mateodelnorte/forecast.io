test:
	DEBUG= ./node_modules/.bin/mocha -R spec -t 5000

test-debug:
	DEBUG=forecast.io ./node_modules/.bin/mocha -R spec -t 5000

test-docs:
	DEBUG=coinbase* ./node_modules/.bin/mocha -R doc -t 5000 > docs/docs.html

test-markdown:
	DEBUG=coinbase* ./node_modules/.bin/mocha -R markdown -t 5000 > docs/docs.md
	
.PHONY: test
