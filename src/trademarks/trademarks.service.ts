import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Trademark } from '@prisma/client';
import { TrademarkDTO } from './dto/trademark.dto';
import { paginate } from 'src/prisma/helpers/paginator';
import { unlinkSync } from 'fs';
import { isDeletablePath } from 'src/images/helpers/imagePathHelpers';

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

  async createTrademark(data: TrademarkDTO): Promise<Trademark> {
    try {
      return await this.prisma.trademark.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(
        'Se recibió información no esperada, por favo revise.',
      );
    }
  }

  async updateTrademark(id: number, data: TrademarkDTO): Promise<Trademark> {
    const foundTrademark = await this.getTrademarkByName(data.name);
    if (foundTrademark) {
      if (foundTrademark.id !== id)
        throw new BadRequestException('Esta marca ya existe.');
    }

    const trademark = await this.getTrademarkById(id);
    const previousImage = trademark.image;

    try {
      const updatedTrademark = await this.prisma.trademark.update({
        where: { id },
        data,
      });

      if (previousImage !== data.image && isDeletablePath(previousImage)) {
        unlinkSync(`./public${previousImage}`);
      }

      return updatedTrademark;
    } catch (error) {
      throw new BadRequestException(
        'Se recibió información no esperada. Por favor revise.',
      );
    }
  }

  deleteTrademark(id: number): Promise<Trademark> {
    return this.prisma.trademark.delete({
      where: { id },
    });
  }
}
