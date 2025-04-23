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
    id: 'times-black',
    name: 'Times Black ICICI Bank Credit Card',
    bank: 'ICICI Bank',
    image: '/credit-cards/ICICI-Black.png',
    apr: '42% p.a.',
    annualFee: '₹20,000 + GST',
    joiningFee: '₹20,000 + GST',
    rewards: 'Earn 2.5% Reward Points on international spends\nEarn 2% Reward Points on domestic spends\nAnnual fee waiver on spends of ₹25 lakh',
    rupay: false,
    features: [
      'Unlimited Airport Lounge Access',
      'Milestone Benefits',
      'Low Forex Markup',
      'Fuel Surcharge Waiver',
      'Comprehensive Insurance',
      'Concierge Services'
    ],
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "times-black", cardName: "Times Black ICICI Bank Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "times-black", cardName: "Times Black ICICI Bank Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "times-black", cardName: "Times Black ICICI Bank Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: [
        'Reward Points:',
        '• 2% on domestic transactions (including insurance, utilities, education, and government payments)',
        '• 2.5% on international transactions',
        '\nRedemption:',
        '• Up to ₹1 per reward point when redeemed for products and vouchers',
        '• ₹0.40 per reward point when redeemed as cashback',
        '\nAdditional Benefits:',
        '• Unlimited Airport Lounge Access: Both domestic and international lounges',
        '• Concierge Services: 24x7 assistance for travel, dining, and more',
        '• Fuel Surcharge Waiver: 1% on all transactions',
        '• Comprehensive Insurance Coverage: Includes travel insurance, purchase protection, and more'
      ].join('\n'),
      welcomeBonus: 'Luxury Stay Gift Card from EaseMyTrip worth ₹10,000\n Travel Visa Benefits with Atlys and OneVasco worth ₹10,000\nExclusive access to The Quorum Club\nLifestyle Gift Cards from Toni&Guy and Interflora worth ₹4,000\nAnnual membership of Zomato Gold',
      milestoneBenefits: [
        'On ₹2 Lakh Spend: Klook international experiences voucher worth ₹10,000',
        'On ₹5 Lakh Spend: Luxury airport transfers via BLADE India, Avis, or Indian Travel House worth ₹10,000',
        'On ₹10 Lakh Spend: Tata CLiQ Luxury Gift Card worth ₹10,000',
        'On ₹20 Lakh Spend: One-night luxury stay at Ayatana Resorts worth ₹20,000',
        'On ₹25 Lakh Spend: Annual fee waiver'
      ],
      airportLounge: 'Unlimited complimentary international and domestic airport lounge access',
      fuelSurcharge: 'Fuel surcharge waiver of 1% on all transactions',
      insuranceCover: [
        'Comprehensive insurance coverage'
      ],
      diningPrivileges: [
        'Annual membership of Zomato Gold',
        'Lifestyle management services by CribLife with 6 exclusive offerings'
      ],
      minimumSpend: '₹25,00,000 for annual fee waiver',
      paymentDueDays: '20 days',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '1.49% markup fee on all foreign currency transactions',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      additionalServices: '24x7 international and domestic concierge services via i-Assist (1800 26 70731 toll free for MTNL/BSNL or 022 6787 2016)',
      idealFor: [
        'High Net-Worth Professionals: If you are earning well and spending ₹8L+ annually, you will benefit from premium travel perks, luxury experiences, and milestone rewards — all tailored for a top-tier lifestyle',
        'Frequent Jetsetters: Enjoy unlimited lounge access (domestic + international), priority concierge, Taj privileges, and golf access — making business and leisure travel seamless and indulgent',
        'Premium Lifestyle Lovers: Love fine dining, luxury stays, and curated experiences? You get Taj Epicure, EazyDiner Prime, BookMyShow privileges, and exclusive concierge assistance',
        'Reward Maximizers: Earn accelerated points on daily spends with high-value redemption options — up to ₹1 per reward point for flights, hotels, and brand vouchers'
      ],
      notIdealFor: [
        'Users who spend less than ₹4–5L annually',
        'Anyone looking for low annual fees or basic cashback',
        'Users not interested in luxury, golf, or travel privileges'
      ],
      summary: 'If you travel often, spend big, and value luxury experiences, this card offers exceptional ROI on its ₹20,000 fee.'
    }
  },
  {
    id: 'axis-indian-oil',
    name: 'Axis Bank Indian Oil Credit Card',
    bank: 'Axis Bank',
    image: '/credit-cards/Axis-IndianOil.png',
    apr: '42% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rewards: '4% value back on fuel spends at IndianOil\n5 EDGE points per ₹100 on online shopping\n1 EDGE point per ₹100 on other spends',
    rupay: true,
    features: [
      'Fuel Surcharge Waiver',
      'Dining Discounts',
      'Movie Benefits',
      'UPI Linkage',
      'Welcome Benefits'
    ],
    feedback: [
      { comment: "Great for fuel savings at IndianOil", rating: 8, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "axis-indian-oil", cardName: "Axis Bank Indian Oil Credit Card" },
      { comment: "Good dining discounts with EazyDiner", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "axis-indian-oil", cardName: "Axis Bank Indian Oil Credit Card" },
      { comment: "UPI linkage is very convenient", rating: 8.5, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "axis-indian-oil", cardName: "Axis Bank Indian Oil Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 20 EDGE Reward Points per ₹100 spent at IndianOil outlets (equivalent to 4% value back)\n• 5 EDGE Reward Points per ₹100 spent on online shopping\n• 1 EDGE Reward Point per ₹100 spent on other transactions',
      welcomeBonus: '• 100% Cashback up to ₹250 on first fuel transaction within 30 days\n• ₹500 Amazon voucher as a limited-time welcome offer',
      fuelSurcharge: '1% waiver on fuel transactions between ₹400 and ₹4,000, capped at ₹50 per statement cycle',
      movieBenefits: '10% off on movie ticket bookings through BookMyShow',
      diningPrivileges: [
        'Up to 15% off at partner restaurants via EazyDiner',
        'Maximum discount of ₹500 once per month on bills of ₹2,500 or more'
      ],
      minimumSpend: '₹50,000 for annual fee waiver',
      additionalServices: 'RuPay Network Features:\n• Card operates on RuPay network\n• Can be linked to UPI apps for seamless transactions',
      idealFor: [
        'Frequent Fuel Buyers: Perfect for individuals with significant fuel expenses, especially at IndianOil outlets',
        'Budget-Conscious Users: Ideal for those seeking a low annual fee credit card with fuel and lifestyle benefits',
        'UPI Enthusiasts: Great for users who prefer UPI-linked credit card transactions'
      ],
      notIdealFor: [
        'Users who primarily fuel at non-IndianOil outlets',
        'Individuals seeking premium travel or international spending benefits'
      ],
      summary: 'A value-focused card offering excellent rewards on IndianOil fuel spends, dining discounts, and UPI convenience with a low annual fee.'
    }
  }
]; 