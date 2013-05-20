love:
	@echo "Feel like makin' love."

test:
	@./node_modules/.bin/mocha --reporter dot $(MOCHA_OPTS)

autotest:
	@./node_modules/.bin/mocha --watch --reporter spec $(MOCHA_OPTS)

.PHONY: love test autotest
