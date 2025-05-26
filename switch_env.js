#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Get the environment type from command line
const args = process.argv.slice(2);
if (args.length !== 1 || !['local', 'production'].includes(args[0])) {
  console.error("Usage: node switch_env.js [local|production]");
  process.exit(1);
}

const envType = args[0];
const baseDir = __dirname;

// Define source and destination files
const sourceFile = path.join(baseDir, `.env.${envType}`);
const destFile = path.join(baseDir, '.env');

// Check if source file exists
if (!fs.existsSync(sourceFile)) {
  console.error(`Error: Environment file ${sourceFile} does not exist`);
  process.exit(1);
}

// Backup current .env file if it exists
if (fs.existsSync(destFile)) {
  const backupFile = path.join(baseDir, '.env.backup');
  fs.copyFileSync(destFile, backupFile);
  console.log(`Backed up current .env to ${backupFile}`);
}

// Copy the appropriate .env file
fs.copyFileSync(sourceFile, destFile);
console.log(`Successfully switched to ${envType} environment`);
console.log(`Copied ${sourceFile} to ${destFile}`);

console.log("\nEnvironment switched to " + envType + " mode.");
console.log("Please restart your development server for changes to take effect."); 