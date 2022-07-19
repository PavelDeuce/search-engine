// @ts-check

import { getTerms } from './utils.js';

/**
 * Build documents reverse index
 *
 * @param {{id: string, text: string}[]} documents Document's list
 * @returns {{term: string[], id: string} | {}} Reverse index dictionary
 */
export default (documents) => {
  const buildTermValue = (id, previous = []) => {
    const previousIdValue = previous.find((item) => item.id === id);

    if (!previousIdValue) return [...previous, { id, count: 1 }];

    const nextIdValue = { ...previousIdValue, count: previousIdValue.count + 1 };
    return previous.map((item) => (item.id === id ? nextIdValue : item));
  };

  return documents
    .flatMap(({ id, text }) => getTerms(text).map((term) => ({ term, id })))
    .reduce((dictionary, { term, id }) => {
      const previousTermValue = dictionary[term];
      const nextTermValue = buildTermValue(id, previousTermValue);

      return { ...dictionary, [term]: nextTermValue };
    }, {});
};
