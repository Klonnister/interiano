export interface ProductOrder {
  name?: 'asc' | 'desc';
  trademark?: { name: 'asc' | 'desc' };
  category?: { name: 'asc' | 'desc' };
  price?: 'asc' | 'desc';
  created_at?: 'asc' | 'desc';
  updated_at?: 'asc' | 'desc';
}
