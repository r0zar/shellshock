#!/usr/bin/env zx

// Setup
$.verbose = false;
require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const inquirer = require("inquirer");

// Parse arguments
let script = argv.script || argv._[1];
if (!script) {
  const lsResponse = await $`ls scripts/*.sh`;
  const scripts = lsResponse
    .toString()
    .split("\n")
    .filter((i) => i);
  await inquirer
    .prompt([{ type: "rawlist", choices: scripts, name: "script" }])
    .then((answers) => (script = answers.script))
    .catch(console.error);
}

// Run selected script
const resp = await $`zsh ${script}`;

// Log script output
const output = JSON.parse(resp.toString());
console.log(output);

// Run follow up action
const actions = require("./actions");
const action = argv.a || argv.action;
if (action) {
  actions[action](output);
}
