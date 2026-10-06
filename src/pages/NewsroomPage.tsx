import React, { useState, useMemo } from 'react';
import { NewsArticle } from '../types';
import { Search, Calendar, Clock, ArrowRight, X, Newspaper, Share2, Tag } from 'lucide-react';

interface NewsroomPageProps {
  news: NewsArticle[];
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const NewsroomPage: React.FC<NewsroomPageProps> = ({ news, onShowToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = [
    'all',
    'Company News',
    'Product Updates',
    'Healthcare',
    'Careers',
    'Events',
  ];

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchTerm]);

  const handleShare = (article: NewsArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${article.title} - RELATION INDIA Newsroom (${window.location.origin})`
      );
      onShowToast('Article headline copied to clipboard for sharing!', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
          Official Media & Press
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          RELATION INDIA NEWSROOM
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Stay informed on company developments, healthcare initiatives, supply chain updates, and operational announcements from RELATION INDIA in Dhanbad, Jharkhand.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news by headline, topic or keyword..."
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-800 font-mono">{filteredNews.length}</strong> of{' '}
              <strong className="text-slate-800 font-mono">{news.length}</strong> articles
            </span>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              {/* Card visual banner */}
              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-400 text-xs">
                  <Newspaper className="w-4 h-4" />
                  <span className="font-semibold">{article.category}</span>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  {article.readTime}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShare(article)}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded"
                    title="Share article"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-3">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No news articles found</h3>
          <p className="text-xs text-slate-500">
            No items matched your current filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="text-xs text-teal-700 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Tag className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-semibold text-teal-700">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 font-display leading-tight">
                {activeArticle.title}
              </h2>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 italic leading-relaxed">
                {activeArticle.summary}
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4 pt-2">
                <p>{activeArticle.content}</p>
                <p className="text-xs text-slate-500 pt-4 border-t border-slate-100">
                  Published by RELATION INDIA Corporate Communications. At-Mantand, Post-Topchanchi, Dist-Dhanbad, Jharkhand, PIN 828402.
                </p>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleShare(activeArticle)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Headline</span>
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="py-1.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
