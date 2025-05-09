import React, { useState } from 'react';
import { Card } from '@/types/card';

interface CardCalculatorProps {
  cards: Card[];
}

interface UsageInputs {
  monthlySpend: number;
  domesticLoungeVisits: number;
  internationalLoungeVisits: number;
  movieTickets: number;
  diningSpend: number;
  fuelSpend: number;
}

export const CardCalculator: React.FC<CardCalculatorProps> = ({ cards }) => {
  const [inputs, setInputs] = useState<UsageInputs>({
    monthlySpend: 0,
    domesticLoungeVisits: 0,
    internationalLoungeVisits: 0,
    movieTickets: 0,
    diningSpend: 0,
    fuelSpend: 0,
  });

  const calculateCardValue = (card: Card, inputs: UsageInputs) => {
    let totalValue = 0;
    
    // Convert fees to numbers
    const joiningFee = parseInt(card.joiningFee.replace(/[^0-9]/g, ''));
    const annualFee = parseInt(card.annualFee.replace(/[^0-9]/g, ''));
    
    // Calculate rewards value based on card's reward program
    let rewardRate = 0.02; // Default 2% reward rate
    if (card.additionalDetails?.rewardsProgram) {
      // Try to extract reward rate from rewards program description
      const matches = card.additionalDetails.rewardsProgram.match(/(\d+(?:\.\d+)?)%/);
      if (matches) {
        rewardRate = parseFloat(matches[1]) / 100;
      }
    }
    const annualRewards = inputs.monthlySpend * 12 * rewardRate;
    
    // Calculate lounge access value
    const domesticLoungeValue = inputs.domesticLoungeVisits * 2000; // Assuming ₹2000 per visit
    const internationalLoungeValue = inputs.internationalLoungeVisits * 5000; // Assuming ₹5000 per visit
    
    // Calculate movie benefits
    let movieBenefit = 0;
    if (card.additionalDetails?.movieBenefits) {
      const matches = card.additionalDetails.movieBenefits.match(/₹(\d+)/);
      if (matches) {
        const benefitPerTicket = parseInt(matches[1]);
        movieBenefit = inputs.movieTickets * benefitPerTicket;
      }
    }
    
    // Calculate dining benefits
    let diningBenefit = 0;
    if (card.additionalDetails?.diningPrivileges) {
      const matches = card.additionalDetails.diningPrivileges[0]?.match(/(\d+(?:\.\d+)?)%/);
      if (matches) {
        const diningCashback = parseFloat(matches[1]) / 100;
        diningBenefit = inputs.diningSpend * 12 * diningCashback;
      }
    }
    
    // Calculate fuel surcharge waiver
    let fuelBenefit = 0;
    if (card.additionalDetails?.fuelSurcharge) {
      const matches = card.additionalDetails.fuelSurcharge.match(/(\d+(?:\.\d+)?)%/);
      if (matches) {
        const fuelWaiver = parseFloat(matches[1]) / 100;
        fuelBenefit = inputs.fuelSpend * 12 * fuelWaiver;
      }
    }
    
    // Calculate welcome bonus value
    let welcomeBonus = 0;
    if (card.additionalDetails?.welcomeBonus) {
      const matches = card.additionalDetails.welcomeBonus.match(/₹(\d+)/);
      if (matches) {
        welcomeBonus = parseInt(matches[1]);
      }
    }
    
    totalValue = annualRewards + domesticLoungeValue + internationalLoungeValue + 
                 movieBenefit + diningBenefit + fuelBenefit + welcomeBonus - 
                 (joiningFee + annualFee);
    
    return totalValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const cardValues = cards.map(card => ({
    ...card,
    value: calculateCardValue(card, inputs)
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Credit Card Value Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Spend (₹)</label>
            <input
              type="number"
              name="monthlySpend"
              value={inputs.monthlySpend}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your monthly spend"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Domestic Lounge Visits (per year)</label>
            <input
              type="number"
              name="domesticLoungeVisits"
              value={inputs.domesticLoungeVisits}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Number of domestic lounge visits"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">International Lounge Visits (per year)</label>
            <input
              type="number"
              name="internationalLoungeVisits"
              value={inputs.internationalLoungeVisits}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Number of international lounge visits"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Movie Tickets (per year)</label>
            <input
              type="number"
              name="movieTickets"
              value={inputs.movieTickets}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Number of movie tickets"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Dining Spend (₹)</label>
            <input
              type="number"
              name="diningSpend"
              value={inputs.diningSpend}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your monthly dining spend"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Fuel Spend (₹)</label>
            <input
              type="number"
              name="fuelSpend"
              value={inputs.fuelSpend}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your monthly fuel spend"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Card Value Comparison</h3>
        <div className="space-y-4">
          {cardValues.map((card) => (
            <div key={card.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{card.name}</h4>
                  <p className="text-sm text-gray-600">{card.bank}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Annual Fee: {card.annualFee} | Joining Fee: {card.joiningFee}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ₹{card.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Annual Value</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 