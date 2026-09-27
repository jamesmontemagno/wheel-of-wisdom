import test from 'node:test'
import assert from 'node:assert/strict'
import { CLASSIC_THEME, THEME_EVENTS, activeThemeEvents, themeForId } from '../src/events.js'

const localDate = (month, day, year = 2026) => new Date(year, month - 1, day)
const activeIds = (month, day, year) =>
  activeThemeEvents(localDate(month, day, year)).map(({ id }) => id)

test('the event calendar has unique themes with valid recurring date windows', () => {
  assert.equal(THEME_EVENTS.length, 10)
  assert.equal(new Set(THEME_EVENTS.map(({ id }) => id)).size, THEME_EVENTS.length)
  for (const event of THEME_EVENTS) {
    assert.ok(event.name && event.emoji && event.description)
    for (const [month, day] of [event.from, event.to]) {
      assert.ok(month >= 1 && month <= 12)
      assert.ok(day >= 1 && day <= 31)
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
  assert.ok(!activeIds(3, 19).includes('st-patricks'))
  assert.ok(!activeIds(10, 23).includes('halloween'))
  assert.ok(activeIds(10, 31).includes('halloween'))
  assert.ok(!activeIds(11, 28).includes('thanksgiving'))
  assert.ok(activeIds(11, 20).includes('thanksgiving'))
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
