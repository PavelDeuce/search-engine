# search-engine

[![Actions Status](https://github.com/PavelDeuce/js-algorithms-project-lvl1/workflows/hexlet-check/badge.svg)](https://github.com/PavelDeuce/js-algorithms-project-lvl1/actions)
[![Node CI](https://github.com/PavelDeuce/search-engine/actions/workflows/nodejs.yml/badge.svg)](https://github.com/PavelDeuce/search-engine/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/cde2a64a723e80822df0/maintainability)](https://codeclimate.com/github/PavelDeuce/search-engine/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cde2a64a723e80822df0/test_coverage)](https://codeclimate.com/github/PavelDeuce/search-engine/test_coverage)

## About

Search Engine that helps find the information by searched value

## Example

```
const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const docs = [doc1, doc2, doc3];

const searchEngine = buildSearchEngine(docs);
console.log(searchEngine.search('shoot at me')); // ['doc2', 'doc1']
```
