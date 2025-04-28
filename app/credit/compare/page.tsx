'use client'

import { Suspense } from 'react'
import ComparePageContent from './ComparePageContent'

export default function ComparePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComparePageContent />
    </Suspense>
  )
} 