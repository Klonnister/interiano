export interface OrderBy {
  title?: 'asc' | 'desc';
  trademark?: { name: 'asc' | 'desc' };
  category?: { name: 'asc' | 'desc' };
  price?: 'asc' | 'desc';
}
