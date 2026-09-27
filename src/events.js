export const CLASSIC_THEME = Object.freeze({
  id: 'classic',
  name: 'Classic',
  emoji: '✦',
  description: 'The original Wheel of Wisdom board.',
})

export const THEME_EVENTS = Object.freeze([
  // New Year starts on December 26, intentionally overlapping Christmas Week.
  Object.freeze({
    id: 'new-year',
    name: 'New Year',
    emoji: '🎉',
    description: 'A little sparkle for fresh starts.',
    from: [12, 26],
    to: [1, 7],
  }),
  Object.freeze({
    id: 'valentines',
    name: 'Valentine’s Day',
    emoji: '💌',
    description: 'Love notes, hearts, and happy guesses.',
    from: [2, 10],
    to: [2, 16],
  }),
  Object.freeze({
    id: 'spring',
    name: 'Spring',
    emoji: '🌷',
    description: 'Fresh blooms for the Northern Hemisphere spring.',
    from: [3, 1],
    to: [5, 31],
  }),
  Object.freeze({
    id: 'st-patricks',
    name: 'St. Patrick’s Day',
    emoji: '🍀',
    description: 'A lucky little board for the week around St. Patrick’s Day.',
    from: [3, 14],
    to: [3, 18],
  }),
  Object.freeze({
    id: 'summer',
    name: 'Summer',
    emoji: '☀️',
    description: 'Sunshine and bright colors for summer.',
    from: [6, 1],
    to: [8, 31],
  }),
  Object.freeze({
    id: 'fall',
    name: 'Fall',
    emoji: '🍂',
    description: 'Cozy colors for the Northern Hemisphere fall.',
    from: [9, 1],
    to: [11, 30],
  }),
  Object.freeze({
    id: 'halloween',
    name: 'Halloween',
    emoji: '🎃',
    description: 'A delightfully spooky board.',
    from: [10, 24],
    to: [10, 31],
  }),
  Object.freeze({
    id: 'thanksgiving',
    name: 'Thanksgiving',
    emoji: '🦃',
    description: 'A harvest-season board for Thanksgiving.',
    from: [11, 20],
    to: [11, 27],
  }),
  Object.freeze({
    id: 'winter',
    name: 'Winter',
    emoji: '❄️',
    description: 'Snowy details for the Northern Hemisphere winter.',
    from: [12, 1],
    to: [2, 29], // Includes February 28 every year and leap day when it exists.
  }),
  Object.freeze({
    id: 'christmas',
    name: 'Christmas Week',
    emoji: '🎄',
    description: 'Festive lights and evergreen cheer.',
    from: [12, 18],
    to: [12, 26],
  }),
])

const compareMonthDay = ([monthA, dayA], [monthB, dayB]) =>
  monthA - monthB || dayA - dayB

export function activeThemeEvents(date = new Date()) {
  const today = [date.getMonth() + 1, date.getDate()]
  return THEME_EVENTS.filter(({ from, to }) => {
    const orderedWindow = compareMonthDay(from, to) <= 0
    const afterStart = compareMonthDay(today, from) >= 0
    const beforeEnd = compareMonthDay(today, to) <= 0
    return orderedWindow
      ? afterStart && beforeEnd
      : afterStart || beforeEnd
  })
}

export function themeForId(id) {
  return THEME_EVENTS.find((theme) => theme.id === id) ?? CLASSIC_THEME
}
