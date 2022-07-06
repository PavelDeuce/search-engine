const buildSearchEngine = (items) => {
  // eslint-disable-next-line no-unused-vars
  if (items.length === 0) return { search: (searchStr) => [] };

  return {
    search: (searchStr) => {
      const documentsIds = [];
      const byWords = items.map((item) => {
        const words = item.text.split(' ');
        return {
          id: item.id,
          words,
        };
      });

      byWords.forEach((item) => {
        item.words.forEach((word) => {
          const token = new RegExp(word, 'gi');
          const term = searchStr.match(token);
          if (term !== null && term.length >= 0) {
            documentsIds.push(item.id);
          }
        });
      });

      const byRelevance = documentsIds.reduce(
        (acc, id) => (acc[id] ? { ...acc, [id]: acc[id] + 1 } : { ...acc, [id]: 1 }),
        {},
      );
      const result = Object.entries(byRelevance)
        .map(([key, value]) => ({
          id: key,
          count: value,
        }))
        .sort((a, b) => (a.count <= b.count ? 1 : -1))
        .map((i) => i.id);

      return result;
    },
  };
};

export default buildSearchEngine;
