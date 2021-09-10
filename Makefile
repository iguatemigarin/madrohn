.PHONY: install
install:
	npm i

.PHONY: start
start: install
	npm start

.PHONY: clean
clean:
	rm -rf node_modules .cache dist

.PHONY: lint
lint: install
	npm run lint -- --fix

build: clean install
	rm -rf docs
	npm run build
	mv dist docs
	git add docs
	git commit -m '[automated] Build'
