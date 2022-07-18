// @ts-check

export const mergeCount = (documentInfo, { id, count }) => {
  const prevIdItem = documentInfo.find((item) => item.id === id);

  if (!prevIdItem) return [...documentInfo, { id, count }];

  const nextIdItem = { ...prevIdItem, count: prevIdItem.count + count };
  return documentInfo.map((item) => (item.id === id ? nextIdItem : item));
};

export const getTerms = (text) => text.match(/\w+/g) ?? [];
