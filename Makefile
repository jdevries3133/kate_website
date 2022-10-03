SHELL=/bin/bash

DOCKER_ACCOUNT=jdevries3133
CONTAINER_NAME=kate_website

TAG?=$(shell git describe --tags)
PREV_TAG=$(shell git describe --tags HEAD~1)

CONTAINER=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(TAG)
PREV_CONTAINER=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(PREV_TAG)


####
# Utility rules to help Kate author content
####

MERGE_ERR="There is a merge conflict that Jack needs to resolve! You can continue working but your changes will not be published."
OK_MSG="All good, happy writing 😁"


.PHONY: start
start:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		up -d
	make ok


.PHONY: stop
stop:
	docker-compose down
	make ok


.PHONY: logs
logs:
	docker-compose logs

.PHONY: ok
ok:
	@echo $(OK_MSG)


.PHONY: _wipe-working-tree
_wipe-working-tree:
	git checkout -b changes-after-$(shell git rev-parse HEAD) || git checkout -b changes-as-of-$(shell date)
	git add -A
	git commit -m "working changes as of $(shell date)"
	git checkout main


.PHONY: reset
reset:
	@# wipe the working tree clean if there are any remaining unstaged changes
	git restore --staged .
	git diff --quiet --exit-code; \
	if [[ $$? -ne 0 ]]; then \
		make _wipe-working-tree; \
	fi


.PHONY: publish
publish: update
	make fmt
	@# ensure that any unintentional changes are not staged
	git restore --staged .
	git add app/mdx/*
	git add app/mdx/index.ts
	git commit -m "publishing content from $(shell date)"; \
	if [[ $$? == 0 ]]; then \
		git push; \
	else \
		echo "uh oh, there's nothing to publish. Do you have any changes?"; \
		exit 1; \
	fi
	make reset
	make ok


.PHONY: unpublish
unpublish:
	sh -c 'git revert $$(git rev-parse HEAD) --no-edit'
	git push
	echo "  ⚠️  WARNING: you should also go to github and cancel the in-progress workflow(s) ⚠️  "
	echo "Will open the browser in 3 seconds..."
	sleep 3
	open https://github.com/jdevries3133/kate_website/actions
	@# now, restore the working tree to its previous state, minus unintended
	@# changes
	make reset
	sh -c 'git revert $$(git rev-parse HEAD) --no-edit'
	git reset --soft HEAD~1
	git restore --staged .


.PHONY: update
update:
	git pull --no-edit; \
		if [[ $$? != 0 ]]; then \
			git merge --abort; \
			echo "Something went wrong: can't combine Jack's changes with yours."; \
			exit 1; \
		fi
	yarn install
	make ok


####
# Development and CI Rules
####


.PHONY: deploy
deploy:
ifdef CI
	terraform init -input=false
endif
	terraform apply -auto-approve


.PHONY: push
push:
	docker buildx build \
		--pull \
		--cache-from "type=local,src=cache/docker" \
		--cache-to "type=local,dest=cache/docker_new" \
		--platform linux/amd64 \
		--push \
		--tag $(CONTAINER) \
		.
	rm -rf cache/docker
	mv cache/docker_new cache/docker


.PHONY: build
build:
	docker buildx build \
		--pull \
		--cache-from "type=local,src=cache/docker" \
		--cache-to "type=local,dest=cache/docker_new" \
		--platform linux/amd64 \
		--load \
		--tag $(CONTAINER) \
		.
	rm -rf cache/docker
	mv cache/docker_new cache/docker


.PHONY: debug
debug:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		-f docker-compose.debug.yml \
		up -d


.PHONY: fmt
fmt:
	yarn format
	terraform fmt


.PHONY: check
check:
ifdef CI
	mkdir -p cache/yarn  # not sure if this is necessary...
	YARN_CACHE_FOLDER=cache/yarn yarn install
	terraform init -backend=false -input=false
endif
	terraform fmt -check
	terraform validate
	yarn prettiercheck
	yarn typecheck
	yarn test run
ifdef CI
	make build
	IMAGE=$(CONTAINER) docker-compose -f docker-compose.prebuild.yml up -d
endif
	make wait
	yarn cypress


.PHONY: wait
wait:
	@# wait for the app to startup in docker-compose, as indicated by it
	@# providing a response on `localhost:8000`.
	@while true; do \
		curl --silent --output /dev/null http://localhost:8000; \
		[ $$? == 0 ] && break; \
		sleep 5; \
		echo "awaiting server readiness"; \
		docker-compose logs | tail -n 50; \
	done
