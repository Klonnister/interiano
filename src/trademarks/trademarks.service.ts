import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Trademark } from '@prisma/client';
import { updateTrademarkDTO } from './dto/trademark.dto';

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

  getTrademarkById(id: number): Promise<Trademark> {
    return this.prisma.trademark.findUnique({
      where: { id },
    });
  }

  createTrademark(data: Trademark): Promise<Trademark> {
    return this.prisma.trademark.create({
      data,
    });
  }

  updateTrademark(id: number, data: updateTrademarkDTO): Promise<Trademark> {
    return this.prisma.trademark.update({
      where: { id },
      data,
    });
  }

  deleteTrademark(id: number) {
    return this.prisma.trademark.delete({
      where: { id },
    });
  }
}
