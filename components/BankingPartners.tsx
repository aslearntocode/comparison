import React from 'react';
import Image from 'next/image';

const bankingPartners = [
  {
    name: 'HDFC Bank',
    logo: '/bank-logos/hdfc-logo.png',
    alt: 'HDFC Bank Logo'
  },
  {
    name: 'Axis Bank',
    logo: '/bank-logos/axis-logo.png',
    alt: 'Axis Bank Logo'
  },
  {
    name: 'ICICI Bank',
    logo: '/bank-logos/icici-logo.png',
    alt: 'ICICI Bank Logo'
  },
  // {
  //   name: 'American Express',
  //   logo: '/bank-logos/amex-logo.png',
  //   alt: 'American Express Logo'
  // },
  {
    name: 'SBI',
    logo: '/bank-logos/sbi-logo.png',
    alt: 'SBI Logo'
  },
  {
    name: 'IDFC FIRST Bank',
    logo: '/bank-logos/idfc-logo.png',
    alt: 'IDFC FIRST Bank Logo'
  },
  {
    name: 'IndusInd Bank',
    logo: '/bank-logos/indusind-logo.png',
    alt: 'IndusInd Bank Logo'
  },
  {
    name: 'AU Small Finance Bank',
    logo: '/bank-logos/au-sfb-logo.png',
    alt: 'AU Small Finance Bank Logo'
  },
  // {
  //   name: 'BOB Card',
  //   logo: '/bank-logos/bobcard-logo.png',
  //   alt: 'BOB Card Logo'
  // },
  // {
  //   name: 'Standard Chartered',
  //   logo: '/bank-logos/sc-logo.png',
  //   alt: 'Standard Chartered Logo'
  // },
  // {
  //   name: 'HSBC',
  //   logo: '/bank-logos/hsbc-logo.png',
  //   alt: 'HSBC Logo'
  // },
  {
    name: 'YES Bank',
    logo: '/bank-logos/yes-logo.png',
    alt: 'YES Bank Logo'
  },
  {
    name: 'Mirae Asset Financial Services',
    logo: '/bank-logos/MAFS-logo.png',
    alt: 'Mirae Asset Financial Services Logo'
  },
  {
    name: 'Volt Money',
    logo: '/bank-logos/volt-logo.png',
    alt: 'Volt Money Logo'
  },
  {
    name: 'Kiwi',
    logo: '/bank-logos/kiwi-logo.png',
    alt: 'Kiwi Logo'
  },
  {
    name: 'Gyan Dhan',
    logo: '/bank-logos/gyandhan-logo.png',
    alt: 'Gyan Dhan Logo'
  }
];

export default function BankingPartners() {
  return (
    <div className="bg-[#f7f9fc] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Partners</h2>
          <p className="text-lg text-gray-600">
          Direct Lending Partners and Partner Banks Available via Zet App
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
          {bankingPartners.map((partner) => (
            <div 
              key={partner.name}
              className="flex flex-col items-center bg-white rounded-lg border border-gray-200 p-2 w-full h-20 justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-36 h-20 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 768px) 144px, 144px"
                  quality={75}
                  loading="lazy"
                  style={{ objectFit: 'contain' }}
                  className="transition-all duration-200"
                />
              </div>
              {/* Optionally show name below logo */}
              {/* <span className="text-sm font-medium text-gray-600 mt-1">{partner.name}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 