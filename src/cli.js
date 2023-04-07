#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');
const documentLoader = require('./documentLoader');

const lib = require('./index');

const readFile = (argv, argName) => {
  try {
    const file = fs
        .readFileSync(path.resolve(process.cwd(), argv[argName]))
        .toString();

    return file;
  } catch (e) {
    console.error('Cannot read from file: ' + argv[argName]);
    process.exit(1);
  }
};

const readJsonFromPath = (argv, argName) => {
  let value;
  if (argv[argName]) {
    try {
      const file = readFile(argv, argName);
      value = JSON.parse(file);
    } catch (e) {
      console.error('Cannot parse JSON from file: ' + argv[argName]);
      process.exit(1);
    }
  }
  return value;
};

yargs(hideBin(process.argv))
    .scriptName('jsonld-to-cypher')
    .command(
        'convert <document>',
        'transform a document into a cypher query',
        () => {},
        async (argv) => {
          const {type, sourceGraphId = false} = argv;
          let doc;
          // console.log(argv);
          let cypher = '';
          if (type === 'json') {
            doc = readJsonFromPath(argv, 'document');
            cypher = await lib.Cypher.fromDocument(doc, {
              documentLoader,
              sourceGraphId,
            });
          }
          // if (type === 'jws') {
          //   doc = readFile(argv, 'document');
          //   cypher = await lib.Cypher.fromJsonWebSignature(
          //       doc,
          //       {documentLoader, sourceGraphId},
          //   );
          // }
          console.log(cypher);
        },
    )
    .option('type', {
      alias: 't',
      describe: 'type of file',
      demandOption: true,
    })
    .demandCommand(1)
    .parse();
