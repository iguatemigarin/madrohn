.PHONY: install
install:
	npm i

.PHONY: start
start:
	npm start

.PHONY: clean
clean:
	rm -rf node_modules .cache dist
