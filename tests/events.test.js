import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CLASSIC_THEME, EVENT_REGIONS, THEME_EVENTS, activeThemeEvents, suggestedEventRegion, themeForId,
} from '../src/events.js'

const localDate = (month, day, year = 2026) => new Date(year, month - 1, day)
const activeIds = (month, day, year = 2026, region = 'WORLDWIDE') =>
  activeThemeEvents(localDate(month, day, year), region).map(({ id }) => id)

test('the event calendar has 50+ unique themes with valid recurring date windows', () => {
  assert.ok(THEME_EVENTS.length >= 50)
  assert.equal(new Set(THEME_EVENTS.map(({ id }) => id)).size, THEME_EVENTS.length)
  for (const event of THEME_EVENTS) {
    assert.match(event.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(event.name && event.emoji && event.description)
    for (const [month, day] of [event.from, event.to]) {
      assert.ok(month >= 1 && month <= 12)
      assert.ok(day >= 1 && day <= 31)
    }
    if (event.regions) {
      assert.ok(event.regions.length > 0)
      for (const region of event.regions) {
        assert.ok(EVENT_REGIONS.some(({ id }) => id === region), `${event.id}: unknown region ${region}`)
      }
    }
  }
})

test('holiday events are available only within their local calendar date windows', () => {
  assert.ok(activeIds(12, 26).includes('new-year'))
  assert.ok(activeIds(1, 7).includes('new-year'))
  assert.ok(!activeIds(1, 8).includes('new-year'))
  assert.ok(!activeIds(2, 9).includes('valentines'))
  assert.ok(activeIds(2, 10).includes('valentines'))
  assert.ok(!activeIds(2, 17).includes('valentines'))
  assert.ok(activeIds(3, 14).includes('st-patricks'))
  assert.ok(activeIds(3, 18).includes('st-patricks'))
  assert.ok(!activeIds(3, 13).includes('st-patricks'))
  assert.ok(!activeIds(3, 19).includes('st-patricks'))
  assert.ok(!activeIds(10, 23).includes('halloween'))
  assert.ok(activeIds(10, 24).includes('halloween'))
  assert.ok(activeIds(10, 31).includes('halloween'))
  assert.ok(!activeIds(11, 19, 2026, 'US').includes('thanksgiving'))
  assert.ok(activeIds(11, 20, 2026, 'US').includes('thanksgiving'))
  assert.ok(activeIds(11, 27, 2026, 'US').includes('thanksgiving'))
  assert.ok(!activeIds(11, 28, 2026, 'US').includes('thanksgiving'))
  assert.ok(!activeIds(12, 17).includes('christmas'))
  assert.ok(activeIds(12, 26).includes('christmas'))
  assert.ok(!activeIds(12, 27).includes('christmas'))
})

test('seasonal windows cover their boundaries and support overlapping events', () => {
  assert.ok(activeIds(3, 1).includes('spring'))
  assert.ok(activeIds(3, 14).includes('spring'))
  assert.ok(!activeIds(6, 1).includes('spring'))
  assert.ok(activeIds(6, 1).includes('summer'))
  assert.ok(activeIds(8, 31).includes('summer'))
  assert.ok(!activeIds(9, 1).includes('summer'))
  assert.ok(activeIds(9, 1).includes('fall'))
  assert.ok(activeIds(10, 25).includes('fall'))
  assert.ok(activeIds(10, 25).includes('halloween'))
  assert.ok(activeIds(12, 1).includes('winter'))
  assert.ok(activeIds(2, 28, 2025).includes('winter'))
  assert.ok(activeIds(2, 29, 2028).includes('winter'))
  assert.ok(!activeIds(3, 1).includes('winter'))
  assert.ok(activeIds(12, 25).includes('winter'))
  assert.ok(activeIds(12, 25).includes('christmas'))
})

test('unknown theme ids fall back to the classic board', () => {
  assert.equal(themeForId('classic'), CLASSIC_THEME)
  assert.equal(themeForId('not-an-event'), CLASSIC_THEME)
  for (const event of THEME_EVENTS) assert.equal(themeForId(event.id), event)
})

test('regional celebrations respect country and state selections while worldwide themes remain available', () => {
  const idsFor = (month, day, region) =>
    activeThemeEvents(localDate(month, day), region).map(({ id }) => id)

  assert.ok(idsFor(7, 4, 'US').includes('us-independence'))
  assert.ok(!idsFor(7, 4, 'CA').includes('us-independence'))
  assert.ok(idsFor(7, 1, 'CA').includes('canada-day'))
  assert.ok(!idsFor(7, 1, 'US').includes('canada-day'))
  assert.ok(idsFor(9, 9, 'US-CA').includes('california-admission'))
  assert.ok(!idsFor(9, 9, 'US-TX').includes('california-admission'))
  assert.ok(idsFor(3, 2, 'US-TX').includes('texas-independence'))
  assert.ok(!idsFor(3, 2, 'US-TX').includes('texas-independence-week'))
  assert.ok(!idsFor(3, 2, 'US').includes('texas-independence'))
  assert.ok(idsFor(7, 4, 'US-TX').includes('us-independence'))
  assert.ok(idsFor(11, 20, 'US-CA').includes('thanksgiving'))
  assert.ok(idsFor(9, 8, 'WORLDWIDE').includes('world-literacy-day'))
  assert.ok(!idsFor(9, 16, 'WORLDWIDE').includes('mexico-independence'))
  assert.ok(idsFor(9, 16, 'MX').includes('mexico-independence'))
  assert.ok(idsFor(6, 14, 'US').includes('us-flag-day'))
  assert.ok(idsFor(7, 24, 'NZ').includes('new-zealand-matariki'))
  assert.ok(!idsFor(7, 25, 'NZ').includes('new-zealand-matariki'))
  assert.ok(idsFor(10, 30, 'US-NV').includes('nevada-day'))
})

test('browser language suggests a supported country and safely falls back worldwide', () => {
  assert.equal(suggestedEventRegion('en-US'), 'US')
  assert.equal(suggestedEventRegion('fr-CA'), 'CA')
  assert.equal(suggestedEventRegion('en'), 'WORLDWIDE')
  assert.equal(suggestedEventRegion('not a locale'), 'WORLDWIDE')
})
