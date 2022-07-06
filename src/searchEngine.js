const buildSearchEngine = (items) => {
  // eslint-disable-next-line no-unused-vars
  if (items.length === 0) return { search: (searchStr) => [] };

  return {
    search: (searchStr) => {
      const result = [];
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
          if (term !== null && term.length >= 0 && !result.includes(item.id)) {
            result.push(item.id);
          }
        });
      });

      return result;
    },
  };
};

export default buildSearchEngine;
