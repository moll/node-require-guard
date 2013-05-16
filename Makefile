love:
	@echo "Feel like makin' love."

test:
	@./node_modules/.bin/mocha --reporter dot

autotest:
	@./node_modules/.bin/mocha --watch --reporter spec

.PHONY: test autotest love
