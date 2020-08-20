# Devhub Code Climate Integration

## Code Climate

The Devhub uses code climate for automated code review of test coverage and maintainability. Code climate is integrated with the Devhub
through Github Actions. It reads and interprets the code coverage reports and returns a pass/fail status back to github actions.

Within the devhub-app-web repo, Code climate is run every time a new pull request is opened and once for every commit to the branch associated 
with the pull request.

## Devhub Code Climate Report

[code climate report] (https://codeclimate.com/github/bcgov/devhub-app-web)

## Badges

<a href="https://codeclimate.com/github/bcgov/devhub-app-web/maintainability"><img src="https://api.codeclimate.com/v1/badges/491d841f5c1050020501/maintainability" /></a>

<a href="https://codeclimate.com/github/bcgov/devhub-app-web/test_coverage"><img src="https://api.codeclimate.com/v1/badges/491d841f5c1050020501/test_coverage" /></a>