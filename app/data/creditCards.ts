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
  rupay: boolean;
  feedback: UserFeedback[];
  categories: string[];
  applyUrl?: string;
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
    creditLimit?: string;
    domesticTransactionFee?: string;
    internationalTransactionFee?: string;
    interestRate?: string;
    emiOptions?: string;
    additionalServices?: string;
    idealFor?: string[];
    notIdealFor?: string[];
    summary?: string;
    redemptionOptions?: string;
    cashAdvanceFee?: string;
    eligibilityCriteria?: string;
    travelLifestyleBenefits?: string;
  };
}

export const creditCards: CreditCard[] = [
  // Hotels Cards
  {
    id: 'hdfc-regalia-marriott',
    name: 'HDFC Regalia Marriott Bonvoy Credit Card',
    bank: 'HDFC Bank',
    category: 'hotels',
    image: '/credit-cards/HDFC-Regalia-Marriott.png',
    apr: '43.2% p.a.',
    annualFee: '₹3,000 + GST',
    joiningFee: '₹3,000 + GST',
    rupay: false,
    feedback: [],
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
    applyUrl: 'https://example.com/apply-hdfc-regalia-marriott',
    additionalDetails: {
      rewardsProgram: 'Reward Points Structure:\n• 8 Marriott Bonvoy Points per ₹150 spent at Marriott Bonvoy hotels\n• 4 Marriott Bonvoy Points per ₹150 spent on travel, dining, and entertainment\n• 2 Marriott Bonvoy Points per ₹150 spent on all other eligible purchases\n\nPoints are earned on non-EMI retail spends and exclude wallet loads, gift/prepaid card loads, voucher purchases, government-related transactions, rental transactions, and EMI transactions.',
      welcomeBonus: 'Welcome Benefits:\n• Complimentary Marriott Bonvoy Silver Elite Status (priority check-in, late check-out, 10% bonus points on eligible hotel purchases)\n• 1 Free Night Award on first eligible spend transaction or fee levy (wallet reloads and EMI excluded)\n• 10 Elite Night Credits to fast-track to Gold Elite status',
      milestoneBenefits: [
        '1 Free Night Award on eligible spend of ₹6 lakhs in an anniversary year',
        '1 Additional Free Night Award on eligible spend of ₹9 lakhs in an anniversary year',
        '1 Additional Free Night Award on eligible spend of ₹15 lakhs in an anniversary year',
        'Each Free Night Award valid for 12 months, redeemable for a one-night stay at participating Marriott Bonvoy hotels (up to 15,000 points redemption level)'
      ],
      airportLounge: 'Airport Lounge Access:\n• 12 complimentary accesses within India (domestic and international terminals)\n• 12 complimentary accesses outside India annually',
      additionalServices: 'Golf Access: 2 complimentary golf lessons per quarter at select driving ranges in India\nConcierge Services: Exclusive concierge services available 9 a.m. to 9 p.m.\nForeign Currency Markup: 3.5% on all foreign currency spends\nRevolving Credit: Available at nominal interest rates\nZero Lost Card Liability: On immediate reporting to 24-hour call center',
      idealFor: [
        'Marriott Bonvoy loyalists',
        'Frequent travelers',
        'Golf enthusiasts',
        'Users seeking premium hotel and travel benefits'
      ],
      notIdealFor: [
        'Users not interested in hotel loyalty programs',
        'Those seeking low foreign currency markup',
        'Budget-conscious users'
      ],
      summary: 'A premium co-branded credit card offering exclusive Marriott Bonvoy benefits, free night awards, elite status, and extensive travel and lifestyle privileges.',
      fuelSurcharge: 'Not specified',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹1,00,000/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹15 lakhs/annum`
    }
  },
  {
    id: 'hdfc-regalia',
    name: 'HDFC Regalia Credit Card',
    bank: 'HDFC Bank',
    category: 'premium',
    image: '/credit-cards/HDFC-Regalia.png',
    apr: '43.2% p.a.',
    annualFee: '₹2,500 + GST',
    joiningFee: '₹2,500 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'premium',
      'travel',
      'lifestyle'
    ],
    applyUrl: 'https://example.com/apply-hdfc-regalia',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 4 Reward Points per ₹150 spent on all retail purchases
• Applicable to insurance, utilities, education, and rent payments
• No reward points on fuel transactions
• Cap of 2,000 points per day for insurance payments

Redemption:
• Points can be redeemed for flights, hotel bookings, premium products, and vouchers via SmartBuy
• Each Reward Point worth ₹0.50 when redeemed on SmartBuy`,
      welcomeBonus: '• 2,500 Reward Points upon payment of the joining fee\n\nRenewal Benefits:\n• 2,500 Reward Points upon payment of the annual fee',
      milestoneBenefits: [
        '10,000 bonus reward points on spending ₹5 lakhs in an anniversary year',
        'Additional 5,000 bonus reward points on spending ₹8 lakhs in an anniversary year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 12 complimentary airport lounge accesses per calendar year (domestic and international combined)\n• Access vouchers to be generated via Regalia SmartBuy portal',
      insuranceCover: [
        'Air Accident Cover: ₹1 crore',
        'Emergency Overseas Hospitalization: Up to ₹15 lakh',
        'Credit Liability Cover: Up to ₹9 lakh'
      ],
      diningPrivileges: [
        'Exclusive offers through Dineout Passport Membership',
        'Up to 25% off at select restaurants'
      ],
      minimumSpend: '₹4,00,000 for annual fee waiver',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '2% on all international transactions',
      interestRate: '3.5% per month (42% p.a.)',
      emiOptions: 'Available on eligible purchases',
      fuelSurcharge: '1% waiver on fuel transactions between ₹400 and ₹5,000',
      idealFor: [
        'Frequent Travelers',
        'High Spenders',
        'Lifestyle Shoppers',
        'Premium Membership Seekers'
      ],
      notIdealFor: [
        'Fuel Purchasers',
        'Golf Enthusiasts',
        'Budget-Conscious Users'
      ],
      summary: 'A premium credit card offering a blend of travel, lifestyle, and rewards benefits for high spenders and frequent travelers.',
      redemptionOptions: 'Points can be redeemed for flights, hotel bookings, premium products, and vouchers via SmartBuy',
      cashAdvanceFee: '2.5% of amount withdrawn (min ₹500)',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: Over ₹1.5 lakhs for non-government employees; over ₹1 lakh for government employees
Self-Employed Individuals:
Age: 21 to 65 years
Income: Income Tax Returns (ITR) exceeding ₹18 lakhs per annum`,
      travelLifestyleBenefits: '12 complimentary domestic airport lounge visits annually and up to 6 international lounge visits through Priority Pass.'
    }
  },
  {
    id: 'hdfc-pixel-play',
    name: 'HDFC Pixel Play Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/HDFC-Pixel-Play.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rupay: true,
    feedback: [],
    categories: [
      'cashback',
      'lifestyle',
      'shopping',
      'upi'
    ],
    applyUrl: 'https://example.com/apply-hdfc-pixel-play',
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
      summary: 'A modern digital-first credit card offering customizable category-based cashback rewards with strong emphasis on e-commerce and UPI transactions, ideal for digital-savvy users who prefer app-based banking.',
      fuelSurcharge: 'Not specified',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹25,000/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹6 lakhs/annum`
    }
  },
  {
    id: 'hdfc-millennia',
    name: 'HDFC Millennia Credit Card',
    bank: 'HDFC Bank',
    category: 'lifestyle',
    image: '/credit-cards/HDFC-Millenia.png',
    apr: '43.2% p.a.',
    annualFee: '₹1,000 + GST',
    joiningFee: '₹1,000 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'lifestyle',
      'rewards',
      'cashback'
    ],
    applyUrl: 'https://example.com/apply-hdfc-millennia',
    additionalDetails: {
      rewardsProgram: `Cashback Structure:
• 5% Cashback on Amazon, BookMyShow, Cult.fit, Flipkart, Myntra, Sony LIV, Swiggy, Tata CLiQ, Uber and Zomato
• 1% cashback on other spends
• ₹1,000 worth gift vouchers on spends of ₹1,00,000 and above in each calendar quarter
• Get 10% additional discount on Swiggy/Dineout using coupon code HDFCARDS_TnC`,
      welcomeBonus: '1,000 CashPoints upon payment of the joining fee',
      milestoneBenefits: ['₹1,000 worth of gift vouchers on spends of ₹1,00,000 and above in each calendar quarter'],
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
      summary: 'A lifestyle-focused credit card offering enhanced cashback on popular e-commerce, entertainment, and food delivery platforms with quarterly milestone benefits, ideal for frequent online shoppers and dining enthusiasts.',
      fuelSurcharge: '1% fuel surcharge waiver on transactions between ₹400 and ₹5,000, with a maximum waiver of ₹250 per billing cycle',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 40 years
Net Monthly Income: ₹35,000/month
Self-Employed Individuals:
Age: 21 to 40 years
Income: ITR > ₹6 lakhs/annum`
    }
  },
  {
    id: 'hdfc-money-black-plus',
    name: 'HDFC MoneyBack+ Credit Card',
    bank: 'HDFC Bank',
    category: 'fintech',
    image: '/credit-cards/HDFC-MoneyBack+.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rupay: true,
    feedback: [],
    categories: [
      'cashback',
      'shopping',
      'dining',
      'upi',
      'grocery',
      'lifestyle'
    ],
    applyUrl: 'https://example.com/apply-hdfc-money-black-plus',
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
      summary: 'A rewarding cashback credit card with strong benefits on everyday spending categories like online shopping, grocery, and food delivery, ideal for online shoppers and budget-conscious users.',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹25,000/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹6 lakhs/annum`
    }
  },
  {
    id: 'hdfc-swiggy',
    name: 'HDFC Swiggy Credit Card',
    bank: 'HDFC Bank',
    category: 'lifestyle',
    image: '/Credit-card-2.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'cashback',
      'dining',
      'food-delivery',
      'lifestyle'
    ],
    applyUrl: 'https://example.com/apply-hdfc-swiggy',
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
      fuelSurcharge: '1% on transactions up to ₹4,000; maximum waiver of ₹1,000 per statement cycle',
      eligibilityCriteria: `Salaried: Age 21–60 years, Income ₹15,000/month
Self-Employed: Age 21–65 years, ITR > ₹6 Lakhs/annum`
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
    annualFee: '₹1,500 + GST',
    joiningFee: '₹1,500 + GST',
    rupay: false,
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "sapphiro", cardName: "Sapphiro Credit Card" }
    ],
    categories: [
      'premium',
      'rewards',
      'international-travel',
      'domestic-lounge',
      // 'fuel'
    ],
    applyUrl: 'https://example.com/apply-axis-privilege',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 2 points per ₹100 on domestic retail spends (excluding fuel)\n• 4 points per ₹100 on international spends\n• 1 point per ₹100 on utilities and insurance payments\n\nRedemption:\n• Points can be redeemed for a variety of products, vouchers, and even converted to air miles',
      welcomeBonus: 'Welcome Benefits:\n• Welcome vouchers worth ₹9,000\n• Complimentary Bose IE2 Headphones\n• Premium lifestyle vouchers',
      milestoneBenefits: [
        '4,000 points on spending ₹4 lakh in an anniversary year',
        '2,000 points for every additional ₹1 lakh spent thereafter, up to a maximum of 20,000 points per year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 4 complimentary domestic lounge accesses per quarter (subject to spending ₹75,000 in the previous quarter)\n• 2 complimentary international lounge accesses per year via Priority Pass or DreamFolks membership',
      fuelSurcharge: '1% on transactions up to ₹4,000; maximum waiver of ₹1,000 per statement cycle',
      insuranceCover: [
        'Chip and PIN Security for enhanced security at merchant outlets'
      ],
      movieBenefits: 'Buy 1, get 1 free on movie or event tickets (up to ₹500 off on the second ticket), twice a month via BookMyShow',
      diningPrivileges: [
        'Exclusive offers through the ICICI Bank Culinary Treats Programme'
      ],
      minimumSpend: '₹5,00,000 for annual fee waiver',
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
      summary: 'Perfect for mid-to-high spenders who travel occasionally and enjoy a balanced mix of lifestyle perks and reward flexibility.',
    }
  },
  {
    id: 'emeralde-private-metal',
    name: 'ICICI Emeralde Private Metal Credit Card',
    bank: 'ICICI Bank',
    category: 'premium',
    image: '/credit-cards/ICICI-Emeralde-Metal.png',
    apr: '45% p.a.',
    annualFee: '₹12,500 + GST',
    joiningFee: '₹12,500 + GST',
    rupay: false,
    feedback: [
      { comment: "Best travel card I've ever used!", rating: 9.5, date: "2024-03-12", userId: "user123", userName: "John Doe", cardId: "emeralde-private-metal", cardName: "Emeralde Private Metal Credit Card" },
      { comment: "Insurance coverage is comprehensive", rating: 8, date: "2024-03-08", userId: "user456", userName: "Jane Smith", cardId: "emeralde-private-metal", cardName: "Emeralde Private Metal Credit Card" }
    ],
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
    applyUrl: 'https://example.com/apply-emeralde-private-metal',
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
      minimumSpend: '₹10,00,000',
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
      summary: 'Ideal for high-income individuals who travel frequently, enjoy luxury experiences, and seek premium lifestyle and concierge benefits.',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹1.5 lakhs/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹18 lakhs/annum
Credit Score: 750+`
    }
  },
  {
    id: 'icici-sapphiro',
    name: 'ICICI Sapphiro Credit Card',
    bank: 'ICICI Bank',
    category: 'premium',
    image: '/credit-cards/ICICI-Sapphiro.png',
    apr: '45% p.a.',
    annualFee: '₹3,500 + GST',
    joiningFee: '₹6,500 + GST',
    rupay: true,
    feedback: [
      { comment: "Great rewards program, totally worth it!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Good card but high annual fee", rating: 7, date: "2024-03-10", userId: "user456", userName: "Jane Smith", cardId: "sapphiro", cardName: "Sapphiro Credit Card" },
      { comment: "Excellent customer service and benefits", rating: 8, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", cardId: "sapphiro", cardName: "Sapphiro Credit Card" }
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
    applyUrl: 'https://example.com/apply-sapphiro',
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
      minimumSpend: '₹6,00,000 for annual fee waiver',
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
      summary: 'Perfect for mid-to-high spenders who travel occasionally and enjoy a balanced mix of lifestyle perks and reward flexibility.',
      eligibilityCriteria: `Salaried Individuals:
Age: 18 to 60 years
Net Annual Income: ₹6 lakhs
Self-Employed Individuals:
Age: 18 to 65 years
Net Annual Income: ITR > ₹6 lakhs
Credit Score: 750+`,
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
    rupay: false,
    feedback: [],
    categories: [
      // 'best-credit-cards',
      'rewards',
      // 'domestic-lounge',
      // 'international-lounge',
      // 'fuel',
      'fintech',
      'lifetime-free'
    ],
    applyUrl: 'https://example.com/apply-uni-gold',
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
      summary: 'Perfect for mid-to-high spenders who travel occasionally and enjoy a balanced mix of lifestyle perks and reward flexibility.',
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
    rupay: false,
    feedback: [],
    categories: [
      'best-credit-cards',
      'rewards',
      'lifetime-free',
      // 'travel',
      // 'international-travel',
      // 'domestic-lounge',
      // 'international-lounge',
      'fintech'
    ],
    applyUrl: 'https://example.com/apply-onecard',
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
      minimumSpend: 'NA',
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
      summary: 'A premium metal credit card offering luxury travel experiences and lifestyle privileges, ideal for high-income individuals and frequent travelers.',
    }
  },
  {
    id: 'kiwi',
    name: 'Kiwi Credit Card',
    bank: 'Kiwi',
    category: 'upi',
    image: '/credit-cards/Kiwi.png',
    apr: '43.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: true,
    feedback: [],
    categories: [
      'upi',
      'lifetime-free',
      'fintech'
    ],
    applyUrl: 'https://example.com/apply-kiwi',
    additionalDetails: {
      rewardsProgram: 'Standard Cashback:\n• Earn 2 Kiwis (reward points) for every ₹50 spent on UPI transactions\n• Each Kiwi is worth ₹0.25, redeemable instantly into linked bank account\n\nNeon Subscription Program:\n• ₹999 annually (waived for cards issued via Kiwi app between July 1, 2024, and March 31, 2025)\n• Enhanced cashback based on annual spend:\n  - ₹50,000: 3% cashback + 1 domestic lounge access\n  - ₹1,00,000: 4% cashback + 2 domestic lounge accesses\n  - ₹1,50,000: 5% cashback + 3 domestic lounge accesses',
      welcomeBonus: 'No specific welcome bonus',
      milestoneBenefits: [
        'Spend ₹50,000 annually: 3% cashback + 1 domestic lounge access',
        'Spend ₹1,00,000 annually: 4% cashback + 2 domestic lounge accesses',
        'Spend ₹1,50,000 annually: 5% cashback + 3 domestic lounge accesses'
      ],
      airportLounge: 'Complimentary domestic lounge access upon achieving specific annual spend milestones',
      internationalTransactionFee: '3.5% of the transaction amount',
      interestRate: '3.6% per month (43.2% annually)',
      additionalServices: 'Late Payment Fees:\n• Up to ₹500 due: ₹0\n• ₹501–₹5,000 due: ₹500\n• ₹5,001–₹10,000 due: ₹750\n• Above ₹10,000 due: ₹1,200\n\nCash Advance Fee: 2.5% of the transaction amount',
      idealFor: [
        'First-time credit card users',
        'People who prefer UPI payments',
        'Salaried professionals & self-employed (income above ₹25,000/month)',
        'Reward seekers',
        'Those looking for credit flexibility'
      ],
      notIdealFor: [
        'People with poor or no credit history (requires CIBIL 720+)',
        'Heavy international spenders',
        'Users who prefer physical cards',
        'Low-income individuals',
        'People looking for premium lifestyle benefits'
      ],
      summary: 'A virtual RuPay credit card that revolutionizes UPI payments with credit, offering instant issuance, lifetime free usage, and seamless integration with UPI for everyday transactions.',
      fuelSurcharge: 'Not specified',
      eligibilityCriteria: 'Age: 25 to 60 years.\nIncome: Minimum ₹25,000 per month.\nOccupation: Salaried or self-employed individuals.\nCredit Score: Minimum CIBIL score of 720.'
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
    rupay: false,
    feedback: [],
    categories: [
      'best-credit-cards',
      'rewards',
      'cashback',
      // 'fuel',
      'lifetime-free',
      'fintech'
    ],
    applyUrl: 'https://example.com/apply-slice',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Up to 2% cashback on every transaction\n• Cashback credited as "Monies" in Slice account\n\nRedemption:\n• Instant redemption of cashback\n• Weekly deals and discounts through Slice Spark',
      welcomeBonus: 'No specific welcome benefits. Instead, provides consistent benefits that apply to all users:\n• Up to 2% Instant Cashback on every transaction\n• No joining or annual fees\n• Lifetime free card with no hidden charges',
      milestoneBenefits: ['No specific milestone benefits. Instead, provides consistent benefits that apply to all users'],
      fuelSurcharge: 'Waiver of up to ₹200 per billing cycle on fuel transactions below ₹5,000',
      insuranceCover: [
        'No specific insurance coverage mentioned'
      ],
      minimumSpend: 'Not applicable',
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
      summary: 'A digital-first credit card alternative designed for young professionals, students, and first-time credit users, offering up to 2% instant cashback, flexible EMIs, and no annual or joining fees.',
    }
  },
  {
    id: 'idfc-first-wealth',
    name: 'IDFC FIRST Wealth Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'lifestyle',
    image: '/credit-cards/idfc/Wealth-New-Card_Front.png',
    apr: '46.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: false,
    feedback: [],
    categories: [
      'rewards',
      'travel',
      'domestic-lounge',
      'dining',
      'lifestyle',
      'lifetime-free'
    ],
    applyUrl: 'https://example.com/apply-idfc-first-wealth',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10X rewards on weekend dining\n• 5X rewards on online shopping\n• 2X rewards on all other spends\n\nRedemption:\n• Points can be redeemed for flights, hotels, and vouchers\n• Reward points never expire',
      welcomeBonus: 'Welcome Benefits:\n• ₹500 voucher on spending ₹5,000 or more within first 30 days\n• 5% cashback on EMI conversion (up to ₹1,000)\n• Buy 1 Get 1 Free movie tickets on Paytm (up to ₹500, twice per month)',
      milestoneBenefits: [
        'Complimentary golf round for every ₹20,000 spent in a statement cycle (up to 2 rounds per cycle)',
        'Trip cancellation cover of up to ₹10,000',
        '10X reward points on eligible spends (points never expire)'
      ],
      airportLounge: 'Airport Lounge Access:\n• Complimentary access to domestic and international airport lounges\n• Access to airport spas',
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
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
      summary: 'A premium lifetime-free credit card offering comprehensive benefits including enhanced rewards, lounge access, golf privileges, and extensive dining and wellness discounts, ideal for frequent travelers and lifestyle enthusiasts.',
    }
  },
  {
    id: 'idfc-mayura-metal',
    name: 'IDFC FIRST Mayura Metal Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'premium',
    image: '/credit-cards/idfc/Mayura-Card-revised-29-Nov.png',
    apr: '46.2% p.a.',
    annualFee: '₹5,999 + GST',
    joiningFee: '₹5,999 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'premium',
      'international-travel',
      'international-lounge',
      'metal'
    ],
    applyUrl: 'https://example.com/apply-idfc-mayura-metal',
    additionalDetails: {
      rewardsProgram: `Reward Points Earning Structure:
• Base Rate: 1 Reward Point per ₹150 spent on:
  - Insurance premiums
  - Utility bill payments

• 3X Rewards: 3 Reward Points per ₹150 spent on:
  - Rental payments
  - Education expenses
  - Wallet loads
  - Government transactions

• 5X Rewards: 5 Reward Points per ₹150 spent on:
  - All other categories for monthly spends up to ₹20,000

• 10X Rewards: 10 Reward Points per ₹150 spent on:
  - Monthly spends exceeding ₹20,000
  - Birthday spends`,
      redemptionOptions: `
• Value: Each Reward Point = ₹0.25
• Redemption Options:
  - Online transactions
  - Gift vouchers (Amazon, Flipkart, Myntra, BigBasket)
  - Merchandise purchases
  - Flight, hotel, and movie bookings
• Redemption Fee: ₹99 + GST per request
• Expiry: Points do not expire`,
      welcomeBonus: 'Welcome Benefits:\n• Premium welcome benefits worth ₹15,000\n• Luxury gift vouchers\n• Exclusive dining experiences',
      milestoneBenefits: [
        'Spend ₹8 Lakhs in a card anniversary year to earn 7,500 reward points (worth ₹1,875)',
        'Spend ₹15 Lakhs in a card anniversary year to earn 15,000 reward points (worth ₹3,750)'
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
      summary: 'A premium metal credit card offering zero forex markup, unlimited international lounge access, and premium lifestyle benefits, ideal for international travelers.',
      fuelSurcharge: '1% on transactions up to ₹4,000; maximum waiver of ₹1,000 per statement cycle',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹1.5 lakhs/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹18 lakhs/annum
Credit Score: 750+`
    }
  },
  {
    id: 'idfc-first-classic',
    name: 'IDFC FIRST Classic Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'fintech',
    image: '/credit-cards/idfc/Classic-New-Card.png',
    apr: '46.2% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: true,
    feedback: [],
    categories: [
      'rewards',
      'first-time',
      'lifetime-free'
    ],
    applyUrl: 'https://example.com/apply-idfc-first-classic',
    additionalDetails: {
      rewardsProgram: `10X Reward Points on incremental spends above ₹20,000 per month & spends done on your birthday.\n3X Reward Points on spends up to ₹20,000 per month.\nUse Reward points to instantly pay for online or in-store purchases.\nNever expiring rewards.`,
      welcomeBonus: `Welcome voucher worth ₹500 on spending ₹5,000 or more.\n5% cashback up to ₹1,000 on the transaction value of first EMI done.`,
      milestoneBenefits: [],
      movieBenefits: '25% discount on movies.',
      additionalServices: `Complimentary railway lounge access.\nRoad side assistance.\nEnjoy 300+ merchant offers.\n20% discount at 1,500+ restaurants.\nUp to 15% discount at 3,000+ health & wellness outlets.\nInstantly convert transactions above ₹2,500 into easy & convenient EMIs.\nPay off your other bank credit card balances with our balance transfer facility.`,
      fuelSurcharge: '1% waiver on fuel transactions up to ₹400',
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
      summary: 'An entry-level credit card offering 10X rewards and no annual fee in the first year, perfect for first-time credit card users.',
      eligibilityCriteria: 'Age: 18 years or older.\nResidency: Indian residents with a current and permanent residential address.\nFixed Deposit: Minimum FD of ₹20,000 in cumulative or auto-renewal mode.\nExclusions: FDs opened by HUFs, partnership firms, societies, trusts, minors, or jointly held accounts are not eligible.'
    }
  },
  {
    id: 'idfc-first-select',
    name: 'IDFC FIRST Select',
    bank: 'IDFC FIRST Bank',
    category: 'rewards',
    image: '/credit-cards/idfc/Select-New-Card_Front.png',
    apr: '3.49% per month',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: true,
    feedback: [],
    categories: ['rewards', 'lifestyle', 'lifetime-free', 'rupay'],
    applyUrl: 'https://www.idfcfirstbank.com/credit-card/select-credit-card',
    additionalDetails: {
      rewardsProgram: 'Earn 2X rewards on all spends',
      welcomeBonus: 'Welcome voucher worth ₹500 on spending ₹5,000 or more within 30 days of card generation. \n5% cashback up to ₹1,000 on first EMI transaction within 30 days of card generation',
      milestoneBenefits: [
        'Minimum spend of ₹20,000 per month required for airport lounge access fee waiver'
      ],
      airportLounge: '4 complimentary airport lounge visits per quarter',
      fuelSurcharge: 'None',
      insuranceCover: [
        'Air accident insurance up to ₹1 crore',
        'Lost card liability insurance up to ₹1 lakh'
      ],
      movieBenefits: 'None',
      diningPrivileges: ['15% discount at 3,000+ health & wellness outlets'],
      minimumSpend: 'None',
      creditLimit: 'Up to ₹5 lakhs',
      domesticTransactionFee: 'None',
      internationalTransactionFee: '2.5% + GST',
      interestRate: '3.49% per month',
      emiOptions: 'Available',
      additionalServices: 'None',
      idealFor: [
        'Frequent travelers (airport & railway lounge access)',
        'Reward point maximizers (up to 10X rewards)',
        'UPI-based spenders (RuPay-enabled for UPI)',
        'Lifetime free credit card seekers',
        'Health & wellness enthusiasts (15% discount at 3,000+ outlets)'
      ],
      notIdealFor: [
        'Frequent international travelers (forex fee applies)',
        'Users looking for fuel benefits',
        'Premium lifestyle seekers (no concierge/luxury perks)'
      ],
      summary: 'A lifetime free credit card with comprehensive travel benefits and health & wellness discounts.',
      redemptionOptions: 'Redeem for flight tickets, hotel stays, gift vouchers, and more',
      cashAdvanceFee: '2.5% of amount withdrawn (min ₹500)',
      eligibilityCriteria: `Salaried Individuals:
Age: 18 years & above
Net Monthly Income: ₹1 lakh/month
Self-Employed Individuals:
Age: 18 years & above
Income: ₹12 lakhs per annum
Credit Score: 750+ (recommended)`,
      travelLifestyleBenefits: '4 complimentary airport lounge visits per quarter'
    }
  },
  {
    id: 'idfc-first-swyp',
    name: 'IDFC FIRST SWYP Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'lifestyle',
    image: '/credit-cards/IDFC-First-SWYP.png',
    apr: '',
    annualFee: '',
    joiningFee: '',
    rupay: true,
    feedback: [],
    categories: [
      'rewards',
      'customizable',
      'lifestyle'
    ],
    applyUrl: '',
    additionalDetails: {
      welcomeBonus: `2000 Reward Points worth ₹500 on spending ₹5,000 or more within 30 days of card issuance.\n1000 Reward Points on 1st EMI conversion within 30 days of card issuance.\nDiscount coupon of ₹2,100 from EaseMyTrip within 3 months on payment of joining fee.\nFree Lenskart Gold Membership for 1 year on payment of joining fee.`,
      milestoneBenefits: [`1000 Reward Points on eligible monthly spends exceeding ₹15,000.`, `Additional 400 Reward Points on monthly rental payments with a minimum spend of ₹20,000.`],
      movieBenefits: `25% off on movies.`,
      airportLounge: `Complimentary railway lounge access.`,
      additionalServices: `20% off on Domino's.\n10% off on EaseMyTrip, Tata CLiQ, Zomato.\n20% off on Sugar.\nComplimentary roadside assistance.\nReferral benefits worth ₹11,000+ on successful FIRST SWYP Referrals.\nGet joining fee cashback on your 1st successful referral, movie ticket vouchers, ₹2,500 cashback, airport lounge access and much more.\nPay in full or Pay eligible balance into easy & convenient EMIs.\nFlat monthly EMI conversion fees and no other interest rates.\nEMI tenures starting from 3 to 36 months.`,
      fuelSurcharge: 'Fuel surcharge waiver.',
      // Do not change any other fields not in the screenshot
      idealFor: [
        'Young Professionals & Millennials: Individuals aged 21–35 who prioritize flexibility in payments and value-added perks.',
        'Digital Natives: Users who frequently engage in online shopping, food delivery, and travel bookings.',
        'Budget-Conscious Spenders: Those who prefer converting large purchases into manageable EMIs.',
        'Referral Enthusiasts: Individuals keen on leveraging referral programs for additional benefits.'
      ],
      notIdealFor: [
        'High Net-Worth Individuals: Those seeking premium travel benefits like international lounge access or concierge services.',
        'Cashback Seekers: Users who prefer straightforward cashback over a points-based rewards system.',
        'Minimal Spenders: Individuals who may not meet the spending thresholds to maximize milestone rewards.'
      ],
      eligibilityCriteria: `Age: Salaried Individuals: 21 to 60 years; Self-Employed Individuals: 25 to 60 years.
Income: Minimum monthly income of ₹25,000.
Employment Status: Both salaried and self-employed individuals are eligible.
Credit Score: A good credit score, preferably 700 or above.
Citizenship: Indian citizens.
Documentation: Identity Proof: Aadhaar Card, PAN Card, or Passport; Address Proof: Driving License, Passport, Utility Bill, or Bank Statement; Income Proof: Latest salary slips or Income Tax Returns (ITR).`
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
    rupay: false,
    feedback: [],
    categories: ['secured', 'lifetime-free', 'rewards'],
    applyUrl: 'https://example.com/apply-idfc-first-wow',
    additionalDetails: {
      summary: 'The IDFC FIRST WOW Credit Card is a secured, lifetime-free credit card designed to help individuals build or improve their credit history. Backed by a fixed deposit (FD), it offers a range of benefits tailored for first-time credit card users, students, homemakers, and those without a stable income or credit score.',
      rewardsProgram: 'Earn 4X reward points on every ₹150 spent. Reward points never expire.',
      fuelSurcharge: '1% waiver on fuel transactions between ₹200 and ₹5,000, up to ₹200 per month.',
      internationalTransactionFee: 'Zero forex markup on international transactions.',
      travelLifestyleBenefits: 'Zero forex markup on international transactions.',
      emiOptions: 'Option to convert purchases above ₹2,500 into EMIs at a 1% interest rate.',
      diningPrivileges: ['Discounts at over 1,500 restaurants and 300+ retail stores across India.'],
      creditLimit: 'Up to 100% of the FD amount.',
      interestRate: 'FD interest up to 7.25% p.a.',
      idealFor: [
        'First-time credit card users looking to start their credit journey.',
        'Individuals without regular income: students, homemakers, or freelancers.',
        'Frequent international travelers (zero forex markup fees).',
        'Budget-conscious users: no annual fees and straightforward rewards.'
      ],
      notIdealFor: [
        'High spenders seeking premium benefits.',
        'Individuals unable to open a fixed deposit.',
        'Users seeking high credit limits without collateral.'
      ],
      eligibilityCriteria: 'Age: 18 years or older.\nResidency: Indian residents with a current and permanent residential address.\nFixed Deposit: Minimum FD of ₹20,000 in cumulative or auto-renewal mode.\nExclusions: FDs opened by HUFs, partnership firms, societies, trusts, minors, or jointly held accounts are not eligible.'
    }
  },
  {
    id: 'idfc-hpcl-power',
    name: 'IDFC FIRST HPCL Power Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'fuel',
    image: '/credit-cards/IDFC-First-HPCL.png',
    apr: '46.2% p.a.',
    annualFee: '₹199 + GST',
    joiningFee: '₹199 + GST',
    rupay: true,
    feedback: [],
    categories: ['fuel', 'budget'],
    applyUrl: 'https://example.com/apply-idfc-hpcl-power',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 21X Reward Points per ₹150 on HPCL fuel spends
• 15X Reward Points per ₹150 on grocery, utility, and FASTag spends
• 2X Reward Points per ₹150 on other retail spends
• 6 Happy Coins per ₹100 on HP Pay App (fuel), capped at 600 coins/month

Exclusions: No points on fuel surcharge, EMI, rent, wallet loads, and select categories.`,
      welcomeBonus: '₹250 cashback on first HPCL fuel transaction of ₹250+ within 30 days; 5% cashback (up to ₹1,000) on first EMI conversion within 30 days',
      milestoneBenefits: [],
      insuranceCover: [
        'Personal accident cover: ₹2 lakh',
        'Lost card liability: ₹25,000'
      ],
      additionalServices: 'Roadside assistance worth ₹1,399, up to 4 times/year',
      idealFor: [
        'Moderate fuel and utility expenses',
        'Low annual fee card with decent fuel rewards'
      ],
      notIdealFor: [
        'Users desiring premium benefits like lounge access',
        'High spenders seeking higher reward rates'
      ],
      summary: 'Budget-friendly fuel card with strong HPCL rewards and low annual fee.',
      fuelSurcharge: 'Not specified'
    }
  },
  {
    id: 'idfc-hpcl-power-plus',
    name: 'IDFC FIRST HPCL+ Power Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'fuel',
    image: '/credit-cards/IDFC-First-HPCL.png',
    apr: '46.2% p.a.',
    annualFee: '₹499 + GST',
    joiningFee: '₹499 + GST',
    rupay: true,
    feedback: [],
    categories: ['fuel', 'budget'],
    applyUrl: 'https://example.com/apply-idfc-hpcl-power-plus',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 30X Reward Points per ₹150 on HPCL fuel, grocery, utility, and FASTag spends
• 3X Reward Points per ₹150 on other retail spends
• 6 Happy Coins per ₹100 on HP Pay App (fuel), capped at 600 coins/month

Exclusions: No points on fuel surcharge, EMI, rent, wallet loads, and select categories.`,
      welcomeBonus: '₹500 cashback on first HPCL fuel transaction of ₹500+ within 30 days; 5% cashback (up to ₹1,000) on first EMI conversion within 30 days',
      milestoneBenefits: [],
      insuranceCover: [
        'Personal accident cover: ₹2 lakh',
        'Lost card liability: ₹25,000'
      ],
      additionalServices: 'Lounge access (1/quarter on ₹20k+ spend), Movie: 25% off up to ₹100/month, Roadside assistance worth ₹1,399, up to 4 times/year',
      idealFor: [
        'High fuel and utility expenses',
        'Users seeking lounge access and higher reward rates'
      ],
      notIdealFor: [
        'Users with low annual spending',
        'Individuals not utilizing the additional perks'
      ],
      summary: 'Fuel card for frequent commuters and high spenders, with enhanced rewards and extra perks.',
      fuelSurcharge: 'Not specified'
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
    rupay: true,
    feedback: [],
    categories: [
      'fuel',
      'budget'
    ],
    applyUrl: 'https://example.com/apply-axis-iocl',
    additionalDetails: {
      rewardsProgram: `Enhanced rewards on fuel spends at IOCL outlets
Basic rewards on other spends

Fuel Benefits:
• 1% waiver on fuel transactions up to ₹400`,
      welcomeBonus: 'No welcome benefits',
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
      summary: 'A fuel-focused credit card offering enhanced savings on IOCL fuel purchases and surcharge waiver, ideal for frequent drivers.',
      fuelSurcharge: 'Not specified'
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
    rupay: false,
    feedback: [],
    categories: [
      'premium',
      'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    applyUrl: 'https://example.com/apply-icici-times-black',
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
      summary: 'A super-premium lifestyle credit card offering comprehensive travel benefits, exclusive event access, and premium lifestyle privileges, ideal for ultra-HNIs and frequent travelers who can meet the high annual spend requirement.',
    }
  },
  {
    id: 'hdfc-indigo-6e-rewards',
    name: 'HDFC IndiGo 6E Rewards Credit Card',
    bank: 'HDFC Bank',
    category: 'airlines',
    image: '/credit-cards/HDFC-Indigo.png',
    apr: '43.2% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge'
    ],
    applyUrl: 'https://example.com/apply-hdfc-indigo-6e-rewards',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 2.5% 6E Rewards on IndiGo bookings
• 2% on dining, groceries, and entertainment
• 1% on other spends

Redemption:
• 6E Rewards can be redeemed for IndiGo flight bookings and other services via the IndiGo website or app

Fuel Benefits:
• Not specified`,
      welcomeBonus: 'Welcome Benefits:\n• Complimentary IndiGo flight ticket worth ₹1,500 (on meeting spend criteria)\n• 6E Prime Add-on voucher worth ₹899',
      airportLounge: 'Not specified',
      insuranceCover: [
        'Zero lost card liability on reporting'
      ],
      minimumSpend: 'Not specified',
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
      summary: 'A co-branded credit card offering enhanced rewards on IndiGo bookings and partner spends, ideal for frequent IndiGo flyers.',
      fuelSurcharge: 'Not specified'
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
    rupay: false,
    feedback: [],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge',
      'international-travel'
    ],
    applyUrl: 'https://example.com/apply-sbi-krisflyer',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 5 KrisFlyer miles per ₹200 spent on Singapore Airlines, Scoot, Pelago, Kris+, and KrisShop\n• 2 KrisFlyer miles per ₹200 on other spends\n\nRedemption:\n• KrisFlyer miles can be redeemed for flights, upgrades, and other services within the Singapore Airlines Group',
      welcomeBonus: 'Welcome Benefits:\n• 3,000 KrisFlyer miles on first spend within 60 days',
      airportLounge: 'Complimentary domestic lounge access',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Air accident insurance cover up to ₹3.5 crore'
      ],
      minimumSpend: 'NA',
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
      summary: 'A co-branded credit card offering KrisFlyer miles on spends, ideal for frequent Singapore Airlines flyers and international travelers.',
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
    rupay: false,
    feedback: [],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge',
      // 'international-lounge',
      // 'international-travel'
    ],
    applyUrl: 'https://example.com/apply-sbi-krisflyer-apex',
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
      summary: 'A premium co-branded credit card offering enhanced KrisFlyer miles on spends, comprehensive travel benefits, and milestone rewards, ideal for frequent international travelers.',
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
    rupay: false,
    feedback: [],
    categories: [
      'airlines',
      'rewards',
      'travel',
      'domestic-lounge',
      'international-lounge',
      'international-travel'
    ],
    applyUrl: 'https://example.com/apply-indusind-avios-visa-infinite',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Up to 5X Avios on spends with British Airways and Qatar Airways\n• 1.5 Avios per ₹100 on other spends\n\nRedemption:\n• Avios points can be redeemed for flights, upgrades, and other services with partner airlines like British Airways and Qatar Airways',
      welcomeBonus: 'Welcome Benefits:\n• 20,000 Avios points on card activation',
      airportLounge: 'Complimentary domestic and international lounge access',
      fuelSurcharge: 'Not specified',
      insuranceCover: [
        'Personal air accident insurance cover up to ₹25 lakh'
      ],
      minimumSpend: 'Not specified',
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
      summary: 'A premium credit card offering Avios points on spends, comprehensive travel benefits, and exclusive airport services, ideal for frequent international travelers.',
    }
  },
  {
    id: 'tata-neu-infinity',
    name: 'HDFC Tata Neu Infinity Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/Tata-Neu-Infinity.png',
    apr: '43.2% p.a.',
    annualFee: '₹1,499 + GST',
    joiningFee: '₹1,499 + GST',
    rupay: true,
    feedback: [],
    categories: [
      'rewards',
      'shopping',
      'upi',
      // 'lifestyle'
      // 'fintech'
    ],
    applyUrl: 'https://example.com/apply-tata-neu-infinity',
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
      summary: 'A co-branded credit card offering enhanced rewards on Tata brand purchases and UPI transactions.',
      fuelSurcharge: 'Not specified',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹1,00,000/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹12 lakhs/annum`
    }
  },
  {
    id: 'tata-neu-plus',
    name: 'HDFC Tata Neu Plus Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/Tata-Neu.png',
    apr: '43.2% p.a.',
    annualFee: '₹499 + GST',
    joiningFee: '₹499 + GST',
    rupay: true,
    feedback: [],
    categories: [
      'rewards',
      'shopping',
      'upi',
      // 'fintech'
    ],
    applyUrl: 'https://example.com/apply-tata-neu-plus',
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
      summary: 'An entry-level co-branded credit card offering rewards on Tata brand purchases and UPI transactions.',
      fuelSurcharge: 'Not specified',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Monthly Income: ₹25,000/month
Self-Employed Individuals:
Age: 21 to 65 years
Income: ITR > ₹6 lakhs/annum`
    }
  },
  {
    id: 'hdfc-rupay',
    name: 'HDFC UPI RuPay Credit Card',
    bank: 'HDFC Bank',
    category: 'upi',
    image: '/credit-cards/HDFC-UPI-Rupay.png',
    apr: '43.2% p.a.',
    annualFee: '₹99 + GST',
    joiningFee: '₹99 + GST',
    rupay: true,
    feedback: [],
    categories: [
      'rewards',
      'budget',
      'upi',
      // 'fintech'
    ],
    applyUrl: 'https://example.com/apply-hdfc-rupay',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• Up to 3X CashPoints on spends\n• 1% on UPI transactions\n\nRedemption:\n• CashPoints can be redeemed for statement credit or other rewards for ₹0.25 per point',
      welcomeBonus: 'Not specified',
      milestoneBenefits: [
        'Spend ₹25,000 or more in an annual year, before your Credit Card renewal date and get your renewal fee waived off from 2nd year onwards'
      ],
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
      summary: 'An affordable RuPay credit card with UPI functionality and basic rewards program.',
      fuelSurcharge: 'Not specified'
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
    rupay: false,
    feedback: [],
    categories: ['secured'],
    applyUrl: 'https://example.com/apply-sbi-unnati',
    additionalDetails: {
      rewardsProgram: '1 reward point per ₹100 spent\n₹500 cashback on reaching ₹50,000 annual spend',
      minimumSpend: 'No minimum spend requirement',
      summary: 'A secured credit card with no annual fee for first 4 years and rewards on spending.',
      fuelSurcharge: 'Not specified'
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
    rupay: true,
    feedback: [],
    categories: ['secured', 'lifetime-free'],
    applyUrl: 'https://example.com/apply-kotak-811-dream-different',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 2 reward points per ₹100 spent online
• 1 reward point per ₹100 spent on other categories

Redemption:
• Points can be redeemed for vouchers and other rewards`,
      welcomeBonus: 'No specific welcome benefits',
      milestoneBenefits: [
        '₹250 voucher on spending ₹36,000 in an anniversary year',
        '₹1,000 voucher on spending ₹72,000 in an anniversary year'
      ],
      fuelSurcharge: '1% waiver on transactions between ₹500 and ₹3,000',
      additionalServices: 'Railway Benefits:\n• 1.8% surcharge waiver on IRCTC bookings\n• 2.5% surcharge waiver on railway counter bookings',
      idealFor: [
        'First-time credit card users',
        'Individuals without regular income (students, homemakers, freelancers)',
        'Those seeking low-cost credit options',
        'People looking to build or improve credit history'
      ],
      notIdealFor: [
        'High spenders seeking premium benefits',
        'Individuals unable to open a fixed deposit',
        'Those with established credit history'
      ],
      summary: 'A secured, lifetime-free credit card designed to help individuals build or improve their credit history, offering basic rewards and benefits with no annual or joining fees.',
      creditLimit: 'Up to 90% of the Fixed Deposit amount'
    }
  },
  {
    id: 'icici-instant-platinum',
    name: 'ICICI Bank Instant Platinum Credit Card',
    bank: 'ICICI Bank',
    category: 'secured',
    image: '/credit-cards/ICICI-Platinum-Secured.png',
    apr: '29.88% p.a.',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: false,
    feedback: [],
    categories: ['secured', 'lifetime-free'],
    applyUrl: 'https://example.com/apply-icici-instant-platinum',
    additionalDetails: {
      rewardsProgram: `Reward Points:
• Earn 2 PAYBACK points for every ₹100 spent on retail purchases (excluding fuel).`,
      diningPrivileges: [
        'Up to 15% savings at over 800 partner restaurants across India through ICICI Bank Culinary Treats program'
      ],
      movieBenefits: '25% discount (up to ₹100) on purchase of minimum two movie tickets, twice a month via BookMyShow',
      fuelSurcharge: '1% waiver on fuel surcharge for transactions up to ₹4,000 at HPCL petrol pumps (ICICI Bank POS terminals only)',
      creditLimit: 'Up to 85-90% of Fixed Deposit amount',
      summary: 'A secured, lifetime-free credit card issued instantly against an ICICI Bank FD, offering basic rewards, dining and movie discounts, and a fuel surcharge waiver. Ideal for those building or rebuilding credit.',
      interestRate: '2.49% per month (29.88% per annum) on outstanding balances',
      cashAdvanceFee: '2.5% of the transaction amount (min ₹500)',
      internationalTransactionFee: '3.5% of the transaction amount',
      additionalServices: 'FD continues to earn interest while card is active.',
      idealFor: [
        'New to Credit / No Credit History',
        'Individuals with Low or Poor Credit Scores',
        'Those rebuilding their credit history with a secured option.',
        'Students or Homemakers (if they can create a fixed deposit in their name, ₹50,000 minimum).',
        'People Without Income Documents (no income proof required).',
        'Budget-Conscious Users (lifetime free card with no joining or annual fees).',
        'People Who Want Basic Perks (some rewards, dining discounts, and movie offers without high eligibility).'
      ],
      notIdealFor: [
        'High Spenders / Premium Users (no high-end features like lounge access, concierge services, or accelerated rewards).',
        'Users Who Don\'t Want to Lock In Funds (requires a minimum ₹50,000 fixed deposit that remains locked as security).',
        'Frequent International Travelers (3.5% forex markup fee; no global travel benefits or lounge access).',
        'Reward Maximizers (low reward rate and limited redemption options; not suitable for those who value high cashback or reward programs).'
      ]
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
    rupay: false,
    feedback: [],
    categories: ['secured'],
    applyUrl: 'https://example.com/apply-bob-prime',
    additionalDetails: {
      creditLimit: 'Up to 80% of Fixed Deposit amount',
      rewardsProgram: `Reward points on spending

Fuel Benefits:
• Fuel surcharge waiver available`,
      summary: 'A secured credit card with fuel benefits and reward points on spending.',
      fuelSurcharge: 'Not specified'
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
    rupay: false,
    feedback: [],
    categories: ['secured'],
    applyUrl: 'https://example.com/apply-axis-fd',
    additionalDetails: {
      rewardsProgram: 'Earn rewards on all spending',
      summary: 'A secured credit card designed for credit building with rewards program.',
      fuelSurcharge: 'Not specified'
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
    rupay: false,
    feedback: [],
    categories: [
      'lifetime-free',
      'cashback',
      'shopping',
      'lifetime-free'
      // 'best-credit-cards'
    ],
    applyUrl: 'https://example.com/apply-amazon-pay-icici',
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
      summary: 'A lifetime-free credit card offering enhanced cashback on Amazon purchases and bill payments, with comprehensive welcome benefits for both Prime and non-Prime members.',
      fuelSurcharge: 'Not specified'
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
    rupay: true,
    feedback: [],
    categories: [
      'lifetime-free',
      'upi',
      'entertainment',
      'dining'
    ],
    applyUrl: 'https://example.com/apply-axis-my-zone',
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
      summary: 'A lifetime-free credit card offering entertainment and lifestyle benefits including SonyLIV Premium subscription, movie ticket discounts, and dining offers, ideal for entertainment enthusiasts and regular online shoppers.',
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
    rupay: false,
    feedback: [],
    categories: [
      'ultra-premium',
      // 'premium',
      'hotels',
      // 'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    applyUrl: 'https://example.com/apply-hsbc-taj',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 5 reward points per ₹100 spent at IHCL properties\n• 1.5 points per ₹100 on other eligible purchases\n\nRedemption:\n• Points can be redeemed for stays, dining, spa treatments, and more at participating IHCL hotels',
      welcomeBonus: 'Welcome Benefits:\n• Taj InnerCircle Platinum NeuPass Membership\n• Complimentary one-night stay at Taj Palaces\n• Two additional nights at participating IHCL hotels\n• Four set meal vouchers at select restaurants\n• Four 60-minute spa therapy vouchers\n• Twelve pool access vouchers for two\n• Twelve access vouchers each for The Chambers and Taj Club lounges',
      milestoneBenefits: [
        'Complimentary one-night stay at Taj Palaces on spends of ₹10 lakh',
        'Two additional nights at participating IHCL hotels on spends of ₹20 lakh',
        'Four set meal vouchers at select restaurants on spends of ₹30 lakh',
        'Four 60-minute spa therapy vouchers on spends of ₹40 lakh'
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
      minimumSpend: 'NA',
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
      summary: 'A premium co-branded credit card offering exclusive IHCL privileges, luxury travel benefits, and comprehensive lifestyle rewards, ideal for affluent individuals who frequently engage with IHCL properties.',
      fuelSurcharge: 'Not specified',
      eligibilityCriteria: `Salaried Individuals:
Age: 21 to 60 years
Net Annual Income: ₹40 lakhs and above
Self-Employed Individuals:
Age: 21 to 65 years
Net Annual Income: ₹60 lakhs and above`
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
    rupay: false,
    feedback: [],
    categories: [
      'ultra-premium',
      // 'premium',
      // 'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    applyUrl: 'https://example.com/apply-axis-primus',
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
      minimumSpend: 'NA',
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
    rupay: false,
    feedback: [],
    categories: [
      'ultra-premium',
      // 'premium',
      // 'rewards',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    applyUrl: 'https://example.com/apply-amex-centurion',
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
      minimumSpend: 'NA',
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
  },
  {
    id: 'amex-platinum',
    name: 'American Express Platinum Card',
    bank: 'American Express',
    category: 'ultra-premium',
    image: '/credit-cards/Amex_Platinum.png',
    apr: '42% p.a.',
    annualFee: '₹66,000 + GST',
    joiningFee: '₹66,000 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'premium',
      'international-travel',
      'domestic-lounge',
      'international-lounge'
    ],
    applyUrl: 'https://example.com/apply-amex-platinum',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 1 Membership Rewards Point for every ₹50 spent\n• Excludes fuel, insurance, utilities, and cash transactions\n\nRedemption Options:\n• Transfer points to airline and hotel loyalty programs\n• Redeem for Taj Hotels vouchers, Flipkart vouchers, or statement credits\n• Access to 18K and 24K Gold Collection\n\nPoint Value: Up to ₹0.50 per point when redeemed for Taj vouchers',
      welcomeBonus: 'Welcome Benefits:\n• Vouchers worth up to ₹60,000 from Taj Hotels, Postcard Hotels, or Reliance Brands upon spending ₹50,000 within first 2 months',
      milestoneBenefits: [
        'Annual renewal benefits worth ₹35,000',
        'Additional vouchers worth ₹35,000 on annual spends of ₹20 lakh'
      ],
      airportLounge: 'Unlimited access to over 1,300 airport lounges worldwide, including:\n• Centurion Lounges\n• Priority Pass\n• Delta Sky Club lounges',
      insuranceCover: [
        'Comprehensive travel insurance coverage'
      ],
      diningPrivileges: [
        'Exclusive dining access and privileges'
      ],
      minimumSpend: 'NA',
      creditLimit: 'Charge card (no pre-set spending limit)',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% on international transactions',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      additionalServices: 'Additional Benefits:\n• Elite hotel memberships: Marriott Bonvoy Gold Elite, Hilton Honors Gold, Taj Epicure Plus, Accor Plus Traveller\n• Complimentary subscriptions via Times Prime: The Wall Street Journal, Mint, Vogue, SonyLiv Premium, Disney+ Hotstar\n• Exclusive invites to global events like Fashion Week, Wimbledon, and the Grammys',
      idealFor: [
        'Luxury travelers seeking premium experiences',
        'High-net-worth individuals',
        'Those who can leverage premium hotel and dining privileges',
        'Frequent international travelers'
      ],
      notIdealFor: [
        'Users with moderate or low annual spending',
        'Those seeking cashback or low-fee cards',
        'Budget-conscious individuals'
      ],
      eligibilityCriteria: `Salaried Individuals:
Age: 18 to 60 years
Net Annual Income: ₹25-30 lakhs
Self-Employed Individuals:
Age: 18 to 65 years
Net Annual Income: ITR > ₹25-30 lakhs
Credit Score: 750+`,
      summary: 'A premium charge card offering unparalleled luxury travel benefits, elite status memberships, and exclusive lifestyle privileges, ideal for high-net-worth individuals and frequent luxury travelers.'
    }
  },
  {
    id: 'amex-gold',
    name: 'American Express Gold Card',
    bank: 'American Express',
    category: 'premium',
    image: '/credit-cards/Amex_Gold.png',
    apr: '42% p.a.',
    annualFee: '₹4,500 + GST',
    joiningFee: '₹1000',
    rupay: false,
    feedback: [],
    categories: [
      // 'premium',
      'lifestyle',
      'shopping',
      'dining'
    ],
    applyUrl: 'https://example.com/apply-amex-gold',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 1 Membership Rewards Point for every ₹50 spent (including fuel and utility payments)\n• 5X Membership Rewards Points on purchases through Reward Multiplier platform\n• Monthly Bonus: 1,000 bonus points for 6 transactions of ₹1,000 or more each calendar month\n\nRedemption Options:\n• 18 Karat Gold Collection (18,000 MR Points):\n  - Taj voucher worth ₹9,000\n  - Shoppers Stop voucher worth ₹7,000\n  - Tata CLiQ voucher worth ₹7,000\n  - Myntra voucher worth ₹7,000\n  - Amazon voucher worth ₹6,000\n  - Flipkart voucher worth ₹6,000\n  - Reliance Digital voucher worth ₹6,000\n\n• 24 Karat Gold Collection (24,000 MR Points):\n  - Taj voucher worth ₹14,000\n  - Shoppers Stop voucher worth ₹10,000\n  - Tata CLiQ voucher worth ₹9,000\n  - Tanishq voucher worth ₹9,000\n  - Amazon voucher worth ₹8,000\n  - Flipkart voucher worth ₹8,000\n  - Reliance Digital voucher worth ₹8,000',
      welcomeBonus: 'Welcome Benefits:\n• 4,000 bonus Membership Rewards Points upon spending ₹10,000 within first 90 days and payment of annual fee',
      milestoneBenefits: [
        '1,000 bonus Membership Rewards Points on making 6 transactions of ₹1,000 or more each calendar month',
        'Up to 12,000 bonus points annually through monthly transaction bonuses'
      ],
      diningPrivileges: [
        'Up to 20% off at select partner restaurants'
      ],
      additionalServices: 'Additional Benefits:\n• Access to The Hotel Collection\n• Room upgrades (where available)\n• US$100 hotel credit on stays of two consecutive nights at over 400 hotels worldwide\n• Partner hotels include Hilton, Intercontinental, and Hyatt Hotels',
      minimumSpend: 'NA',
      creditLimit: 'Charge card (no pre-set spending limit)',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% on international transactions',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      idealFor: [
        'Individuals who prefer a charge card with flexible spending limits',
        'Frequent shoppers and diners',
        'Those who value diverse redemption options',
        'Users who can maximize the rewards program'
      ],
      notIdealFor: [
        'Users seeking cashback or low-fee credit cards',
        'Individuals who may not fully utilize the rewards and benefits',
        'Budget-conscious users'
      ],
      summary: 'A premium charge card offering flexible spending power, enhanced rewards through the Reward Multiplier platform, and comprehensive dining and travel benefits, ideal for frequent shoppers and diners who value diverse redemption options.'
    }
  },
  {
    id: 'amex-smartearn',
    name: 'American Express SmartEarn Credit Card',
    bank: 'American Express',
    category: 'lifestyle',
    image: '/credit-cards/Amex_SmartEarn.png',
    apr: '42% p.a.',
    annualFee: '₹495 + GST',
    joiningFee: '₹495 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'lifestyle',
      'shopping',
      'first-time'
    ],
    applyUrl: 'https://example.com/apply-amex-smartearn',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 10X Membership Rewards Points on Flipkart, Amazon, Uber, Zomato, AJIO, PVR, Blinkit (capped at 500 points per month per merchant)\n• 5X Membership Rewards Points on Paytm Wallet, Swiggy, BookMyShow (capped at 250 points per month)\n• 1 Membership Rewards Point per ₹50 spent on other categories\n\nRedemption Options:\n• E-vouchers from popular brands\n• Airline and hotel loyalty programs\n• Statement credits\n\nPoint Value: Up to ₹0.50 per point when redeemed for Taj vouchers',
      welcomeBonus: 'Welcome Benefits:\n• ₹500 cashback as statement credit upon spending ₹10,000 within first 90 days',
      milestoneBenefits: [
        '₹500 vouchers on achieving annual spends of ₹1.2 lakh',
        '₹500 vouchers on achieving annual spends of ₹1.8 lakh',
        '₹500 vouchers on achieving annual spends of ₹2.4 lakh',
        'Annual fee waiver upon spending ₹40,000 in a year'
      ],
      fuelSurcharge: '0% convenience fee on fuel purchases at HPCL for transactions below ₹25,000',
      minimumSpend: 'NA',
      idealFor: [
        'First-time credit card users',
        'Online shoppers seeking rewards on popular platforms',
        'Digital-first users'
      ],
      notIdealFor: [
        'Users seeking premium travel benefits',
        'Those looking for luxury privileges',
        'International travelers'
      ],
      summary: 'An entry-level credit card offering enhanced rewards on online shopping and popular platforms, ideal for first-time credit card users and digital-first consumers.'
    }
  },
  {
    id: 'amex-platinum-reserve',
    name: 'American Express Platinum Reserve Credit Card',
    bank: 'American Express',
    category: 'premium',
    image: '/credit-cards/Amex_Reserve.png',
    apr: '42% p.a.',
    annualFee: '₹10,000 + GST',
    joiningFee: '₹10,000 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'premium',
      'lifestyle',
      'travel',
      'domestic-lounge',
      'international-lounge',
      'dining'
    ],
    applyUrl: 'https://example.com/apply-amex-platinum-reserve',
    additionalDetails: {
      rewardsProgram: 'Earning Rate:\n• 1 Membership Rewards Point for every ₹50 spent\n• Excludes fuel, insurance, utilities, cash transactions, and EMI conversions\n\nRedemption Options:\n• E-Vouchers: Amazon, Flipkart, Taj Hotels\n• INSTA Purchases at partner stores\n• Cash + Points for bill offset\n• Transfer to loyalty programs: Club Vistara, Emirates Skywards, Singapore KrisFlyer, Marriott Bonvoy, Hilton Honors\n\nPoint Value: Up to ₹0.50 per point when redeemed for select vouchers or transferred to loyalty programs',
      welcomeBonus: 'Welcome Benefits:\n• 11,000 Membership Rewards Points upon spending ₹30,000 within first 90 days and payment of annual fee',
      milestoneBenefits: [
        'Monthly: ₹500 voucher from Flipkart, BookMyShow, or select brands on spending ₹25,000 in a calendar month',
        'Annual: Taj Hotels voucher worth ₹10,000 on spending ₹5 lakh in a membership year',
        'Annual fee waiver on spending ₹10 lakh in the preceding membership year'
      ],
      airportLounge: 'Airport Lounge Access:\n• 12 complimentary domestic lounge visits per year (max 3 per quarter)\n• Complimentary Priority Pass membership for access to over 1,200 international lounges (usage charges apply)',
      insuranceCover: [
        'Personal air accident insurance up to ₹1 crore',
        'Purchase protection against theft or damage within 60 days of purchase'
      ],
      diningPrivileges: [
        'Complimentary Taj Epicure membership',
        'Complimentary EazyDiner Prime membership',
        'Dining discounts and exclusive privileges'
      ],
      additionalServices: 'Additional Benefits:\n• Access to The Hotel Collection\n• Room upgrades (where available)\n• US$100 hotel credit on stays of two consecutive nights at over 400 hotels worldwide\n• Partner hotels include Hilton, Intercontinental, and Hyatt Hotels\n• Up to 2 complimentary golf rounds per month at 32 premium courses (on spending ₹50,000 in a calendar month)\n• 24×7 Platinum Concierge for travel, dining, and lifestyle assistance',
      minimumSpend: 'NA',
      creditLimit: 'Customized as per profile',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '3.5% on international transactions',
      interestRate: '42% p.a.',
      emiOptions: 'Available on eligible purchases',
      idealFor: [
        'Individuals with annual spending between ₹5–10 lakh',
        'Those seeking premium lifestyle benefits',
        'Users who can leverage monthly and annual milestone rewards',
        'Frequent travelers and diners'
      ],
      notIdealFor: [
        'Individuals with annual spending below ₹3 lakh',
        'Those seeking cashback or low-fee credit cards',
        'Users who may not utilize premium benefits'
      ],
      summary: 'A premium credit card offering comprehensive lifestyle benefits including lounge access, hotel privileges, dining memberships, and golf access, ideal for affluent individuals seeking premium lifestyle and travel benefits.'
    }
  },
  {
    id: 'jupiter-edge-csb',
    name: 'Jupiter Edge CSB  RuPay Credit Card',
    bank: 'CSB Bank',
    category: 'upi',
    image: '/credit-cards/Jupiter.png',
    apr: 'Not specified',
    annualFee: '₹0 (Lifetime Free for the first 2 lakh customers)',
    joiningFee: '₹0',
    rupay: true,
    feedback: [],
    categories: [
      'upi',
      'lifetime-free',
      'rewards'
    ],
    applyUrl: 'https://example.com/apply-jupiter-edge-csb',
    additionalDetails: {
      rewardsProgram: `Earning Rate:\n• 2% cashback on spends in your selected category (Shopping, Travel, or Dining)\n• 0.4% cashback on all other spends, including UPI transactions\n\nRedemption Options:\n• Cashback: Redeem Jewels as a statement credit\n• Digital Gold: Convert Jewels into digital gold\n• Gift Vouchers: Redeem for vouchers from various partner brands\n\nRedemption Conditions: A minimum of 100 Jewels is required for redemption. Jewels do not expire.`,
      welcomeBonus: '₹250 voucher on first UPI transaction of ₹2,000 or more (Amazon, Flipkart, Swiggy, Zomato, Myntra, etc.)',
      milestoneBenefits: [],
      airportLounge: '1 complimentary domestic airport lounge access per quarter',
      fuelSurcharge: '1% waiver on fuel transactions between ₹400 and ₹3,000, capped at ₹100 per month',
      insuranceCover: [
        'Personal accident and total permanent disability cover up to ₹10 lakh'
      ],
      additionalServices: 'Card management via Jupiter app: set limits, freeze/unfreeze, reset PIN, and more.',
      idealFor: [
        'Individuals who prefer UPI payments but want to earn credit card rewards',
        'Users seeking a no-fee credit card with flexible cashback options',
        'Those who spend regularly in categories like Shopping, Travel, or Dining'
      ],
      notIdealFor: [
        'Users looking for premium travel benefits or higher reward rates',
        'Individuals who prefer cashback on all categories without the need to select a preferred category'
      ],
      summary: 'A no-fee RuPay credit card with UPI functionality, flexible category-based cashback, and digital-first management via the Jupiter app.'
    }
  },
  {
    id: 'au-zenith-plus',
    name: 'AU Zenith+ Credit Card (Metal)',
    bank: 'AU Small Finance Bank',
    category: 'premium',
    image: '/credit-cards/AU_Zenith+.png',
    apr: 'Not specified',
    annualFee: '₹4,999 + taxes',
    joiningFee: '₹4,999 + taxes',
    rupay: false,
    feedback: [],
    categories: ['premium', 'travel', 'lifestyle'],
    applyUrl: 'https://example.com/apply-au-zenith-plus',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 2 Reward Points per ₹100 on dining, travel, and international spends
• 1 Reward Point per ₹100 on other retail spends
• No Reward Points on fuel, EMI transactions, and certain other categories.

Exclusions: No points on fuel, EMI, rent, education, government, insurance, utility bills.`,
      redemptionOptions: `Redeem Reward Points via AU Rewardz portal for:
• Gift Vouchers (various brands)
• Merchandise
• Mobile/DTH Recharge
• Travel Bookings (flights, hotels, buses)
• Movie Tickets`,
      welcomeBonus: 'Choice of ₹5,000 luxury brand vouchers (Taj Hotels, Michael Kors, Tata Cliq, etc.) OR 5,000 Reward Points upon activation via AU 0101 App, Net Banking, customer care, or chatbot AURO.',
      milestoneBenefits: [
        'Monthly: 1,000 bonus Reward Points for ₹75,000+ spend in a statement month (excludes rent, education, government, insurance, utility, fuel).',
        'Annual: Complimentary Taj Epicure Membership on ₹12 lakh spend in a card anniversary year.'
      ],
      airportLounge: '16 complimentary domestic and 16 international airport lounge visits annually',
      fuelSurcharge: '1% waiver (max ₹1,000 per statement cycle)',
      insuranceCover: [
        'Air accident cover up to ₹2 crore',
        'Card liability and credit shield up to ₹15 lakh',
        'Purchase protection up to ₹50,000'
      ],
      idealFor: [
        'Individuals with a monthly net income of ₹2.5 lakh or more',
        'Frequent travelers and luxury lifestyle seekers'
      ],
      notIdealFor: [
        'Users with annual spends below ₹8 lakh',
        'Those seeking low or no annual fee cards'
      ],
      summary: 'A luxury metal credit card for high-income individuals, offering premium travel, lifestyle, and reward benefits. Low forex markup: 0.99% + GST (~1.168%).'
    }
  },
  {
    id: 'au-vetta',
    name: 'AU Vetta Credit Card',
    bank: 'AU Small Finance Bank',
    category: 'premium',
    image: '/credit-cards/AU_Vetta.png',
    apr: 'Not specified',
    annualFee: '₹2,999 + taxes',
    joiningFee: '₹2,999 + taxes',
    rupay: false,
    feedback: [],
    categories: ['premium', 'travel', 'domestic-lounge', 'international-lounge'],
    applyUrl: 'https://example.com/apply-au-vetta',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 2 Reward Points per ₹100 on travel, dining, and international spends
• 1 Reward Point per ₹100 on other retail spends
• No Reward Points on fuel, EMI transactions, and select categories

Exclusions: No points on fuel, EMI, rent, education, government, insurance, utility bills.`,
      redemptionOptions: `Redeem Reward Points via AU Rewardz portal for:
• Gift Vouchers (various brands)
• Merchandise
• Mobile/DTH Recharge
• Travel Bookings (flights, hotels, buses)
• Movie Tickets`,
      welcomeBonus: 'Details not specified',
      milestoneBenefits: [],
      airportLounge: 'Complimentary domestic and international airport lounge visits',
      fuelSurcharge: '1% waiver on transactions between ₹400 and ₹5,000 (max ₹100 per statement cycle)',
      insuranceCover: [
        'Comprehensive protection including air accident and card liability covers'
      ],
      idealFor: [
        'Individuals with moderate to high spending patterns',
        'Travel enthusiasts seeking lounge access'
      ],
      notIdealFor: [
        'Users with annual spends below ₹1.5 lakh',
        'Those seeking detailed reward structures'
      ],
      summary: 'A premium card for mid-to-high spenders, offering travel perks, insurance benefits, and 2 complimentary railway lounge visits per quarter.'
    }
  },
  {
    id: 'au-altura-plus',
    name: 'AU Altura+ Credit Card',
    bank: 'AU Small Finance Bank',
    category: 'lifestyle',
    image: '/credit-cards/AU_Altura+.png',
    apr: 'Not specified',
    annualFee: '₹499 + taxes',
    joiningFee: '₹499 + taxes',
    rupay: false,
    feedback: [],
    categories: ['lifestyle', 'cashback', 'rewards'],
    applyUrl: 'https://example.com/apply-au-altura-plus',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 1.5% cashback on POS retail spends (max ₹100 per statement cycle)
• 2X Reward Points on online transactions
• 1 Reward Point per ₹100 on utility, telecom, and insurance spends
• 500 bonus Reward Points on monthly retail spends of ₹20,000 or more

Exclusions: No points on fuel, EMI, rent, education, government, insurance, utility bills.`,
      redemptionOptions: `Redeem Reward Points via AU Rewardz portal for:
• Gift Vouchers (various brands)
• Merchandise
• Mobile/DTH Recharge
• Travel Bookings (flights, hotels, buses)
• Movie Tickets`,
      welcomeBonus: 'Details not specified',
      milestoneBenefits: ['500 bonus reward points on monthly retail spends of ₹20,000 or more'],
      fuelSurcharge: '1% waiver on transactions between ₹400 and ₹5,000 (max ₹150 per statement cycle)',
      insuranceCover: [
        'Lost card liability cover'
      ],
      idealFor: [
        'Individuals with regular online and POS retail spends',
        'Those seeking a balance between cashback and rewards'
      ],
      notIdealFor: [
        'Users with monthly spends below ₹20,000',
        'Those seeking higher cashback limits'
      ],
      summary: 'A lifestyle card for everyday spenders, offering a mix of cashback and reward points, and 2 complimentary railway lounge visits per quarter.'
    }
  },
  {
    id: 'au-spont',
    name: 'AU Spont Credit Card',
    bank: 'AU Small Finance Bank',
    category: 'upi',
    image: '/credit-cards/AU_Spont.png',
    apr: 'Not specified',
    annualFee: '₹299 + GST',
    joiningFee: '₹299 + GST',
    rupay: true,
    feedback: [],
    categories: ['upi', 'cashback', 'domestic-lounge'],
    applyUrl: 'https://example.com/apply-au-spont',
    additionalDetails: {
      rewardsProgram: `Earning Rate:
• 1% cashback on all transactions including UPI, e-commerce, POS, and contactless payments
• 5 coins for every UPI transaction via AU 0101 app
• Cashback capped at ₹500 per statement cycle

Exclusions: No cashback on fuel, rent, government, education, cash withdrawals, EMIs, and insurance spends`,
      redemptionOptions: `Redeem cashback as statement credit or for partner offers via AU platform.
Coins earned from UPI transactions can be redeemed against various rewards in the AU Rewardz catalogue.`,
      welcomeBonus: 'Not specified',
      milestoneBenefits: [],
      airportLounge: '2 complimentary domestic airport lounge visits per quarter upon achieving ₹30,000 spends in the previous quarter',
      fuelSurcharge: '1% waiver on transactions between ₹400 and ₹5,000',
      insuranceCover: [
        'Standard credit card insurance coverage'
      ],
      additionalServices: 'Additional Benefits:\n• 2 complimentary railway lounge accesses per calendar quarter\n• Cash withdrawal fee: 2.5% of withdrawn amount or ₹500, whichever is higher',
      idealFor: [
        'Digital payment enthusiasts who frequently use UPI',
        'Budget-conscious users seeking low fees',
        'First-time credit card holders',
        'Frequent domestic travelers'
      ],
      notIdealFor: [
        'High spenders seeking premium rewards',
        'International travelers',
        'Users with high fuel, rent, or insurance payments'
      ],
      summary: 'An entry-level RuPay credit card offering straightforward 1% cashback on all spends, UPI rewards, and complimentary lounge access, ideal for digital payment enthusiasts and budget-conscious users.'
    }
  },
  {
    id: "bob-tiara",
    name: "Bank of Baroda Tiara Credit Card",
    bank: "Bank of Baroda",
    category: "lifestyle",
    image: "/credit-cards/BOB_Tiara.png",
    apr: "3.49% per month",
    annualFee: "₹2,499 + GST",
    joiningFee: "₹2,499 + GST",
    rupay: true,
    feedback: [],
    categories: ["lifestyle", "rewards", "travel", "dining", "upi"],
    applyUrl: 'https://example.com/apply-bob-tiara',
    additionalDetails: {
      rewardsProgram: `Earning Rate:\n• 5X Reward Points on dining, travel, and international spends\n• 3 Reward Points per ₹100 on other retail spends\n• UPI transactions reward points capped at ₹500 per statement cycle\n\nReward Point Value:\n• 1 Reward Point = ₹0.25`,
      welcomeBonus: "Complimentary Memberships:\n• Annual memberships to Amazon Prime, Disney+ Hotstar, and Gaana Plus\n• 3-month Swiggy One membership\n• 6-month Fitpass Pro membership\n\nDiscount Vouchers:\n• Quarterly discounts up to ₹1,500 on leading brands like Nykaa, Flipkart, Myntra, BookMyShow, and Lakmé Salon",
      milestoneBenefits: [
        "Quarterly discounts up to ₹1,500 on Nykaa, Flipkart, Myntra, BookMyShow, and Lakmé Salon"
      ],
      airportLounge: "Unlimited complimentary domestic airport lounge visits on spending ₹40,000 in previous quarter",
      fuelSurcharge: "1% waiver on transactions between ₹400-₹5,000 (max ₹250 per statement)",
      insuranceCover: [
        "Zero liability on lost card reporting"
      ],
      diningPrivileges: [
        "5X Reward Points on dining spends"
      ],
      minimumSpend: "₹25,000 in first 60 days for joining fee waiver",
      creditLimit: "Based on credit assessment",
      domesticTransactionFee: "Standard",
      internationalTransactionFee: "2% forex mark-up",
      interestRate: "3.49% per month",
      emiOptions: "Smart EMI available for purchases above ₹2,500 (6 months to 4 years)",
      additionalServices: "UPI transactions reward points capped at ₹500 per statement cycle",
      idealFor: [
        "Frequent travelers",
        "Dining enthusiasts",
        "Online shoppers",
        "Entertainment lovers"
      ],
      notIdealFor: [
        "Low spenders",
        "Those who don't use UPI"
      ],
      summary: "A lifestyle-focused credit card offering premium entertainment memberships, dining rewards, and travel benefits with UPI support",
      redemptionOptions: "Reward points can be redeemed for various benefits and statement credits"
    }
  },
  {
    id: 'idfc-first-millennia',
    name: 'IDFC FIRST Millennia Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'lifestyle',
    image: '/credit-cards/idfc/Millennia-Card_F.png',
    apr: 'Low interest rates',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: false,
    feedback: [],
    categories: [
      'lifetime-free',
      'rewards',
      'lifestyle'
    ],
    applyUrl: '',
    additionalDetails: {
      welcomeBonus: `Welcome voucher worth ₹500 on spending ₹5,000 or more within 30 days of card generation.\n5% cashback (up to ₹1,000) on the transaction value of first EMI done within 30 days of card generation.`,
      rewardsProgram: `3X Reward points on online & offline spends up to ₹20,000.\nUp to 10X Reward points on spend >₹20,000 & on your birthday.\n1X Reward points on UPI spends up to ₹2,000.\n3X Reward points on UPI spends >₹2,000.\nReward points that don't expire.`,
      milestoneBenefits: [],
      movieBenefits: `25% discount on movie tickets up to ₹100 on Paytm mobile app (valid once per month).`,
      airportLounge: `4 complimentary railway lounge access visits per quarter.`,
      additionalServices: `Complimentary roadside assistance worth ₹1,399.\nFuel surcharge waiver of 1% at all fuel stations across India, up to ₹200/month.\n300+ merchant offers, all year long!\nUp to 20% discount at 1,500+ restaurants.\nExclusive merchant offers for every day of the week.`,
      // No idealFor, notIdealFor, eligibility, or summary as not in screenshot
    }
  },
  {
    id: 'idfc-first-ashva',
    name: 'IDFC FIRST Ashva Credit Card',
    bank: 'IDFC FIRST Bank',
    category: 'premium',
    image: '/credit-cards/idfc/Ashva-Card-revised-27-Nov.png',
    apr: '',
    annualFee: '₹2,999 + GST',
    joiningFee: '₹2,999 + GST',
    rupay: false,
    feedback: [],
    categories: [
      'premium',
      'lifestyle',
      'travel',
      'metal'
    ],
    applyUrl: '',
    additionalDetails: {
      summary: "A premium metal credit card blending India's heritage with modern luxury, offering lifestyle, travel, and entertainment benefits for affluent individuals.",
      rewardsProgram: `Earn 5X reward points on monthly spends below ₹20,000.\nEarn 10X reward points on monthly spends above ₹20,000 and on your birthday.\nReward points can be redeemed for a variety of options (₹0.25 per point).`,
      welcomeBonus: `2,500 reward points upon payment of the joining fee.\nUp to ₹2,000 cashback on four transactions of ₹500 or more within 60 days of card issuance.`,
      airportLounge: `4 complimentary domestic airport lounge accesses per quarter.\n2 complimentary international airport lounge accesses per quarter.\n4 complimentary railway lounge accesses per quarter at select IRCTC lounges.`,
      milestoneBenefits: [],
      movieBenefits: `Buy One Get One (BOGO) offer on BookMyShow movie tickets, up to ₹400, twice a month.`,
      additionalServices: `Up to 2 complimentary golf rounds or lessons per month (on spends of ₹20,000+).\nLow forex markup fee of 1% on international transactions.\nVisa Infinite Privileges: Discounts on airport meet-and-greet services at 450+ airports, limousine services for airport transfers, personalized travel assistance, and exclusive benefits at 900+ luxury hotels globally.`,
      insuranceCover: [`Comprehensive travel insurance coverage up to $1,200.`, `Roadside Assistance (RSA) available up to four times a year.`, `Personal accident and lost card liability cover up to ₹50,000.`, `Trip cancellation insurance of up to ₹25,000 per instance, twice a year.`],
      redemptionOptions: `• Value: Each Reward Point = ₹0.25\n• Redemption Options:\n  - Online transactions\n  - Gift vouchers (Amazon, Flipkart, Myntra, BigBasket)\n  - Merchandise purchases\n  - Flight, hotel, and movie bookings\n• Redemption Fee: ₹99 + GST per request\n• Expiry: Points do not expire\n\nEffective Cashback Rates:\n• 1X Rewards: ~0.17% cashback\n• 3X Rewards: ~0.50% cashback\n• 5X Rewards: ~0.83% cashback\n• 10X Rewards: ~1.67% cashback`,
      idealFor: [
        'Affluent Individuals: Those seeking a premium credit card experience with a blend of traditional aesthetics and modern benefits.',
        'Frequent Travelers: Individuals who travel domestically and internationally, benefiting from lounge accesses and travel insurance.',
        'Lifestyle Enthusiasts: Users who enjoy golf, movies, and exclusive lifestyle privileges.'
      ],
      notIdealFor: [
        'Budget-Conscious Users: Those who may not fully utilize the premium benefits relative to the annual fee.',
        'Reward Maximizers: Individuals seeking higher reward redemption values might find the ₹0.25 per point valuation less appealing.'
      ],
      eligibilityCriteria: `Age: Minimum 18 years.\nIncome: While specific income criteria aren't publicly disclosed, the card targets individuals with higher income brackets, given its premium nature.\nCredit Score: A good credit history is essential, typically with a credit score of 750 or higher.\nResidency: Indian residents.`
    }
  },
  {
    id: 'icici-coral-rupay',
    name: 'ICICI Bank Coral RuPay Credit Card',
    bank: 'ICICI Bank',
    category: 'lifestyle',
    image: '/credit-cards/ICICI-Coral.png',
    apr: '42% p.a.',
    annualFee: '₹500 + GST',
    joiningFee: '₹500 + GST',
    rupay: true,
    feedback: [],
    categories: [
      'lifestyle',
      'rewards',
      'upi',
      'fee-card'
    ],
    applyUrl: 'https://example.com/apply-icici-coral-rupay',
    additionalDetails: {
      rewardsProgram: `Earn 2 reward points on every ₹100 spent (except fuel), and 1 point on utilities and insurance.`,
      welcomeBonus: '',
      milestoneBenefits: [
        'Annual fee of ₹500 + GST waived on annual spends of ₹1,50,000'
      ],
      airportLounge: '1 complimentary domestic airport lounge access per quarter upon spending ₹75,000 in the previous quarter.',
      fuelSurcharge: '1% fuel surcharge waiver on transactions between ₹400 and ₹4,000 at HPCL petrol pumps.',
      movieBenefits: '25% discount (up to ₹100) on movie tickets twice a month on BookMyShow and Inox.',
      redemptionOptions: '',
      additionalServices: 'Can be linked to UPI for seamless payments.',
      eligibilityCriteria: 'Minimum age: 21 years. Monthly income: ₹20,000 and above.'
    }
  },
  {
    id: 'hsbc-premier-mastercard',
    name: 'HSBC Premier Credit Card',
    bank: 'HSBC',
    category: 'premium',
    image: '/credit-cards/HSBC-premier.png',
    apr: '3.5% per month (42% p.a.)',
    annualFee: '₹20,000',
    joiningFee: '₹12,000',
    rupay: false,
    feedback: [],
    categories: ['premium', 'travel', 'lifestyle'],
    additionalDetails: {
      rewardsProgram: '3 reward points per ₹100 spent, redeemable at ₹1 per point',
      welcomeBonus: 'Complimentary Taj Epicure and EazyDiner Prime memberships',
      airportLounge: 'Unlimited domestic and international airport lounge access, plus 8 free guest visits annually',
      diningPrivileges: [
        'Buy One Get One free offer on BookMyShow',
        'Complimentary Taj Epicure membership',
        'EazyDiner Prime membership'
      ],
      minimumSpend: 'Annual fee waived for qualified HSBC Premier customers',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: '0.99% foreign exchange markup fee',
      idealFor: [
        'Affluent individuals',
        'Luxury travelers',
        'High spenders',
        'Lifestyle enthusiasts'
      ],
      summary: 'A premium credit card offering luxury travel and lifestyle benefits for affluent individuals.',
      travelLifestyleBenefits: 'Comprehensive travel and lifestyle benefits with premium memberships'
    }
  },
  {
    id: 'hsbc-live-plus',
    name: 'HSBC Live+ Credit Card',
    bank: 'HSBC',
    category: 'cashback',
    image: '/credit-cards/HSBC-Live+.png',
    apr: '3.5% per month (42% p.a.)',
    annualFee: '₹999',
    joiningFee: '₹999',
    rupay: false,
    feedback: [],
    categories: ['cashback', 'lifestyle'],
    additionalDetails: {
      rewardsProgram: '10% cashback (up to ₹1,000/month) on dining, groceries, and food delivery\nUnlimited 1.5% cashback on other retail purchases',
      welcomeBonus: '₹1,000 cashback on spending ₹20,000 within the first 30 days',
      airportLounge: '4 complimentary domestic airport lounge visits per year',
      milestoneBenefits: [
        'Annual fee waiver on spending ₹3.5 lakh or more'
      ],
      diningPrivileges: [
        '10% cashback on dining',
        'Exclusive monthly offers on platforms like Amazon, Blinkit, and Pharmeasy'
      ],
      idealFor: [
        'Daily spenders',
        'Food and grocery shoppers',
        'Online shoppers',
        'Cashback seekers'
      ],
      summary: 'An everyday cashback credit card focused on daily spending with attractive rewards.',
      additionalServices: 'Exclusive monthly offers on popular platforms'
    }
  },
  {
    id: 'hsbc-visa-platinum',
    name: 'HSBC Visa Platinum Credit Card',
    bank: 'HSBC',
    category: 'rewards',
    image: '/credit-cards/HSBC-Visa-Platinum.png',
    apr: '3.5% per month (42% p.a.)',
    annualFee: '₹0',
    joiningFee: '₹0',
    rupay: false,
    feedback: [],
    categories: ['rewards', 'lifetime-free'],
    additionalDetails: {
      rewardsProgram: '2 reward points per ₹150 spent\n5X rewards on annual spends above ₹4 lakh (up to 15,000 bonus points)',
      welcomeBonus: 'Amazon voucher worth ₹500 on spending ₹5,000 within 30 days',
      diningPrivileges: [
        'Buy One Get One free offer on BookMyShow on Saturdays (up to ₹250)'
      ],
      fuelSurcharge: 'Fuel surcharge waiver up to ₹3,000 annually',
      idealFor: [
        'Entry-level users',
        'Reward seekers',
        'Budget-conscious users',
        'Movie enthusiasts'
      ],
      summary: 'A lifetime free credit card offering basic rewards and benefits for entry-level users.',
      additionalServices: 'Regular offers on dining and entertainment'
    }
  }
]; 

// Sync fees whenever this file is modified
if (typeof window === 'undefined') {
  // Only run on server side
  fetch('/api/sync-fees', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        console.error('Failed to sync fees:', data.error);
      }
    })
    .catch(error => {
      console.error('Error syncing fees:', error);
    });
}