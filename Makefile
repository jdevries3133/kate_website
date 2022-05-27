DOCKER_ACCOUNT=jdevries3133
CONTAINER_NAME=jackdevries.com

TAG?=$(shell git describe --tags)
PREV_TAG=$(shell git describe --tags $(git rev-list --parents -n 1 HEAD) | tail -n 1)

# assuming the use of Docker hub, these constants need not be changed
CONTAINER=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(TAG)


.PHONY: deploy
deploy:
	terraform apply -auto-approve


.PHONY: push
push:
	docker buildx build --pull --platform linux/amd64 --push -t $(CONTAINER) .


.PHONY: check
check:
ifdef CI
	docker-compose up -d
endif
	yarn typecheck
	yarn test run
	yarn cypress


.PHONY: setup
setup:
	@# pulling the last container may grab cached layers
	docker pull $(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(PREV_TAG) || echo "could not pull $(PREV_TAG)"
	terraform init -input=false
	yarn install
