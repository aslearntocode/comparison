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
    id: 'uni-pay-1-3rd',
    name: 'Uni Pay 1/3rd Card',
    bank: 'Uni Cards',
    image: '/credit-cards/Uni-Pay.png',
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
    image: '/credit-cards/Uni-Gold.png',
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
  },
  {
    id: 'kiwi-upi',
    name: 'Kiwi UPI Credit Card',
    bank: 'Axis Bank and Yes Bank',
    image: '/credit-cards/Kiwi.png',
    apr: '52.86% p.a.',
    annualFee: 'Lifetime Free',
    joiningFee: 'Lifetime Free',
    rewards: '1% cashback on all UPI transactions\n2% cashback on Scan & Pay transactions at large merchants',
    rupay: true,
    features: [
      'UPI Integration',
      'Virtual Card',
      'Instant Issuance',
      'NPCI Certified'
    ],
    feedback: [],
    additionalDetails: {
      rewardsProgram: 'Rewards Structure:\n• 1% cashback on all UPI transactions\n• 2% cashback on Scan & Pay transactions at large merchants\n• Up to 5% cashback on achieving specific spend thresholds under Kiwi Neon membership\n• Rewards earned in Kiwis (1 Kiwi = ₹0.25)\n• Cashback credited directly to bank account',
      welcomeBonus: 'N/A',
      milestoneBenefits: [
        'Up to 5% cashback on achieving specific spend thresholds under Kiwi Neon membership',
        'Complimentary airport lounge access upon meeting certain spend milestones (for Kiwi Neon members)'
      ],
      airportLounge: 'Complimentary access upon meeting certain spend milestones (available to Kiwi Neon members)',
      insuranceCover: [
        'Basic purchase protection included'
      ],
      movieBenefits: 'N/A',
      diningPrivileges: [],
      minimumSpend: 'No minimum spend requirement',
      paymentDueDays: '25 days',
      creditLimit: 'Based on credit assessment',
      domesticTransactionFee: 'Nil',
      internationalTransactionFee: 'N/A (UPI only)',
      interestRate: '3.6% per month',
      emiOptions: 'Available on eligible transactions',
      additionalServices: 'Additional Features:\n\n• Instant Card Issuance: Virtual card issued instantly upon approval\n• UPI Compatibility: Works with all major UPI apps\n• Security: NPCI certified for secure transactions\n• Late Payment Charges:\n  - Up to ₹500: ₹0\n  - ₹501–₹5,000: ₹500\n  - ₹5,001–₹10,000: ₹750\n  - Above ₹10,000: ₹1,200',
      idealFor: [
        'Individuals seeking a lifetime-free credit card with UPI integration',
        'Users who frequently make UPI transactions and wish to earn cashback',
        'Salaried professionals with a good credit score looking for a virtual credit card solution'
      ],
      notIdealFor: [
        'Individuals without a smartphone or access to UPI apps',
        'Users who prefer physical credit cards',
        'Those with a credit score below 720 or annual income less than ₹3 lakh'
      ],
      summary: 'A unique virtual RuPay credit card that integrates with UPI, offering cashback rewards on UPI transactions and instant issuance, making it ideal for digital-first users who prefer UPI payments.'
    }
  }
]; 