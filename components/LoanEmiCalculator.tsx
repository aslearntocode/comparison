import React, { useState, useEffect } from 'react';
import { PieChart } from './PieChart';

const minAmount = 0;
const maxAmount = 5000000;
const minRate = 10;
const maxRate = 30;
const minTenure = 3;
const maxTenure = 60;

function calculateEmi(P: number, R: number, N: number) {
  const r = R / 12 / 100;
  if (r === 0) return P / N;
  return P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);
}

export default function LoanEmiCalculator() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  console.log('LoanEmiCalculator rendered');
  const [amount, setAmount] = useState(400000);
  const [amountInput, setAmountInput] = useState('400000');
  const [rate, setRate] = useState(18);
  const [tenure, setTenure] = useState(18);

  // Guard against NaN or empty values
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 0;
  const safeTenure = Number.isFinite(tenure) && tenure > 0 ? tenure : 1;
  const emi = safeAmount && safeRate && safeTenure ? Math.round(calculateEmi(safeAmount, safeRate, safeTenure)) : 0;
  const totalPayment = emi * safeTenure;
  const totalInterest = totalPayment - safeAmount;
  const principalPercent = totalPayment > 0 ? Math.round((safeAmount / totalPayment) * 100) : 0;
  const interestPercent = 100 - principalPercent;

  const pieData = [
    { name: 'Principal Loan Amount', value: safeAmount, color: '#8BC34A' },
    { name: 'Total Interest', value: totalInterest, color: '#FF9800' },
  ];

  // Keep amountInput in sync if amount changes from other means (if any)
  useEffect(() => { setAmountInput(safeAmount ? String(safeAmount) : ''); }, [safeAmount]);

  if (!mounted) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Input Card */}
        <div className="rounded-2xl shadow-lg overflow-hidden flex flex-col h-full w-full md:max-w-sm mx-auto p-2 md:p-4">
          <h3 className="text-base md:text-lg font-bold text-center bg-purple-800 text-white rounded-t-2xl py-2 md:py-3">Calculate your EMI</h3>
          <div className="bg-white flex-1 p-4 md:p-6 flex flex-col rounded-b-2xl">
            <div className="mb-4 md:mb-6">
              <label className="block font-medium mb-1 md:mb-2 text-sm md:text-base">Loan Amount :</label>
              <div className="flex items-center mb-1 md:mb-2">
                <span className="bg-yellow-400 text-white px-2 md:px-3 py-1 rounded-l text-base md:text-lg font-bold">₹</span>
                <input
                  type="text"
                  id="loanAmount"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter desired loan amount"
                  {...(mounted
                    ? {
                        value: amountInput && !isNaN(Number(amountInput)) ? Number(amountInput).toLocaleString('en-IN') : '',
                        onChange: e => {
                          const rawStr = e.target.value.replace(/,/g, '');
                          setAmountInput(rawStr);
                          if (rawStr === '') {
                            return;
                          }
                          const raw = Number(rawStr);
                          if (isNaN(raw)) return;
                          const snapped = Math.round(raw / 500000) * 500000;
                          setAmount(Math.max(minAmount, Math.min(maxAmount, snapped)));
                        }
                      }
                    : { defaultValue: '400000' }
                  )}
                  className="w-full p-1.5 md:p-2 border-t border-b border-r rounded-r text-base md:text-lg font-semibold focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4 md:mb-6">
              <label className="block font-medium mb-1 md:mb-2 text-sm md:text-base">Interest Rate:</label>
              <div className="flex items-center mb-1 md:mb-2">
                <span className="bg-yellow-400 text-white px-2 md:px-3 py-1 rounded-l text-base md:text-lg font-bold">%</span>
                <input
                  type="number"
                  min={minRate}
                  max={maxRate}
                  {...(mounted
                    ? {
                        value: rate ?? '',
                        onChange: e => {
                          const val = Number(e.target.value);
                          setRate(Number.isFinite(val) ? Math.max(minRate, Math.min(maxRate, val)) : minRate);
                        }
                      }
                    : { defaultValue: '18' }
                  )}
                  className="w-full p-1.5 md:p-2 border-t border-b border-r rounded-r text-base md:text-lg font-semibold focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-1 md:mb-2">
              <label className="block font-medium mb-1 md:mb-2 text-sm md:text-base">Tenure:</label>
              <div className="flex items-center mb-1 md:mb-2">
                <span className="bg-yellow-400 text-white px-2 md:px-3 py-1 rounded-l text-base md:text-lg font-bold">Months</span>
                <input
                  type="number"
                  min={minTenure}
                  max={maxTenure}
                  {...(mounted
                    ? {
                        value: tenure ?? '',
                        onChange: e => {
                          const val = Number(e.target.value);
                          setTenure(Number.isFinite(val) ? Math.max(minTenure, Math.min(maxTenure, val)) : minTenure);
                        }
                      }
                    : { defaultValue: '18' }
                  )}
                  className="w-full p-1.5 md:p-2 border-t border-b border-r rounded-r text-base md:text-lg font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        {/* EMI Details Card */}
        <div className="rounded-2xl shadow-lg overflow-hidden flex flex-col h-full w-full md:max-w-sm mx-auto p-2 md:p-4">
          <h3 className="text-base md:text-lg font-bold text-center bg-purple-800 text-white rounded-t-2xl py-2 md:py-3">Your EMI Details</h3>
          <div className="bg-white flex-1 p-4 md:p-6 flex flex-col items-center justify-center rounded-b-2xl">
            <div className="flex flex-col items-center border-b pb-4 md:pb-6">
              <span className="text-base md:text-lg text-gray-600 mb-1">Loan EMI</span>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">₹ {emi.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center border-b pb-4 md:pb-6">
              <span className="text-base md:text-lg text-gray-600 mb-1">Total Interest Payable</span>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">₹ {totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base md:text-lg text-gray-600 mb-1">Total Payment (Principal + Interest)</span>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">₹ {totalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Pie Chart Card */}
        <div className="rounded-2xl shadow-lg overflow-hidden flex flex-col h-full w-full md:max-w-sm mx-auto p-2 md:p-4">
          <h3 className="text-base md:text-lg font-bold text-center bg-purple-800 text-white rounded-t-2xl py-2 md:py-3">Breakup of Total payment</h3>
          <div className="bg-white flex-1 p-4 md:p-6 flex flex-col items-center justify-center rounded-b-2xl">
            <PieChart data={pieData} />
          </div>
        </div>
      </div>
    </section>
  );
} 