.PHONY: build-getByIdFunction build-getByFilterFunction build-deleteByIdFunction build-putFunction build-updateByIdFunction build-RuntimeDependenciesLayer

build-getByIdFunction:
	npm install
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-getByFilterFunction:
	npm install
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-deleteByIdFunction:
	npm install
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-putFunction:
	npm install
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-updateByIdFunction:
	npm install
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"
