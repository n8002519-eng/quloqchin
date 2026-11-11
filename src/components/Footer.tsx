import Link from 'next/link';
import { 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Clock 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400">
      {/* Features strip */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Tezkor yetkazib berish</h4>
                <p className="text-xs text-slate-500">Toshkentda 24 soatda, viloyatlarga 2 kunda</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">100% Original kafolat</h4>
                <p className="text-xs text-slate-500">1 yillik rasmiy servis kafolati</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Oson qaytarish</h4>
                <p className="text-xs text-slate-500">14 kun ichida almashtirish yoki qaytarish</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">24/7 Qo&apos;llab-quvvatlash</h4>
                <p className="text-xs text-slate-500">Mutaxassislardan bepul konsultatsiya</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                Quloqchin<span className="text-primary-500">.uz</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              O&apos;zbekistondagi eng yirik audio va quloqchinlar ixtisoslashgan internet do&apos;koni. Original sifat, eng maqbul narxlar va professional xizmat.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="tel:+998901234567" 
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Telefon"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:info@quloqchin.uz" 
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-900 dark:text-white text-sm">Kategoriyalar</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=wireless" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Simsiz quloqchinlar
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=tws" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  TWS quloqchinlar
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=gaming" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  O&apos;yin quloqchinlari
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=wired" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Studiya va simli
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Barcha modellar
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-900 dark:text-white text-sm">Mashhur brendlar</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?brand=Sony" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Sony
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=Apple" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Apple
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=Marshall" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Marshall
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=HyperX" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  HyperX
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=Sennheiser" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Sennheiser
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-900 dark:text-white text-sm">Bog&apos;lanish</h5>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-1 shrink-0" />
                <span>Toshkent shahar, Amir Temur shox ko&apos;chasi, 42-uy</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-500 shrink-0" />
                <a href="tel:+998901234567" className="hover:underline">+998 (90) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                <span>support@quloqchin.uz</span>
              </li>
            </ul>

            {/* Payment badges */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400 block mb-2">Qabul qilinadigan to&apos;lovlar:</span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Payme</span>
                <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Click</span>
                <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Uzum</span>
                <span className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Naqd</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Quloqchin.uz. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Maxfiylik siyosati</Link>
            <Link href="/terms" className="hover:underline">Foydalanish qoidalari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
