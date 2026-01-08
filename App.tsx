
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
  MessageCircle,
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

const REVIEWS = [
  { name: "Khairul Nizam", city: "Shah Alam", text: "Dulu kencing manis 14.0, sekarang maintain 6.0. Ellojoy penyelamat gaya hidup saya.", stars: 5 },
  { name: "Siti Aminah", city: "Kuantan", text: "Anak-anak suka milo ais, saya letak 2 titis Ellojoy je. Rasa sebijik macam guna susu pekat!", stars: 5 },
  { name: "Dr. Ariffin", city: "Kuala Lumpur", text: "Sebagai doktor, saya syorkan Ellojoy. Purity gred tinggi & tiada kesan pahit 'aftertaste'.", stars: 5 }
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
    <div className="max-w-7xl mx-auto px-6 h-14 flex justify-between items-center">
      <div className="text-xl font-bold tracking-tight">ELLOJOY<span className="text-purple-500 italic font-black">.</span></div>
      <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-widest uppercase text-zinc-400">
        <a href="#problem" className="hover:text-white transition-colors">Masalah</a>
        <a href="#solution" className="hover:text-white transition-colors">Inovasi</a>
        <a href="#testimony" className="hover:text-white transition-colors">Bukti</a>
        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
      </div>
      <a href="#action" className="bg-purple-600 text-white px-5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-purple-500/20 active:scale-95">
        Dapatkan Diskaun 50%
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
    <section id="problem" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {HERO_PROBLEMS.map((p, i) => (
        <div 
          key={i} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src={p.image} className="w-full h-full object-cover zoom-bg" alt="Problem Context" />
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
            <span className="text-purple-500 font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm animate-pulse">Soalan Untuk Anda</span>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight text-balance">
              {p.question}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-12">
              {p.context}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#emphasize" className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 active:scale-95">
                Lihat Bahaya Gula <ChevronRight size={20} />
              </a>
              <a href="#action" className="bg-purple-600/20 backdrop-blur-xl border border-purple-500/30 text-purple-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-purple-600/40 transition-all flex items-center justify-center gap-2 active:scale-95">
                Pilih Pakej Sihat <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-10 z-30 flex gap-3">
        {HERO_PROBLEMS.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIdx(i)}
            className={`h-1 transition-all rounded-full ${i === idx ? 'w-10 bg-white' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};

const TrustBar: React.FC = () => (
  <div className="bg-zinc-900 border-b border-white/5 py-8 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
      <div className="flex items-center gap-3 font-bold text-sm tracking-widest"><ShieldCheck /> LULUS KKM</div>
      <div className="flex items-center gap-3 font-bold text-sm tracking-widest"><Zap /> HALAL JAKIM</div>
      <div className="flex items-center gap-3 font-bold text-sm tracking-widest"><CheckCircle2 /> GMP CERTIFIED</div>
      <div className="flex items-center gap-3 font-bold text-sm tracking-widest"><Activity /> LAB TESTED</div>
      <div className="flex items-center gap-3 font-bold text-sm tracking-widest"><Truck /> COD MALAYSIA</div>
    </div>
  </div>
);

const EmphasizeSection: React.FC = () => {
  const revealRef = useReveal();
  return (
    <section id="emphasize" className="py-32 bg-black text-white px-6">
      <div ref={revealRef} className="reveal max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-4 block">Kesan Nyata</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-balance">Gula Bukan Sekadar Manis. Ia Adalah <span className="text-red-600">Ketagihan</span>.</h2>
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">Malaysia adalah negara paling obes di Asia Tenggara. Punca utama? Tabiat mengambil 10-15 sudu gula putih setiap hari dalam minuman.</p>
            <div className="space-y-6">
               <div className="flex items-start gap-4 p-6 rounded-3xl bg-zinc-900 border border-white/5">
                  <AlertCircle className="text-red-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Keradangan Kronik</h4>
                    <p className="text-zinc-500 text-sm">Gula putih mencetuskan 'Inflammation' yang merosakkan sel darah dan organ dalaman tanpa rasa sakit.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-6 rounded-3xl bg-zinc-900 border border-white/5">
                  <Activity className="text-red-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Hati Berlemak (Fatty Liver)</h4>
                    <p className="text-zinc-500 text-sm">Fruktosa berlebihan ditukar menjadi lemak yang menyelubungi hati anda.</p>
                  </div>
               </div>
            </div>
            <div className="mt-12">
               <a href="#solution" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group">
                  Selesaikan Masalah Ini <ChevronRight className="group-hover:translate-x-1 transition-transform" />
               </a>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full" />
             <div className="relative bg-zinc-900 rounded-[3rem] p-12 border border-white/10 text-center">
                <div className="text-8xl font-black text-red-600 mb-4">12.5%</div>
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-sm">Rakyat Malaysia Menghidap<br/>Komplikasi Akibat Gula</p>
                <div className="mt-10 pt-10 border-t border-white/5 flex justify-center gap-10">
                   <div><div className="text-2xl font-bold">18.3%</div><div className="text-[10px] text-zinc-600 uppercase font-black">Diabetes</div></div>
                   <div><div className="text-2xl font-bold">30.0%</div><div className="text-[10px] text-zinc-600 uppercase font-black">Darah Tinggi</div></div>
                   <div><div className="text-2xl font-bold">50.1%</div><div className="text-[10px] text-zinc-600 uppercase font-black">Obesiti</div></div>
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
    <section id="solution" className="py-32 bg-white text-black overflow-hidden">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-purple-600 font-bold tracking-widest text-xs uppercase mb-4 block">Inovasi Generasi Baru</span>
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter">Upgrade Gaya Hidup.</h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">Tinggalkan gula pasir yang merbahaya. Nikmati Ellojoy Zero Gula – 600x lebih manis, 0 kalori, 100% nikmat.</p>
        </div>

        {/* Comparison Table for Conversion */}
        <div className="max-w-4xl mx-auto mb-32 grid grid-cols-1 md:grid-cols-2 gap-1 bg-zinc-100 rounded-[3rem] p-1 border border-zinc-200 overflow-hidden shadow-xl">
           <div className="bg-zinc-50 p-12 flex flex-col items-center">
              <span className="text-zinc-400 font-bold text-xs uppercase mb-4">Gula Putih</span>
              <div className="text-4xl font-black text-red-500 mb-8">BAD</div>
              <ul className="space-y-4 text-sm font-medium text-zinc-500">
                <li className="flex items-center gap-2"><Minus size={14}/> Tinggi Kalori</li>
                <li className="flex items-center gap-2"><Minus size={14}/> Naikkan Gula Darah</li>
                <li className="flex items-center gap-2"><Minus size={14}/> Punca Keradangan</li>
                <li className="flex items-center gap-2"><Minus size={14}/> Merosakkan Gigi</li>
              </ul>
           </div>
           <div className="bg-white p-12 flex flex-col items-center border-l border-zinc-200 relative">
              <div className="absolute top-6 right-8 bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">The Winner</div>
              <span className="text-purple-600 font-bold text-xs uppercase mb-4">Ellojoy Zero Gula</span>
              <div className="text-4xl font-black text-purple-600 mb-8">PERFECT</div>
              <ul className="space-y-4 text-sm font-bold text-zinc-900">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> 0 Kalori / 0 Karbo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Indeks Glisemik Sifar</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Anti-Inflammatory</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Selamat Seisi Keluarga</li>
              </ul>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div>
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600"><Zap size={32}/></div>
              <h4 className="text-2xl font-bold mb-4">Sangat Pekat</h4>
              <p className="text-zinc-500">Hanya 1 titis Ellojoy bersamaan dengan 2 sudu besar gula pasir.</p>
           </div>
           <div>
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600"><Heart size={32}/></div>
              <h4 className="text-2xl font-bold mb-4">Rasa Asli</h4>
              <p className="text-zinc-500">Tiada rasa pahit 'aftertaste' seperti pemanis murah lain di pasaran.</p>
           </div>
           <div>
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600"><ShieldCheck size={32}/></div>
              <h4 className="text-2xl font-bold mb-4">Tahan Lama</h4>
              <p className="text-zinc-500">Satu botol kecil 17ml membekalkan sehingga 680 titisan manis.</p>
           </div>
        </div>

        <div className="mt-20 text-center">
          <a href="#action" className="bg-black text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl active:scale-95 inline-flex items-center gap-3">
             Tukar Sekarang <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

const TestimonySection: React.FC = () => {
  const revealRef = useReveal();
  return (
    <section id="testimony" className="py-32 bg-black text-white px-6">
      <div ref={revealRef} className="reveal max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Apa Kata Pengguna Kami?</h2>
          <div className="flex justify-center gap-1 text-yellow-500 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
          <p className="text-zinc-500 text-lg">Lebih 50,000 unit telah terjual di seluruh Malaysia.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 flex flex-col justify-between hover:bg-zinc-900 transition-colors">
              <p className="text-lg italic text-zinc-300 leading-relaxed mb-10">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">{r.name[0]}</div>
                <div>
                  <h4 className="font-bold text-sm">{r.name}</h4>
                  <p className="text-xs text-zinc-500 uppercase font-black">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    <section id="faq" className="py-32 bg-zinc-50 text-black px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center tracking-tight">Soalan Lazim</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpen(i === open ? -1 : i)}
                className="w-full p-8 flex justify-between items-center text-left font-bold text-lg hover:bg-zinc-50 transition-colors"
              >
                {f.q} {open === i ? <Minus size={20}/> : <Plus size={20}/>}
              </button>
              {open === i && (
                <div className="px-8 pb-8 text-zinc-500 leading-relaxed animate-up">
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
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-pulse shadow-lg shadow-red-500/20">
              <Clock size={14}/> Tawaran Tamat Dalam: {formatTime(timeLeft)}
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-balance">Satu lagi perkara.</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-bold uppercase tracking-[0.2em]">Pilih Pakej Anda & Nikmati Free Shipping Hari Ini.</p>
          </div>
        )}

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
                    <span className="flex items-center gap-2"><ThumbsUp size={14}/> 100% Satisfaction</span>
                    <span className="flex items-center gap-2"><Truck size={14}/> COD Available</span>
                    <span className="flex items-center gap-2"><Lock size={14}/> Stripe Secure</span>
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

const FloatingWhatsApp: React.FC = () => (
  <a 
    href="https://wa.me/60123456789?text=Saya%20berminat%20dengan%20Ellojoy" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[90] bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform active:scale-90 group flex items-center gap-2"
  >
    <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500 font-bold text-sm whitespace-nowrap">Tanya Kami di WhatsApp</span>
    <MessageCircle size={28} />
  </a>
);

const Footer: React.FC = () => (
  <footer className="py-24 bg-black text-zinc-500 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="text-2xl font-black tracking-tight text-white mb-6 uppercase">ELLOJOY<span className="text-purple-500 italic">.</span></div>
        <p className="max-w-sm text-sm font-medium leading-relaxed">
          Pemanis Sucralose gred farmaseutikal terbaik di Malaysia. Misi kami adalah untuk mengubah gaya hidup rakyat Malaysia menjadi lebih sihat tanpa mengorbankan nikmat kemanisan.
        </p>
      </div>
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Navigasi</h5>
        <ul className="text-sm space-y-4">
          <li className="hover:text-white cursor-pointer transition-colors">Testimoni Pengguna</li>
          <li className="hover:text-white cursor-pointer transition-colors">Sijil Kelulusan</li>
          <li className="hover:text-white cursor-pointer transition-colors">Soalan Lazim (FAQ)</li>
        </ul>
      </div>
      <div>
        <h5 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Sokongan</h5>
        <ul className="text-sm space-y-4">
          <li className="hover:text-white cursor-pointer transition-colors">Hubungi WhatsApp</li>
          <li className="hover:text-white cursor-pointer transition-colors">Polisi Privasi</li>
          <li className="hover:text-white cursor-pointer transition-colors">Polisi Pemulangan</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.4em] px-6">
      &copy; {new Date().getFullYear()} Ellojoy International (Malaysia). PESTA Framework Strategy Applied.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="relative bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      <main>
        <HeroProblemSlider />
        <TrustBar />
        <EmphasizeSection />
        <SolutionSection />
        <TestimonySection />
        <ActionSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
