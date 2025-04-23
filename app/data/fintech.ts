export interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
  userId: string;
  userName: string;
  cardId: string;
  cardName: string;
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  image: string;
  apr: string;
  annualFee: string;
  joiningFee: string;
  rewards: string;
  rupay: boolean;
  features: string[];
  feedback: UserFeedback[];
  additionalDetails?: {
    rewardsProgram?: string;
    welcomeBonus?: string;
    milestoneBenefits?: string[];
    airportLounge?: string;
    fuelSurcharge?: string;
    insuranceCover?: string[];
    movieBenefits?: string;
    diningPrivileges?: string[];
    minimumSpend?: string;
    paymentDueDays?: string;
    creditLimit?: string;
    domesticTransactionFee?: string;
    internationalTransactionFee?: string;
    interestRate?: string;
    emiOptions?: string;
    additionalServices?: string;
    idealFor?: string[];
    notIdealFor?: string[];
    summary?: string;
  };
}

export const creditCards: CreditCard[] = [
  {
    id: 'emeralde-private-metal',
    name: 'Emeralde Private Metal Credit Card',
    bank: 'ICICI Bank',
    image: '/credit-cards/ICICI-Emeralde-Metal.png',
    apr: '41.88% p.a.',
    annualFee: '₹12,499 + GST',
    joiningFee: '₹12,499 + GST',
    rewards: 'Earn 6 ICICI Reward Points per ₹200 on retail spends\nApplicable to grocery, education, utilities, and insurance payments',
    rupay: true,
    features: ['Priority Pass', 'Travel Insurance', 'Forex Markup 1%'],
    feedback: [
      { comment: "Best travel card I've ever used!", rating: 9.5, date: "2024-03-12", userId: "user123", userName: "John Doe", cardId: "emeralde-private-metal", cardName: "Emeralde Private Metal Credit Card" },
      { comment: "Insurance coverage is comprehensive", rating: 8, date: "2024-03-08", userId: "user456", userName: "Jane Smith", cardId: "emeralde-private-metal", cardName: "Emeralde Private Metal Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 6 ICICI Reward Points per ₹200 on retail spends\n• Applicable to grocery, education, utilities, and insurance payments\n\nRedemption:\n• 1 Reward Point = up to ₹1 for flights, hotels, and select brand vouchers\n• ₹0.60 for rewards catalogue\n• ₹0.40 for statement credit\n\nCaps:\n• 1,000 points per category per statement cycle for grocery, education, and utilities\n• 5,000 points per statement cycle for insurance payments',
      welcomeBonus: '12,500 ICICI Reward Points: Credited upon payment of joining or annual fee\n Taj Epicure Membership:\n• 25% off on F&B\n• 20% off on Qmin App orders, spa, and salon services\n• One-time 20% off on room/suite bookings at select Taj properties\n EazyDiner Prime Membership:\n• 25%-50% discounts at 3,000+ restaurants in India and Dubai\n• Complimentary cake/dessert on special occasions\n• 2,000 EazyPoints as a welcome bonus',
      milestoneBenefits: [
        '₹3,000 EaseMyTrip Voucher on spending ₹4 lakh annually',
        'Additional ₹3,000 Voucher on reaching ₹8 lakh annual spend',
        'Total travel vouchers worth ₹6,000 per year'
      ],
      airportLounge: 'Travel & Lifestyle Benefits:\n\nUnlimited Airport Lounge Access:\n• Domestic: via Mastercard\n• International: via Priority Pass for primary and add-on cardholders\n\nGolf Privileges:\n• Unlimited complimentary rounds and lessons each month\n\nBookMyShow Offer:\n• Buy 1 ticket, get up to ₹750 off on the second ticket, twice a month\n\nConcierge Services:\n• 24x7 assistance for travel bookings, reservations, and more',
      insuranceCover: [
        'Air Accident Cover: ₹3 crore',
        'Purchase Protection: ₹1.4 lakh',
        'Credit Shield: ₹1 lakh',
        'Travel Inconvenience Covers:',
        '• Baggage loss/delay',
        '• Passport loss',
        '• Missed connections',
        '• Flight delays'
      ],
      additionalServices: 'Additional Features:\n\n• Foreign Currency Mark-up: 2% + GST\n• Fuel Surcharge Waiver: 1% on transactions up to ₹4,000; maximum waiver of ₹1,000 per statement cycle\n• Zero Cancellation Charges: Refunds up to ₹12,000 annually for flight/hotel bookings canceled (maximum of two transactions per year)',
      fuelSurcharge: '1% on transactions up to ₹4,000; maximum waiver of ₹1,000 per statement cycle',
      internationalTransactionFee: '2% + GST',
      interestRate: '3.49% per month',
      emiOptions: 'Available on airline tickets above ₹20,000',
      diningPrivileges: [
        '20% discount at airport restaurants',
        'Complimentary drinks at partner lounges'
      ],
      minimumSpend: '₹40,000 per month',
      paymentDueDays: '25 days',
      creditLimit: 'Up to ₹10,00,000',
      domesticTransactionFee: 'Nil',
      idealFor: [
        'High Net-Worth Individuals: Perfect for those with significant annual spending who demand the finest in travel and lifestyle benefits',
        'Luxury Travel Enthusiasts: Get unlimited domestic and international lounge access, comprehensive travel insurance, and premium concierge services',
        'Golf Lovers: Enjoy unlimited complimentary golf rounds and lessons each month',
        'Premium Dining Connoisseurs: Access exclusive dining privileges with Taj Epicure membership and EazyDiner Prime benefits'
      ],
      notIdealFor: [
        'Users with annual spending below ₹6L',
        'Those seeking basic rewards or cashback features',
        'Budget-conscious travelers',
        'Users who will not utilize premium lifestyle benefits'
      ],
      summary: 'Ideal for high-income individuals who travel frequently, enjoy luxury experiences, and seek premium lifestyle and concierge benefits.'
    }
  },
  {
    id: 'uni-pay-1-3rd',
    name: 'Uni Pay 1/3rd Card',
    bank: 'Uni Cards',
    image: '/credit-cards/uni-pay-1-3rd.png',
    apr: 'N/A',
    annualFee: 'Lifetime Free',
    joiningFee: 'Lifetime Free',
    rewards: '1% Cashback when you pay your bill in full by the due date',
    rupay: false,
    features: [
      'Flexible Repayment',
      'Zero Forex Markup',
      'Visa Network'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Rewards Structure:\n• 1% cashback on all spends when bill is paid in full by due date\n• Cashback credited to card statement\n• No minimum spend requirement\n• No capping on cashback earnings',
      welcomeBonus: 'N/A',
      milestoneBenefits: [
        'No milestone benefits available',
        'Focus on consistent cashback rewards'
      ],
      airportLounge: 'N/A',
      insuranceCover: [
        'Purchase Protection: Up to ₹50,000',
        'Credit Shield: Basic coverage included'
      ],
      movieBenefits: 'N/A',
      diningPrivileges: [],
      minimumSpend: 'No minimum spend requirement',
      paymentDueDays: '25 days',
      creditLimit: '₹20,000 to ₹6,00,000',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'Nil',
      interestRate: '3.49% per month',
      emiOptions: 'Available on purchases above ₹5,000',
      additionalServices: 'Additional Features:\n\n• Flexible Repayment: Split monthly bill into three equal, interest-free installments\n• Zero Cancellation Charges: No charges for bill splitting\n• Instant Card Activation: Get started immediately after approval\n• Digital Card Management: Full control through Uni app',
      idealFor: [
        'Individuals seeking flexible payment options without interest charges',
        'Users who prefer straightforward cashback rewards',
        'Those looking for a credit card with no annual fees',
        'Budget-conscious consumers who want to manage their expenses better',
        'First-time credit card users due to its simple rewards structure'
      ],
      notIdealFor: [
        'Users who prefer complex reward point systems',
        'Those seeking premium lifestyle benefits',
        'High spenders looking for premium travel benefits',
        'Users who don\'t need flexible payment options'
      ],
      summary: 'A straightforward credit card offering 1% cashback and the unique ability to split monthly bills into three equal, interest-free installments, making it ideal for budget management and simple rewards.'
    }
  },
  {
    id: 'uni-goldx',
    name: 'Uni GoldX Credit Card',
    bank: 'Uni Cards',
    image: '/credit-cards/uni-goldx.png',
    apr: 'N/A',
    annualFee: 'Lifetime Free',
    joiningFee: 'Lifetime Free',
    rewards: 'Earn 1% of your spending in 24K digital gold, including on UPI transactions',
    rupay: false,
    features: [
      'Zero Forex Markup',
      'Digital Gold Rewards',
      'Enhanced Store Rewards'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Gold Rewards Structure:\n• 1% of spending converted to 24K digital gold\n• Includes UPI transactions\n• Up to 5x rewards on Uni Store purchases\n• No minimum spend requirement\n• No capping on gold rewards',
      welcomeBonus: 'Welcome Benefits:\n• 1 gram of digital gold on first transaction\n• 5x rewards on first Uni Store purchase',
      milestoneBenefits: [
        'Extra 0.5% gold rewards on monthly spends above ₹50,000',
        'Special gold rate on conversion to physical gold at milestone spends'
      ],
      airportLounge: 'N/A',
      insuranceCover: [
        'Purchase Protection: Up to ₹50,000',
        'Credit Shield: Basic coverage included',
        'Gold Insurance: Coverage for digital gold holdings'
      ],
      movieBenefits: 'N/A',
      diningPrivileges: [],
      minimumSpend: 'No minimum spend requirement',
      paymentDueDays: '25 days',
      creditLimit: '₹20,000 to ₹6,00,000',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'Nil',
      interestRate: '3.49% per month',
      emiOptions: 'Available on purchases above ₹5,000',
      additionalServices: 'Additional Features:\n\n• Digital Gold Management: Full control through Uni app\n• Physical Gold Conversion: Convert digital gold to physical gold at partner stores\n• Gold Rate Alerts: Get notified of best gold rates\n• Zero Forex Markup: No additional charges on international transactions\n• Enhanced Store Rewards: Up to 5x rewards on Uni Store purchases',
      idealFor: [
        'Individuals interested in accumulating gold as a form of reward',
        'Frequent international travelers seeking to avoid forex charges',
        'Users looking for a credit card with tangible, investment-oriented rewards',
        'Those who prefer digital gold as an investment option',
        'Regular online shoppers who can benefit from enhanced store rewards'
      ],
      notIdealFor: [
        'Users who prefer traditional reward point systems',
        'Those seeking premium travel benefits',
        'Users who don\'t value gold as an investment',
        'Individuals who don\'t shop frequently on Uni Store'
      ],
      summary: 'A unique credit card that rewards spending with digital gold, offering zero forex markup and enhanced rewards on store purchases, making it ideal for those looking to accumulate gold while spending.'
    }
  }
]; 