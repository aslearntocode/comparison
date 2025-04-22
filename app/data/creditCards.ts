export interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
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
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05" }
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
      { comment: "Best travel card I've ever used!", rating: 9.5, date: "2024-03-12" },
      { comment: "Insurance coverage is comprehensive", rating: 8, date: "2024-03-08" }
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
      { comment: "Decent cashback but customer service needs improvement", rating: 6, date: "2024-03-14" },
      { comment: "Good value for money", rating: 7.5, date: "2024-03-11" },
      { comment: "Processing time for cashback is too long", rating: 5, date: "2024-03-07" }
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
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05" }
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
      { comment: "Great for fuel savings at IndianOil", rating: 8, date: "2024-03-15" },
      { comment: "Good dining discounts with EazyDiner", rating: 7, date: "2024-03-10" },
      { comment: "UPI linkage is very convenient", rating: 8.5, date: "2024-03-05" }
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
      { comment: "Great balance of benefits for moderate spenders", rating: 8, date: "2024-03-15" },
      { comment: "Good dining discounts with Dining Delights", rating: 7.5, date: "2024-03-10" },
      { comment: "Decent rewards redemption options", rating: 7, date: "2024-03-05" }
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
      { comment: "Great travel benefits and lounge access", rating: 8.5, date: "2024-03-15" },
      { comment: "Good rewards redemption value on SmartBuy", rating: 8, date: "2024-03-10" },
      { comment: "Excellent insurance coverage", rating: 8, date: "2024-03-05" }
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
  }
]; 