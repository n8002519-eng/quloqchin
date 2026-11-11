import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductById, getRelatedProducts, products } from '@/lib/products';
import { ProductDetailsClient } from './ProductDetailsClient';

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductById(params.id);
  if (!product) {
    return {
      title: 'Mahsulot topilmadi — Quloqchin.uz',
    };
  }

  return {
    title: `${product.name} — Narxi va xususiyatlari | Quloqchin.uz`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.image }],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.category, 4);

  return <ProductDetailsClient product={product} relatedProducts={related} />;
}
