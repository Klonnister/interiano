import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPaginator } from 'prisma-extension-pagination';

const paginate = createPaginator({
  pages: {
    limit: 12,
    includePageCount: true,
  },
});

export const prisma = new PrismaClient().$extends({
  model: {
    category: {
      paginate,
    },
    trademark: {
      paginate,
    },
    product: {
      paginate,
    },
  },
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
