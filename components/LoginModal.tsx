'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import Image from 'next/image'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  redirectPath?: string
}

export default function LoginModal({ isOpen, onClose, redirectPath = '/' }: LoginModalProps) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      onClose()
      router.push(redirectPath)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <DialogContent className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 mx-4 relative">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">
              Welcome Back
            </DialogTitle>
            <p className="text-gray-500 text-center mt-2">
              Sign in to access your account
            </p>
          </DialogHeader>

          {error && (
            <div className="mb-6 bg-red-50 text-red-500 p-4 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-base font-medium text-gray-700">
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </span>
              </div>
            </button>

            <div className="text-sm text-gray-500 text-center">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </a>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
} 