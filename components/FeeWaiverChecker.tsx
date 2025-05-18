import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { creditCards, type CreditCard } from '@/app/data/creditCards';
import Link from 'next/link';
import creditFees from '../credit_fees.json';

interface CreditFee {
  card_name: string;
  joining_fee: number;
  annual_fee: number;
  annual_fee_waiver_criteria: number;
  is_lifetime_free: number;
}

export default function FeeWaiverChecker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CreditCard[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number}>({top: 0, left: 0, width: 0});

  // Helper to find fee info by card name (case-insensitive, trimmed)
  const getFeeInfo = (card: CreditCard): CreditFee | undefined => {
    return (creditFees as CreditFee[]).find(fee => fee.card_name.trim().toLowerCase() === card.name.trim().toLowerCase());
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
    } else {
      // Fallback to old logic if not found in JSON
      if (card.additionalDetails?.minimumSpend) {
        feeWaiverInfo.push({
          type: 'Annual Fee',
          criteria: card.additionalDetails.minimumSpend
        });
      }
      if (card.additionalDetails?.milestoneBenefits) {
        card.additionalDetails.milestoneBenefits.forEach(benefit => {
          const lowerBenefit = benefit.toLowerCase();
          if (lowerBenefit.includes('annual fee') || lowerBenefit.includes('renewal fee')) {
            const spendMatch = benefit.match(/₹\s*[\d,.]+/);
            if (spendMatch) {
              feeWaiverInfo.push({
                type: 'Milestone Benefit',
                criteria: benefit
              });
            }
          }
        });
      }
    }
    return feeWaiverInfo;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
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
  React.useEffect(() => {
    if (isSearching && searchResults.length > 0) {
      updateDropdownPos();
    }
    // eslint-disable-next-line
  }, [isSearching, searchResults.length]);

  return (
    <div className="relative py-16 bg-[#f5f6fd] overflow-hidden">
      {/* Grid background pattern */}
      <div aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-[2.2rem] font-bold mb-2">Credit Card Fee Waiver Criteria</h2>
          <p className="text-base text-gray-600">Find out if your credit card offers annual fee waiver based on spending criteria</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Ensure this parent is relative for z-index stacking context. If dropdown still goes behind, check for overflow:hidden/auto on parent containers. */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for your credit card..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* Dropdown rendered in a portal */}
            {isSearching && searchResults.length > 0 && typeof window !== 'undefined' && createPortal(
              <div
                className="absolute z-[9999] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: dropdownPos.width,
                  position: 'absolute',
                }}
              >
                {searchResults.map((card) => {
                  const feeWaiverInfo = getFeeWaiverInfo(card);
                  return (
                    <Link
                      key={card.id}
                      href={`/credit/${card.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{card.name}</div>
                      <div className="text-sm text-gray-500">{card.bank}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Fees:</span> Joining: {card.joiningFee}, Annual: {card.annualFee}
                      </div>
                      {feeWaiverInfo.length > 0 ? (
                        <div className="mt-2 space-y-1">
                          {feeWaiverInfo.map((info, index) => (
                            <div key={index} className="text-sm">
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
                  );
                })}
              </div>,
              document.body
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 