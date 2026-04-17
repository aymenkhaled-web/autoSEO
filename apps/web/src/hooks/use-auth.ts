import { useState, useEffect, useCallback } from 'react'
import { authApi } from '@/lib/api-client'
import { getToken, setToken, clearToken, isAuthenticated, getTokenPayload } from '@/lib/auth'

interface AuthUser {
  id: string
  email: string
  org_id: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(() => {
    if (isAuthenticated()) {
      const payload = getTokenPayload()
      if (payload) {
        setUser({ id: payload.sub, email: payload.email, org_id: payload.org_id, role: payload.user_role })
      }
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const signIn = async (email: string, password: string) => {
    const data = await authApi.login({ email, password })
    setToken(data.access_token)
    const payload = getTokenPayload()
    if (payload) {
      setUser({ id: payload.sub, email: payload.email, org_id: payload.org_id, role: payload.user_role })
    }
    return data
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const data = await authApi.register({ email, password, full_name: fullName, org_name: `${fullName}'s Org` })
    setToken(data.access_token)
    const payload = getTokenPayload()
    if (payload) {
      setUser({ id: payload.sub, email: payload.email, org_id: payload.org_id, role: payload.user_role })
    }
    return data
  }

  const signInWithGoogle = async () => {
    throw new Error('Google sign-in is not configured. Please use email and password.')
  }

  const signOut = () => {
    clearToken()
    setUser(null)
    window.location.href = '/login'
  }

  return {
    session: user ? { user } : null,
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  }
}
