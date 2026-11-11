import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Volume2, 
  Headphones, 
  Zap, 
  Radio, 
  Gamepad2, 
  Cable,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { getPopularProducts, getNewArrivals, getCategories } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  const popularProducts = getPopularProducts(4);
  const newArrivals = getNewArrivals(4);
  const categories = getCategories().filter((c) => c.id !== 'all');

  const categoryIcons: Record<string, any> = {
    wireless: Headphones,
    tws: Radio,
    gaming: Gamepad2,
    wired: Cable,
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 via-white to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-slate-200/50 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100/80 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-800/80 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-primary-500 animate-spin" />
                <span>2026-yilgi yangi avlod ovoz texnologiyasi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Mukammal Ovoz. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-500 to-violet-600">
                  Cheksiz Erkinlik.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Dunyoning yetakchi brendlaridan original simsiz, TWS va o&apos;yin quloqchinlari. Haqiqiy musiqani his eting va tashqi shovqinlarni unuting.
              </p>

              {/* Call to actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/catalog"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-bold text-base shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Katalogga o&apos;tish</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/catalog?category=wireless"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base border border-slate-200 dark:border-slate-800 shadow-sm transition-colors text-center"
                >
                  Simsiz modellar
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 dark:border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Original tovarlar</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">1 Yil</div>
                  <div className="text-xs text-slate-500 font-medium">Rasmiy kafolat</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">24 Soat</div>
                  <div className="text-xs text-slate-500 font-medium">Tez yetkazish</div>
                </div>
              </div>

            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-primary-500/20 via-indigo-500/10 to-transparent p-6 sm:p-10 flex items-center justify-center shadow-2xl border border-white/40 dark:border-slate-800">
                
                {/* Floating badge 1 */}
                <div className="absolute -top-4 -left-4 sm:top-6 sm:-left-6 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Faol shovqin so&apos;ndirish</div>
                    <div className="text-[11px] text-slate-500">ANC texnologiyasi</div>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">80+ Soat quvvat</div>
                    <div className="text-[11px] text-slate-500">Uzoq muddatli avtonomiya</div>
                  </div>
                </div>

                {/* Main Hero Product Image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/products/sony-wh-1000xm5.svg"
                    alt="Sony WH-1000XM5 Premium Quloqchin"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              Bo&apos;limlar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              O&apos;zingizga mos kategoriyani tanlang
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Barcha modellar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Headphones;
            return (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.id}`}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {cat.count} xil turdagi model
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR PRODUCTS (MASHHUR QULOQCHINLAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Eng ko&apos;p sotilgan
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                Mashhur quloqchinlar
              </h2>
            </div>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Katalogda ko&apos;rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-widest">
                Maxsus Aksiya
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Sony va Marshall quloqchinlariga <br />
                <span className="text-primary-400">20% gacha chegirma!</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Yilning eng yaxshi narxlari bilan sevimli musiqangizni yangicha darajada tinglang. Chegirma muddati cheklangan!
              </p>
              <div className="pt-2">
                <Link
                  href="/catalog?brand=Sony"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm transition-colors shadow-lg"
                >
                  <span>Aksiyadagi modellarni ko&apos;rish</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60">
                <Image
                  src="/images/products/marshall-major-iv.svg"
                  alt="Marshall Major IV chegirma"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS (YANGI MODELLAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Yangi kelganlar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Top reytingdagi modellar
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Barchasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE US (AFZALLIKLAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Nega aynan biz?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Quloqchin.uz do&apos;konining afzalliklari
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Rasmiy kafolat</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Barcha quloqchinlar rasmiy zavod kafolatiga ega. Nosozlik aniqlangan taqdirda darhol yangisiga almashtirib beriladi.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Tezkor yetkazib berish</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Toshkent shahri bo&apos;ylab buyurtma qilingan kunning o&apos;zida kuryer orqali eshikkacha xavfsiz yetkaziladi.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Sinab ko&apos;rish imkoniyati</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Kuryer yetkazganda quloqchinni ochib, ovoz sifatini tekshirib ko&apos;rib, keyin to&apos;lov qilishingiz mumkin.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
