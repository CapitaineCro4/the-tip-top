.PHONY: up down prisma-migrate

up:
	docker-compose up --build

down:
	docker-compose down

prisma-migrate:
	docker-compose exec api yarn prisma:migrate

prisma-seed:
	docker-compose exec api yarn prisma:seed

pkg-install:
	@for arg in $(args); do \
		docker-compose exec api yarn add $$arg; \
	done

