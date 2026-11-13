import { prisma } from '@/lib/db/prisma';

export interface CreateProductInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  assetFile?: string;
}

export class ProductService {
  async getAllProducts() {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    });
  }

  async getProductBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: { reviews: true },
    });
  }

  async createProduct(data: CreateProductInput) {
    return prisma.product.create({
      data,
    });
  }
}
