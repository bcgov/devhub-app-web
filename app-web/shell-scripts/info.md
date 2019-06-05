# Scripts

These scripts are helpers for pipeline/automation processes


## check-build.sh
this is a npm pre script hook for the `npm run test:e2e:ci`, it essentitally ensures gatsby has
a production build before running the test script

## unit-tests.sh

This is a wrapper around running npm tests that is called within the s2i assemble script