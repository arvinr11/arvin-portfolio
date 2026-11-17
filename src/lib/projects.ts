type Sortable = { data: { featured: boolean; order: number } };

/** Featured projects first, then ascending `order`. Returns a new array. */
export function sortProjects<T extends Sortable>(entries: readonly T[]): T[] {
  return [...entries].sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order,
  );
}
