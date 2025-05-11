import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const CreditCardVsLoanComparison = () => {
  return (
    <section className="bg-gray-50 py-4 md:py-0 p-0 m-0">
      <div className="max-w-7xl mx-auto px-4 p-0 m-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-8/12 flex justify-start items-center order-2 md:order-1">
            <div className="relative w-full h-[300px] md:h-[600px] flex items-center justify-center">
              <Image
                src="/Credit_Assessment.png"
                alt="Financial Assessment"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>

          <div className="w-full md:w-4/12 order-1 md:order-2">
            <div className="text-left mb-4 md:mb-6">
              <h2 className="text-[2.2rem] font-bold text-gray-900 mb-4 leading-tight">Should You Be Taking a Loan or a Credit Card?</h2>
              <p className="text-gray-600 text-lg">
                Take our quick assessment to get personalized recommendations on whether you should be taking a loan or a credit card.
              </p>
            </div>

            <Link href="/credit-vs-loan-assessment">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">💳</span>
                      <span className="text-3xl">💰</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Find Your Best Option</h3>
                  </div>
                  <p className="text-gray-600 text-base mb-6">
                    Answer a few simple questions about your financial needs and get a personalized recommendation.
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                    Start Assessment
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditCardVsLoanComparison; 