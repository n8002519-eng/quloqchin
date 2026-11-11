import Link from 'next/link';
import { Headphones, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-md">
        <Headphones className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary-600">404 Xatolik</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Sahifa topilmadi
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Kechirasiz, siz qidirayotgan mahsulot yoki sahifa mavjud emas yoki boshqa manzilga ko&apos;chirilgan bo&apos;lishi mumkin.
        </p>
      </div>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
}
