import { useEffect } from 'react'

export function useLenis({ enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return undefined
    return undefined
  }, [enabled])
}
