import { ARTICLES } from '../data/articles';
import { useNavigation } from '../context/NavigationContext';
import { Clock, ArrowLeft, Share2, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface JournalDetailPageProps {
  slug?: string;
}

export function JournalDetailPage({ slug }: JournalDetailPageProps) {
  const { navigate } = useNavigation();
  const [copied, setCopied] = useState(false);

  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextArticle = ARTICLES.find((a) => a.slug !== article.slug) || ARTICLES[0];

  return (
    <div className="py-12 bg-[#07060A] min-h-screen text-[#F7F1E3] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation & Share */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#D6B25E]/20 text-xs">
          <button
            onClick={() => navigate('journal')}
            className="text-[#A89F91] hover:text-[#F6E3A3] flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-[#D6B25E]" />
            <span>Return to Nocturne Gazette</span>
          </button>

          <button
            onClick={handleShare}
            className="text-[#A89F91] hover:text-[#F6E3A3] flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#D6B25E]" />
                <span className="text-[#D6B25E]">Dispatch Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Dispatch</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#8A7F73]">
            <span className="uppercase font-semibold tracking-wider text-[#D6B25E]">
              {article.category}
            </span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </div>
            <span>·</span>
            <span>{article.publishedAt}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#F7F1E3] font-normal leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#C8C2B5] font-light leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#121016] border border-[#D6B25E]/40 flex items-center justify-center text-[#F6E3A3] text-xs font-serif">
              {article.author.name.charAt(0)}
            </div>
            <div className="text-left text-xs">
              <p className="font-medium text-[#F7F1E3]">{article.author.name}</p>
              <p className="text-[#7A7268]">{article.author.role}</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-12 aspect-16/9 rounded-sm overflow-hidden shadow-2xl border border-[#D6B25E]/30">
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
          />
        </div>

        {/* Article Prose Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-[#C8C2B5] font-light text-base leading-relaxed border-b border-[#D6B25E]/20 pb-12">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'text-lg text-[#F7F1E3] font-normal leading-relaxed' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Next Read Footer */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D6B25E]">
              Next Atelier Dispatch
            </span>
            <h4 className="font-serif text-xl text-[#F7F1E3] font-normal">
              {nextArticle.title}
            </h4>
          </div>
          <button
            onClick={() => navigate('journal-detail', { slug: nextArticle.slug })}
            className="px-6 py-3 bg-[#121016] hover:bg-[#1A1722] text-[#F6E3A3] border border-[#D6B25E]/40 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Continue Reading →
          </button>
        </div>
      </div>
    </div>
  );
}
