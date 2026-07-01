.PHONY: build start

# Runs the development server
start:
	ng serve

# Runs tests
test:
	ng test

# Builds the project
build:
	ng build

# Stops the development server
stop:
	-npx kill-port 4200
