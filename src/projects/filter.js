export const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('sq').trim();
export function matchesProject(text, category, query, selected) {
  return (!selected || category === selected) && normalizeSearch(query).split(/\s+/).every(term => normalizeSearch(text).includes(term));
}
