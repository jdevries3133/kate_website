SHELL=/bin/bash

DOCKER_ACCOUNT=jdevries3133
CONTAINER_NAME=kate_website

TAG?=$(shell git describe --tags)
PREV_TAG=$(shell git describe --tags $(git rev-list --parents -n 1 HEAD) | tail -n 1)

# assuming the use of Docker hub, these constants need not be changed
CONTAINER=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(TAG)


####
# Utility rules to help Kate author content
####

MERGE_ERR="There is a merge conflict that Jack needs to resolve! You can continue working but your changes will not be published."

.PHONY: wipe-working-tree
wipe-working-tree:
	git stash
	git checkout -b changes-after-$(shell git rev-parse HEAD) || git checkout -b changes-as-of-$(shell date)
	git stash pop
	git add -A
	git commit -m "working changes as of $(shell date)"
	git checkout main


.PHONY: publish
publish: update
	make fmt
	git add app/mdx/*
	git commit -m "publishing content from $(shell date)"
	git push
	make wipe-working-tree


.PHONY: update
update:
	git stash
	git pull --no-edit; \
		if [[ $$? != 0 ]]; then \
			git merge --abort; \
			echo "Something went wrong: can't combine Jack's changes with yours."; \
			exit 1; \
		fi
	git stash pop; \
		if [[ $$? != 0 ]]; then \
			echo "Something went wrong: can't combine Jack's changes with yours."; \
			echo "Do not fret: your change are saved but you can't see them anymore."; \
			exit 1; \
		fi



.PHONY: start
start:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		up -d


.PHONY: stop
stop:
	docker-compose down


.PHONY: logs
logs:
	docker-compose logs


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
	docker buildx build --pull --platform linux/amd64 --push -t $(CONTAINER) .


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
	yarn install
	terraform init -backend=false -input=false
endif
	terraform fmt -check
	terraform validate
	yarn prettiercheck
	yarn typecheck
	yarn test run
ifdef CI
	docker-compose up -d
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
