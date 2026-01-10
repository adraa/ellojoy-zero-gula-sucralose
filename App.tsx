
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Zap,
  Heart,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Lock,
  Package,
  Star,
  Plus,
  Minus,
  AlertCircle,
  Clock,
  ThumbsUp,
  HelpCircle,
  Truck,
  Loader2
} from 'lucide-react';

// --- Types & Data ---
const HERO_PROBLEMS = [
  {
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2000&auto=format&fit=crop",
    question: "Sering mengantuk lepas makan?",
    context: "Itu tanda 'Sugar Crash'. Badan anda sedang bergelut dengan insulin yang tidak stabil."
  },
  {
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop",
    question: "Risau bacaan gula mak ayah makin tinggi?",
    context: "Diabetes bukan sekadar angka. Ia adalah kualiti hidup insan paling kita sayangi."
  },
  {
    image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=2000&auto=format&fit=crop",
    question: "Diet dah ketat tapi perut tetap buncit?",
    context: "Gula tersembunyi dalam 'minuman sihat' harian adalah punca lemak degil di perut."
  }
];

const LIVE_STATS = {
  totalCustomers: 451,
  unitsSoldToday: 67,
  activeViewers: 47
};

const REVIEWS = [
  { name: "Khairul Nizam", city: "Shah Alam", text: "Dulu kencing manis 14.0, sekarang maintain 6.0. Ellojoy penyelamat gaya hidup saya.", stars: 5, verified: true, image: "KN" },
  { name: "Siti Aminah", city: "Kuantan", text: "Anak-anak suka milo ais, saya letak 2 titis Ellojoy je. Rasa sebijik macam guna susu pekat!", stars: 5, verified: true, image: "SA" },
  { name: "Dr. Ariffin", city: "Kuala Lumpur", text: "Sebagai doktor, saya syorkan Ellojoy. Purity gred tinggi & tiada kesan pahit 'aftertaste'.", stars: 5, verified: true, image: "DA" },
  { name: "Farah Lyana", city: "Penang", text: "Berat turun 8kg dalam 3 bulan! Semua sebab tukar gula putih kepada Ellojoy. Kopi pagi tetap nikmat.", stars: 5, verified: true, image: "FL" },
  { name: "Azman Hashim", city: "Johor", text: "Mak saya diabetes 20 tahun. Sekarang dia boleh minum teh tarik guna Ellojoy tanpa risau. Terima kasih!", stars: 5, verified: true, image: "AH" },
  { name: "Nur Izzati", city: "Kedah", text: "Dah habis 6 botol! Gunakan untuk baking kek, hasilnya superb. Anak cucu suka sangat.", stars: 5, verified: true, image: "NI" },
  { name: "Encik Rahman", city: "Melaka", text: "Saya guna untuk business kedai kopi. Pelanggan puji lagi sedap dari gula biasa. Secret weapon!", stars: 5, verified: true, image: "ER" },
  { name: "Mariam Saleh", city: "Terengganu", text: "Skin jadi lagi glowing lepas cut sugar. Ellojoy memang life changer untuk beauty routine saya.", stars: 5, verified: true, image: "MS" }
];

// --- Custom Hooks ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// --- Components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 w-full z-[100] glass-dark border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-14 flex justify-between items-center">
      <div className="text-lg md:text-xl font-bold tracking-tight">ELLOJOY<span className="text-purple-500 italic font-black">.</span></div>
      <div className="hidden md:flex gap-6 lg:gap-8 text-[11px] font-bold tracking-widest uppercase text-zinc-400">
        <a href="#problem" className="hover:text-white transition-colors">Masalah</a>
        <a href="#solution" className="hover:text-white transition-colors">Inovasi</a>
        <a href="#testimony" className="hover:text-white transition-colors">Bukti</a>
        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
      </div>
      <a href="#action" className="bg-purple-600 text-white px-4 md:px-5 py-2 md:py-1.5 rounded-full text-xs md:text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-purple-500/20 active:scale-95">
        Beli Sekarang!
      </a>
    </div>
  </nav>
);

