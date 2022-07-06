const findTermsWithCount = (searchingWord, items) => {
  const byWords = items.map((item) => {
    const words = item.text.split(' ');
    return { id: item.id, words };
  });

  return byWords
    .map((document) => {
      return document.words.reduce((terms, word) => {
        const token = new RegExp(word, 'gi');
        const term = searchingWord.match(token);
        if (term === null) return terms;
        return terms[document.id]
          ? { ...terms, [document.id]: [...terms[document.id], ...term] }
          : { ...terms, [document.id]: [...term] };
      }, {});
    })
    .filter((index) => Object.keys(index).length !== 0)
    .map((index) => {
      const [entries] = Object.entries(index);
      const [key, value] = entries;
      return { [key]: value.length };
    });
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
        termsWithCount
          .map((index) => Object.entries(index))
          .forEach(([entries]) => {
            const [key, value] = entries;
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
