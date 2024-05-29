import { Category, Trademark } from '@prisma/client';

export interface ProductOptions {
  categories: Category[];
  trademarks: Trademark[];
}