const HeroProblemSlider: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(prev => (prev + 1) % HERO_PROBLEMS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="problem" className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden bg-black">
      {HERO_PROBLEMS.map((p, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src={p.image} className="w-full h-full object-cover zoom-bg" alt="Problem Context" />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-6 max-w-5xl mx-auto">
            <span className="text-purple-500 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-6 text-[10px] md:text-xs lg:text-sm animate-pulse">Soalan Untuk Anda</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight text-balance">
              {p.question}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-8 md:mb-12">
              {p.context}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
              <a href="#emphasize" className="bg-white text-black px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-base lg:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 active:scale-95">
                Lihat Bahaya Gula <ChevronRight size={20} className="hidden sm:inline" />
              </a>
              <a href="#action" className="bg-purple-600/20 backdrop-blur-xl border border-purple-500/30 text-purple-200 px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-base lg:text-lg hover:bg-purple-600/40 transition-all flex items-center justify-center gap-2 active:scale-95">
                Pilih Pakej Sihat <ArrowRight size={20} className="hidden sm:inline" />
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 md:bottom-10 z-30 flex gap-2 md:gap-3">
        {HERO_PROBLEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1 transition-all rounded-full ${i === idx ? 'w-8 md:w-10 bg-white' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};

const TrustBar: React.FC = () => (
  <div className="bg-zinc-900 border-b border-white/5 py-4 md:py-8 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
      <div className="flex items-center gap-2 md:gap-3 font-bold text-xs md:text-sm tracking-widest"><ShieldCheck size={14} className="md:w-6 md:h-6" /> LULUS KKM</div>
      <div className="flex items-center gap-2 md:gap-3 font-bold text-xs md:text-sm tracking-widest"><Zap size={14} className="md:w-6 md:h-6" /> HALAL JAKIM</div>
      <div className="flex items-center gap-2 md:gap-3 font-bold text-xs md:text-sm tracking-widest"><CheckCircle2 size={14} className="md:w-6 md:h-6" /> GMP CERTIFIED</div>
      <div className="flex items-center gap-2 md:gap-3 font-bold text-xs md:text-sm tracking-widest"><Activity size={14} className="md:w-6 md:h-6" /> LAB TESTED</div>
      <div className="flex items-center gap-2 md:gap-3 font-bold text-xs md:text-sm tracking-widest"><Truck size={14} className="md:w-6 md:h-6" /> COD MALAYSIA</div>
    </div>
  </div>
);

const LiveStatsBar: React.FC = () => {
  const [stats, setStats] = useState(LIVE_STATS);
  const [viewerFlicker, setViewerFlicker] = useState(false);
  const flickerTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalCustomers: prev.totalCustomers + Math.floor(Math.random() * 3),
        unitsSoldToday: prev.unitsSoldToday + (Math.random() > 0.7 ? 1 : 0),
        activeViewers: Math.max(25, prev.activeViewers + Math.floor(Math.random() * 5) - 2)
      }));
      setViewerFlicker(true);
      if (flickerTimeoutRef.current !== null) {
        clearTimeout(flickerTimeoutRef.current);
      }
      flickerTimeoutRef.current = window.setTimeout(() => {
        setViewerFlicker(false);
        flickerTimeoutRef.current = null;
      }, 300);
    }, 8000);

    return () => {
      clearInterval(interval);
      if (flickerTimeoutRef.current !== null) {
        clearTimeout(flickerTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-zinc-950 border-b border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl md:text-4xl font-black tracking-tighter text-white">
              {stats.totalCustomers.toLocaleString()}+
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Pelanggan Setia di Malaysia
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl md:text-4xl font-black tracking-tighter text-purple-500">
              {stats.unitsSoldToday}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Unit Terjual Hari Ini
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className={`text-3xl md:text-4xl font-black tracking-tighter text-green-500 transition-all ${viewerFlicker ? 'scale-110' : 'scale-100'}`}>
              {stats.activeViewers}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Sedang Melihat Sekarang
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmphasizeSection: React.FC = () => {
  const revealRef = useReveal();
  return (
    <section id="emphasize" className="py-16 md:py-24 lg:py-32 bg-black text-white px-4 md:px-6">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          <div>
            <span className="text-red-500 font-bold tracking-widest text-[10px] md:text-xs uppercase mb-3 md:mb-4 block">Kesan Nyata</span>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight text-balance">Gula Bukan Sekadar Manis. Ia Adalah <span className="text-red-600">Ketagihan</span>.</h2>
            <p className="text-base md:text-lg lg:text-xl text-zinc-400 mb-6 md:mb-8 leading-relaxed">Malaysia adalah negara paling obes di Asia Tenggara. Punca utama? Tabiat mengambil 10-15 sudu gula putih setiap hari dalam minuman.</p>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5">
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-base md:text-lg">Keradangan Kronik</h4>
                  <p className="text-zinc-500 text-sm">Gula putih mencetuskan 'Inflammation' yang merosakkan sel darah dan organ dalaman tanpa rasa sakit.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5">
                <Activity className="text-red-500 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-base md:text-lg">Hati Berlemak (Fatty Liver)</h4>
                  <p className="text-zinc-500 text-sm">Fruktosa berlebihan ditukar menjadi lemak yang menyelubungi hati anda.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-12">
              <a href="#solution" className="inline-flex items-center gap-2 text-sm md:text-base text-zinc-300 hover:text-white transition-colors group">
                Selesaikan Masalah Ini <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full" />
            <div className="relative bg-zinc-900 rounded-2xl md:rounded-[3rem] p-6 md:p-10 lg:p-12 border border-white/10 text-center">
              <div className="text-5xl md:text-6xl lg:text-8xl font-black text-red-600 mb-3 md:mb-4">12.5%</div>
              <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs md:text-sm">Rakyat Malaysia Menghidap<br />Komplikasi Akibat Gula</p>
              <div className="mt-6 md:mt-10 pt-6 md:pt-10 border-t border-white/5 flex justify-center gap-4 md:gap-6 lg:gap-10">
                <div><div className="text-xl md:text-2xl font-bold">18.3%</div><div className="text-[9px] md:text-[10px] text-zinc-600 uppercase font-black">Diabetes</div></div>
                <div><div className="text-xl md:text-2xl font-bold">30.0%</div><div className="text-[9px] md:text-[10px] text-zinc-600 uppercase font-black">Darah Tinggi</div></div>
                <div><div className="text-xl md:text-2xl font-bold">50.1%</div><div className="text-[9px] md:text-[10px] text-zinc-600 uppercase font-black">Obesiti</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection: React.FC = () => {
  const revealRef = useReveal();
  return (
    <section id="solution" className="py-16 md:py-24 lg:py-32 bg-white text-black overflow-hidden">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="text-purple-600 font-bold tracking-widest text-[10px] md:text-xs uppercase mb-3 md:mb-4 block">Inovasi Generasi Baru</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 tracking-tighter">Upgrade Gaya Hidup.</h2>
          <p className="text-base md:text-lg lg:text-xl text-zinc-500 max-w-2xl mx-auto">Tinggalkan gula pasir yang merbahaya. Nikmati Ellojoy Zero Gula – 600x lebih manis, 0 kalori, 100% nikmat.</p>
        </div>

        {/* Comparison Table for Conversion */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-24 lg:mb-32 grid grid-cols-1 md:grid-cols-2 gap-1 bg-zinc-100 rounded-2xl md:rounded-3xl lg:rounded-[3rem] p-1 border border-zinc-200 overflow-hidden shadow-xl">
          <div className="bg-zinc-50 p-6 md:p-10 lg:p-12 flex flex-col items-center">
            <span className="text-zinc-400 font-bold text-[10px] md:text-xs uppercase mb-3 md:mb-4">Gula Putih</span>
            <div className="text-2xl md:text-3xl lg:text-4xl font-black text-red-500 mb-6 md:mb-8">BAD</div>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium text-zinc-500">
              <li className="flex items-center gap-2"><Minus size={14} /> Tinggi Kalori</li>
              <li className="flex items-center gap-2"><Minus size={14} /> Naikkan Gula Darah</li>
              <li className="flex items-center gap-2"><Minus size={14} /> Punca Keradangan</li>
              <li className="flex items-center gap-2"><Minus size={14} /> Merosakkan Gigi</li>
            </ul>
          </div>
          <div className="bg-white p-6 md:p-10 lg:p-12 flex flex-col items-center border-t md:border-t-0 md:border-l border-zinc-200 relative">
            <div className="absolute top-4 md:top-6 right-4 md:right-8 bg-purple-600 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase">The Winner</div>
            <span className="text-purple-600 font-bold text-[10px] md:text-xs uppercase mb-3 md:mb-4">Ellojoy Zero Gula</span>
            <div className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-600 mb-6 md:mb-8">PERFECT</div>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-bold text-zinc-900">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> 0 Kalori / 0 Karbo</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Indeks Glisemik Sifar</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Anti-Inflammatory</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Selamat Seisi Keluarga</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 text-center">
          <div>
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-zinc-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-purple-600"><Zap size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" /></div>
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">Sangat Pekat</h4>
            <p className="text-sm md:text-base text-zinc-500">Hanya 1 titis Ellojoy bersamaan dengan 2 sudu besar gula pasir.</p>
          </div>
          <div>
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-zinc-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-purple-600"><Heart size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" /></div>
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">Rasa Asli</h4>
            <p className="text-sm md:text-base text-zinc-500">Tiada rasa pahit 'aftertaste' seperti pemanis murah lain di pasaran.</p>
          </div>
          <div>
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-zinc-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-purple-600"><ShieldCheck size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" /></div>
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:md-4">Tahan Lama</h4>
            <p className="text-sm md:text-base text-zinc-500">Satu botol kecil 17ml membekalkan sehingga 680 titisan manis.</p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 text-center">
          <a href="#action" className="bg-black text-white px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg lg:text-xl hover:scale-105 transition-all shadow-xl active:scale-95 inline-flex items-center gap-2 md:gap-3">
            Tukar Sekarang <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 50,
  pauseOnHover = true,
  direction = 'left'
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(30);
  const items = React.Children.toArray(children);
  const duplicatedItems = items.map((child, index) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { key: `dup-${index}` })
      : child
  );

  useEffect(() => {
    const calculateDuration = () => {
      if (contentRef.current) {
        const width = contentRef.current.scrollWidth;
        if (width > 0) {
          setDuration(width / speed);
        }
      }
    };

    calculateDuration();
    window.addEventListener('resize', calculateDuration);

    return () => {
      window.removeEventListener('resize', calculateDuration);
    };
  }, [speed]);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-6 ${pauseOnHover ? 'pause-animation' : ''}`}
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        <div ref={contentRef} className="flex gap-6 flex-shrink-0">
          {items}
        </div>
        <div className="flex gap-6 flex-shrink-0" aria-hidden="true">
          {duplicatedItems}
        </div>
      </div>
    </div>
  );
};

const TestimonySection: React.FC = () => {
  const revealRef = useReveal();
  return (
    <section id="testimony" className="py-32 bg-black text-white px-6 overflow-hidden">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Apa Kata Pengguna Kami?</h2>
          <div className="flex justify-center gap-1 text-yellow-500 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <p className="text-zinc-500 text-lg">Lebih 50,000 unit telah terjual di seluruh Malaysia.</p>
        </div>

        <Marquee speed={50} pauseOnHover={false} direction="left">
          {REVIEWS.map((r, i) => (
            <div key={i} className="w-[400px] flex-shrink-0 p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 flex flex-col justify-between hover:bg-zinc-900 transition-colors">
              <p className="text-lg italic text-zinc-300 leading-relaxed mb-10">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
                  {r.image || r.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{r.name}</h4>
                  <p className="text-xs text-zinc-500 uppercase font-black">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

const FAQSection: React.FC = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "Adakah ia mempunyai rasa pahit (aftertaste)?", a: "Tidak. Ellojoy menggunakan Sucralose gred farmaseutikal yang diproses khusus untuk mengekalkan rasa manis asli tebu tanpa sebarang rasa pahit selepas minum." },
    { q: "Adakah ia selamat untuk pesakit Diabetes?", a: "Sangat selamat. Ellojoy mempunyai Indeks Glisemik SIFAR, bermakna ia tidak akan menaikkan kadar gula dalam darah anda sedikitpun." },
    { q: "Berapa lama satu botol boleh bertahan?", a: "Satu botol 17ml mengandungi kira-kira 680 titisan. Jika anda minum 3 kali sehari dengan 2 titis setiap kali, ia boleh bertahan sehingga 3-4 bulan!" },
    { q: "Bagaimanakah cara menggunakannya?", a: "Sangat mudah. Anda hanya perlu titiskan ke dalam minuman (teh, kopi, milo) atau makanan. 1 titis sahaja sudah mencukupi untuk kemanisan yang setara dengan 2 sudu besar gula." },
    { q: "Adakah Ellojoy mempunyai sijil HALAL?", a: "Ya, Ellojoy dikilangkan di kilang yang mempunyai pensijilan GMP dan mematuhi piawaian HALAL yang ketat. Kami memastikan kualiti dan keselamatan tertinggi untuk pengguna Muslim." },
    { q: "Bolehkan saya gunakan Ellojoy untuk memasak atau membakar?", a: "Boleh! Ellojoy sangat stabil pada suhu tinggi. Anda boleh gunakannya untuk memasak lauk-pauk atau membakar kek dan biskut tanpa kehilangan rasa manisnya." },
    { q: "Adakah ia selamat untuk ibu mengandung atau menyusu?", a: "Ya, ia secara amnya selamat. Walau bagaimanapun, kami sentiasa menyarankan ibu mengandung atau menyusu untuk mendapatkan nasihat daripada doktor perubatan sebelum membuat sebarang pertukaran besar dalam diet harian." }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 bg-zinc-50 text-black px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-center tracking-tight">Soalan Lazim</h2>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl md:rounded-3xl border border-zinc-100 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpen(i === open ? -1 : i)}
                className="w-full p-5 md:p-6 lg:p-8 flex justify-between items-start md:items-center text-left font-bold text-sm md:text-base lg:text-lg hover:bg-zinc-50 transition-colors gap-3"
              >
                <span className="flex-1">{f.q}</span> {open === i ? <Minus size={18} className="shrink-0 mt-0.5 md:mt-0" /> : <Plus size={18} className="shrink-0 mt-0.5 md:mt-0" />}
              </button>
              {open === i && (
                <div className="px-5 md:px-6 lg:px-8 pb-5 md:pb-6 lg:pb-8 text-sm md:text-base text-zinc-500 leading-relaxed animate-up">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ActionSection: React.FC = () => {
  const [selected, setSelected] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState<'selection' | 'loading' | 'stripe' | 'success'>('selection');
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour urgency
  const revealRef = useReveal();

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const packs = [
    { id: 0, name: "Trial Pack", bottles: 1, price: 35, tag: "Permulaan" },
    { id: 1, name: "Premium Pack", bottles: 2, price: 65, tag: "Paling Popular", savings: "RM 5" },
    { id: 2, name: "Family Pack", bottles: 4, price: 110, tag: "Jimat Gila", savings: "RM 30" }
  ];

  const handleContinue = () => {
    setCheckoutStep('loading');
    setTimeout(() => {
      setCheckoutStep('stripe');
    }, 1500);
  };

  const handlePay = () => {
    setCheckoutStep('loading');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2500);
  };

  return (
    <section id="action" className="py-32 bg-white text-black">
      <div ref={revealRef} className="reveal max-w-5xl mx-auto px-6">
        {checkoutStep !== 'success' && (
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white px-8 py-4 rounded-3xl text-lg font-black uppercase tracking-widest mb-8 animate-pulse shadow-2xl shadow-red-500/30">
              <span className="text-3xl animate-pulse bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg" style={{ display: 'inline-flex', animation: 'swing 1s ease-in-out infinite' }}>⏰</span>
              <div className="flex items-center gap-3">
                <span>TAWARAN TAMAT DALAM:</span>
                <div className="flex gap-2">
                  <div className="bg-white text-red-600 px-4 py-2 rounded-xl font-black text-2xl min-w-[60px] text-center">
                    {Math.floor(timeLeft / 60)}
                  </div>
                  <div className="text-3xl font-black">:</div>
                  <div className="bg-white text-red-600 px-4 py-2 rounded-xl font-black text-2xl min-w-[60px] text-center">
                    {timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-balance">Satu lagi perkara.</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-bold uppercase tracking-[0.2em]">Pilih Pakej Anda & Nikmati Free Shipping Hari Ini.</p>
          </div>
        )}

        <CheckoutTrustBadges />

        {checkoutStep === 'selection' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {packs.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`cursor-pointer group p-8 rounded-[2.5rem] border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${selected === p.id ? 'border-purple-600 bg-purple-50 shadow-xl shadow-purple-500/10' : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 shadow-sm'}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selected === p.id ? 'border-purple-600 bg-purple-600 shadow-lg shadow-purple-500/30' : 'border-zinc-300'}`}>
                    {selected === p.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-widest">{p.tag}</span>
                    <h3 className="text-3xl font-black tracking-tighter">{p.name} ({p.bottles} Botol)</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black tracking-tighter">RM {p.price}.00</div>
                  {p.savings && <div className="text-xs font-black text-green-600 uppercase">JIMAT {p.savings}</div>}
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center pt-10">
              <button
                onClick={handleContinue}
                className="group px-16 py-6 bg-black text-white rounded-full font-black text-2xl hover:scale-105 transition-all flex items-center gap-4 shadow-2xl active:scale-95"
              >
                Teruskan Ke Bayaran <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>

              <div className="mt-12 flex flex-col items-center gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2"><ThumbsUp size={14} /> 100% Satisfaction</span>
                  <span className="flex items-center gap-2"><Truck size={14} /> COD Available</span>
                  <span className="flex items-center gap-2"><Lock size={14} /> Stripe Secure</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {checkoutStep === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-6">
            <Loader2 className="w-16 h-16 animate-spin text-purple-600" />
            <p className="text-xl font-bold animate-pulse">Menghubungkan ke Gateway Selamat...</p>
          </div>
        )}

        {checkoutStep === 'stripe' && (
          <div className="max-w-md mx-auto animate-up bg-white rounded-[3rem] p-10 border border-zinc-100 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div className="font-black text-xl tracking-tight">Stripe Checkout</div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-6 opacity-80" alt="Stripe" />
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 mb-2 block tracking-widest">Butiran Pakej</label>
                <div className="p-5 bg-zinc-50 rounded-2xl flex justify-between font-bold text-sm">
                  <span>{packs[selected].name}</span>
                  <span>RM {packs[selected].price}.00</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-zinc-100 flex items-center gap-3">
                  <CreditCard className="text-zinc-300" size={20} />
                  <input type="text" placeholder="Nombor Kad Kredit" className="bg-transparent w-full outline-none text-sm font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-zinc-100 font-medium text-sm"><input type="text" placeholder="MM/YY" className="bg-transparent w-full outline-none" /></div>
                  <div className="p-4 bg-white rounded-2xl border border-zinc-100 font-medium text-sm"><input type="text" placeholder="CVC" className="bg-transparent w-full outline-none" /></div>
                </div>
              </div>

              <button
                onClick={handlePay}
                className="w-full py-5 bg-purple-600 text-white rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95"
              >
                Bayar Sekarang RM {packs[selected].price}.00
              </button>
              <button onClick={() => setCheckoutStep('selection')} className="w-full text-zinc-400 text-xs font-bold uppercase py-2 hover:text-black transition-colors">Batal & Kembali</button>
            </div>
          </div>
        )}

        {checkoutStep === 'success' && (
          <div className="max-w-2xl mx-auto text-center py-20 animate-up">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-5xl font-black tracking-tighter mb-4">Terima Kasih!</h2>
            <p className="text-xl text-zinc-500 mb-10">Pesanan anda telah berjaya diterima. Sila semak e-mel anda untuk butiran penghantaran.</p>
            <button
              onClick={() => setCheckoutStep('selection')}
              className="bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              Kembali ke Laman Utama
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const CheckoutTrustBadges: React.FC = () => {
  return (
    <div className="mb-8 md:mb-12 flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 text-xs md:text-xs">
      <div className="flex items-center gap-2 text-zinc-400 justify-center md:justify-start">
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6">
            <path fill="#00861E" d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9m-6-8L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z" strokeWidth="0.5" stroke="#000" />
          </svg>
        </div>
        <span className="font-bold text-xs md:text-sm">Jaminan Wang Kembali 30 Hari</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-400 justify-center md:justify-start">
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6">
            <path fill="#003ddc" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3" strokeWidth="0.5" stroke="#000" />
          </svg>
        </div>
        <span className="font-bold text-xs md:text-sm">SSL Encrypted Payment</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-400 justify-center md:justify-start">
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6">
            <path fill="#7800da" d="M3 4a2 2 0 0 0-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5l-3-4h-3V4m-7 2l4 4l-4 4v-3H4V9h6m7 .5h2.5l1.97 2.5H17M6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5m12 0a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5" strokeWidth="0.5" stroke="#000" />
          </svg>
        </div>
        <span className="font-bold text-xs md:text-sm">Penghantaran Percuma</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-400 justify-center md:justify-start">
        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6">
            <path fill="#F54A00" fillRule="evenodd" d="M12 1.25c-.605 0-1.162.15-1.771.402c-.589.244-1.273.603-2.124 1.05L6.037 3.787c-1.045.548-1.88.987-2.527 1.418c-.668.447-1.184.917-1.559 1.554c-.374.635-.542 1.323-.623 2.142c-.078.795-.078 1.772-.078 3.002v.194c0 1.23 0 2.207.078 3.002c.081.82.25 1.507.623 2.142c.375.637.89 1.107 1.56 1.554c.645.431 1.481.87 2.526 1.418l2.068 1.085c.851.447 1.535.806 2.124 1.05c.61.252 1.166.402 1.771.402s1.162-.15 1.771-.402c.589-.244 1.273-.603 2.124-1.05l2.068-1.084c1.045-.549 1.88-.988 2.526-1.419c.67-.447 1.185-.917 1.56-1.554c.374-.635.542-1.323.623-2.142c.078-.795.078-1.772.078-3.001v-.196c0-1.229 0-2.206-.078-3.001c-.081-.82-.25-1.507-.623-2.142c-.375-.637-.89-1.107-1.56-1.554c-.645-.431-1.481-.87-2.526-1.418l-2.068-1.085c-.851-.447-1.535-.806-2.124-1.05c-.61-.252-1.166-.402-1.771-.402M8.77 4.046c.89-.467 1.514-.793 2.032-1.007c.504-.209.859-.289 1.198-.289c.34 0 .694.08 1.198.289c.518.214 1.141.54 2.031 1.007l2 1.05c1.09.571 1.855.974 2.428 1.356c.282.189.503.364.683.54l-3.331 1.665l-8.5-4.474zm-1.825.958l-.174.092c-1.09.571-1.855.974-2.427 1.356a4.7 4.7 0 0 0-.683.54L12 11.162l3.357-1.68l-8.206-4.318a.8.8 0 0 1-.206-.16M2.938 8.307c-.05.214-.089.457-.117.74c-.07.714-.071 1.617-.071 2.894v.117c0 1.278 0 2.181.071 2.894c.069.697.2 1.148.423 1.528c.222.377.543.696 1.1 1.068c.572.382 1.337.785 2.427 1.356l2 1.05c.89.467 1.513.793 2.031 1.007q.244.101.448.165v-8.663zm9.812 12.818q.204-.063.448-.164c.518-.214 1.141-.54 2.031-1.007l2-1.05c1.09-.572 1.855-.974 2.428-1.356c.556-.372.877-.691 1.1-1.068c.223-.38.353-.83.422-1.528c.07-.713.071-1.616.071-2.893v-.117c0-1.278 0-2.181-.071-2.894a6 6 0 0 0-.117-.74L17.75 9.963V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75z" clipRule="evenodd" strokeWidth="0.5" stroke="#000" />
          </svg>
        </div>
        <span className="font-bold text-xs md:text-sm">COD Tersedia</span>
      </div>
    </div>
  );
};

const StickyFloatingCTA: React.FC = () => {
  return (
    <div className="fixed bottom-2 md:bottom-4 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/95 to-transparent py-4 md:py-6 px-4 md:px-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
        <div className="text-center sm:text-left">
          <div className="text-lg md:text-xl lg:text-2xl font-black tracking-tight mb-0.5 md:mb-1">Ellojoy Zero Gula</div>
          <div className="text-xs md:text-sm text-zinc-400 font-bold">Dari RM35 • Free Shipping • 50% OFF Hari Ini</div>
        </div>
        <a
          href="#action"
          className="bg-purple-600 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-full font-black text-sm md:text-base lg:text-lg hover:scale-105 transition-all shadow-2xl shadow-purple-500/30 flex items-center gap-2 md:gap-3 whitespace-nowrap active:scale-95"
        >
          Pilih Pakej <ArrowRight size={18} className="md:w-6 md:h-6" />
        </a>
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="py-12 md:py-16 lg:py-24 bg-black text-zinc-500 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
      <div className="md:col-span-2">
        <div className="text-xl md:text-2xl font-black tracking-tight text-white mb-4 md:mb-6 uppercase">ELLOJOY<span className="text-purple-500 italic">.</span></div>
        <p className="max-w-sm text-xs md:text-sm font-medium leading-relaxed">
          Pemanis Sucralose gred farmaseutikal terbaik di Malaysia. Misi kami adalah untuk mengubah gaya hidup rakyat Malaysia menjadi lebih sihat tanpa mengorbankan nikmat kemanisan.
        </p>
      </div>
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-widest text-white mb-4 md:mb-6">Navigasi</h5>
        <ul className="text-xs md:text-sm space-y-3 md:space-y-4">
          <li className="hover:text-white cursor-pointer transition-colors">Testimoni Pengguna</li>
          <li className="hover:text-white cursor-pointer transition-colors">Sijil Kelulusan</li>
          <li className="hover:text-white cursor-pointer transition-colors">Soalan Lazim (FAQ)</li>
        </ul>
      </div>
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-widest text-white mb-4 md:mb-6">Sokongan</h5>
        <ul className="text-xs md:text-sm space-y-3 md:space-y-4">
          <li className="hover:text-white cursor-pointer transition-colors">Hubungi WhatsApp</li>
          <li className="hover:text-white cursor-pointer transition-colors">Polisi Privasi</li>
          <li className="hover:text-white cursor-pointer transition-colors">Polisi Pemulangan</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 md:mt-16 lg:mt-24 pt-6 md:pt-8 lg:pt-10 border-t border-white/5 text-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] px-4 md:px-6">
      &copy; {new Date().getFullYear()} Ellojoy International (Malaysia). PESTA Framework Strategy Applied.
    </div>
  </footer>
);

export default function App() {
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const actionSection = document.getElementById('action');
          if (actionSection) {
            const rect = actionSection.getBoundingClientRect();
            setShowStickyButton(window.scrollY > 800 && rect.top > window.innerHeight);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      {showStickyButton && <StickyFloatingCTA />}
      <main className={showStickyButton ? 'pb-28' : undefined}>
        <HeroProblemSlider />
        <TrustBar />
        <LiveStatsBar />
        <EmphasizeSection />
        <SolutionSection />
        <TestimonySection />
        <ActionSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
