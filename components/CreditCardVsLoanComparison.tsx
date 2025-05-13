import Link from 'next/link';
import { Card } from '@/components/ui/card';

const CreditCardVsLoanComparison = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16 p-0 m-0 relative">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:36px_36px] opacity-70"></div>
      {/* Top left diagonal blur */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-64 h-64"
        style={{
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="100%" style={{ filter: 'blur(10px)' }}>
          <defs>
            <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="16" stroke="#fff" strokeWidth="4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" fillOpacity="0.7" />
        </svg>
      </div>
      {/* Bottom right diagonal blur */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-64 h-64"
        style={{
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="100%" style={{ filter: 'blur(10px)' }}>
          <defs>
            <pattern id="diagonalLines2" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="16" stroke="#fff" strokeWidth="4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines2)" fillOpacity="0.7" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 p-0 m-0 relative">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative flex flex-col items-center text-center">
              {/* Soft radial glow, no hard box */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '120vw',
                  height: '80vh',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(255,255,255,0.0) 70%)',
                  zIndex: 0,
                }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-[2.2rem] font-bold text-gray-900 mb-4 leading-tight">
                  Should You Be Taking a Loan/Credit Card Or Not?
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                  Take our quick assessment to get personalized recommendations on whether you should be taking a loan or a credit card.
                </p>
                <Link
                  href="/credit-vs-loan-assessment"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors text-base"
                >
                  Start Assessment
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditCardVsLoanComparison; 