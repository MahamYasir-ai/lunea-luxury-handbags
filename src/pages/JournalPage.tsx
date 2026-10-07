import { ARTICLES } from '../data/articles';
import { useNavigation } from '../context/NavigationContext';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

export function JournalPage() {
  const { navigate } = useNavigation();

  return (
    <div className="py-12 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 border-b border-[#D6B25E]/20 pb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D6B25E] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E3A3]" />
            <span>The Nocturne Gazette</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F7F1E3] tracking-tight font-normal leading-tight">
            Dispatches on Form, Metal & Radiance
          </h1>
          <p className="text-sm text-[#A89F91] mt-3 leading-relaxed font-light">
            Essays on Parisian metallurgy, vegetable-tanned French boxcalf, nocturnal silhouette theory, and the poetry of enduring craftsmanship.
          </p>
        </div>

        {/* Featured First Article */}
        {ARTICLES.length > 0 && (
          <div
            onClick={() => navigate('journal-detail', { slug: ARTICLES[0].slug })}
            className="mb-16 bg-[#100E15] rounded-sm border border-[#D6B25E]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:border-[#D6B25E]/70 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto">
              <img
                src={ARTICLES[0].heroImage}
                alt={ARTICLES[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-[0.8] contrast-[1.1]"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#8A7F73]">
                  <span className="uppercase font-semibold tracking-wider text-[#D6B25E]">
                    {ARTICLES[0].category}
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{ARTICLES[0].readTime}</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F1E3] group-hover:text-[#F6E3A3] transition-colors leading-tight font-normal">
                  {ARTICLES[0].title}
                </h2>

                <p className="text-xs sm:text-sm text-[#C8C2B5] leading-relaxed font-light">
                  {ARTICLES[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D6B25E]/15 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#F7F1E3] font-medium">{ARTICLES[0].author.name}</p>
                  <p className="text-[10px] text-[#7A7268]">{ARTICLES[0].publishedAt}</p>
                </div>
                <span className="text-xs text-[#F6E3A3] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Essay →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.slice(1).map((art) => (
            <div
              key={art.id}
              onClick={() => navigate('journal-detail', { slug: art.slug })}
              className="bg-[#100E15] rounded-sm border border-[#D6B25E]/20 overflow-hidden cursor-pointer group hover:border-[#D6B25E]/60 transition-all flex flex-col justify-between shadow-md"
            >
              <div className="aspect-16/9 overflow-hidden">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 brightness-[0.75] contrast-[1.1]"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#D6B25E] font-medium">
                    {art.category} · {art.readTime}
                  </span>
                  <h3 className="font-serif text-xl text-[#F7F1E3] group-hover:text-[#F6E3A3] transition-colors font-normal">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#A89F91] line-clamp-2 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#D6B25E]/15 flex items-center justify-between text-xs text-[#7A7268]">
                  <span>{art.author.name}</span>
                  <span className="text-[#D6B25E] group-hover:translate-x-1 transition-transform">Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
