"use client"

import { useSearchParams } from 'next/navigation'
import { creditCards, type CreditCard } from '@/app/data/creditCards'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useState } from 'react'
import { Suspense } from 'react'

function ComparePageContent() {
  const searchParams = useSearchParams()
  const selectedCardIds = searchParams.get('cards')?.split(',') || []
  const selectedCards = creditCards.filter(card => selectedCardIds.includes(card.id))
  const category = searchParams.get('category')
  const backLink = category ? `/credit?category=${encodeURIComponent(category)}` : '/credit'

  // Accordion state for mobile
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Define fields for accordion
  const fields = [
    { key: 'bestSuited', label: 'Best Suited for' },
    { key: 'feeDetails', label: 'Fee Details' },
    { key: 'apr', label: 'APR' },
    { key: 'rupay', label: 'Rupay' },
    { key: 'welcomeBenefit', label: 'Welcome Benefit' },
    { key: 'rewardRate', label: 'Reward/Cashback Rate' },
    { key: 'milestoneBenefits', label: 'Milestone Benefits' },
    { key: 'fuelSurcharge', label: 'Fuel Surcharge' },
    { key: 'loungeAccess', label: 'Lounge Access' },
  ];

  // For mobile, restrict to only 2 cards
  const mobileSelectedCards = selectedCards.slice(0, 2);

  // Helper to get field value for a card
  function getFieldValue(card: CreditCard, key: string) {
    switch (key) {
      case 'bestSuited': {
        const items = card.additionalDetails?.idealFor;
        return items && items.length ? (
          <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
            {items.map((v: string, i: number) => <li key={i}>{v}</li>)}
          </ul>
        ) : <span className="text-xs text-gray-500">-</span>;
      }
      case 'feeDetails':
        return <div className="text-xs">Annual: {card.annualFee}<br/>Joining: {card.joiningFee}</div>;
      case 'apr': {
        const apr = card.apr;
        return apr ? (
          <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
            <li>{apr}</li>
          </ul>
        ) : <span className="text-xs text-gray-500">-</span>;
      }
      case 'rupay': {
        const rupay = card.rupay ? 'Yes' : 'No';
        return (
          <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
            <li>{rupay}</li>
          </ul>
        );
      }
      case 'welcomeBenefit': {
        const welcome = card.additionalDetails?.welcomeBonus;
        if (welcome) {
          const points = welcome.split(/\n|•|\r|\u2022|\-/).map(s => s.trim()).filter(Boolean);
          return (
            <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
              {points.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          );
        }
        return <span className="text-xs text-gray-500">-</span>;
      }
      case 'rewardRate': {
        const reward = card.additionalDetails?.rewardsProgram;
        if (reward) {
          const points = reward.split(/\n|•|\r|\u2022|\-/).map(s => s.trim()).filter(Boolean);
          return (
            <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
              {points.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          );
        }
        return <span className="text-xs text-gray-500">-</span>;
      }
      case 'milestoneBenefits': {
        const items = card.additionalDetails?.milestoneBenefits;
        return items && items.length ? (
          <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
            {items.map((v: string, i: number) => <li key={i}>{v}</li>)}
          </ul>
        ) : <span className="text-xs text-gray-500">-</span>;
      }
      case 'fuelSurcharge': {
        const fuel = card.additionalDetails?.fuelSurcharge;
        if (fuel) {
          const points = fuel.split(/\n|•|\r|\u2022|\-/).map(s => s.trim()).filter(Boolean);
          return (
            <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
              {points.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          );
        }
        return <span className="text-xs text-gray-500">-</span>;
      }
      case 'loungeAccess': {
        const lounge = card.additionalDetails?.airportLounge;
        if (lounge) {
          const points = lounge.split(/\n|•|\r|\u2022|\-/).map(s => s.trim()).filter(Boolean);
          return (
            <ul className="list-disc list-inside text-xs text-left flex flex-col justify-center h-full">
              {points.map((point, idx) => <li key={idx}>{point}</li>)}
            </ul>
          );
        }
        return <span className="text-xs text-gray-500">-</span>;
      }
      default:
        return <span className="text-xs text-gray-500">-</span>;
    }
  }

  if (selectedCards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Cards Selected</h1>
            <p className="text-gray-600 mb-6">Please select cards to compare from the credit cards page.</p>
            <Link
              href={backLink}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Credit Cards
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Compare Credit Cards</h1>
            <Link
              href={backLink}
              className="text-blue-600 hover:text-blue-700"
            >
              Back to Credit Cards
            </Link>
          </div>

          {/* Mobile Accordion View */}
          <div className="md:hidden">
            {/* Card Images, Names, and Buttons in One Row */}
            <div className="flex justify-center gap-2 mb-4">
              {mobileSelectedCards.map(card => (
                <div key={card.id} className="flex flex-col items-center w-1/3 px-1 min-w-0">
                  <Image src={card.image} alt={card.name} width={60} height={40} className="object-contain mb-1" />
                  <div className="font-normal text-xs text-center mb-1 break-words leading-tight min-h-[2.5rem] flex items-center justify-center">{card.name}</div>
                  <Link href={`/credit/${card.id}`} className="w-full">
                    <button className="w-full bg-blue-700 text-white rounded-lg py-2 text-xs font-bold">Check Eligibility</button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="divide-y">
              {fields.map((field, idx) => (
                <div key={field.key}>
                  <button
                    className="w-full flex justify-between items-center px-4 py-4 bg-gray-50 font-normal text-base focus:outline-none"
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  >
                    {field.label}
                    <span className="text-xl">{openIdx === idx ? '−' : '+'}</span>
                  </button>
                  {openIdx === idx && (
                    <div className="bg-white px-2 pb-4 flex gap-2">
                      {mobileSelectedCards.map(card => (
                        <div key={card.id} className="flex-1 min-w-0 text-left">
                          <div className="text-xs text-gray-700">{getFieldValue(card, field.key)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop/Table View (unchanged) */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Unified Comparison Table */}
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full table-fixed">
                <colgroup>
                  <col className="w-40 whitespace-nowrap" />
                  {selectedCards.map((_, idx) => (
                    <col key={idx} className="w-auto" />
                  ))}
                </colgroup>
                <tbody>
                  {/* Card Images */}
                  <tr>
                    <td className="bg-white"></td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="pt-8 pb-2 px-6 align-bottom">
                        <div className="h-36 mb-2 flex items-center justify-start bg-white rounded-lg overflow-hidden md:h-36">
                          <Image
                            src={card.image}
                            alt={card.name}
                            height={72}
                            width={45}
                            className="object-contain h-20 w-auto md:h-36"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Card Names */}
                  <tr>
                    <td className="bg-white"></td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="text-lg font-bold text-gray-900 pb-0 pl-2">{card.name}</td>
                    ))}
                  </tr>
                  {/* Card Banks */}
                  <tr>
                    <td className="bg-white"></td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="text-gray-600 pt-0 pb-4 pl-2">{card.bank}</td>
                    ))}
                  </tr>
                  {/* APR */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">APR</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.apr}</td>
                    ))}
                  </tr>
                  {/* Annual Fee */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Annual Fee</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.annualFee}</td>
                    ))}
                  </tr>
                  {/* Joining Fee */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Joining Fee</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.joiningFee}</td>
                    ))}
                  </tr>
                  {/* Rupay */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Rupay</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">
                        {card.rupay ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                  {/* Features */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Features</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">
                        <ul className="list-disc list-inside space-y-1">
                          {card.categories.map((category, index) => (
                            <li key={index} className="text-sm text-gray-600">{category}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  {/* Additional Details */}
                  {selectedCards[0]?.additionalDetails && (
                    <>
                      {/* Rewards Program */}
                      <tr className="border-b">
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Rewards Program</td>
                        {selectedCards.map((card) => (
                          <td key={card.id} className="px-6 py-4">
                            <div className="whitespace-pre-line text-sm text-gray-600">
                              {card.additionalDetails?.rewardsProgram}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Welcome Bonus */}
                      <tr className="border-b">
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Welcome Bonus</td>
                        {selectedCards.map((card) => (
                          <td key={card.id} className="px-6 py-4">
                            <div className="whitespace-pre-line text-sm text-gray-600">
                              {card.additionalDetails?.welcomeBonus}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Milestone Benefits */}
                      <tr className="border-b">
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Milestone Benefits</td>
                        {selectedCards.map((card) => (
                          <td key={card.id} className="px-6 py-4">
                            <ul className="list-disc list-inside space-y-1">
                              {card.additionalDetails?.milestoneBenefits?.map((benefit, index) => (
                                <li key={index} className="text-sm text-gray-600">{benefit}</li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                      {/* Airport Lounge */}
                      <tr className="border-b">
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Airport Lounge</td>
                        {selectedCards.map((card) => (
                          <td key={card.id} className="px-6 py-4">
                            <div className="whitespace-pre-line text-sm text-gray-600">
                              {card.additionalDetails?.airportLounge}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Fuel Surcharge */}
                      <tr className="border-b">
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Fuel Surcharge</td>
                        {selectedCards.map((card) => (
                          <td key={card.id} className="px-6 py-4">
                            <div className="whitespace-pre-line text-sm text-gray-600">
                              {card.additionalDetails?.fuelSurcharge}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {/* Insurance Cover */}
                      <tr className="border-b">
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900 text-xs md:text-base">Insurance Cover</td>
                        {selectedCards.map((card) => (
                          <td key={card.id} className="px-6 py-4">
                            <ul className="list-disc list-inside space-y-1">
                              {card.additionalDetails?.insuranceCover?.map((cover, index) => (
                                <li key={index} className="text-sm text-gray-600">{cover}</li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ComparePageContentWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  )
} 