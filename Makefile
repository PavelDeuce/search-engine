install: install-deps

install-deps:
	npm ci

search-engine:
	node src/searchEngine.js

test:
	npm run test

test-coverage:
	npm run test-coverage

lint:
	npm run lint