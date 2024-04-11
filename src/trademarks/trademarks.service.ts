import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Trademark } from '@prisma/client';
import { TrademarkDTO } from './dto/trademark.dto';
import { paginate } from 'src/prisma/helpers/paginator';

@Injectable()
export class TrademarksService {
  constructor(private readonly prisma: PrismaService) {}

  async getTrademarks(name: string, page: number) {
    return paginate(
      this.prisma.trademark,
      {
        where: {
          name: {
            contains: name,
          },
        },
      },
      {
        page,
      },
    );
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
      data,
    });
  }

  async updateTrademark(id: number, data: TrademarkDTO): Promise<Trademark> {
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
