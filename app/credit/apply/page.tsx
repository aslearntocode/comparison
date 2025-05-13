"use client";
import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { creditCards } from '@/app/data/creditCards';
import { useSearchParams } from 'next/navigation';

export default function ApplyNowDummy() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const card = creditCards.find(c => c.id === cardId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Apply Now</h1>
          <p className="text-gray-700 mb-6">
            We are working with various Financial Institutions to integrate the technology.<br />
            <span className="font-semibold">Stay tuned!</span>
          </p>
          {card ? (
            <div className="mb-6">
              <p className="text-gray-800 mb-2">You are trying to apply for:</p>
              <Link href={`/credit/${card.id}`} className="text-blue-600 hover:underline font-semibold">
                {card.name}
              </Link>
            </div>
          ) : cardId ? (
            <div className="mb-6">
              <p className="text-gray-800">Could not find the credit card you are trying to apply for.</p>
            </div>
          ) : null}
          <Link href="/credit">
            <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Back to Credit Cards</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
} 