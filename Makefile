default:
	@echo Pick a target, aim and fire!

test:
	@./node_modules/.bin/mocha --reporter dot

autotest:
	@./node_modules/.bin/mocha --watch --reporter spec

love:
	@echo "Feel like makin' love."

.PHONY: default test autotest love
