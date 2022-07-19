// @ts-check

/**
 * TF-IDF: TF — term frequency, IDF — inverse document frequency
 *
 * @param {{id: string; count: number}} info Document word count
 * @param {{id: string; count: number}[]} documentsInfo Document's term count
 * @param {{id: string, text: string}[]} documents Document's list
 * @returns {number} Result value
 */
export default (info, documentsInfo, documents) => {
  const targetWordCount = info.count;
  const currentDoc = documents.find((doc) => doc.id === info.id);
  const allWordsCount = currentDoc.text.split(' ').length;
  const tf = targetWordCount / allWordsCount;

  const allDocsCount = documents.length;
  const targetDocsCount = documentsInfo.length;
  const idf = Math.log10(allDocsCount / targetDocsCount);

  return tf * idf;
};
