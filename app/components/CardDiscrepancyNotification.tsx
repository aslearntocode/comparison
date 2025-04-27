import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardDiscrepancyNotificationProps {
  cardName: string;
}

export default function CardDiscrepancyNotification({ cardName }: CardDiscrepancyNotificationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReportDiscrepancy = async () => {
    const subject = `Discrepancy Report for ${cardName}`;
    const body = `I noticed some discrepancies in the features or status of the ${cardName} credit card.`;
    const mailtoLink = `mailto:support@financialhealth.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-4 top-20 z-50 flex flex-col items-end"
        style={{ minWidth: isExpanded ? '220px' : '48px', maxWidth: '260px' }}
      >
        {isExpanded ? (
          <div className="bg-white/60 rounded-lg shadow-lg border border-gray-200 transition-all duration-200 p-2 max-w-xs w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900 mb-0 truncate">Report Discrepancy</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="ml-2 text-green-500 hover:text-green-600 font-medium text-xs focus:outline-none flex items-center justify-center"
                aria-label="Collapse notification"
              >
                {/* Chevron right */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 6L12 10L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-600 mb-3">
                If you notice any differences please report.
              </div>
              <button
                onClick={handleReportDiscrepancy}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
              >
                Report Discrepancy
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 flex items-center justify-center bg-white/80 rounded-2xl shadow-lg border border-gray-100 hover:bg-green-50/80 transition-all duration-200 focus:outline-none"
            aria-label="Expand notification"
          >
            {/* Chevron left, green */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L10 12L15 18" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 