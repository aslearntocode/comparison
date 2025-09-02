export const config = {
  backendUrl: process.env.NEXT_PUBLIC_API_URL || 'http://172.210.82.112:5000',
  apiEndpoints: {
    parsePdf: '/api/parse-pdf',
    analyze: '/analyze'
  }
} 