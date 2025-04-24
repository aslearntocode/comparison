export interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
  userId: string;
  userName: string;
  cardId: string;
  cardName: string;
}

export type CardCategory = 'hotels' | 'airlines' | 'fintech';

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  category: CardCategory;
  image: string;
  apr: string;
  annualFee: string;
  joiningFee: string;
  rewards: string;
  rupay: boolean;
  features: string[];
  feedback: UserFeedback[];
  categories: string[];
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
  // Hotels Cards
  {
    id: 'hdfc-regalia-marriott',
    name: 'HDFC Bank Regalia Marriott Bonvoy Credit Card',
    bank: 'HDFC Bank',
    category: 'hotels',
    image: '/credit-cards/HDFC-Regalia-Marriott.png',
    apr: '42% p.a.',
    annualFee: '₹2,500 + GST',
    joiningFee: '₹2,500 + GST',
    rewards: '4 Reward Points per ₹150 spent on retail purchases\nPoints worth ₹0.50 each on SmartBuy redemption',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Travel Insurance',
      'Dining Benefits',
      'Fuel Surcharge Waiver',
      'Contactless Payments',
      'SmartBuy Portal Access'
    ],
    categories: [
      'best-credit-cards',
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge',
      'hotel',
      'hotels'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 4 Reward Points per ₹150 spent on all retail purchases\n• Applicable to insurance, utilities, education, and rent payments\n• No reward points on fuel transactions\n• Cap of 2,000 points per day for insurance payments\n\nRedemption:\n• Points can be redeemed for flights, hotel bookings, premium products, and vouchers via SmartBuy\n• Each Reward Point worth ₹0.50 when redeemed on SmartBuy',
      welcomeBonus: '• 2,500 Reward Points upon payment of the joining fee\n\nRenewal Benefits:\n• 2,500 Reward Points upon payment of the annual fee',
      airportLounge: 'Domestic Lounge Access:\n• Up to 2 complimentary lounge access vouchers per quarter (8 per year)\n• Eligibility: Spend ₹1 lakh or more in a calendar quarter\n• Access vouchers to be generated via Regalia SmartBuy portal\n\nInternational Lounge Access:\n• 6 complimentary visits per year for primary and add-on cardholders through Priority Pass\n• Eligibility: Complete 4 retail transactions to apply for Priority Pass\n• Additional visits charged at $27 + GST per visit',
      fuelSurcharge: '1% waiver on fuel transactions between ₹400 and ₹5,000',
      insuranceCover: [
        'Air Accident Cover: ₹1 crore',
        'Emergency Overseas Hospitalization: Up to ₹15 lakh',
        'Credit Liability Cover: Up to ₹9 lakh'
      ],
      diningPrivileges: [
        'Exclusive offers through Dineout Passport Membership',
        'Up to 25% off at select restaurants'
      ],
      minimumSpend: '₹3,00,000 for annual fee waiver',
      internationalTransactionFee: '2% on all international transactions',
      additionalServices: 'Additional Features:\n• Contactless Payments: Enabled for fast and secure transactions\n• SmartBuy Portal: Exclusive access for flight and hotel bookings\n• Priority Pass Membership: Available upon meeting eligibility criteria',
      idealFor: [
        'Mid-to-High Spenders: Perfect for individuals with annual spends of ₹3 lakh or more',
        'Frequent Travelers: Ideal for those seeking domestic and international lounge access',
        'Lifestyle Enthusiasts: Great for users looking for a balanced mix of rewards, dining, and protection benefits'
      ],
      notIdealFor: [
        'Users with annual spends below ₹1 lakh',
        'Individuals seeking zero annual fee cards without spending conditions',
        'Those primarily interested in cashback or fuel-specific benefits'
      ],
      summary: 'A premium travel and lifestyle credit card offering comprehensive benefits including lounge access, travel insurance, and reward points, ideal for frequent travelers and moderate-to-high spenders.'
    }
  },
  {
    id: 'hdfc-regalia',
    name: 'HDFC Regalia Credit Card',
    bank: 'HDFC Bank',
    category: 'hotels',
    image: '/credit-cards/HDFC-Regalia.png',
    apr: '42% p.a.',
    annualFee: '₹2,500 + GST',
    joiningFee: '₹2,500 + GST',
    rewards: '4 Reward Points per ₹150 spent on retail purchases\nPoints worth ₹0.50 each on SmartBuy redemption',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Travel Insurance',
      'Dining Benefits',
      'Fuel Surcharge Waiver',
      'Contactless Payments',
      'SmartBuy Portal Access'
    ],
    categories: [
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge',
      'hotel',
      'hotels'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 4 Reward Points per ₹150 spent on all retail purchases\n• Applicable to insurance, utilities, education, and rent payments\n• No reward points on fuel transactions\n• Cap of 2,000 points per day for insurance payments\n\nRedemption:\n• Points can be redeemed for flights, hotel bookings, premium products, and vouchers via SmartBuy\n• Each Reward Point worth ₹0.50 when redeemed on SmartBuy',
      welcomeBonus: '• 2,500 Reward Points upon payment of the joining fee\n\nRenewal Benefits:\n• 2,500 Reward Points upon payment of the annual fee',
      airportLounge: 'Domestic Lounge Access:\n• Up to 2 complimentary lounge access vouchers per quarter (8 per year)\n• Eligibility: Spend ₹1 lakh or more in a calendar quarter\n• Access vouchers to be generated via Regalia SmartBuy portal\n\nInternational Lounge Access:\n• 6 complimentary visits per year for primary and add-on cardholders through Priority Pass\n• Eligibility: Complete 4 retail transactions to apply for Priority Pass\n• Additional visits charged at $27 + GST per visit',
      fuelSurcharge: '1% waiver on fuel transactions between ₹400 and ₹5,000',
      insuranceCover: [
        'Air Accident Cover: ₹1 crore',
        'Emergency Overseas Hospitalization: Up to ₹15 lakh',
        'Credit Liability Cover: Up to ₹9 lakh'
      ],
      diningPrivileges: [
        'Exclusive offers through Dineout Passport Membership',
        'Up to 25% off at select restaurants'
      ],
      minimumSpend: '₹3,00,000 for annual fee waiver',
      internationalTransactionFee: '2% on all international transactions',
      additionalServices: 'Additional Features:\n• Contactless Payments: Enabled for fast and secure transactions\n• SmartBuy Portal: Exclusive access for flight and hotel bookings\n• Priority Pass Membership: Available upon meeting eligibility criteria',
      idealFor: [
        'Mid-to-High Spenders: Perfect for individuals with annual spends of ₹3 lakh or more',
        'Frequent Travelers: Ideal for those seeking domestic and international lounge access',
        'Lifestyle Enthusiasts: Great for users looking for a balanced mix of rewards, dining, and protection benefits'
      ],
      notIdealFor: [
        'Users with annual spends below ₹1 lakh',
        'Individuals seeking zero annual fee cards without spending conditions',
        'Those primarily interested in cashback or fuel-specific benefits'
      ],
      summary: 'A premium travel and lifestyle credit card offering comprehensive benefits including lounge access, travel insurance, and reward points, ideal for frequent travelers and moderate-to-high spenders.'
    }
  },

  // Airlines Cards
  {
    id: 'axis-privilege',
    name: 'Axis Bank Privilege Credit Card',
    bank: 'Axis Bank',
    category: 'airlines',
    image: '/credit-cards/ICICI-Sapphiro.png',
    apr: '42% p.a.',
    annualFee: '₹3,500 + GST',
    joiningFee: '₹6,000 + GST',
    rewards: 'Earn 4 points per ₹100 on international spends\nEarn 2 points per ₹100 on domestic retail spends\nEarn 1 point per ₹100 on utilities and insurance payments',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Golf Privileges',
      'Entertainment Offers',
      'Dining Discounts',
      'Fuel Surcharge Waiver',
      'Chip and PIN Security'
    ],
    categories: [
      'premium',
      'rewards',
      'international-travel',
      'domestic-lounge',
      'fuel'
    ],
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "sapphiro", cardName: "Sapphiro Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 points per ₹100 on domestic retail spends (excluding fuel)\n• 4 points per ₹100 on international spends\n• 1 point per ₹100 on utilities and insurance payments\n\nRedemption:\n• Points can be redeemed for a variety of products, vouchers, and even converted to air miles',
      welcomeBonus: 'Welcome Vouchers worth over ₹9,000:\n• Tata CLiQ voucher worth ₹3,000\n• EaseMyTrip vouchers worth ₹6,000\n\nComplimentary Bose IE2 Headphones upon payment of joining fee',
      milestoneBenefits: [
        '4,000 points on spending ₹4 lakh in an anniversary year',
        '2,000 points for every additional ₹1 lakh spent thereafter, up to a maximum of 20,000 points per year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 4 complimentary domestic lounge accesses per quarter (subject to spending ₹75,000 in the previous quarter)\n• 2 complimentary international lounge accesses per year via Priority Pass or DreamFolks membership',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹4,000',
      insuranceCover: [
        'Chip and PIN Security for enhanced security at merchant outlets'
      ],
      movieBenefits: 'Buy 1, get 1 free on movie or event tickets (up to ₹500 off on the second ticket), twice a month via BookMyShow',
      diningPrivileges: [
        'Exclusive offers through the ICICI Bank Culinary Treats Programme'
      ],
      minimumSpend: '₹5,00,000 for annual fee waiver',
      paymentDueDays: '20 days',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% + GST',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Golf Privileges:\n• Up to 4 complimentary rounds of golf per month, based on spending ₹50,000 in the previous month',
      idealFor: [
        'Mid-to-High Spenders: Perfect for those spending ₹4L–₹8L annually, offering a sweet spot of benefits with an affordable annual fee',
        'Occasional Travelers: Enjoy 4 free domestic lounge accesses every quarter and 2 complimentary international lounge entries each year',
        'Lifestyle & Entertainment Enthusiasts: Get Buy 1 Get 1 on BookMyShow, golf privileges, and dining discounts through the Culinary Treats Program',
        'Reward Collectors: Earn accelerated points on international and retail spends, with flexible redemption options'
      ],
      notIdealFor: [
        'Users who spend less than ₹2–3 lakh annually',
        'Frequent international flyers who require unlimited lounge access',
        'Users seeking zero annual fee or basic cashback cards'
      ],
      summary: 'Perfect for mid-to-high spenders who travel occasionally and enjoy a balanced mix of lifestyle perks and reward flexibility.'
    }
  },
  {
    id: 'emeralde-private-metal',
    name: 'Emeralde Private Metal Credit Card',
    bank: 'ICICI Bank',
    category: 'airlines',
    image: '/credit-cards/ICICI-Emeralde-Metal.png',
    apr: '41.88% p.a.',
    annualFee: '₹12,499 + GST',
    joiningFee: '₹12,499 + GST',
    rewards: 'Earn 6 ICICI Reward Points per ₹200 on retail spends\nApplicable to grocery, education, utilities, and insurance payments',
    rupay: true,
    features: ['Priority Pass', 'Travel Insurance', 'Forex Markup 1%'],
    categories: [
      'premium',
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge',
      'hotel'
    ],
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
    id: 'emeralde',
    name: 'Emeralde Credit Card',
    bank: 'ICICI Bank',
    category: 'airlines',
    image: '/credit-cards/ICICI-Emeralde.png',
    apr: '45% p.a.',
    annualFee: '₹500',
    joiningFee: '₹1,000',
    rewards: 'Earn 2.5% Reward Points on international spends\n Earn 2% Reward Points on domestic spends',
    rupay: true,
    features: ['Universal Cashback', 'Fuel Surcharge Waiver', 'EMI Options'],
    categories: [
      'premium',
      'rewards',
      'cashback',
      'fuel'
    ],
    feedback: [
      { comment: "Decent cashback but customer service needs improvement", rating: 6, date: "2024-03-14", userId: "user789", userName: "Bob Johnson", cardId: "emeralde", cardName: "Emeralde Credit Card" },
      { comment: "Good value for money", rating: 7.5, date: "2024-03-11", userId: "user123", userName: "John Doe", cardId: "emeralde", cardName: "Emeralde Credit Card" },
      { comment: "Processing time for cashback is too long", rating: 5, date: "2024-03-07", userId: "user456", userName: "Jane Smith", cardId: "emeralde", cardName: "Emeralde Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Flat 2% cashback on all spends, credited monthly',
      welcomeBonus: '₹1,000 cashback on spending ₹25,000 in first 30 days',
      milestoneBenefits: [
        'Annual fee waiver on spending ₹3,00,000 in a year'
      ],
      airportLounge: '2 complimentary domestic lounge visits per quarter',
      fuelSurcharge: 'Complete fuel surcharge waiver at all fuel stations',
      insuranceCover: [
        'Purchase protection up to ₹1 lakh',
        'Card fraud protection'
      ],
      movieBenefits: '25% off on movie tickets up to ₹100 per ticket',
      diningPrivileges: [
        '10% cashback at restaurants up to ₹200 per transaction',
        '5% extra cashback at food delivery'
      ],
      minimumSpend: '₹10,000 per month',
      paymentDueDays: '15 days',
      creditLimit: 'Up to ₹3,00,000',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% + GST',
      interestRate: '3.75% per month',
      emiOptions: 'Available on purchases above ₹5,000'
    }
  },
  {
    id: 'sapphiro',
    name: 'Sapphiro Credit Card',
    bank: 'ICICI Bank',
    category: 'airlines',
    image: '/credit-cards/ICICI-Sapphiro.png',
    apr: '42% p.a.',
    annualFee: '₹3,500 + GST',
    joiningFee: '₹6,000 + GST',
    rewards: 'Earn 4 points per ₹100 on international spends\nEarn 2 points per ₹100 on domestic retail spends\nEarn 1 point per ₹100 on utilities and insurance payments',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Golf Privileges',
      'Entertainment Offers',
      'Dining Discounts',
      'Fuel Surcharge Waiver',
      'Chip and PIN Security'
    ],
    categories: [
      'premium',
      'rewards',
      'international-travel',
      'domestic-lounge',
      'fuel'
    ],
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "sapphiro", cardName: "Sapphiro Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 points per ₹100 on domestic retail spends (excluding fuel)\n• 4 points per ₹100 on international spends\n• 1 point per ₹100 on utilities and insurance payments\n\nRedemption:\n• Points can be redeemed for a variety of products, vouchers, and even converted to air miles',
      welcomeBonus: 'Welcome Vouchers worth over ₹9,000:\n• Tata CLiQ voucher worth ₹3,000\n• EaseMyTrip vouchers worth ₹6,000\n\nComplimentary Bose IE2 Headphones upon payment of joining fee',
      milestoneBenefits: [
        '4,000 points on spending ₹4 lakh in an anniversary year',
        '2,000 points for every additional ₹1 lakh spent thereafter, up to a maximum of 20,000 points per year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 4 complimentary domestic lounge accesses per quarter (subject to spending ₹75,000 in the previous quarter)\n• 2 complimentary international lounge accesses per year via Priority Pass or DreamFolks membership',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹4,000',
      insuranceCover: [
        'Chip and PIN Security for enhanced security at merchant outlets'
      ],
      movieBenefits: 'Buy 1, get 1 free on movie or event tickets (up to ₹500 off on the second ticket), twice a month via BookMyShow',
      diningPrivileges: [
        'Exclusive offers through the ICICI Bank Culinary Treats Programme'
      ],
      minimumSpend: '₹5,00,000 for annual fee waiver',
      paymentDueDays: '20 days',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% + GST',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Golf Privileges:\n• Up to 4 complimentary rounds of golf per month, based on spending ₹50,000 in the previous month',
      idealFor: [
        'Mid-to-High Spenders: Perfect for those spending ₹4L–₹8L annually, offering a sweet spot of benefits with an affordable annual fee',
        'Occasional Travelers: Enjoy 4 free domestic lounge accesses every quarter and 2 complimentary international lounge entries each year',
        'Lifestyle & Entertainment Enthusiasts: Get Buy 1 Get 1 on BookMyShow, golf privileges, and dining discounts through the Culinary Treats Program',
        'Reward Collectors: Earn accelerated points on international and retail spends, with flexible redemption options'
      ],
      notIdealFor: [
        'Users who spend less than ₹2–3 lakh annually',
        'Frequent international flyers who require unlimited lounge access',
        'Users seeking zero annual fee or basic cashback cards'
      ],
      summary: 'Perfect for mid-to-high spenders who travel occasionally and enjoy a balanced mix of lifestyle perks and reward flexibility.'
    }
  },
  // Fintech Cards
  {
    id: 'uni-gold',
    name: 'Uni Gold Credit Card',
    bank: 'Uni',
    category: 'fintech',
    image: '/credit-cards/Uni-Gold.png',
    apr: '42% p.a.',
    annualFee: '₹3,500 + GST',
    joiningFee: '₹6,000 + GST',
    rewards: 'Earn 4 points per ₹100 on international spends\nEarn 2 points per ₹100 on domestic retail spends\nEarn 1 point per ₹100 on utilities and insurance payments',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Golf Privileges',
      'Entertainment Offers',
      'Dining Discounts',
      'Fuel Surcharge Waiver',
      'Chip and PIN Security'
    ],
    categories: [
      'rewards',
      'international-travel',
      'domestic-lounge',
      'fuel'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 points per ₹100 on domestic retail spends (excluding fuel)\n• 4 points per ₹100 on international spends\n• 1 point per ₹100 on utilities and insurance payments\n\nRedemption:\n• Points can be redeemed for a variety of products, vouchers, and even converted to air miles',
      welcomeBonus: 'Welcome Vouchers worth over ₹9,000:\n• Tata CLiQ voucher worth ₹3,000\n• EaseMyTrip vouchers worth ₹6,000\n\nComplimentary Bose IE2 Headphones upon payment of joining fee',
      milestoneBenefits: [
        '4,000 points on spending ₹4 lakh in an anniversary year',
        '2,000 points for every additional ₹1 lakh spent thereafter, up to a maximum of 20,000 points per year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 4 complimentary domestic lounge accesses per quarter (subject to spending ₹75,000 in the previous quarter)\n• 2 complimentary international lounge accesses per year via Priority Pass or DreamFolks membership',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹4,000',
      insuranceCover: [
        'Chip and PIN Security for enhanced security at merchant outlets'
      ],
      movieBenefits: 'Buy 1, get 1 free on movie or event tickets (up to ₹500 off on the second ticket), twice a month via BookMyShow',
      diningPrivileges: [
        'Exclusive offers through the ICICI Bank Culinary Treats Programme'
      ],
      minimumSpend: '₹5,00,000 for annual fee waiver',
      paymentDueDays: '20 days',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% + GST',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Golf Privileges:\n• Up to 4 complimentary rounds of golf per month, based on spending ₹50,000 in the previous month',
      idealFor: [
        'Mid-to-High Spenders: Perfect for those spending ₹4L–₹8L annually, offering a sweet spot of benefits with an affordable annual fee',
        'Occasional Travelers: Enjoy 4 free domestic lounge accesses every quarter and 2 complimentary international lounge entries each year',
        'Lifestyle & Entertainment Enthusiasts: Get Buy 1 Get 1 on BookMyShow, golf privileges, and dining discounts through the Culinary Treats Program',
        'Reward Collectors: Earn accelerated points on international and retail spends, with flexible redemption options'
      ],
      notIdealFor: [
        'Users who spend less than ₹2–3 lakh annually',
        'Frequent international flyers who require unlimited lounge access',
        'Users seeking zero annual fee or basic cashback cards'
      ],
      summary: 'Perfect for mid-to-high spenders who travel occasionally and enjoy a balanced mix of lifestyle perks and reward flexibility.'
    }
  },
  {
    id: 'uni',
    name: 'Uni Pay 1/3rd Card',
    bank: 'Uni',
    category: 'fintech',
    image: '/credit-cards/Uni-Pay.png',
    apr: '42% p.a.',
    annualFee: '₹4,999 + GST',
    joiningFee: '₹4,999 + GST',
    rewards: 'Earn reward points on all spends\n5,000 reward points as welcome benefit',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Railway Lounge Access',
      'Travel Insurance',
      'Lifestyle Privileges',
      'Forex Benefits',
      'Lifetime Free Add-on Cards'
    ],
    categories: [
      'best-credit-cards',
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earn reward points on all spends\nWelcome benefit of 5,000 reward points or luxury e-gift voucher worth ₹5,000',
      welcomeBonus: '5,000 reward points or luxury e-gift voucher worth ₹5,000 upon card activation',
      airportLounge: 'Complimentary access to domestic and international lounges (up to 16 visits per year)\nComplimentary access to select railway lounges',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air Accident Cover: ₹2 crore',
        'Credit Shield: ₹15 lakh',
        'Purchase Protection: ₹50,000',
        'Travel Insurance: Comprehensive coverage for baggage loss, flight delays, and more'
      ],
      movieBenefits: 'Exclusive discounts and offers on movie ticket bookings through BookMyShow',
      diningPrivileges: [
        'Exclusive dining privileges and offers'
      ],
      minimumSpend: '₹8,00,000 for annual fee waiver',
      internationalTransactionFee: '0.99%',
      additionalServices: 'Lifetime free add-on cards for family members',
      idealFor: [
        'High-income individuals with substantial monthly expenditures',
        'Frequent travelers seeking lounge access and travel-related perks',
        'Users who prioritize dining and lifestyle benefits'
      ],
      notIdealFor: [
        'Individuals with moderate or low spending habits',
        'Those seeking a no-frills, low-fee credit card'
      ],
      summary: 'A premium metal credit card offering luxury travel experiences and lifestyle privileges, ideal for high-income individuals and frequent travelers.'
    }
  },
  {
    id: 'onecard',
    name: 'OneCard',
    bank: 'OneCard',
    category: 'fintech',
    image: '/credit-cards/OneCard.png',
    apr: '42% p.a.',
    annualFee: '₹4,999 + GST',
    joiningFee: '₹4,999 + GST',
    rewards: 'Earn reward points on all spends\n5,000 reward points as welcome benefit',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Railway Lounge Access',
      'Travel Insurance',
      'Lifestyle Privileges',
      'Forex Benefits',
      'Lifetime Free Add-on Cards'
    ],
    categories: [
      'best-credit-cards',
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earn reward points on all spends\nWelcome benefit of 5,000 reward points or luxury e-gift voucher worth ₹5,000',
      welcomeBonus: '5,000 reward points or luxury e-gift voucher worth ₹5,000 upon card activation',
      airportLounge: 'Complimentary access to domestic and international lounges (up to 16 visits per year)\nComplimentary access to select railway lounges',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air Accident Cover: ₹2 crore',
        'Credit Shield: ₹15 lakh',
        'Purchase Protection: ₹50,000',
        'Travel Insurance: Comprehensive coverage for baggage loss, flight delays, and more'
      ],
      movieBenefits: 'Exclusive discounts and offers on movie ticket bookings through BookMyShow',
      diningPrivileges: [
        'Exclusive dining privileges and offers'
      ],
      minimumSpend: '₹8,00,000 for annual fee waiver',
      internationalTransactionFee: '0.99%',
      additionalServices: 'Lifetime free add-on cards for family members',
      idealFor: [
        'High-income individuals with substantial monthly expenditures',
        'Frequent travelers seeking lounge access and travel-related perks',
        'Users who prioritize dining and lifestyle benefits'
      ],
      notIdealFor: [
        'Individuals with moderate or low spending habits',
        'Those seeking a no-frills, low-fee credit card'
      ],
      summary: 'A premium metal credit card offering luxury travel experiences and lifestyle privileges, ideal for high-income individuals and frequent travelers.'
    }
  },
  {
    id: 'kiwi',
    name: 'Kiwi Credit Card',
    bank: 'Kiwi',
    category: 'fintech',
    image: '/credit-cards/Kiwi.png',
    apr: '42% p.a.',
    annualFee: '₹4,999 + GST',
    joiningFee: '₹4,999 + GST',
    rewards: 'Earn reward points on all spends\n5,000 reward points as welcome benefit',
    rupay: true,
    features: [
      'Airport Lounge Access',
      'Railway Lounge Access',
      'Travel Insurance',
      'Lifestyle Privileges',
      'Forex Benefits',
      'Lifetime Free Add-on Cards'
    ],
    categories: [
      'best-credit-cards',
      'rewards',
      'travel',
      'domestic-lounge',
      'upi'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earn reward points on all spends\nWelcome benefit of 5,000 reward points or luxury e-gift voucher worth ₹5,000',
      welcomeBonus: '5,000 reward points or luxury e-gift voucher worth ₹5,000 upon card activation',
      airportLounge: 'Complimentary access to domestic and international lounges (up to 16 visits per year)\nComplimentary access to select railway lounges',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air Accident Cover: ₹2 crore',
        'Credit Shield: ₹15 lakh',
        'Purchase Protection: ₹50,000',
        'Travel Insurance: Comprehensive coverage for baggage loss, flight delays, and more'
      ],
      movieBenefits: 'Exclusive discounts and offers on movie ticket bookings through BookMyShow',
      diningPrivileges: [
        'Exclusive dining privileges and offers'
      ],
      minimumSpend: '₹8,00,000 for annual fee waiver',
      internationalTransactionFee: '0.99%',
      additionalServices: 'Lifetime free add-on cards for family members',
      idealFor: [
        'High-income individuals with substantial monthly expenditures',
        'Frequent travelers seeking lounge access and travel-related perks',
        'Users who prioritize dining and lifestyle benefits'
      ],
      notIdealFor: [
        'Individuals with moderate or low spending habits',
        'Those seeking a no-frills, low-fee credit card'
      ],
      summary: 'A premium metal credit card offering luxury travel experiences and lifestyle privileges, ideal for high-income individuals and frequent travelers.'
    }
  },
  {
    id: 'slice',
    name: 'Slice Credit Card',
    bank: 'Slice',
    category: 'fintech',
    image: '/credit-cards/Slice.png',
    apr: '42% p.a.',
    annualFee: '₹4,999 + GST',
    joiningFee: '₹4,999 + GST',
    rewards: 'Earn reward points on all spends\n5,000 reward points as welcome benefit',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Railway Lounge Access',
      'Travel Insurance',
      'Lifestyle Privileges',
      'Forex Benefits',
      'Lifetime Free Add-on Cards'
    ],
    categories: [
      'best-credit-cards',
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earn reward points on all spends\nWelcome benefit of 5,000 reward points or luxury e-gift voucher worth ₹5,000',
      welcomeBonus: '5,000 reward points or luxury e-gift voucher worth ₹5,000 upon card activation',
      airportLounge: 'Complimentary access to domestic and international lounges (up to 16 visits per year)\nComplimentary access to select railway lounges',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air Accident Cover: ₹2 crore',
        'Credit Shield: ₹15 lakh',
        'Purchase Protection: ₹50,000',
        'Travel Insurance: Comprehensive coverage for baggage loss, flight delays, and more'
      ],
      movieBenefits: 'Exclusive discounts and offers on movie ticket bookings through BookMyShow',
      diningPrivileges: [
        'Exclusive dining privileges and offers'
      ],
      minimumSpend: '₹8,00,000 for annual fee waiver',
      internationalTransactionFee: '0.99%',
      additionalServices: 'Lifetime free add-on cards for family members',
      idealFor: [
        'High-income individuals with substantial monthly expenditures',
        'Frequent travelers seeking lounge access and travel-related perks',
        'Users who prioritize dining and lifestyle benefits'
      ],
      notIdealFor: [
        'Individuals with moderate or low spending habits',
        'Those seeking a no-frills, low-fee credit card'
      ],
      summary: 'A premium metal credit card offering luxury travel experiences and lifestyle privileges, ideal for high-income individuals and frequent travelers.'
    }
  }
]; 