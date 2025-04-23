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
    id: 'emeralde',
    name: 'Emeralde Credit Card',
    bank: 'ICICI Bank',
    image: '/credit-cards/ICICI-Emeralde.png',
    apr: '45% p.a.',
    annualFee: '₹500',
    joiningFee: '₹1,000',
    rewards: 'Earn 2.5% Reward Points on international spends\n Earn 2% Reward Points on domestic spends',
    rupay: true,
    features: ['Universal Cashback', 'Fuel Surcharge Waiver', 'EMI Options'],
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
    id: 'axis-privilege',
    name: 'Axis Bank Privilege Credit Card',
    bank: 'Axis Bank',
    image: '/credit-cards/Axis-Privilege.png',
    apr: '42% p.a.',
    annualFee: '₹1,500 + GST',
    joiningFee: '₹1,500 + GST (Waived for Priority Customers)',
    rewards: '10 EDGE Points per ₹200 spent on all purchases\nPoints redeemable for vouchers, products, and air miles',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Dining Discounts',
      'Fuel Surcharge Waiver',
      'Insurance Coverage',
      'Welcome & Renewal Benefits',
      'Milestone Benefits'
    ],
    feedback: [
      { comment: "Great balance of benefits for moderate spenders", rating: 8, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "axis-privilege", cardName: "Axis Bank Privilege Credit Card" },
      { comment: "Good dining discounts with Dining Delights", rating: 7.5, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "axis-privilege", cardName: "Axis Bank Privilege Credit Card" },
      { comment: "Decent rewards redemption options", rating: 7, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "axis-privilege", cardName: "Axis Bank Privilege Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10 EDGE Points per ₹200 spent on all purchases\n\nRedemption:\n• Points can be redeemed for a variety of products and vouchers\n• Option to convert points to air miles',
      welcomeBonus: 'Welcome Benefits:\n• 12,500 EDGE Reward Points on first transaction within 30 days (redeemable for vouchers worth ₹2,500)\n\nRenewal Benefits:\n• 3,000 EDGE Reward Points upon card renewal',
      milestoneBenefits: [
        'Earn 10,000 EDGE Reward Points (worth ₹2,000) on annual spends of ₹2.5 lakh'
      ],
      airportLounge: '2 complimentary domestic lounge accesses per quarter (8 per year)',
      fuelSurcharge: '1% waiver on fuel transactions between ₹400 and ₹4,000, capped at ₹400 per statement cycle',
      insuranceCover: [
        'Air accident cover',
        'Purchase protection'
      ],
      diningPrivileges: [
        'Up to 20% off at over 4,000 partner restaurants through Axis Bank Dining Delights'
      ],
      minimumSpend: '₹2,50,000 for annual fee waiver',
      internationalTransactionFee: '3.5% + GST (~4.1%)',
      idealFor: [
        'Moderate Spenders: Perfect for individuals with annual spends around ₹2.5 lakh',
        'Balanced Benefits Seekers: Ideal for those seeking a mix of travel, dining, and reward benefits',
        'Points Enthusiasts: Great for users who prefer redeeming points for vouchers or air miles'
      ],
      notIdealFor: [
        'Users with annual spends below ₹2 lakh',
        'Individuals seeking premium international travel benefits',
        'Those looking for zero annual fee cards without spending conditions'
      ],
      summary: 'A well-rounded card offering a good mix of travel, dining, and reward benefits for moderate spenders with annual expenses around ₹2.5 lakh.'
    }
  },
  {
    id: 'hdfc-regalia',
    name: 'HDFC Bank Regalia Credit Card',
    bank: 'HDFC Bank',
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
    feedback: [
      { comment: "Great travel benefits and lounge access", rating: 8.5, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "hdfc-regalia", cardName: "HDFC Bank Regalia Credit Card" },
      { comment: "Good rewards redemption value on SmartBuy", rating: 8, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "hdfc-regalia", cardName: "HDFC Bank Regalia Credit Card" },
      { comment: "Excellent insurance coverage", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "hdfc-regalia", cardName: "HDFC Bank Regalia Credit Card" }
    ],
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
    id: 'hdfc-moneyback-plus',
    name: 'HDFC Bank MoneyBack+ Credit Card',
    bank: 'HDFC Bank',
    image: '/credit-cards/HDFC-MoneyBack+.png',
    apr: '42% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rewards: '2 Reward Points for every ₹150 spent on UPI transactions (excluding fuel, wallet/prepaid card loads, or voucher purchases)',
    rupay: true,
    features: [
      'UPI Transactions',
      'Zero Lost Card Liability',
      'Basic Credit Card Features'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 Reward Points per ₹150 spent on UPI transactions\n• Excludes fuel, wallet/prepaid card loads, and voucher purchases\n• Capped at 500 reward points per calendar month',
      welcomeBonus: '500 Cash Points (applicable only  on payment of membership fee)',
      milestoneBenefits: [
        'Get renewal membership fee waived off by spending ₹50,000 and above in an annual year'
      ],
      minimumSpend: '₹50,000 for annual fee waiver',
      additionalServices: 'Zero Lost Card Liability: Report card loss immediately to avoid liability on fraudulent transactions',
      idealFor: [
        'Budget-conscious individuals seeking a low annual fee card',
        'Users preferring straightforward reward structures',
        'Individuals looking for basic credit card features with essential benefits'
      ],
      notIdealFor: [
        'Users seeking premium travel or lifestyle benefits',
        'High spenders looking for accelerated rewards',
        'Individuals requiring extensive insurance coverage'
      ],
      summary: 'A budget-friendly credit card offering basic features and straightforward rewards on UPI transactions, ideal for cost-conscious users.'
    }
  }
]; 