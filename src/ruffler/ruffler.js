#!/usr/bin/env node

const { readdir, readFile, writeFile } = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');
const chardet = require('chardet');

const log = console.log;
const args = process.argv;

// Check expected args
if (args.length < 4) {
  log(chalk`
{bold.blue Ruffler v1.0}
Scans a path tree for {italic ".html"} and {italic ".htm"} files, and injects the {italic ruffle.js} script if it detects that they include any reference to {italic ".swf"} files.
Usage:
  {bold node ruffler.js [path_to_scan] [levels_to_root]}
`);
  process.exit(1);
}

// Init variables
const pathToExplore = path.resolve(args[2]);
const baseLevels = Number(args[3]) | 0;
const basePathToRuffle = `${'../'.repeat(baseLevels)}ruffle/ruffle.js`;
let skipped = 0, ruffled = 0, invalid = 0, processed = 0;

// Waits for user answer to a question
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(question, answer => {
    rl.close();
    resolve(answer);
  }))
}

// Iterates the specified directory
function iterateDir(dir, pathToRuffle = basePathToRuffle) {
  return readdir(dir, { withFileTypes: true })
    .then(dirents => Promise.all([
      ...dirents
        .filter(d => /htm.?$/.test(d.name))
        .map(d => processFile(path.resolve(dir, d.name), pathToRuffle)),
      ...dirents
        .filter(d => d.isDirectory())
        .map(d => iterateDir(path.resolve(dir, d.name), `../${pathToRuffle}`))
    ]));
}

// Processes an HTML file
function processFile(file, pathToRuffle) {
  return readFile(file)
    .then(buffer => {
      const encoding = chardet.detect(buffer) === 'UTF-8' ? 'utf8' : 'latin1';
      const txt = buffer.toString(encoding);
      // Check if file should be processed
      if (!/\.swf/.test(txt)) {
        skipped++;
        log(chalk`{yellow File without ".swf":} ${file} {blue ${encoding}}`);
      }
      else if (/ruffle\.js/.test(txt)) {
        ruffled++;
        log(chalk`{yellow File already {italic ruffled}:} ${file}`);
      }
      else if (!/\<\/\s*head\s*\>/i.test(txt)) {
        invalid++;
        log(chalk`{red File without "{italic </head>}":} ${file}`);
      }
      else {
        processed++;
        log(chalk`{green Processing file:} ${file} {blue ${encoding}}`);
        return writeFile(
          file,
          txt.replace(/\<\/\s*head\s*\>/i, `<script src="${pathToRuffle}"></script>\r\n</head>`),
          { encoding }
        );
      }
    });
}

async function main() {

  log(chalk`Processing path tree: {green ${pathToExplore}}\nWith deep to root: {green ${baseLevels}}\n`);

  const answer = await askQuestion(chalk`{bold.yellow WARNING:} This program will modify the HTML files found on the specified path tree. Do you really want to do this? (y/n) `);
  if (!/y/i.test(answer))
    process.exit(0);

  await iterateDir(pathToExplore);

  total = skipped + ruffled + invalid + processed;
  log(chalk`{bold.blue ${total} HTML files found}`);
  skipped && log(chalk`{bold.blue ${skipped} files skipped}`);
  ruffled && log(chalk`{bold.blue ${ruffled} files already {italic ruffled}}`);
  invalid && log(chalk`{bold.blue ${invalid} invalid HTML files}`);
  log(chalk`{bold.blue ${processed} files processed}`);
}

// Call main process
try {
  main();
} catch (err) {
  log(chalk`{bold.red ERROR:} ${err}`);
}
