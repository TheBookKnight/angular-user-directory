.PHONY: build start

# Runs the development server
start:
	ng serve

# Run lint
lint:
	ng lint

# Run lint fix
lint-fix:
	ng lint --fix

# Runs tests
test:
	ng test
	
# Runs E2E tests
e2e:
	npm run e2e

# Runs E2E tests with UI
e2e-ui:
	npm run e2e:ui

# Builds the project
build:
	ng build

# Stops the development server
stop:
	-npx kill-port 4200
