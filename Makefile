DOCKER_COMPOSE := docker compose --env-file .env
DEV := $(DOCKER_COMPOSE) -f docker-compose.yaml

.PHONY: build
build:
	$(DEV) build --parallel

.PHONY: dev
dev:
	$(DEV) up

.PHONY: remove
remove:
	$(DEV) down --remove-orphans --rmi --volumes
