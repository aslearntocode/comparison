import { Metadata } from 'next';
import CreditProductComparison from './CreditProductComparisonContent';

export async function generateMetadata(
  props: { params: any, searchParams?: { [key: string]: string | string[] | undefined } }
): Promise<Metadata> {
  const category = props.searchParams?.category as string | undefined;
  let title = 'Credit Cards | Financial Health';
  let description = 'Find and compare the best credit cards in India. Get detailed comparisons of rewards, benefits, and features to choose the perfect credit card for your needs.';

  if (category) {
    switch (category) {
      case 'branded':
        title = 'Branded Credit Cards | Financial Health';
        description = 'Compare the best branded credit cards in India. Find cards from top banks and brands with exclusive offers and benefits.';
        break;
      case 'cobranded':
        title = 'Co-Branded Credit Cards | Financial Health';
        description = 'Explore co-branded credit cards in India. Get the best of both worlds with exclusive brand partnerships and rewards.';
        break;
      case 'fintech':
        title = 'Fintech Credit Cards | Financial Health';
        description = 'Discover innovative fintech credit cards in India. Enjoy modern features, digital-first experiences, and unique rewards.';
        break;
      case 'premium':
        title = 'Premium Credit Cards | Financial Health';
        description = 'Explore the best premium credit cards in India. Compare features, fees, and rewards to find the perfect premium card for your lifestyle.';
        break;
      case 'rewards':
        title = 'Rewards Credit Cards | Financial Health';
        description = 'Find the top rewards credit cards in India. Maximize your points, cashback, and benefits with the best cards for rewards.';
        break;
      case 'cashback':
        title = 'Cashback Credit Cards | Financial Health';
        description = 'Compare the best cashback credit cards in India. Earn money back on every purchase with top cashback offers.';
        break;
      case 'fuel':
        title = 'Fuel Credit Cards | Financial Health';
        description = 'Save on fuel expenses with the best fuel credit cards in India. Get exclusive fuel surcharge waivers and rewards.';
        break;
      case 'lifetime-free':
        title = 'Lifetime Free Credit Cards | Financial Health';
        description = 'Explore lifetime free credit cards in India. Enjoy benefits and rewards with zero annual fees.';
        break;
      case 'forex':
        title = 'Forex Credit Cards | Financial Health';
        description = 'Find the best forex credit cards in India. Enjoy low foreign transaction fees and great travel benefits.';
        break;
      case 'upi':
        title = 'UPI Credit Cards | Financial Health';
        description = 'Discover UPI-enabled credit cards in India. Make seamless payments and enjoy exclusive UPI offers.';
        break;
      case 'emi':
        title = 'EMI Credit Cards | Financial Health';
        description = 'Compare EMI credit cards in India. Convert your purchases into easy monthly installments with top EMI cards.';
        break;
      case 'domestic-lounge':
        title = 'Domestic Lounge Access Credit Cards | Financial Health';
        description = 'Get complimentary domestic airport lounge access with the best credit cards in India. Travel in comfort and style.';
        break;
      case 'international-lounge':
        title = 'International Lounge Access Credit Cards | Financial Health';
        description = 'Enjoy international airport lounge access with premium credit cards. Perfect for frequent global travelers.';
        break;
      case 'airlines':
        title = 'Airlines Credit Cards | Financial Health';
        description = 'Find the best airline credit cards in India. Earn air miles, free tickets, and exclusive travel benefits.';
        break;
      case 'hotels':
        title = 'Hotels Credit Cards | Financial Health';
        description = 'Discover hotel credit cards in India. Get complimentary stays, upgrades, and exclusive hotel rewards.';
        break;
      case 'lifestyle':
        title = 'Lifestyle Credit Cards | Financial Health';
        description = 'Explore lifestyle credit cards in India. Enjoy shopping, dining, and entertainment offers tailored to your lifestyle.';
        break;
      case 'secured':
        title = 'Secured Credit Cards | Financial Health';
        description = 'Build your credit score with the best secured credit cards in India. Ideal for beginners and those with low credit.';
        break;
      case 'ultra-premium':
        title = 'Ultra Premium Credit Cards | Financial Health';
        description = 'Discover the top ultra premium credit cards in India. Compare exclusive benefits, luxury rewards, and premium services for high net-worth individuals.';
        break;
      default:
        title = `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Credit Cards | Financial Health`;
        description = `Compare the best ${category.replace('-', ' ')} credit cards in India. Find the right card for your needs.`;
    }
  }

  return {
    title,
    description,
  };
}

export default function Page() {
  return <CreditProductComparison />;
}