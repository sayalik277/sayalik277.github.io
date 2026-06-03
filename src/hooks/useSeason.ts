import { useEffect, useMemo } from 'react'
import { getSeason, SEASON_THEMES, applySeasonTheme } from '../utils/season'
import type { SeasonTheme } from '../types'

export function useSeason(): SeasonTheme {
  const theme = useMemo(() => {
    const season = getSeason()
    return SEASON_THEMES[season]
  }, [])

  useEffect(() => {
    applySeasonTheme(theme)
  }, [theme])

  return theme
}
