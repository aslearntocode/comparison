import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { creditCards, type CreditCard } from '@/app/data/creditCards';
import Link from 'next/link';
import creditFees from '../credit_fees.json';
import rewardsConversion from '../rewards_conversion.json';

interface CreditFee {
  card_name: string;
  joining_fee: number;
  annual_fee: number;
  annual_fee_waiver_criteria: number;
  is_lifetime_free: number;
}

interface RewardConversion {
  bank: string;
  reward_program: string;
  conversion_value: string;
  notes: string;
  highest_value: string;
}

export default function FeeAndRewardsCarousel() {
  const [activeSection, setActiveSection] = useState<'fee' | 'rewards'>('fee');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number}>({top: 0, left: 0, width: 0});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-rotate sections every 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && !isUserInteracting) {
      interval = setInterval(() => {
        setActiveSection(prev => prev === 'fee' ? 'rewards' : 'fee');
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isUserInteracting]);

  // Helper to find fee info by card name
  const getFeeInfo = (card: CreditCard): CreditFee | undefined => {
    if (!card?.name) return undefined;
    return (creditFees as CreditFee[]).find(fee => 
      fee.card_name?.trim().toLowerCase() === card.name.trim().toLowerCase()
    );
  };

  const getFeeWaiverInfo = (card: CreditCard) => {
    const feeWaiverInfo = [];
    const feeInfo = getFeeInfo(card);

    if (feeInfo) {
      if (feeInfo.is_lifetime_free === 1) {
        feeWaiverInfo.push({ type: 'Fee Waiver', criteria: 'Lifetime Free' });
      } else if (feeInfo.annual_fee_waiver_criteria > 0) {
        feeWaiverInfo.push({ type: 'Fee Waiver', criteria: `Annual fee waived on spend of ₹${feeInfo.annual_fee_waiver_criteria.toLocaleString('en-IN')}` });
      } else {
        feeWaiverInfo.push({ type: 'Fee Waiver', criteria: 'Fee Cannot be Waived' });
      }
    }
    return feeWaiverInfo;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsUserInteracting(true);
    setIsAutoPlaying(false);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    if (activeSection === 'fee') {
      const results = creditCards.filter(card => {
        const searchableText = `
          ${card.name.toLowerCase()} 
          ${card.bank.toLowerCase()} 
          ${card.categories.join(' ').toLowerCase()}
        `.replace(/\s+/g, ' ').trim();

        return searchTerms.every(term => searchableText.includes(term));
      }).sort((a, b) => {
        const scoreCard = (card: CreditCard, term: string) => {
          let score = 0;
          const termLower = term.toLowerCase();
          
          if (card.name.toLowerCase().includes(termLower)) score += 10;
          if (card.bank.toLowerCase().includes(termLower)) score += 8;
          if (card.categories.some(f => f.toLowerCase().includes(termLower))) score += 5;
          
          return score;
        }

        const scoreA = searchTerms.reduce((sum, term) => sum + scoreCard(a, term), 0);
        const scoreB = searchTerms.reduce((sum, term) => sum + scoreCard(b, term), 0);
        
        return scoreB - scoreA;
      });

      setSearchResults(results);
    } else {
      const results = (rewardsConversion as RewardConversion[]).filter(conversion => {
        const searchableText = `
          ${conversion.bank.toLowerCase()} 
          ${conversion.reward_program.toLowerCase()}
        `.replace(/\s+/g, ' ').trim();

        return searchTerms.every(term => searchableText.includes(term));
      }).sort((a, b) => {
        const scoreConversion = (conversion: RewardConversion, term: string) => {
          let score = 0;
          const termLower = term.toLowerCase();
          
          if (conversion.bank.toLowerCase().includes(termLower)) score += 10;
          if (conversion.reward_program.toLowerCase().includes(termLower)) score += 8;
          
          return score;
        }

        const scoreA = searchTerms.reduce((sum, term) => sum + scoreConversion(a, term), 0);
        const scoreB = searchTerms.reduce((sum, term) => sum + scoreConversion(b, term), 0);
        
        return scoreB - scoreA;
      });

      setSearchResults(results);
    }
  };

  // Calculate dropdown position after render
  const updateDropdownPos = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  // Update dropdown position when searching
  useEffect(() => {
    if (isSearching && searchResults.length > 0) {
      updateDropdownPos();
    }
  }, [isSearching, searchResults.length]);

  const handleSectionClick = (section: 'fee' | 'rewards') => {
    setActiveSection(section);
    setIsUserInteracting(true);
    setIsAutoPlaying(false);
    // Clear search state when switching tabs
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
    setIsAutoPlaying(true);
  };

  return (
    <div className="relative py-16 bg-[#f5f6fd] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Grid background pattern */}
      <div aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-white p-1 shadow-sm">
            <button
              onClick={() => handleSectionClick('fee')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'fee'
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              Fee Waiver Criteria
            </button>
            <button
              onClick={() => handleSectionClick('rewards')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'rewards'
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              Reward Points Conversion
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-[2.2rem] font-bold mb-2">
            {activeSection === 'fee' ? 'Credit Card Fee Waiver Criteria' : 'Reward Points Conversion Rates'}
          </h2>
          <p className="text-base text-gray-600">
            {activeSection === 'fee' 
              ? 'Find out if your credit card offers annual fee waiver based on spending criteria'
              : 'Find out how much your reward points are worth across different banks'
            }
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={activeSection === 'fee' ? "Search for your credit card..." : "Search for your bank..."}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Dropdown rendered in a portal */}
            {isSearching && searchResults.length > 0 && typeof window !== 'undefined' && createPortal(
              <div
                key="search-dropdown"
                className="absolute z-[9999] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: dropdownPos.width,
                  position: 'absolute',
                }}
              >
                {searchResults.map((result, index) => (
                  activeSection === 'fee' ? (
                    <Link
                      key={`fee-${result.id || index}`}
                      href={`/credit/${result.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{result.name}</div>
                      <div className="text-sm text-gray-500">{result.bank}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Fees:</span> Joining: {result.joiningFee}, Annual: {result.annualFee}
                      </div>
                      {getFeeWaiverInfo(result).length > 0 ? (
                        <div className="mt-2 space-y-1">
                          {getFeeWaiverInfo(result).map((info, idx) => (
                            <div key={`fee-info-${idx}`} className="text-sm">
                              <span className="text-green-600 font-medium">{info.type}:</span>{' '}
                              <span className="text-gray-700">{info.criteria}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 mt-1">
                          No fee waiver information available
                        </div>
                      )}
                    </Link>
                  ) : (
                    <div
                      key={`rewards-${result.bank}-${index}`}
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{result.bank}</div>
                      <div className="text-sm text-gray-500">{result.reward_program}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Conversion Value:</span> {result.conversion_value}
                      </div>
                      {result.highest_value && (
                        <div className="text-sm text-green-600 mt-1">
                          <span className="font-medium">Best Value:</span> {result.highest_value}
                        </div>
                      )}
                      {result.notes && (
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Notes:</span> {result.notes}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>,
              document.body
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 