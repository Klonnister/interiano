import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Trademark } from '@prisma/client';

@Injectable()
export class TrademarksService {
  constructor(private prisma: PrismaService) {}

  getTrademarks(name: string): Promise<Trademark[]> {
    if (name) {
      return this.prisma.trademark.findMany({
        where: { name },
      });
    } else {
      return this.prisma.trademark.findMany();
    }
  }

  getTrademarkById(id: number) {
    return this.prisma.trademark.findUnique({
      where: { id },
    });
  }
}
