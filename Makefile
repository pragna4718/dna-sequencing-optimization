run:
	docker-compose -f devops/docker-compose.yml up --build

down:
	docker-compose -f devops/docker-compose.yml down

test:
	cd backend && pytest
	