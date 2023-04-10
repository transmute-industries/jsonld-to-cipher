const graph = require('./graph');
const documentLoader = require('../documentLoader');

const fs = require('fs');
const path = require('path');

it('sanity', async () => {
  const doc = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    'type': ['VerifiablePresentation'],
    'holder': 'did:example:555',
    'verifiableCredential': [
      {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        'type': ['VerifiableCredential'],
        'issuer': 'https://example.edu/issuers/111',
        'issuanceDate': '2010-01-01T19:23:24Z',
      },
      {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        'type': ['VerifiableCredential'],
        'issuer': 'https://example.edu/issuers/222',
      },
    ],
    'proof': {
      type: 'Ed25519Signature2018',
    },
  };
  const simple = await graph(doc, {
    id: 'urn:uuid:🔥',
    documentLoader,
  });
  // console.log(JSON.stringify(simple, null, 2));
  expect(simple).toBeDefined();
});

// required because of esm
afterAll(async () => {});
