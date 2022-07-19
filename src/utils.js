// @ts-check

/**
 * Get terms from string
 *
 * @param {string} text Any string
 * @returns {string[]} Terms collection
 */
export const getTerms = (text) => text.match(/\w+/g) ?? [];

/**
 * Merge term count of documents dictionary
 *
 * @param {{id: string; count: number}[]} documentsInfo Current merged documentInfo
 * @param {{id: string; count: number}} documentInfo Current documentInfo
 * @returns {{id: string; count: number}[]} Next merged documentsInfo
 */
export const mergeCount = (documentsInfo, { id, count }) => {
  const prevIdItem = documentsInfo.find((item) => item.id === id);

  if (!prevIdItem) return [...documentsInfo, { id, count }];

  const nextIdItem = { ...prevIdItem, count: prevIdItem.count + count };
  return documentsInfo.map((item) => (item.id === id ? nextIdItem : item));
};
