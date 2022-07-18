// @ts-check

import buildReverseIndex from './buildReverseIndex.js';
import getTfIdf from './metrics/tfIdf.js';
import { getTerms, mergeCount } from './utils.js';

export default (documents) => {
  if (documents.length === 0) return { search: () => [] };

  const configureMeta = (info, documentsInfo, allDocuments) => ({
    ...info,
    meta: {
      tfIdf: getTfIdf(info, documentsInfo, allDocuments),
    },
  });

  const relevantSort = (info1, info2) => info2.meta.tfIdf - info1.meta.tfIdf;

  const search = (word) => {
    const queryTerms = getTerms(word);
    const dictionary = buildReverseIndex(documents);
    const documentsInfo = queryTerms
      .flatMap((term) => dictionary[term])
      .filter(Boolean)
      .reduce(mergeCount, []);

    return documentsInfo
      .map((info) => configureMeta(info, documentsInfo, documents))
      .sort(relevantSort)
      .map(({ id }) => id);
  };

  return { search };
};
