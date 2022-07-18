// @ts-check

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
