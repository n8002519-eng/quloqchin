import { Suspense } from 'react';
import { CatalogView } from './CatalogView';

export const metadata = {
  title: 'Katalog — Quloqchin.uz',
  description: 'Barcha turdagi sifatli quloqchinlar: simsiz, TWS, gaming, studiya modellari arzon narxlarda.',
};

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Katalog yuklanmoqda...</p>
      </div>
    }>
      <CatalogView />
    </Suspense>
  );
}
