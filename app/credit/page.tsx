import { Metadata } from 'next';
import CreditProductComparison from './CreditProductComparisonContent';

interface PageProps {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  const categoryParam = params?.category;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam || 'all';

  const categoryMetadata = {
    'ultra-premium': {
      title: 'Ultra Premium Credit Cards in India | Compare & Apply',
      description: 'Compare the best ultra premium credit cards in India. Find detailed information about HSBC Taj, Axis Bank Primus, and American Express Centurion cards. Compare fees, benefits, and exclusive privileges.',
    },
    'premium': {
      title: 'Premium Credit Cards in India | Compare & Apply',
      description: 'Compare premium credit cards in India. Find cards with exclusive benefits, travel privileges, and premium lifestyle rewards. Get detailed comparisons of annual fees, joining fees, and exclusive benefits.',
    },
    'cash-back': {
      title: 'Best Cashback Credit Cards in India | Compare & Apply',
      description: 'Compare the best cashback credit cards in India. Find cards offering maximum cashback on your daily spending, groceries, dining, and online shopping. Get detailed comparisons of cashback rates and benefits.',
    },
    'lifestyle': {
      title: 'Lifestyle Credit Cards in India | Compare & Apply',
      description: 'Compare lifestyle credit cards in India. Find cards offering exclusive dining privileges, movie benefits, shopping rewards, and lifestyle experiences. Get detailed comparisons of benefits and features.',
    },
    'fuel': {
      title: 'Best Fuel Credit Cards in India | Compare & Apply',
      description: 'Compare the best fuel credit cards in India. Find cards offering maximum fuel surcharge waiver and rewards on fuel purchases. Get detailed comparisons of fuel benefits and features.',
    },
    'lifetime-free': {
      title: 'Lifetime Free Credit Cards in India | Compare & Apply',
      description: 'Compare lifetime free credit cards in India. Find cards with no annual fees and great benefits. Get detailed comparisons of features, rewards, and eligibility criteria.',
    },
    'upi': {
      title: 'UPI Credit Cards in India | Compare & Apply',
      description: 'Compare UPI-enabled credit cards in India. Find cards that work seamlessly with UPI payments. Get detailed comparisons of UPI benefits, rewards, and features.',
    },
    'domestic-lounge': {
      title: 'Domestic Lounge Credit Cards in India | Compare & Apply',
      description: 'Compare credit cards with domestic lounge access in India. Find cards offering free airport lounge access at domestic terminals. Get detailed comparisons of lounge benefits and features.',
    },
    'international-lounge': {
      title: 'International Lounge Credit Cards in India | Compare & Apply',
      description: 'Compare credit cards with international lounge access. Find cards offering free airport lounge access worldwide. Get detailed comparisons of international lounge benefits and features.',
    },
    'all': {
      title: 'Best Credit Cards in India | Compare & Apply',
      description: 'Compare and find the best credit cards in India. Get detailed comparisons of rewards, benefits, and features to choose the perfect credit card for your needs.',
    }
  }

  const metadata = categoryMetadata[category as keyof typeof categoryMetadata] || categoryMetadata.all

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://financialhealth.co.in/credit?category=${category}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    }
  }
}

export default function Page() {
  return <CreditProductComparison />;
}