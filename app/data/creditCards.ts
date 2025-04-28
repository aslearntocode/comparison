export interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
  userId: string;
  userName: string;
  cardId: string;
  cardName: string;
}

export type CardCategory = 'ultra-premium' | 'hotels' | 'airlines' | 'fintech' | 'lifestyle' | 'secured' | 'premium' | 'upi' | 'rewards' | 'cashback' | 'fuel' | 'lifetime-free' | 'forex' | 'emi' | 'domestic-lounge' | 'international-lounge' | 'airlines' | 'hotels' | 'secured';

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
    apr: '43.2% p.a.',
    annualFee: '₹3,000 + GST',
    joiningFee: '₹3,000 + GST',
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
      milestoneBenefits: [
        '10,000 bonus reward points on spending ₹5 lakhs in an anniversary year',
        'Additional 5,000 bonus reward points on spending ₹8 lakhs in an anniversary year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 12 complimentary airport lounge accesses per calendar year (domestic and international combined)\n• Access vouchers to be generated via Regalia SmartBuy portal',
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
      paymentDueDays: '20 days',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '2% on all international transactions',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Features:\n• Contactless Payments: Enabled for fast and secure transactions\n• SmartBuy Portal: Exclusive access for flight and hotel bookings\n• Priority Pass Membership: Available upon meeting eligibility criteria',
      idealFor: [
        'Mid-to-High Spenders: Perfect for individuals with annual spends of ₹5 lakh or more',
        'Frequent Travelers: Ideal for those seeking domestic and international lounge access',
        'Lifestyle Enthusiasts: Great for users looking for a balanced mix of rewards, dining, and protection benefits'
      ],
      notIdealFor: [
        'Users with annual spends below ₹3 lakh',
        'Individuals seeking zero annual fee cards without spending conditions',
        'Those primarily interested in cashback or fuel-specific benefits'
      ],
      summary: 'A premium travel and lifestyle credit card offering comprehensive benefits including lounge access, travel insurance, and enhanced milestone rewards, ideal for frequent travelers and moderate-to-high spenders.'
    }
  },
  {
    id: 'hdfc-regalia',
    name: 'HDFC Regalia Credit Card',
    bank: 'HDFC Bank',
    category: 'hotels',
    image: '/credit-cards/HDFC-Regalia.png',
    apr: '43.2% p.a.',
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
      milestoneBenefits: [
        '10,000 bonus reward points on spending ₹5 lakhs in an anniversary year',
        'Additional 5,000 bonus reward points on spending ₹8 lakhs in an anniversary year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 12 complimentary airport lounge accesses per calendar year (domestic and international combined)\n• Access vouchers to be generated via Regalia SmartBuy portal',
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
      paymentDueDays: '20 days',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '2% on all international transactions',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Features:\n• Contactless Payments: Enabled for fast and secure transactions\n• SmartBuy Portal: Exclusive access for flight and hotel bookings\n• Priority Pass Membership: Available upon meeting eligibility criteria',
      idealFor: [
        'Mid-to-High Spenders: Perfect for individuals with annual spends of ₹5 lakh or more',
        'Frequent Travelers: Ideal for those seeking domestic and international lounge access',
        'Lifestyle Enthusiasts: Great for users looking for a balanced mix of rewards, dining, and protection benefits'
      ],
      notIdealFor: [
        'Users with annual spends below ₹3 lakh',
        'Individuals seeking zero annual fee cards without spending conditions',
        'Those primarily interested in cashback or fuel-specific benefits'
      ],
      summary: 'A premium travel and lifestyle credit card offering comprehensive benefits including lounge access, travel insurance, and enhanced milestone rewards, ideal for frequent travelers and moderate-to-high spenders.'
    }
  },
  {
    id: 'hdfc-pixel-play',
    name: 'PIXEL Play Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/HDFC-Pixel-Play.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rewards: '5% Cashback on choice of any two packs\n3% Cashback on choice of any one E-commerce merchant\n1% Unlimited Cashback across all other spends',
    rupay: true,
    features: [
      'Category-based Cashback',
      'E-commerce Benefits',
      'UPI Rewards',
      'SmartBuy Benefits',
      'Zero Forex Markup',
      'Contactless Payments'
    ],
    categories: [
      'cashback',
      'lifestyle',
      'shopping',
      'upi'
      // 'fintech'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Cashback Structure:\n• 5% Cashback on choice of any two packs:\n  - Dining & Entertainment: BookMyShow & Zomato\n  - Travel: MakeMyTrip & Uber\n  - Grocery: Blinkit & Reliance Smart Bazaar\n  - Electronics: Croma & Reliance Digital\n  - Fashion: Nykaa & Myntra\n• 5% Cashback on SmartBuy\n• 3% Cashback on choice of any one E-commerce merchant\n• Amazon or Flipkart or PayZapp\n• 1% Unlimited Cashback across all other spends\n• 1% Cashback on UPI Spends (Applicable only on PIXEL RuPay Credit Card holders)',
      welcomeBonus: 'Joining Fee waived on spending ₹20,000 within 90 days of issuance',
      milestoneBenefits: ['Annual fee waiver on spending ₹1 lakh or more in the preceding 12 months'],
      idealFor: [
        'Digital Enthusiasts: Perfect for those who prefer seamless app-based experience with HDFC PayZapp integration',
        'Cashback Seekers: Ideal for users looking for high cashback on specific categories and e-commerce',
        'UPI Users: Great for those who want to use UPI transactions with their credit card',
        'Budget-Conscious Individuals: Suitable for users mindful of fees with reasonable spending thresholds'
      ],
      notIdealFor: [
        'International Travelers: Due to 3.5% foreign transaction fee',
        'Users Seeking Versatile Rewards: Cashback is limited to PayZapp ecosystem',
        'Those Expecting Robust Customer Support: Some users report issues with customer service',
        'Individuals with Low or Irregular Spending: May not meet spending thresholds for fee waivers'
      ],
      summary: 'A modern digital-first credit card offering customizable category-based cashback rewards with strong emphasis on e-commerce and UPI transactions, ideal for digital-savvy users who prefer app-based banking.'
    }
  },
  {
    id: 'hdfc-millenia',
    name: 'Millennia Plus Credit Card',
    bank: 'HDFC Bank',
    category: 'lifestyle',
    image: '/credit-cards/HDFC+Millenia+.png',
    apr: '43.2% p.a.',
    annualFee: '₹1,000 + GST',
    joiningFee: '₹1,000 + GST',
    rewards: '5% Cashback on Amazon, BookMyShow, Cult.fit, Flipkart, Myntra, Sony LIV, Swiggy, Tata CLiQ, Uber and Zomato\n1% cashback on other spends',
    rupay: false,
    features: [
      'E-commerce Cashback',
      'Entertainment Benefits',
      'Dining Benefits',
      'Lifestyle Rewards',
      'Fuel Surcharge Waiver',
      'Quarterly Gift Vouchers'
    ],
    categories: [
      'cashback',
      'shopping',
      'entertainment',
      'dining',
      'lifestyle'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Cashback Structure:\n• 5% Cashback on Amazon, BookMyShow, Cult.fit, Flipkart, Myntra, Sony LIV, Swiggy, Tata CLiQ, Uber and Zomato\n• 1% cashback on other spends\n• ₹1,000 worth gift vouchers on spends of ₹1,00,000 and above in each calendar quarter\n• Get 10% additional discount on Swiggy/Dineout using coupon code HDFCARDS_TnC',
      welcomeBonus: '1,000 CashPoints upon payment of the joining fee',
      milestoneBenefits: ['₹1,000 worth of gift vouchers on spends of ₹1,00,000 and above in each calendar quarter'],
      fuelSurcharge: '1% fuel surcharge waiver on transactions between ₹400 and ₹5,000, with a maximum waiver of ₹250 per billing cycle',
      idealFor: [
        'Frequent Online Shoppers: Perfect for those who regularly shop on Amazon, Flipkart, Myntra, Swiggy, Zomato, and Uber',
        'Dining Enthusiasts: Great for users who can benefit from up to 20% discount at partner restaurants via Swiggy Dineout',
        'Fuel Users: Suitable for those who want fuel surcharge waiver benefits',
        'Milestone Seekers: Ideal for users who can meet the spending thresholds for welcome and milestone benefits'
      ],
      notIdealFor: [
        'Low Spenders: Annual fee of ₹1,000 + GST, waived only on annual spends of ₹1 lakh or more',
        'Travel Enthusiasts: No complimentary airport lounge access',
        'Universal Spenders: No cashback on fuel, EMI, wallet loads, rent payments, and government-related transactions'
      ],
      summary: 'A lifestyle-focused credit card offering enhanced cashback on popular e-commerce, entertainment, and food delivery platforms with quarterly milestone benefits, ideal for frequent online shoppers and dining enthusiasts.'
    }
  },
  {
    id: 'hdfc-money-black-plus',
    name: 'MoneyBack+ Credit Card',
    bank: 'HDFC Bank',
    category: 'fintech',
    image: '/credit-cards/HDFC-MoneyBack+.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rewards: '10X CashPoints (3.3% Valueback) on Amazon, Flipkart, Swiggy, Reliance Smart SuperStore & BigBasket\n2 CashPoints per ₹150 spent on other spends',
    rupay: true,
    features: [
      'Enhanced Cashback on Shopping',
      'Dining Benefits',
      'Quarterly Gift Vouchers',
      'UPI Rewards',
      'Fuel Surcharge Waiver',
      'Welcome Points'
    ],
    categories: [
      'cashback',
      'shopping',
      'dining',
      'upi',
      'grocery',
      'lifestyle'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'CashPoints Structure:\n• 10X CashPoints (3.3% Valueback) on Amazon, Flipkart, Swiggy, Reliance Smart SuperStore & BigBasket\n• 2 CashPoints per ₹150 spent on other spends\n• Get ₹500 gift voucher on spends on ₹50,000 per calendar quarter\n• Get 10% additional discount on Swiggy/Dineout using coupon code HDFCARDS_TnC\n\nNote:\nFor Rupay Credit Cardholders, all UPI spends (Excluding fuel, Wallet / Prepaid Card loads or Voucher Purchases) will earn 2 RPs for every Rs.150 spent and is capped at 500 reward points in a calendar month.',
      welcomeBonus: '500 Cash Points (applicable only on payment of membership fee)',
      milestoneBenefits: ['Spend ₹50,000 or more in a year, before your Credit Card renewal date and get your renewal fee waived off'],
      fuelSurcharge: '1% waiver on transactions between ₹400-₹5,000',
      idealFor: [
        'Online Shoppers: Perfect for those who frequently shop on Amazon, Flipkart, BigBasket, Reliance Smart SuperStore, or order food via Swiggy',
        'Budget-Conscious Users: Ideal for those seeking low annual fees with reasonable waiver options',
        'Credit History Builders: Suitable for beginners with relaxed eligibility criteria',
        'Dining Enthusiasts: Great for users who can benefit from dining discounts at partner restaurants'
      ],
      notIdealFor: [
        'Travel Enthusiasts: No complimentary lounge access or travel insurance',
        'High Spenders: Those seeking premium perks might prefer HDFC Millennia or Regalia cards',
        'Reward Point Maximizers: Low redemption value (1 CashPoint = ₹0.25) and minimum redemption threshold',
        'Universal Spenders: No rewards on fuel, wallet loads, voucher purchases, rent payments, or government transactions'
      ],
      summary: 'A rewarding cashback credit card with strong benefits on everyday spending categories like online shopping, grocery, and food delivery, ideal for online shoppers and budget-conscious users.'
    }
  },
  {
    id: 'hdfc-swiggy',
    name: 'Swiggy HDFC Bank Credit Card',
    bank: 'HDFC Bank',
    category: 'lifestyle',
    image: '/Credit-card-2.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rewards: '10% Cashback on Swiggy application (Food ordering, Instamart, Dineout & Genie)\n5% Cashback on online spends across online MCCs\n1% Cashback on other categories',
    rupay: false,
    features: [
      'Enhanced Swiggy Cashback',
      'Online Shopping Benefits',
      'Swiggy One Membership',
      'Card Activation Benefits',
      'Annual Fee Waiver',
      'Welcome Benefits'
    ],
    categories: [
      'cashback',
      'dining',
      'food-delivery',
      'lifestyle'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Cashback Structure:\n• 10% Cashback on Swiggy application (Food ordering, Instamart, Dineout & Genie)\n• 5% Cashback on online spends across online MCCs\n• 1% Cashback on other categories\n\nSwiggy One Benefits:\n• Unlimited benefits across restaurants, Instamart and Genie orders on Swiggy\n• Free delivery and exclusive discounts from select restaurants',
      welcomeBonus: 'Welcome Benefits:\n• Complimentary Swiggy One Membership for 3 months\n• 500 reward points on first transaction\n• 10% cashback up to ₹500 on first Swiggy order\n• 5% cashback up to ₹250 on first online transaction',
      milestoneBenefits: ['Spend ₹2,00,000 or more in a year, before your Credit Card renewal date and get your renewal fee waived off'],
      additionalServices: 'Card Activation Process:\n• Making a transaction using the Credit Card\n• To use the card via OTP or IVR, setting PIN for the card, and enabling card controls such as online transactions, enabling international transactions etc.\n\nImportant Notes:\n• Cardholder is eligible for welcome benefit on card activation\n• The customers need to claim \'Swiggy One\' on Swiggy app post card activation to unlock the benefit\n• This option will be available on the Swiggy app within 2-3 days of card activation',
      summary: 'A co-branded credit card offering premium benefits for Swiggy users with enhanced cashback on food delivery, Instamart, and online shopping.',
      idealFor: [
        'Frequent Swiggy users (food delivery, Instamart, Dineout)',
        'Regular online shoppers',
        // 'Food delivery enthusiasts',
        'Users who prefer cashback over reward points',
        'Those who want a simple, straightforward rewards structure'
      ],
      notIdealFor: [
        'Users who rarely order food online',
        'Those seeking travel benefits or lounge access',
        'International travelers',
        'Users who prefer premium lifestyle benefits',
        'Those who primarily use offline shopping'
      ],
    }
  },
  // Airlines Cards
  {
    id: 'axis-privilege',
    name: 'Axis Bank Privilege Credit Card',
    bank: 'Axis Bank',
    category: 'airlines',
    image: '/credit-cards/Axis-Privilege.png',
    apr: '52.86% p.a.',
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
      // 'fuel'
    ],
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "sapphiro", cardName: "Sapphiro Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 points per ₹100 on domestic retail spends (excluding fuel)\n• 4 points per ₹100 on international spends\n• 1 point per ₹100 on utilities and insurance payments\n\nRedemption:\n• Points can be redeemed for a variety of products, vouchers, and even converted to air miles',
      welcomeBonus: 'Welcome Benefits:\n• Welcome vouchers worth ₹9,000\n• Complimentary Bose IE2 Headphones\n• Premium lifestyle vouchers',
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
    category: 'premium',
    image: '/credit-cards/ICICI-Emeralde-Metal.png',
    apr: '45% p.a.',
    annualFee: '₹12,499 + GST',
    joiningFee: '₹12,499 + GST',
    rewards: 'Earn 6 ICICI Reward Points per ₹200 on retail spends\nApplicable to grocery, education, utilities, and insurance payments',
    rupay: false,
    features: ['Priority Pass', 'Travel Insurance', 'Forex Markup 1%'],
    categories: [
      'premium',
      'rewards',
      'travel',
      'international-travel',
      'domestic-lounge',
      'international-lounge',
      'hotel',
      'hotels',
      // 'upi'
    ],
    feedback: [
      { comment: "Best travel card I've ever used!", rating: 9.5, date: "2024-03-12", userId: "user123", userName: "John Doe", cardId: "emeralde-private-metal", cardName: "Emeralde Private Metal Credit Card" },
      { comment: "Insurance coverage is comprehensive", rating: 8, date: "2024-03-08", userId: "user456", userName: "Jane Smith", cardId: "emeralde-private-metal", cardName: "Emeralde Private Metal Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 6 ICICI Reward Points per ₹200 on retail spends\n• Applicable to grocery, education, utilities, and insurance payments\n\nRedemption:\n• 1 Reward Point = up to ₹1 for flights, hotels, and select brand vouchers\n• ₹0.60 for rewards catalogue\n• ₹0.40 for statement credit\n\nCaps:\n• 1,000 points per category per statement cycle for grocery, education, and utilities\n• 5,000 points per statement cycle for insurance payments',
      welcomeBonus: 'Welcome Benefits:\n• 12,500 ICICI Reward Points\n• Taj Epicure Membership\n• EazyDiner Prime Membership\n• Luxury gift vouchers worth ₹15,000',
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
    id: 'sapphiro',
    name: 'Sapphiro Credit Card',
    bank: 'ICICI Bank',
    category: 'premium',
    image: '/credit-cards/ICICI-Sapphiro.png',
    apr: '45% p.a.',
    annualFee: '₹3,500 + GST',
    joiningFee: '₹6,500 + GST',
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
      'international-lounge',
      // 'fuel',
      // 'lifestyle'
    ],
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "sapphiro", cardName: "Sapphiro Credit Card" }
    ],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 points per ₹100 on domestic retail spends (excluding fuel)\n• 4 points per ₹100 on international spends\n• 1 point per ₹100 on utilities and insurance payments\n\nRedemption:\n• Points can be redeemed for a variety of products, vouchers, and even converted to air miles',
      welcomeBonus: 'Welcome Benefits:\n• Welcome vouchers worth over ₹9,000\n• Tata CLiQ voucher worth ₹3,000\n• EaseMyTrip vouchers worth ₹6,000\n• Complimentary Bose IE2 Headphones',
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
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: 'Earn 4 points per ₹100 on international spends\nEarn 2 points per ₹100 on domestic retail spends\nEarn 1 point per ₹100 on utilities and insurance payments',
    rupay: false,
    features: [
      // 'Airport Lounge Access',
      // 'Golf Privileges',
      'Entertainment Offers',
      'Dining Discounts',
      'Fuel Surcharge Waiver',
      'Chip and PIN Security'
    ],
    categories: [
      // 'best-credit-cards',
      'rewards',
      // 'domestic-lounge',
      // 'international-lounge',
      // 'fuel',
      'fintech',
      'lifetime-free'
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
    id: 'onecard',
    name: 'OneCard',
    bank: 'OneCard',
    category: 'fintech',
    image: '/credit-cards/OneCard.png',
    apr: '42% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
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
      // 'travel',
      // 'international-travel',
      // 'domestic-lounge',
      // 'international-lounge',
      'fintech'
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
    apr: '52.86% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
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
      'upi',
      'lifetime-free',
      'fintech'
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
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: 'Up to 2% cashback on every transaction\nWeekly deals and discounts\nFuel surcharge waiver\nRental convenience fee waiver',
    rupay: false,
    features: [
      'Instant Cashback',
      'EMI Facility',
      'Wide Acceptance',
      'Slice Spark Deals',
      'Fuel Surcharge Waiver',
      'Rental Convenience Fee Waiver'
    ],
    categories: [
      'best-credit-cards',
      'rewards',
      'cashback',
      // 'fuel',
      'lifetime-free',
      'fintech'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Up to 2% cashback on every transaction\n• Cashback credited as "Monies" in Slice account\n\nRedemption:\n• Instant redemption of cashback\n• Weekly deals and discounts through Slice Spark',
      welcomeBonus: 'No specific welcome benefits. Instead, provides consistent benefits that apply to all users:\n• Up to 2% Instant Cashback on every transaction\n• No joining or annual fees\n• Lifetime free card with no hidden charges',
      milestoneBenefits: ['No specific milestone benefits. Instead, provides consistent benefits that apply to all users'],
      fuelSurcharge: 'Waiver of up to ₹200 per billing cycle on fuel transactions below ₹5,000',
      insuranceCover: [
        'No specific insurance coverage mentioned'
      ],
      minimumSpend: 'Not applicable',
      paymentDueDays: 'Varies based on billing cycle',
      creditLimit: '₹2,000 to ₹10,00,000 based on user profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'Not specified',
      interestRate: '42% p.a.',
      emiOptions: 'Available with flexible repayment options:\n• Split monthly bills into three equal installments without any extra fee or interest',
      additionalServices: 'Additional Features:\n• Card Replacement Fee: ₹500\n• ATM Cash Withdrawal Fee: ₹50 per transaction\n• Late Payment Charges: Varies based on outstanding amount\n• Rental Convenience Fee Waiver: Up to ₹300 per month on rental transactions below ₹10,000 via PhonePe & NoBroker\n• Wide Acceptance: Accepted at 99.95% of merchants across India that accept Visa cards\n• Slice Spark Deals: Access to exclusive weekly deals and discounts across various brands',
      idealFor: [
        'Young professionals and students',
        'First-time credit users',
        'Digital-first users',
        'Budget-conscious individuals',
        'Those seeking flexible EMI options'
      ],
      notIdealFor: [
        'Users seeking premium travel benefits',
        'Those requiring extensive insurance coverage',
        'Individuals needing high credit limits',
        'Users who prefer traditional banking services'
      ],
      summary: 'A digital-first credit card alternative designed for young professionals, students, and first-time credit users, offering up to 2% instant cashback, flexible EMIs, and no annual or joining fees.'
    }
  },
  {
    id: 'idfc-first-wealth',
    name: 'IDFC FIRST Wealth Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'lifestyle',
    image: '/credit-cards/IDFC-First-Wealth.png',
    apr: '46.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: '10X rewards on weekend dining\n5X rewards on online shopping\n2X rewards on all other spends',
    rupay: false,
    features: [
      'Airport Lounge Access',
      'Movie Benefits',
      'Travel Insurance',
      'Dining Privileges',
      'Online Shopping Benefits',
      'Contactless Payments'
    ],
    categories: [
      'rewards',
      'travel',
      'domestic-lounge',
      'dining',
      'lifestyle',
      'lifetime-free'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10X rewards on weekend dining\n• 5X rewards on online shopping\n• 2X rewards on all other spends\n\nRedemption:\n• Points can be redeemed for flights, hotels, and vouchers\n• Reward points never expire',
      welcomeBonus: 'Welcome Benefits:\n• ₹500 voucher on spending ₹5,000 or more within first 30 days\n• 5% cashback on EMI conversion (up to ₹1,000)\n• Buy 1 Get 1 Free movie tickets on Paytm (up to ₹500, twice per month)',
      milestoneBenefits: [
        'Complimentary golf round for every ₹20,000 spent in a statement cycle (up to 2 rounds per cycle)',
        'Trip cancellation cover of up to ₹10,000',
        '10X reward points on eligible spends (points never expire)'
      ],
      airportLounge: 'Airport Lounge Access:\n• Complimentary access to domestic and international airport lounges\n• Access to airport spas',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air Accident Cover: ₹1 crore',
        'Purchase Protection: ₹50,000',
        'Travel Insurance: Comprehensive coverage including trip cancellation up to ₹10,000'
      ],
      movieBenefits: 'Buy 1 Get 1 Free on movie tickets through Paytm app (up to ₹500, twice per month)',
      diningPrivileges: [
        'Up to 20% discount at over 1,500 restaurants',
        '10X rewards on weekend dining'
      ],
      minimumSpend: '₹5,000 within first 30 days for welcome voucher',
      idealFor: [
        'Frequent travelers seeking lounge access and travel benefits',
        'Regular diners looking for enhanced dining rewards',
        'Online shoppers wanting accelerated rewards',
        'Golf enthusiasts',
        'Health and wellness conscious individuals'
      ],
      notIdealFor: [
        'Users with minimal travel requirements',
        'Those seeking basic cashback features',
        'Individuals with low monthly spending',
        'Budget-conscious users'
      ],
      summary: 'A premium lifetime-free credit card offering comprehensive benefits including enhanced rewards, lounge access, golf privileges, and extensive dining and wellness discounts, ideal for frequent travelers and lifestyle enthusiasts.'
    }
  },
  {
    id: 'idfc-mayura-metal',
    name: 'IDFC Mayura Metal Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'premium',
    image: '/credit-cards/IDFC-First-Maurya.png',
    apr: '46.2% p.a.',
    annualFee: '₹5,999 + GST',
    joiningFee: '₹5,999 + GST',
    rewards: 'Zero forex markup\nEnhanced rewards on international spends\nPremium lifestyle benefits',
    rupay: false,
    features: [
      'Zero Forex Markup',
      'ATM Withdrawals',
      'Premium Metal Design',
      'International Lounge Access',
      'Travel Insurance',
      'Concierge Services'
    ],
    categories: [
      'premium',
      // 'international-travel',
      // 'international-lounge',
      'metal'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Zero forex markup on international transactions\n• Enhanced rewards on international spends\n• Premium lifestyle benefits',
      welcomeBonus: 'Welcome Benefits:\n• Premium welcome benefits worth ₹15,000\n• Luxury gift vouchers\n• Exclusive dining experiences',
      milestoneBenefits: [
        'Complimentary luxury airport transfers worth ₹10,000 on spends of ₹10 lakh',
        'Exclusive dining experiences worth ₹15,000 on spends of ₹20 lakh',
        'Luxury hotel stay vouchers worth ₹25,000 on spends of ₹30 lakh',
        'Premium lifestyle vouchers worth ₹35,000 on spends of ₹40 lakh',
        'Annual fee waiver on spends of ₹50 lakh'
      ],
      airportLounge: 'Unlimited international lounge access via Priority Pass',
      insuranceCover: [
        'Comprehensive travel insurance coverage'
      ],
      diningPrivileges: [
        '25% off on breakfast-inclusive stays',
        '25% off on dining at IHCL properties',
        '25% off on spa therapies',
        '25% off on Qmin food deliveries'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Not specified',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'Not specified',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Benefits:\n• Four complimentary Blacklane chauffeured transfers annually\n• Up to 5% off on Emirates flights\n• 15% off on duty-free shopping at domestic airports\n• Lifestyle discounts on brands like Starbucks, PVR Cinemas, Swiggy, Zomato, and Tira\n\nLounge Access Benefits:\n• Unlimited domestic lounge access via DreamFolks\n• Unlimited international lounge access via Priority Pass\n• Complimentary access for primary and add-on cardholders\n• Access to over 1,300 lounges worldwide\n• Complimentary spa services at select lounges\n• Complimentary dining at select airport restaurants',
      idealFor: [
        'International travelers seeking zero forex benefits',
        'High-net-worth individuals',
        'Frequent international shoppers'
      ],
      notIdealFor: [
        'Domestic-only users',
        'Budget-conscious individuals',
        'Those seeking basic credit card features'
      ],
      summary: 'A premium metal credit card offering zero forex markup, unlimited international lounge access, and premium lifestyle benefits, ideal for international travelers.'
    }
  },
  {
    id: 'idfc-first-classic',
    name: 'IDFC FIRST Classic Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'fintech',
    image: '/credit-cards/IDFC-First-Classic.png',
    apr: '46.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: '10X rewards on all spends\nNo annual fee on first year',
    rupay: true,
    features: [
      '10X Rewards',
      'No Annual Fee First Year',
      'Contactless Payments',
      'Online Shopping Benefits',
      'Fuel Surcharge Waiver',
      'EMI Options'
    ],
    categories: [
      'rewards',
      'first-time',
      'lifetime-free'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10X rewards on all spends\n• No cap on reward points\n\nRedemption:\n• Points can be redeemed for vouchers and statement credit',
      welcomeBonus: 'No annual fee for the first year',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
      minimumSpend: '₹1,00,000 for annual fee waiver',
      idealFor: [
        'First-time credit card users',
        'Entry-level card seekers',
        'Regular shoppers and bill payers'
      ],
      notIdealFor: [
        'Premium card seekers',
        'Frequent travelers',
        'High-spending individuals'
      ],
      summary: 'An entry-level credit card offering 10X rewards and no annual fee in the first year, perfect for first-time credit card users.'
    }
  },
  {
    id: 'idfc-first-select',
    name: 'IDFC FIRST Select Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'rewards',
    image: '/credit-cards/IDFC-First-Select.png',
    apr: '46.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: 'Enhanced rewards on lifestyle spends\nLounge access\nComprehensive insurance',
    rupay: true,
    features: [
      'Airport Lounge Access',
      'Lifestyle Benefits',
      'Travel Insurance',
      'Dining Privileges',
      'Shopping Benefits',
      'Contactless Payments',
      'UPI Linkage',
      'Railway Lounge Access',
      'Roadside Assistance'
    ],
    categories: [
      'lifestyle',
      'domestic-lounge',
      'upi',
      'lifetime-free',
      'rewards'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10X reward points on birthday month\n• 20 bonus Reward Points for every ₹100 spent on hotel bookings\n• 3X rewards on UPI transactions\n• Unlimited reward points with no expiry',
      welcomeBonus: 'Welcome Benefits:\n• ₹500 voucher on spending ₹5,000 within first 30 days\n• 5% cashback on EMI conversion (up to ₹1,000) within first 30 days\n• Buy 1 Get 1 Free movie tickets on Paytm (up to ₹500, twice per month)',
      milestoneBenefits: [
        '10X reward points on all purchases during birthday month',
        'Unlimited reward points with no expiry',
        '1% fuel surcharge waiver (up to ₹300 per month)',
        'Roadside assistance worth ₹1,399 annually',
        'Up to 15% discount at over 3,000 health and wellness outlets'
      ],
      airportLounge: 'Airport Lounge Access:\n• 4 complimentary access per quarter to select domestic terminal airport lounges\n• 4 complimentary visits per quarter to select railway lounges',
      fuelSurcharge: '1% waiver on fuel transactions (up to ₹300 per month)',
      insuranceCover: [
        'Trip cancellation cover of up to ₹10,000',
        'Comprehensive travel insurance coverage'
      ],
      movieBenefits: 'Buy 1 Get 1 Free on movie tickets through Paytm app (up to ₹500, twice per month)',
      diningPrivileges: [
        'Enhanced rewards on dining spends',
        'Exclusive dining offers and discounts'
      ],
      minimumSpend: '₹5,000 within first 30 days for welcome voucher',
      idealFor: [
        'Frequent travelers seeking lounge access',
        'Regular diners looking for enhanced rewards',
        'UPI payment users',
        'Health and wellness conscious individuals',
        'Those seeking lifetime-free credit cards'
      ],
      notIdealFor: [
        'Users with minimal travel requirements',
        'Those seeking basic cashback features',
        'Individuals with low monthly spending',
        'Budget-conscious users'
      ],
      summary: 'A lifetime-free credit card offering comprehensive benefits including enhanced rewards, lounge access, UPI linkage, and extensive health and wellness discounts, ideal for frequent travelers and lifestyle enthusiasts.'
    }
  },
  {
    id: 'idfc-first-swyp',
    name: 'IDFC FIRST SWYP Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'lifestyle',
    image: '/credit-cards/IDFC-First-SWYP.png',
    apr: '46.2% p.a.',
    annualFee: '₹1,000 + GST',
    joiningFee: '₹1,000 + GST',
    rewards: 'Customizable rewards\nBenefits worth ₹30,000/year',
    rupay: true,
    features: [
      'Customizable Benefits',
      'Flexible Rewards',
      'Contactless Payments',
      'Online Shopping Benefits',
      'Fuel Surcharge Waiver',
      'EMI Options'
    ],
    categories: [
      'rewards',
      'customizable',
      'lifestyle'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Customizable reward categories\n• Flexible redemption options\n\nRedemption:\n• Points can be redeemed for preferred categories',
      welcomeBonus: 'Welcome Benefits:\n• 5,000 reward points on first EMI transaction\n• 1% cashback on first EMI purchase\n• Zero processing fee on first EMI conversion\n• Complimentary movie ticket on first EMI transaction',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
      minimumSpend: '₹2,00,000 for annual fee waiver',
      idealFor: [
        'Tailored benefit seekers',
        'Flexible reward collectors',
        'Regular card users'
      ],
      notIdealFor: [
        'Fixed benefit seekers',
        'Premium card users',
        'Minimal spenders'
      ],
      summary: 'A flexible credit card offering customizable rewards and benefits worth ₹30,000 per year, perfect for those seeking tailored benefits.'
    }
  },
  {
    id: 'idfc-first-wow',
    name: 'IDFC FIRST WOW! Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'secured',
    image: '/credit-cards/IDFC-First-Wow.png',
    apr: 'Based on FD rate',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: '5% cashback on first EMI purchase\n10X reward points on birthday month\n3X rewards on UPI transactions',
    rupay: false,
    features: [
      '5% cashback on first EMI purchase',
      '1% fuel surcharge waiver',
      'Up to 48 days interest-free period',
      'Minimum FD amount: ₹10,000',
      'UPI Linkage',
      'Railway Lounge Access',
      'Roadside Assistance',
      'Airport Lounge Access',
      'Health & Wellness Discounts'
    ],
    categories: ['secured', 'lifetime-free', 'rewards'],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10X reward points on birthday month\n• 20 bonus Reward Points for every ₹100 spent on hotel bookings\n• 3X rewards on UPI transactions\n• Unlimited reward points with no expiry',
      welcomeBonus: 'Welcome Benefits:\n• ₹500 voucher on spending ₹5,000 within first 30 days\n• 5% cashback on EMI conversion (up to ₹1,000) within first 30 days\n• Buy 1 Get 1 Free movie tickets on Paytm (up to ₹500, twice per month)',
      milestoneBenefits: [
        '10X reward points on all purchases during birthday month',
        'Unlimited reward points with no expiry',
        '1% fuel surcharge waiver (up to ₹300 per month)',
        'Roadside assistance worth ₹1,399 annually',
        'Up to 15% discount at over 3,000 health and wellness outlets'
      ],
      airportLounge: 'Airport Lounge Access:\n• 4 complimentary access per quarter to select domestic terminal airport lounges\n• 4 complimentary visits per quarter to select railway lounges',
      fuelSurcharge: '1% waiver on fuel transactions (up to ₹300 per month)',
      insuranceCover: [
        'Trip cancellation cover of up to ₹10,000',
        'Comprehensive travel insurance coverage'
      ],
      movieBenefits: 'Buy 1 Get 1 Free on movie tickets through Paytm app (up to ₹500, twice per month)',
      diningPrivileges: [
        'Enhanced rewards on dining spends',
        'Exclusive dining offers and discounts'
      ],
      minimumSpend: '₹5,000 within first 30 days for welcome voucher',
      idealFor: [
        'First-time credit card users',
        'Those seeking to build credit history',
        'UPI payment users',
        'Health and wellness conscious individuals',
        'Those seeking lifetime-free credit cards'
      ],
      notIdealFor: [
        'Users with established credit history',
        'Those seeking premium travel benefits',
        'Individuals with low monthly spending',
        'Budget-conscious users'
      ],
      summary: 'A lifetime-free secured credit card offering comprehensive benefits including enhanced rewards, lounge access, UPI linkage, and extensive health and wellness discounts, ideal for first-time credit card users and those seeking to build credit history.'
    }
  },
  {
    id: 'idfc-hpcl-power-plus',
    name: 'IDFC HPCL Power+ Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'fuel',
    image: '/credit-cards/IDFC-First-HPCL.png',
    apr: '46.2% p.a.',
    annualFee: '₹499 + GST',
    joiningFee: '₹499 + GST',
    rewards: 'Enhanced fuel savings\nSurcharge waiver\nBasic rewards on other spends',
    rupay: true,
    features: [
      'Fuel Savings',
      'Surcharge Waiver',
      'Contactless Payments',
      'Online Shopping Benefits',
      'EMI Options'
    ],
    categories: [
      'fuel',
      'budget'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Enhanced rewards on fuel spends\nBasic rewards on other spends',
      welcomeBonus: 'No welcome benefits',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
      minimumSpend: 'Not applicable',
      idealFor: [
        'Frequent drivers',
        'Regular fuel purchasers',
        'Budget-conscious users'
      ],
      notIdealFor: [
        'Non-drivers',
        'Premium card seekers',
        'Those seeking extensive benefits'
      ],
      summary: 'A fuel-focused credit card offering enhanced savings on fuel purchases and surcharge waiver, ideal for frequent drivers.'
    }
  },
  {
    id: 'idfc-hpcl-power',
    name: 'IDFC HPCL Power Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'fuel',
    image: '/credit-cards/IDFC-First-HPCL.png',
    apr: '46.2% p.a.',
    annualFee: '₹199 + GST',
    joiningFee: '₹199 + GST',
    rewards: 'Basic fuel savings\nSurcharge waiver\nMinimal rewards on other spends',
    rupay: true,
    features: [
      'Basic Fuel Savings',
      'Surcharge Waiver',
      'Contactless Payments',
      'Online Shopping Benefits',
      'EMI Options'
    ],
    categories: [
      'fuel',
      'budget'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Basic rewards on fuel spends\nMinimal rewards on other spends',
      welcomeBonus: 'No welcome benefits',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
      minimumSpend: 'Not applicable',
      idealFor: [
        'Budget-conscious drivers',
        'Occasional fuel purchasers',
        'Basic card seekers'
      ],
      notIdealFor: [
        'Non-drivers',
        'Premium card seekers',
        'Those seeking extensive benefits'
      ],
      summary: 'A budget-friendly fuel credit card offering basic savings on fuel purchases and surcharge waiver, ideal for budget-conscious drivers.'
    }
  },
  {
    id: 'axis-iocl',
    name: 'Axis Bank IOCL Credit Card',
    bank: 'Axis Bank',
    category: 'fuel',
    image: '/credit-cards/Axis-IndianOil.png',
    apr: '42% p.a.',
    annualFee: '₹500 + GST (1st Year: Nil)',
    joiningFee: '₹500 + GST',
    rewards: 'Enhanced fuel savings at IOCL outlets\nSurcharge waiver\nBasic rewards on other spends',
    rupay: true,
    features: [
      'Enhanced Fuel Savings',
      'Surcharge Waiver',
      'Contactless Payments',
      'Online Shopping Benefits',
      'EMI Options'
    ],
    categories: [
      'fuel',
      'budget'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Enhanced rewards on fuel spends at IOCL outlets\nBasic rewards on other spends',
      welcomeBonus: 'No welcome benefits',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
      minimumSpend: 'Not applicable',
      idealFor: [
        'Frequent drivers',
        'Regular IOCL fuel purchasers',
        'Budget-conscious users'
      ],
      notIdealFor: [
        'Non-drivers',
        'Premium card seekers',
        'Those seeking extensive benefits'
      ],
      summary: 'A fuel-focused credit card offering enhanced savings on IOCL fuel purchases and surcharge waiver, ideal for frequent drivers.'
    }
  },
  {
    id: 'icici-times-black',
    name: 'ICICI Bank Times Black Credit Card',
    bank: 'ICICI Bank',
    category: 'premium',
    image: '/credit-cards/ICICI-Black.png',
    apr: '44% p.a.',
    annualFee: '₹20,000 + GST',
    joiningFee: '₹20,000 + GST',
    rewards: '2.5% reward points on international spends\n2% reward points on domestic spends\nAccelerated rewards via ICICI Bank iShop platform (up to 24% on select purchases)',
    rupay: false,
    features: [
      'Unlimited Lounge Access',
      'Concierge Services',
      'Fuel Surcharge Waiver',
      'Zero Cancellation Charges',
      'Premium Event Access',
      'Luxury Transfers'
    ],
    categories: [
      'premium',
      'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2.5% reward points on international spends\n• 2% reward points on domestic spends\n• Accelerated rewards via ICICI Bank iShop platform (up to 24% on select purchases)\n\nRedemption:\n• Flights, hotels, and premium brand vouchers (1 RP = ₹1)\n• Statement credit redemption at ₹0.40 per RP',
      welcomeBonus: 'Welcome Benefits:\n• EaseMyTrip luxury hotel voucher worth ₹10,000\n• Visa assistance services via Atlys and OneVasco worth ₹10,000\n• Zomato Gold annual membership\n• Lifestyle gift cards worth ₹4,000\n• Exclusive access to The Quorum Club',
      milestoneBenefits: [
        'Klook experiences worth ₹10,000 on spends of ₹5 lakh',
        'Luxury airport transfers via BLADE India/Avis/Indian Travel House worth ₹10,000 on spends of ₹10 lakh',
        'Tata CLiQ Luxury gift card worth ₹10,000 on spends of ₹15 lakh',
        'One-night luxury stay at Ayatana Resorts worth ₹20,000 on spends of ₹20 lakh',
        'Annual fee waiver on spends of ₹25 lakh'
      ],
      airportLounge: 'Unlimited complimentary access to domestic and international airport lounges',
      fuelSurcharge: '1% fuel surcharge waiver (up to ₹1,000 per statement cycle)',
      insuranceCover: [
        'Zero cancellation charges on select flight and hotel bookings (limited to 2 incidents per year, up to ₹12,000)'
      ],
      minimumSpend: '₹25,00,000 for annual fee waiver',
      internationalTransactionFee: '1.49% forex markup fee on international transactions',
      additionalServices: 'Additional Features:\n• 24x7 concierge services via i-Assist\n• Special discounts on brands like Apple, Tumi, Interflora, Kaya Skin Clinic\n• Access to premium events organized by The Times Group, including Times Lit Fest and ET Startup Awards',
      idealFor: [
        'Ultra-HNIs and frequent travelers',
        'High-spending individuals who can meet the ₹25 lakh annual spend requirement',
        'Those seeking premium lifestyle benefits and exclusive event access',
        'International travelers looking for comprehensive travel benefits'
      ],
      notIdealFor: [
        'Budget-conscious individuals',
        'Those with annual spending below ₹25 lakh',
        'Users seeking basic credit card features',
        'Individuals who cannot utilize premium lifestyle benefits'
      ],
      summary: 'A super-premium lifestyle credit card offering comprehensive travel benefits, exclusive event access, and premium lifestyle privileges, ideal for ultra-HNIs and frequent travelers who can meet the high annual spend requirement.'
    }
  },
  {
    id: 'hdfc-indigo-6e-rewards',
    name: 'HDFC Bank IndiGo 6E Rewards Credit Card',
    bank: 'HDFC Bank',
    category: 'airlines',
    image: '/credit-cards/HDFC-Indigo.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rewards: '2.5% 6E Rewards on IndiGo bookings\n2% on dining, groceries, and entertainment\n1% on other spends',
    rupay: false,
    features: [
      'Complimentary IndiGo Flight Ticket',
      '6E Prime Add-on Voucher',
      'Interest-free Credit Period',
      'Zero Lost Card Liability',
      'Partner Benefits',
      'Contactless Payments'
    ],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2.5% 6E Rewards on IndiGo bookings\n• 2% on dining, groceries, and entertainment\n• 1% on other spends\n\nRedemption:\n• 6E Rewards can be redeemed for IndiGo flight bookings and other services via the IndiGo website or app',
      welcomeBonus: 'Welcome Benefits:\n• Complimentary IndiGo flight ticket worth ₹1,500 (on meeting spend criteria)\n• 6E Prime Add-on voucher worth ₹899',
      airportLounge: 'Not specified',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Zero lost card liability on reporting'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Up to 50 days interest-free credit period',
      additionalServices: 'Additional Benefits:\n• Up to 10% 6E Rewards on IndiGo feature partners\n• Interest-free credit period up to 50 days\n• Zero lost card liability on reporting',
      idealFor: [
        'Frequent IndiGo flyers',
        'Regular travelers on domestic routes',
        'Those seeking airline-specific rewards'
      ],
      notIdealFor: [
        'International travelers',
        'Those seeking premium travel benefits',
        'Users who rarely fly with IndiGo'
      ],
      summary: 'A co-branded credit card offering enhanced rewards on IndiGo bookings and partner spends, ideal for frequent IndiGo flyers.'
    }
  },
  {
    id: 'sbi-krisflyer',
    name: 'SBI Card KrisFlyer Credit Card',
    bank: 'SBI Card',
    category: 'airlines',
    image: '/credit-cards/SBI-KrisFlyer.png',
    apr: '45% p.a.',
    annualFee: '₹2,999 + GST',
    joiningFee: '₹2,999 + GST',
    rewards: '5 KrisFlyer miles per ₹200 spent on Singapore Airlines, Scoot, Pelago, Kris+, and KrisShop\n2 KrisFlyer miles per ₹200 on other spends',
    rupay: false,
    features: [
      'KrisFlyer Miles',
      'Domestic Lounge Access',
      'Air Accident Insurance',
      'Travel Benefits',
      'Contactless Payments',
      'EMI Options'
    ],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge',
      'international-travel'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 5 KrisFlyer miles per ₹200 spent on Singapore Airlines, Scoot, Pelago, Kris+, and KrisShop\n• 2 KrisFlyer miles per ₹200 on other spends\n\nRedemption:\n• KrisFlyer miles can be redeemed for flights, upgrades, and other services within the Singapore Airlines Group',
      welcomeBonus: 'Welcome Benefits:\n• 3,000 KrisFlyer miles on first spend within 60 days',
      airportLounge: 'Complimentary domestic lounge access',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air accident insurance cover up to ₹3.5 crore'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Not specified',
      additionalServices: 'Additional Benefits:\n• Complimentary domestic lounge access\n• Air accident insurance cover up to ₹3.5 crore',
      idealFor: [
        'Frequent Singapore Airlines flyers',
        'International travelers',
        'Those seeking airline miles'
      ],
      notIdealFor: [
        'Domestic-only travelers',
        'Budget-conscious users',
        'Those who rarely fly with Singapore Airlines'
      ],
      summary: 'A co-branded credit card offering KrisFlyer miles on spends, ideal for frequent Singapore Airlines flyers and international travelers.'
    }
  },
  {
    id: 'sbi-krisflyer-apex',
    name: 'SBI Card KrisFlyer Apex Credit Card',
    bank: 'SBI Card',
    category: 'airlines',
    image: '/credit-cards/SBI-Apex.png',
    apr: '45% p.a.',
    annualFee: '₹9,999 + GST',
    joiningFee: '₹9,999 + GST',
    rewards: '10 KrisFlyer miles per ₹200 spent on Singapore Airlines, Scoot, Pelago, Kris+, and KrisShop\n8 KrisFlyer miles per ₹200 on overseas spends\n6 KrisFlyer miles per ₹200 on other spends',
    rupay: false,
    features: [
      'KrisFlyer Miles',
      'International Lounge Access',
      'Air Accident Insurance',
      'Travel Benefits',
      'Contactless Payments',
      'EMI Options'
    ],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge',
      // 'international-lounge',
      // 'international-travel'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10 KrisFlyer miles per ₹200 spent on Singapore Airlines, Scoot, Pelago, Kris+, and KrisShop\n• 8 KrisFlyer miles per ₹200 on overseas spends\n• 6 KrisFlyer miles per ₹200 on other spends\n\nRedemption:\n• KrisFlyer miles can be redeemed for flights, upgrades, and other services within the Singapore Airlines Group',
      welcomeBonus: 'Welcome Benefits:\n• 10,000 KrisFlyer miles on first spend within 60 days',
      milestoneBenefits: [
        '10,000 KrisFlyer miles on annual spend of ₹5 lakh'
      ],
      airportLounge: 'Complimentary domestic and international lounge access',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air accident insurance cover up to ₹3.5 crore'
      ],
      minimumSpend: '₹5,00,000 for milestone benefits',
      paymentDueDays: 'Not specified',
      additionalServices: 'Additional Benefits:\n• Complimentary domestic and international lounge access\n• Air accident insurance cover up to ₹3.5 crore\n• Milestone benefits: 10,000 KrisFlyer miles on annual spend of ₹5 lakh',
      idealFor: [
        'Frequent Singapore Airlines flyers',
        'International travelers',
        'High-spending individuals',
        'Those seeking premium travel benefits'
      ],
      notIdealFor: [
        'Domestic-only travelers',
        'Budget-conscious users',
        'Those who rarely fly with Singapore Airlines'
      ],
      summary: 'A premium co-branded credit card offering enhanced KrisFlyer miles on spends, comprehensive travel benefits, and milestone rewards, ideal for frequent international travelers.'
    }
  },
  {
    id: 'indusind-avios-visa-infinite',
    name: 'IndusInd Bank Avios Visa Infinite Credit Card',
    bank: 'IndusInd Bank',
    category: 'airlines',
    image: '/credit-cards/IndusInd-Avios.png',
    apr: '42% p.a.',
    annualFee: '₹5,000 + GST',
    joiningFee: '₹10,000 + GST',
    rewards: 'Up to 5X Avios on spends with British Airways and Qatar Airways\n1.5 Avios per ₹100 on other spends',
    rupay: false,
    features: [
      'Avios Points',
      'International Lounge Access',
      'Airport Fast Track',
      'Airport Transfer Discounts',
      'Travel Insurance',
      'Contactless Payments'
    ],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge',
      'international-lounge',
      'international-travel'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Up to 5X Avios on spends with British Airways and Qatar Airways\n• 1.5 Avios per ₹100 on other spends\n\nRedemption:\n• Avios points can be redeemed for flights, upgrades, and other services with partner airlines like British Airways and Qatar Airways',
      welcomeBonus: 'Welcome Benefits:\n• 20,000 Avios points on card activation',
      airportLounge: 'Complimentary domestic and international lounge access',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Personal air accident insurance cover up to ₹25 lakh'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Not specified',
      additionalServices: 'Additional Benefits:\n• 1.5% discounted forex markup fee\n• 25% discount on Airport Fast Track immigration services at over 450 destinations\n• 20% discount on airport transfer services in major cities worldwide',
      idealFor: [
        'Frequent British Airways and Qatar Airways flyers',
        'International travelers',
        'Those seeking premium travel benefits',
        'High-spending individuals'
      ],
      notIdealFor: [
        'Domestic-only travelers',
        'Budget-conscious users',
        'Those who rarely fly with partner airlines'
      ],
      summary: 'A premium credit card offering Avios points on spends, comprehensive travel benefits, and exclusive airport services, ideal for frequent international travelers.'
    }
  },
  {
    id: 'tata-neu-infinity',
    name: 'Tata Neu Infinity Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/Tata-Neu-Infinity.png',
    apr: '43.2% p.a.',
    annualFee: '₹1,499 + GST',
    joiningFee: '₹1,499 + GST',
    rewards: '5% NeuCoins on Tata brands; 1.5% on UPI spends',
    rupay: true,
    features: [
      'UPI Enabled',
      'NeuCoins Rewards',
      'Tata Brand Benefits',
      'Digital-First Card',
      'Contactless Payments'
    ],
    categories: [
      'rewards',
      'shopping',
      'upi',
      // 'lifestyle'
      // 'fintech'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 5% NeuCoins on spending at Tata brands\n• 1.5% NeuCoins on UPI spends\n\nRedemption:\n• NeuCoins can be redeemed across Tata brands and partner merchants',
      welcomeBonus: 'Not specified',
      minimumSpend: 'Not specified',
      idealFor: [
        'Frequent Tata brand shoppers',
        'Digital-first users',
        'UPI payment users'
      ],
      notIdealFor: [
        'Users seeking travel benefits',
        'Those who rarely shop at Tata brands'
      ],
      summary: 'A co-branded credit card offering enhanced rewards on Tata brand purchases and UPI transactions.'
    }
  },
  {
    id: 'tata-neu-plus',
    name: 'Tata Neu Plus Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/Tata-Neu.png',
    apr: '43.2% p.a.',
    annualFee: '₹499 + GST',
    joiningFee: '₹499 + GST',
    rewards: '2% NeuCoins on Tata brands; 1% on UPI spends',
    rupay: true,
    features: [
      'UPI Enabled',
      'NeuCoins Rewards',
      'Tata Brand Benefits',
      'Digital-First Card',
      'Contactless Payments'
    ],
    categories: [
      'rewards',
      'shopping',
      'upi',
      // 'fintech'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2% NeuCoins on spending at Tata brands\n• 1% NeuCoins on UPI spends\n\nRedemption:\n• NeuCoins can be redeemed across Tata brands and partner merchants',
      welcomeBonus: 'Not specified',
      minimumSpend: 'Not specified',
      idealFor: [
        'Regular Tata brand shoppers',
        'Digital-first users',
        'Budget-conscious consumers'
      ],
      notIdealFor: [
        'Premium card seekers',
        'Users seeking travel benefits'
      ],
      summary: 'An entry-level co-branded credit card offering rewards on Tata brand purchases and UPI transactions.'
    }
  },
  {
    id: 'hdfc-rupay',
    name: 'HDFC UPI RuPay Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/HDFC-UPI-RuPay.png',
    apr: '43.2% p.a.',
    annualFee: '₹99 + GST',
    joiningFee: '₹99 + GST',
    rewards: 'Up to 3X CashPoints on spends; 1% on UPI transactions',
    rupay: true,
    features: [
      'UPI Enabled',
      'CashPoints Rewards',
      'Low Annual Fee',
      'Digital-First Card',
      'Contactless Payments'
    ],
    categories: [
      'rewards',
      'budget',
      'upi',
      // 'fintech'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Up to 3X CashPoints on spends\n• 1% on UPI transactions\n\nRedemption:\n• CashPoints can be redeemed for statement credit or other rewards',
      welcomeBonus: 'Not specified',
      minimumSpend: 'Not specified',
      idealFor: [
        'First-time credit card users',
        'Budget-conscious consumers',
        'UPI payment users'
      ],
      notIdealFor: [
        'Premium card seekers',
        'High spenders seeking extensive rewards'
      ],
      summary: 'An affordable RuPay credit card with UPI functionality and basic rewards program.'
    }
  },
  {
    id: 'sbi-unnati',
    name: 'SBI Card Unnati',
    bank: 'SBI Card',
    category: 'secured',
    image: '/credit-cards/SBI-Unnati.png',
    apr: 'Based on FD rate',
    annualFee: '₹0 (₹499 from 5th year)',
    joiningFee: '₹0',
    rewards: '1 reward point per ₹100 spent',
    rupay: false,
    features: [
      '1 reward point per ₹100 spent',
      '₹500 cashback on ₹50,000 annual spend',
      'Minimum FD amount: ₹25,000'
    ],
    categories: ['secured'],
    feedback: [],
    additionalDetails: {
      rewardsProgram: '1 reward point per ₹100 spent\n₹500 cashback on reaching ₹50,000 annual spend',
      minimumSpend: 'No minimum spend requirement',
      summary: 'A secured credit card with no annual fee for first 4 years and rewards on spending.'
    }
  },
  {
    id: 'kotak-811-dream-different',
    name: 'Kotak 811 #DreamDifferent Credit Card',
    bank: 'Kotak Mahindra Bank',
    category: 'secured',
    image: '/credit-cards/Kotak-Secured.png',
    apr: 'Based on FD rate',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: '2 reward points per ₹100 online, 1 point per ₹100 offline',
    rupay: true,
    features: [
      '2 reward points per ₹100 online',
      '1 point per ₹100 offline',
      '90% credit limit of FD',
      'Minimum FD amount: ₹5,000'
    ],
    categories: ['secured'],
    feedback: [],
    additionalDetails: {
      rewardsProgram: '2 reward points per ₹100 spent online\n1 reward point per ₹100 spent offline',
      creditLimit: '90% of Fixed Deposit amount',
      summary: 'A secured credit card with higher rewards on online spending.'
    }
  },
  {
    id: 'icici-instant-platinum',
    name: 'ICICI Bank Instant Platinum Credit Card',
    bank: 'ICICI Bank',
    category: 'secured',
    image: '/credit-cards/ICICI-Platinum-Secured.png',
    apr: 'Based on FD rate',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: '25% discount on BookMyShow (twice a month)',
    rupay: false,
    features: [
      '25% discount on BookMyShow (twice a month)',
      'Contactless payments',
      'Minimum FD amount: ₹50,000'
    ],
    categories: ['secured'],
    feedback: [],
    additionalDetails: {
      movieBenefits: '25% discount on BookMyShow bookings (twice a month)',
      additionalServices: 'Contactless payment enabled',
      summary: 'A secured credit card with entertainment benefits and contactless payment feature.'
    }
  },
  {
    id: 'bob-prime',
    name: 'Bank of Baroda Prime Credit Card',
    bank: 'Bank of Baroda',
    category: 'secured',
    image: '/credit-cards/BOB-Secured.png',
    apr: 'Based on FD rate',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: 'Reward points on spending',
    rupay: false,
    features: [
      'Up to 80% credit limit of FD',
      'Reward points on spending',
      'Fuel surcharge waiver',
      'Minimum FD amount: ₹15,000'
    ],
    categories: ['secured'],
    feedback: [],
    additionalDetails: {
      creditLimit: 'Up to 80% of Fixed Deposit amount',
      fuelSurcharge: 'Fuel surcharge waiver available',
      summary: 'A secured credit card with fuel benefits and reward points on spending.'
    }
  },
  {
    id: 'axis-fd',
    name: 'Axis Bank FD Backed Credit Card',
    bank: 'Axis Bank',
    category: 'secured',
    image: '/credit-cards/Axis-FD.png',
    apr: 'Based on FD rate',
    annualFee: '₹500',
    joiningFee: '₹500',
    rewards: 'Rewards on spending',
    rupay: false,
    features: [
      'Designed for credit building',
      'Rewards on spending',
      'Minimum FD amount: ₹20,000'
    ],
    categories: ['secured'],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earn rewards on all spending',
      summary: 'A secured credit card designed for credit building with rewards program.'
    }
  },
  {
    id: 'amazon-pay-icici',
    name: 'Amazon Pay ICICI Bank Credit Card',
    bank: 'ICICI Bank',
    category: 'lifetime-free',
    image: '/credit-cards/ICICI-Amazon.png',
    apr: '43.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: 'Up to 5% cashback on Amazon.in purchases\n1% cashback on other spends',
    rupay: false,
    features: [
      'Amazon Pay Cashback',
      'No Annual Fee',
      'No Joining Fee',
      'Contactless Payments',
      'EMI Options',
      'Fuel Surcharge Waiver'
    ],
    categories: [
      'lifetime-free',
      'cashback',
      'shopping',
      'lifetime-free'
      // 'best-credit-cards'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Cashback Structure:\n• 5% cashback on Amazon.in purchases for Prime members\n• 3% cashback on Amazon.in purchases for non-Prime members\n• 2% cashback on transactions with over 100 Amazon Pay partner merchants\n• 1% cashback on all other payments\n\nNote: Cashback is credited as Amazon Pay balance and can be used for purchases on Amazon.in and partner merchants',
      welcomeBonus: 'For Amazon Prime Members (Total Value: Up to ₹2,500):\n• ₹300 cashback on first Amazon transaction\n• 50% cashback on prepaid mobile recharge (up to ₹100)\n• 25% cashback on postpaid bill payment (up to ₹350)\n• 20% cashback on electricity bill payment (up to ₹250)\n• 25% cashback on DTH bill payment (up to ₹250)\n• 25% cashback on gas cylinder payment (up to ₹150, twice)\n• 25% cashback on broadband bill payment (up to ₹400)\n• 25% cashback on Amazon shopping (up to ₹200)\n• Complimentary 3-month EazyDiner Prime membership worth ₹1,095\n\nFor Non-Prime Members (Total Value: Up to ₹2,000):\n• Complimentary 3-month Amazon Prime membership\n• ₹200 cashback on first Amazon transaction\n• 50% cashback on prepaid mobile recharge (up to ₹100)\n• 25% cashback on postpaid bill payment (up to ₹350)\n• 20% cashback on electricity bill payment (up to ₹250)\n• 25% cashback on DTH bill payment (up to ₹200)\n• 25% cashback on gas cylinder payment (up to ₹150, twice)\n• 25% cashback on broadband bill payment (up to ₹400)\n• 25% cashback on Amazon shopping (up to ₹200)\n• Complimentary 3-month EazyDiner Prime membership worth ₹1,095',
      milestoneBenefits: ['No specific milestone benefits. Instead, provides consistent cashback rewards based on spending categories'],
      idealFor: [
        'Amazon Prime Members: Get higher cashback rates and more welcome benefits',
        'Frequent Amazon Shoppers: Maximize rewards on Amazon.in purchases',
        'Bill Payment Users: Earn cashback on various utility bill payments',
        'Budget-Conscious Users: Zero annual and joining fees'
      ],
      notIdealFor: [
        'Non-Amazon Shoppers: Lower rewards on non-Amazon purchases',
        'Travel Enthusiasts: No travel-specific benefits',
        'High Spenders Seeking Premium Perks: Limited to cashback rewards'
      ],
      summary: 'A lifetime-free credit card offering enhanced cashback on Amazon purchases and bill payments, with comprehensive welcome benefits for both Prime and non-Prime members.'
    }
  },
  {
    id: 'axis-my-zone',
    name: 'Axis Bank My Zone Credit Card',
    bank: 'Axis Bank',
    category: 'lifetime-free',
    image: '/credit-cards/Axis-MyZone.png',
    apr: '43.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rewards: 'Complimentary Sony LIV Premium subscription\n₹120 off on Swiggy orders twice a month\nComplimentary airport lounge access (4 times per year)',
    rupay: true,
    features: [
      'Sony LIV Premium Subscription',
      'Swiggy Discounts',
      'Airport Lounge Access',
      'UPI Enabled',
      'Contactless Payments',
      'EMI Options'
    ],
    categories: [
      'lifetime-free',
      'upi',
      'entertainment',
      'dining'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'EDGE Rewards:\n• Earn 4 EDGE reward points for every ₹200 spent\n• Points can be redeemed via the EDGE Rewards portal\n\nShopping Benefits:\n• AJIO Offer: ₹1,000 instant discount on minimum purchases of ₹2,999 (valid once per user)',
      welcomeBonus: 'Complimentary SonyLIV Premium Subscription:\n• On completing the first transaction within the first 30 days of card issuance\n• Annual subscription worth ₹999',
      milestoneBenefits: ['SonyLIV Subscription Renewal: On spending ₹1.5 lakh in a card anniversary year, you get the complimentary SonyLIV Premium subscription renewed'],
      airportLounge: '1 complimentary domestic airport lounge access per quarter, subject to spending ₹50,000 in the previous 3 months',
      fuelSurcharge: '1% fuel surcharge waiver on transactions between ₹400 and ₹4,000, with a maximum waiver of ₹400 per statement cycle',
      movieBenefits: 'Buy One Get One Free on Paytm Movies, with maximum discount of ₹200 per month',
      diningPrivileges: [
        '₹120 off twice a month on Swiggy orders (minimum order ₹500)',
        'Up to 15% off at partner restaurants through Axis Bank\'s Dining Delights program'
      ],
      idealFor: [
        'Movie and OTT Platform Lovers: Get SonyLIV Premium subscription and movie ticket benefits',
        'Regular Users of Swiggy and AJIO: Enjoy regular discounts on food delivery and fashion shopping',
        'Domestic Travelers: Access to airport lounges with reasonable spending criteria',
        'Budget-Conscious Users: Lifetime free card with good lifestyle benefits'
      ],
      notIdealFor: [
        'Frequent International Travelers: High forex markup of 3.5%',
        'Premium Travel Reward Seekers: Limited travel benefits',
        'Heavy Fuel Spenders: Rewards on fuel spend are not substantial'
      ],
      summary: 'A lifetime-free credit card offering entertainment and lifestyle benefits including SonyLIV Premium subscription, movie ticket discounts, and dining offers, ideal for entertainment enthusiasts and regular online shoppers.'
    }
  },
  {
    id: 'hsbc-taj',
    name: 'HSBC Taj Credit Card',
    bank: 'HSBC Bank',
    category: 'ultra-premium',
    image: '/credit-cards/HSBC-Taj.png',
    apr: '42% p.a.',
    annualFee: '₹1,10,000 + GST',
    joiningFee: '₹1,10,000 + GST',
    rewards: '5 reward points per ₹100 spent at IHCL properties\n1.5 points per ₹100 on other eligible purchases',
    rupay: false,
    features: [
      'Taj InnerCircle Platinum NeuPass Membership',
      'Complimentary Stays',
      'Dining & Spa Vouchers',
      'Pool Access',
      'Airport Lounge Access',
      'Chauffeur Services'
    ],
    categories: [
      'ultra-premium',
      // 'premium',
      'hotels',
      // 'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 5 reward points per ₹100 spent at IHCL properties\n• 1.5 points per ₹100 on other eligible purchases\n\nRedemption:\n• Points can be redeemed for stays, dining, spa treatments, and more at participating IHCL hotels',
      welcomeBonus: 'Welcome Benefits:\n• Taj InnerCircle Platinum NeuPass Membership\n• Complimentary one-night stay at Taj Palaces\n• Two additional nights at participating IHCL hotels\n• Four set meal vouchers at select restaurants\n• Four 60-minute spa therapy vouchers\n• Twelve pool access vouchers for two\n• Twelve access vouchers each for The Chambers and Taj Club lounges',
      milestoneBenefits: [
        'Complimentary one-night stay at Taj Palaces on spends of ₹10 lakh',
        'Two additional nights at participating IHCL hotels on spends of ₹20 lakh',
        'Four set meal vouchers at select restaurants on spends of ₹30 lakh',
        'Four 60-minute spa therapy vouchers on spends of ₹40 lakh',
        'Annual fee waiver on spends of ₹50 lakh'
      ],
      airportLounge: 'Unlimited complimentary access to domestic and international lounges',
      insuranceCover: [
        'Comprehensive travel insurance coverage'
      ],
      diningPrivileges: [
        '25% off on breakfast-inclusive stays',
        '25% off on dining at IHCL properties',
        '25% off on spa therapies',
        '25% off on Qmin food deliveries'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Not specified',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'Not specified',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Benefits:\n• Four complimentary Blacklane chauffeured transfers annually\n• Up to 5% off on Emirates flights\n• 15% off on duty-free shopping at domestic airports\n• Lifestyle discounts on brands like Starbucks, PVR Cinemas, Swiggy, Zomato, and Tira\n\nLounge Access Benefits:\n• Unlimited domestic lounge access via DreamFolks\n• Unlimited international lounge access via Priority Pass\n• Complimentary access for primary and add-on cardholders\n• Access to over 1,300 lounges worldwide\n• Complimentary spa services at select lounges\n• Complimentary dining at select airport restaurants',
      idealFor: [
        'Affluent individuals seeking luxury hospitality experiences',
        'Frequent travelers who prefer IHCL properties',
        'High-income individuals with annual income above ₹40 lakhs (salaried) or ₹60 lakhs (self-employed)',
        'Residents of major Indian cities including Mumbai, Delhi-NCR, Bengaluru, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, Kochi, and Coimbatore'
      ],
      notIdealFor: [
        'Budget-conscious individuals',
        'Those who rarely stay at luxury hotels',
        'Individuals with annual income below ₹40 lakhs',
        'Residents of cities not covered by HSBC'
      ],
      summary: 'A premium co-branded credit card offering exclusive IHCL privileges, luxury travel benefits, and comprehensive lifestyle rewards, ideal for affluent individuals who frequently engage with IHCL properties.'
    }
  },
  {
    id: 'axis-primus',
    name: 'Axis Bank Primus Credit Card',
    bank: 'Axis Bank',
    category: 'ultra-premium',
    image: '/credit-cards/Axis-Primus.png',
    apr: '42% p.a.',
    annualFee: '₹3,00,000 + GST',
    joiningFee: '₹5,00,000 + GST',
    rewards: 'Welcome benefit: Choice between an ₹40,000 ITC voucher or 25,000 Axis Edge Miles\nRenewal benefit: Choice between an ₹20,000 ITC voucher or 15,000 Axis Edge Miles',
    rupay: false,
    features: [
      'Unlimited Lounge Access',
      'Zero Forex Markup',
      'Airport Meet-and-Greet',
      'Companion Airfare Benefits',
      'Hotel Upgrades',
      'Exclusive Dining Access'
    ],
    categories: [
      'ultra-premium',
      // 'premium',
      // 'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Welcome and Renewal Benefits:\n• Welcome: Choice between ₹40,000 ITC voucher or 25,000 Axis Edge Miles\n• Renewal: Choice between ₹20,000 ITC voucher or 15,000 Axis Edge Miles',
      welcomeBonus: 'Welcome benefit: Choice between an ₹40,000 ITC voucher or 25,000 Axis Edge Miles',
      airportLounge: 'Unlimited domestic and international airport lounge access for primary and add-on cardholders',
      insuranceCover: [
        'Comprehensive travel insurance coverage'
      ],
      diningPrivileges: [
        'Exclusive access to top restaurants worldwide'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Not specified',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'Zero foreign exchange markup on international transactions',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Benefits:\n• Complimentary airport meet-and-greet services within India\n• Companion airfare benefits\n• Up to 15% savings on international First and Business class fares\n• Complimentary upgrades at selected hotels worldwide\n• Bespoke travel itineraries',
      idealFor: [
        'Ultra-high-net-worth individuals (UHNIs)',
        'Frequent international travelers',
        'Those seeking exclusive luxury experiences',
        'Invitation-only cardholders'
      ],
      notIdealFor: [
        'Budget-conscious individuals',
        'Those who rarely travel internationally',
        'Individuals not meeting the ultra-high-net-worth criteria',
        'Those seeking basic credit card features'
      ],
      summary: 'The most expensive credit card in the Indian market, offering unparalleled luxury travel benefits, zero forex markup, and exclusive lifestyle privileges, exclusively for ultra-high-net-worth individuals.'
    }
  },
  {
    id: 'amex-centurion',
    name: 'American Express Centurion Card',
    bank: 'American Express',
    category: 'ultra-premium',
    image: '/credit-cards/Amex-Centurion.png',
    apr: '42% p.a.',
    annualFee: '₹2,75,000 + GST',
    joiningFee: '₹9,75,000 to ₹11,50,000 + GST',
    rewards: 'Elite status with hotel and airline programs\nComplimentary elite memberships\nExclusive experiences and events',
    rupay: false,
    features: [
      'Elite Memberships',
      'Dedicated Concierge',
      'Unlimited Lounge Access',
      'Airport Meet-and-Greet',
      'Supplementary Cards',
      'Exclusive Experiences'
    ],
    categories: [
      'ultra-premium',
      // 'premium',
      // 'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Elite Status Benefits:\n• Hilton Honors Diamond\n• Accor Live Limitless Platinum\n• Shangri-La Golden Circle Jade\n• British Airways Executive Club Gold\n• Etihad Guest Gold',
      welcomeBonus: 'Not specified',
      airportLounge: 'Unlimited access to over 1,300 airport lounges worldwide through the American Express Global Lounge Collection, including Centurion Lounges, Priority Pass, and Delta Sky Clubs',
      insuranceCover: [
        'Comprehensive travel insurance coverage'
      ],
      diningPrivileges: [
        'Exclusive access to private dining experiences'
      ],
      minimumSpend: 'Not specified',
      paymentDueDays: 'Not specified',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% on international transactions',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Benefits:\n• Dedicated Centurion Relationship Managers\n• 24/7 concierge services for personalized assistance\n• Complimentary meet-and-greet services at select airports\n• Up to 7 supplementary Platinum cards issued at no additional cost\n• Invitations to VIP events and fashion shows',
      idealFor: [
        'Ultra-high-net-worth individuals (UHNIs)',
        'Existing Amex Platinum cardholders with significant spending patterns',
        'Those seeking exclusive luxury experiences',
        'Frequent international travelers'
      ],
      notIdealFor: [
        'Budget-conscious individuals',
        'Those who rarely travel internationally',
        'Individuals not meeting the ultra-high-net-worth criteria',
        'Those seeking basic credit card features'
      ],
      summary: 'The second most expensive credit card in India, offering unparalleled luxury travel benefits, elite status memberships, and exclusive lifestyle privileges, exclusively for ultra-high-net-worth individuals.'
    }
  }
]; 