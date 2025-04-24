import React from 'react';

interface RewardPointsCardProps {
  bank: string;
  cardId: string;
}

const RewardPointsCard: React.FC<RewardPointsCardProps> = ({ bank, cardId }) => {
  console.log('RewardPointsCard props:', { bank, cardId });

  // Define conversion rates for different banks
  const conversionRates = {
    'Axis Bank': {
      title: 'EDGE Points Value',
      icon: '💎',
      rates: [
        { category: 'Vouchers & Products', value: '₹0.20' },
        { category: 'Air Miles', value: '₹0.25' },
        { category: 'Premium Hotels', value: '₹0.30' },
        { category: 'Premium Flights', value: '₹0.35' }
      ],
      proTip: 'Maximize value by redeeming for premium travel bookings (₹0.35/point)'
    },
    'HDFC Bank': {
      title: 'Reward Points Value',
      icon: '🎯',
      rates: [
        { category: 'SmartBuy Redemption', value: '₹0.50' },
        { category: 'Other Redemptions', value: '₹0.25' }
      ],
      proTip: 'Get maximum value by redeeming on SmartBuy portal (₹0.50/point)'
    },
    'ICICI Bank': {
      title: 'Reward Points Value',
      icon: '✨',
      rates: [
        { category: 'Flights & Hotels', value: '₹1.00' },
        { category: 'Rewards Catalogue', value: '₹0.60' },
        { category: 'Statement Credit', value: '₹0.40' }
      ],
      proTip: 'Best value when redeeming for flights and hotels (₹1.00/point)'
    },
    'Axis Bank Indian Oil': {
      title: 'EDGE Points Value',
      icon: '⛽',
      rates: [
        { category: 'Vouchers & Products', value: '₹0.20' },
        { category: 'Air Miles', value: '₹0.25' },
        { category: 'Premium Hotels', value: '₹0.30' },
        { category: 'Premium Flights', value: '₹0.35' }
      ],
      proTip: 'Get 20X points at IndianOil outlets (4% value back) and maximize redemption with premium travel (₹0.35/point)'
    },
    'YES Bank': {
      title: 'Reward Point Conversion Rates',
      icon: '💰',
      rates: [
        { category: 'Flight & Hotel Bookings', value: '₹0.25' },
        { category: 'Swiggy Vouchers', value: '₹0.25' },
        { category: 'Amazon & Flipkart Vouchers', value: '₹0.10' },
        { category: 'Air Miles (4 Points = 1 Mile)', value: '₹0.25*' }
      ],
      proTip: 'Redeem points through YES Rewardz portal for flights, hotels, or Swiggy vouchers to get maximum value (₹0.25/point)'
    }
  };

  // Get the conversion rates for the current bank, with special handling for Indian Oil card
  const bankRates = cardId === 'axis-indian-oil' 
    ? conversionRates['Axis Bank Indian Oil']
    : conversionRates[bank as keyof typeof conversionRates];
  console.log('Bank rates:', bankRates);

  // If no rates defined for this bank, don't show the card
  if (!bankRates) {
    console.log('No rates found for bank:', bank);
    return null;
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm sticky top-6">
        <h4 className="text-base font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-xl">{bankRates.icon}</span>
          {bankRates.title}
        </h4>
        <div className="space-y-2">
          {bankRates.rates.map((rate, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{rate.category}</span>
                <span className="text-blue-600 font-semibold">{rate.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-blue-800">
          <p className="font-medium">💡 Pro Tip: {bankRates.proTip}</p>
        </div>
      </div>
    </div>
  );
};

export default RewardPointsCard; 