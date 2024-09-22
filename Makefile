dist: dist/index.js
dist/index.js: $(wildcard src/*.ts) bun.lockb
	mkdir -p $(@D)
	bun build src/index.ts --target=node --outfile=dist/index.js --minify \
		--define "process.env.NODE_ENV='production'" \
		--external open \
		--external prompts \
		--external zod

bun.lockb: package.json
	bun install
	touch "$@"

.PHONY: all build clean dev format lint release test

all: dist

build: dist

clean:
	git clean -Xfd

dev:
	bun build src/index.ts --target=node --outfile=dist/index.js --watch

format:
	bunx biome format --write src/

lint:
	bunx biome lint src/
	bunx tsc

release:
	bunx bumpp

test:
	bun test
