# Devhub Markdown Frontmatter Verifiers Action

Sifts through registry files inside of the `devhub-app-web` repository and validates the frontmatter
attributes for all markdown files 'sourced' by the registry.


## Development

The action is built using the `actions toolkit`. It leverages `webpack` to bundle and transpile assets into
the `dist` directory. On every commit, the action source code is bundled and added to your commit

### Testing

To test the application run `npm run test`. There is an action in `.github/workflows/devhub-markdown-test.yml` that will verify the unit tests for this actions are passing.

## Usage

```yaml
# a sample workflow inside of a job
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: ./.github/actions/devhub-markdown-frontmatter-verify
      env:
        GITHUB_TOKEN: ${{secrets.GITHUB_API_TOKEN}}
      with:
        repo: devhub-app-web
        owner: bcgov
        throttle: 500 # throttles api requests by 500ms defaults to 333ms
        throwOnError: false # defaults to false if not set,  otherwise  just prints error statements
```