const findTermsWithCount = (searchingWord, items) => {
  const byWords = items.map((item) => {
    const words = item.text.split(' ');
    return {
      id: item.id,
      words,
    };
  });

  const documentsIds = byWords.flatMap((document) => {
    return document.words.reduce((ids, word) => {
      const token = new RegExp(word, 'gi');
      const term = searchingWord.match(token);
      return term !== null && term.length >= 0 ? [...ids, document.id] : ids;
    }, []);
  });

  return documentsIds.reduce(
    (termsCount, id) =>
      termsCount[id] ? { ...termsCount, [id]: termsCount[id] + 1 } : { ...termsCount, [id]: 1 },
    {},
  );
};

const buildSearchEngine = (items) => {
  // eslint-disable-next-line no-unused-vars
  if (items.length === 0) return { search: (searchStr) => [] };

  return {
    search: (searchStr) => {
      if (!searchStr.trim()) return [];

      const searchWords = searchStr.split(' ');

      const result = searchWords.reduce((acc, searchingWord) => {
        const termsWithCount = findTermsWithCount(searchingWord, items);

        Object.entries(termsWithCount).forEach(([key, value]) => {
          acc[key] = acc[key] ? acc[key] + value : value;
        });

        return acc;
      }, {});

      return Object.entries(result)
        .map(([key, value]) => ({
          id: key,
          count: value,
        }))
        .sort((a, b) => (a.count <= b.count ? 1 : -1))
        .map((i) => i.id);
    },
  };
};

export default buildSearchEngine;
