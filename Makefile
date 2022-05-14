DOCKER_ACCOUNT=jdevries3133
CONTAINER_NAME=jackdevries.com

TAG?=$(shell git describe --tags)

# assuming the use of Docker hub, these constants need not be changed
CONTAINER=$(DOCKER_ACCOUNT)/$(CONTAINER_NAME):$(TAG)


.PHONY: deploy
deploy: push
ifdef CI
	terraform init -input=false
endif
	terraform apply -auto-approve


.PHONY: push
push:
	docker buildx build --platform linux/amd64 --push -t $(CONTAINER) .
