import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Trademark } from '@prisma/client';
import { TrademarkDTO, updateTrademarkDTO } from './dto/trademark.dto';

@Injectable()
export class TrademarksService {
  constructor(private prisma: PrismaService) {}

  getTrademarks(name: string): Promise<Trademark[]> {
    return this.prisma.trademark.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  getTrademarkById(id: number): Promise<Trademark> {
    return this.prisma.trademark.findUnique({
      where: { id },
    });
  }

  getTrademarkByName(name: string): Promise<Trademark> {
    return this.prisma.trademark.findFirst({
      where: { name },
    });
  }

  createTrademark(data: TrademarkDTO): Promise<Trademark> {
    return this.prisma.trademark.create({
      data: {
        name: data.name,
        image: data.image,
      },
    });
  }

  async updateTrademark(
    id: number,
    data: updateTrademarkDTO,
  ): Promise<Trademark> {
    const foundTrademark = await this.getTrademarkByName(data.name);

    if (foundTrademark) {
      if (foundTrademark.id !== id)
        throw new BadRequestException('Esta marca ya existe.');
    }

    return this.prisma.trademark.update({
      where: { id },
      data,
    });
  }

  deleteTrademark(id: number): Promise<Trademark> {
    return this.prisma.trademark.delete({
      where: { id },
    });
  }
}
