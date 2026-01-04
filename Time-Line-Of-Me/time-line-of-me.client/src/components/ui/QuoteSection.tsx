
import React, { useState, useEffect } from 'react';
import { QUOTES } from '../../utils/constants.js';

export const QuoteSection: React.FC = () => {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/20 to-gray-900/40 backdrop-blur-sm border border-amber-900/30 p-8 mb-8">
      <div className="absolute top-0 right-0 text-9xl text-amber-900/10 font-serif leading-none">
        "
      </div>
      <div className="relative">
        <p className="font-serif text-2xl md:text-3xl text-ivory mb-4 leading-relaxed italic">
          "{quote!.text}"
        </p>
        <p className="text-amber-400 text-lg">— {quote!.author}</p>
      </div>
    </div>
  );
};