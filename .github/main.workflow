workflow "DevHub Unit Test Workflow" {
  on = "push"
  resolves = ["Install node dependencies."]
}

action "Install node dependencies." {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "--prefix app-web install"
}
