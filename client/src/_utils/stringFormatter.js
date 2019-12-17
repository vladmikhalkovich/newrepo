import { categories } from '../constants/categories';

export const formatCategory = categoryKey => {
  if (!categoryKey.length) return;
  const item = categories.find(category => category.key === categoryKey);
  return Object.keys(item).length ? item.name : categoryKey;
};
