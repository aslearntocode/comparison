'use client'

import Header from "@/components/Header"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { supabase } from "@/lib/supabase"

const CreditScoreTips = ({ score }: { score: number }) => {
  const tips = [
    {
      title: "Pay Bills on Time",
      description: "Late payments can significantly impact your credit score. Set up automatic payments or reminders to ensure timely payments.",
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Reduce Credit Utilization",
      description: "Keep your credit card balances below 30% of your credit limit. Lower utilization rates are better for your score.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Maintain a Mix of Credit",
      description: "Having a healthy mix of credit types (credit cards, loans, etc.) can positively impact your score.",
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Check for Errors",
      description: "Regularly review your credit report for any errors or discrepancies that might be affecting your score.",
      icon: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Limit New Credit Applications",
      description: "Too many credit inquiries in a short period can negatively impact your score. Apply for new credit only when necessary.",
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tips to Improve Your Score</h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{tip.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CreditReportPage() {
  const router = useRouter()
  const [reportData, setReportData] = useState<{
    report_created_date: string;
    credit_score: number;
    total_accounts: number;
    active_accounts: Array<{
      account_type: string;
      lender: string;
      credit_limit: number;
      balance: number;
      date_opened: string;
    }>;
    credit_limit: number;
    closed_accounts: number;
    current_balance: number;
    overdue_accounts: Array<{
      account_type: string;
      lender: string;
      overdue_amount: number;
    }>;
    written_off_accounts: any[];
    enquiries: Array<{
      enquiry_date: string;
      enquiry_type: string;
    }>;
  } | null>(null);

  const [expandedSections, setExpandedSections] = useState({
    activeAccounts: false,
    overdueAccounts: false,
    writtenOffAccounts: false,
    enquiries: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const fetchLatestCreditReport = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('No authenticated user found');
          router.push('/login');
          return;
        }

        const { data, error } = await supabase
          .from('credit_reports_pdf')
          .select('*')
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            console.log('No credit report found for user');
            return;
          }
          console.error('Error fetching credit report:', error);
          return;
        }

        if (data) {
          setReportData({
            report_created_date: data.report_created_date,
            credit_score: data.credit_score,
            total_accounts: data.total_accounts,
            active_accounts: data.active_accounts || [],
            credit_limit: data.credit_limit,
            closed_accounts: data.closed_accounts,
            current_balance: data.current_balance,
            overdue_accounts: data.overdue_accounts || [],
            written_off_accounts: data.written_off_accounts || [],
            enquiries: data.enquiries || []
          });
        }
      } catch (error) {
        console.error('Error in fetchLatestCreditReport:', error);
      }
    };

    fetchLatestCreditReport();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Detailed Credit Report</h1>
            <p className="mt-2 text-sm text-gray-600">
              Last updated: {reportData?.report_created_date || 'Not available'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Report Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Accounts Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('activeAccounts')}
                >
                  <h2 className="text-xl font-semibold text-gray-800">Active Accounts</h2>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${expandedSections.activeAccounts ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedSections.activeAccounts && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lender</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Opened</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData?.active_accounts?.map((account, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.account_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.lender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{account.credit_limit.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{account.balance.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.date_opened}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Overdue Accounts Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('overdueAccounts')}
                >
                  <h2 className="text-xl font-semibold text-gray-800">Overdue Accounts</h2>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${expandedSections.overdueAccounts ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedSections.overdueAccounts && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lender</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData?.overdue_accounts?.map((account, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.account_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.lender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{account.overdue_amount.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Written-off Accounts Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('writtenOffAccounts')}
                >
                  <h2 className="text-xl font-semibold text-gray-800">Written-off Accounts</h2>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${expandedSections.writtenOffAccounts ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedSections.writtenOffAccounts && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lender</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData?.written_off_accounts?.map((account, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.account_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.lender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{account.amount?.toLocaleString('en-IN') || '--'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Enquiries Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('enquiries')}
                >
                  <h2 className="text-xl font-semibold text-gray-800">Enquiries</h2>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${expandedSections.enquiries ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {expandedSections.enquiries && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData?.enquiries?.map((enquiry, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.enquiry_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.enquiry_type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Tips */}
            <div className="lg:col-span-1">
              <CreditScoreTips score={reportData?.credit_score || 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 