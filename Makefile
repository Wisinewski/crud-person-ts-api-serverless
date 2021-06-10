build-getByIdFunction:
	npm install
	npm rebuild
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-getByFilterFunction:
	npm install
	npm rebuild
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-deleteByIdFunction:
	npm install
	npm rebuild
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-putFunction:
	npm install
	npm rebuild
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-updateByIdFunction:
	npm install
	npm rebuild
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif
