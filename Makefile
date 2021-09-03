.PHONY: install
install: node_modules
	npm i

.PHONY: start
start:
	npm start

.PHONY: clean
clean:
	rm -rf node_modules .cache dist

.PHONY: lint
lint: install
	npm run lint -- --fix
