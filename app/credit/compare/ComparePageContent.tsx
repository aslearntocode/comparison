"use client"

import { useSearchParams } from 'next/navigation'
import { creditCards } from '@/app/data/creditCards'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

export default function ComparePageContent() {
  const searchParams = useSearchParams()
  const selectedCardIds = searchParams.get('cards')?.split(',') || []
  const selectedCards = creditCards.filter(card => selectedCardIds.includes(card.id))
  const category = searchParams.get('category')
  const backLink = category ? `/credit?category=${encodeURIComponent(category)}` : '/credit'

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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                        <div className="w-24 h-16 mb-2 relative flex items-center justify-start">
                          <Image
                            src={card.image}
                            alt={card.name}
                            width={96}
                            height={64}
                            className="object-contain rounded-lg"
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
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">APR</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.apr}</td>
                    ))}
                  </tr>
                  {/* Annual Fee */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Annual Fee</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.annualFee}</td>
                    ))}
                  </tr>
                  {/* Joining Fee */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Joining Fee</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.joiningFee}</td>
                    ))}
                  </tr>
                  {/* Rewards */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Rewards</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">{card.rewards}</td>
                    ))}
                  </tr>
                  {/* Rupay */}
                  <tr className="border-b">
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Rupay</td>
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
                    <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Features</td>
                    {selectedCards.map((card) => (
                      <td key={card.id} className="px-6 py-4">
                        <ul className="list-disc list-inside space-y-1">
                          {card.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600">{feature}</li>
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
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Rewards Program</td>
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
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Welcome Bonus</td>
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
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Milestone Benefits</td>
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
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Airport Lounge</td>
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
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Fuel Surcharge</td>
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
                        <td className="px-6 py-4 bg-gray-50 font-medium text-gray-900">Insurance Cover</td>
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