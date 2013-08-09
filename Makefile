love:
	@echo "Feel like makin' love."

test:
	@node $(NODE_OPTS) ./node_modules/.bin/mocha -R dot $(MOCHA_OPTS)

spec: 
	@node $(NODE_OPTS) ./node_modules/.bin/mocha -R spec $(MOCHA_OPTS)

autotest:
	@node $(NODE_OPTS) ./node_modules/.bin/mocha -R spec --watch $(MOCHA_OPTS)

.PHONY: love test spec autotest
