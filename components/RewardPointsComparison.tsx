import React from 'react';

interface RewardPoint {
  bank: string;
  card: string;
  points: string;
  conversion: string;
  category: 'bank' | 'fintech';
  detailedConversion?: {
    title: string;
    rates: { option: string; value: string }[];
  };
}

const rewardPoints: RewardPoint[] = [
  {
    bank: 'HDFC Bank',
    card: 'Regalia',
    points: '4X',
    conversion: '₹1 = 0.5 points',
    category: 'bank',
    detailedConversion: {
      title: 'HDFC Regalia Reward Points Conversion',
      rates: [
        { option: 'Flights & Hotels via SmartBuy', value: '₹0.50 per point' },
        { option: 'Taj/ITC/Other Partner Vouchers', value: '₹0.50 per point' },
        { option: 'Gift Vouchers (General)', value: '₹0.35 – ₹0.50 per point' },
        { option: 'Airmiles (InterMiles, KrisFlyer)', value: '1 RP = 0.5 mile (approx.)' },
        { option: 'Product Catalog (non-travel)', value: '₹0.25 – ₹0.35 per point' },
        { option: 'Cashback / Statement Credit', value: 'Not directly offered on Regalia' }
      ]
    }
  },
  {
    bank: 'ICICI Bank',
    card: 'Sapphiro',
    points: '3X',
    conversion: '₹1 = 0.4 points',
    category: 'bank'
  },
  {
    bank: 'Axis Bank',
    card: 'Magnus',
    points: '5X',
    conversion: '₹1 = 0.6 points',
    category: 'bank',
    detailedConversion: {
      title: 'Axis Bank EDGE Points Conversion Rates',
      rates: [
        { option: 'Flights & Hotels (Travel Edge)', value: '₹0.20 to ₹0.25 per point' },
        { option: 'Gift Vouchers & Merchandise', value: '₹0.20 per point (standard)' },
        { option: 'Mobile/DTH Recharge', value: '₹0.15 to ₹0.20 per point' },
        { option: 'Statement Credit', value: 'Not directly available' },
        { option: 'Air Miles (Partner Programs)', value: 'Not commonly offered under EDGE Rewards' }
      ]
    }
  },
  {
    bank: 'SBI Card',
    card: 'Elite',
    points: '3X',
    conversion: '₹1 = 0.4 points',
    category: 'bank'
  },
  {
    bank: 'OneCard',
    card: 'Metal',
    points: '5X',
    conversion: '₹1 = 0.7 points',
    category: 'fintech'
  },
  {
    bank: 'Slice',
    card: 'Super',
    points: '4X',
    conversion: '₹1 = 0.6 points',
    category: 'fintech'
  },
  {
    bank: 'Uni',
    card: 'NXT',
    points: '3X',
    conversion: '₹1 = 0.5 points',
    category: 'fintech'
  }
];

const RewardPointsComparison = () => {
  const [activeCategory, setActiveCategory] = React.useState<'bank' | 'fintech'>('bank');
  const [selectedCard, setSelectedCard] = React.useState<RewardPoint | null>(null);

  const filteredPoints = rewardPoints.filter(point => point.category === activeCategory);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reward Points Redemption Rates
          </h2>
          <p className="text-gray-600">
            Find the best reward points conversion rates across different credit cards
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveCategory('bank')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === 'bank'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Banks
          </button>
          <button
            onClick={() => setActiveCategory('fintech')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === 'fintech'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Fintechs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => point.detailedConversion && setSelectedCard(point)}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{point.bank}</h3>
                  <p className="text-sm text-gray-500">{point.card}</p>
                </div>
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {point.points}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Points Conversion</span>
                  <span className="font-medium text-gray-900">{point.conversion}</span>
                </div>
                {point.detailedConversion && (
                  <div className="text-sm text-blue-600 mt-2">
                    Click to view detailed conversion rates
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed conversion rates */}
        {selectedCard && selectedCard.detailedConversion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedCard.detailedConversion.title}
                </h3>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {selectedCard.detailedConversion.rates.map((rate, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">{rate.option}</span>
                    <span className="font-medium text-gray-900">{rate.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardPointsComparison; 