import { useState, useEffect } from 'react'
import { api } from '../api/client'

const STORAGE_KEY = 'portfolio_visitor'

export function useVisitor() {
  const [showModal, setShowModal] = useState(false)
  const [visitorName, setVisitorName] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setVisitorName(stored === '__anonymous__' ? null : stored)
      return
    }
    const timer = setTimeout(() => setShowModal(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  const registerVisitor = async (name: string | null) => {
    const label = name?.trim() || null
    localStorage.setItem(STORAGE_KEY, label ?? '__anonymous__')
    setVisitorName(label)
    setShowModal(false)
    try {
      await api.post('/api/visitors', { name: label })
    } catch {
      // non-critical
    }
  }

  return { showModal, visitorName, registerVisitor }
}
