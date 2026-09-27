export const CLASSIC_THEME = Object.freeze({
  id: 'classic',
  name: 'Classic',
  emoji: '✦',
  description: 'The original Wheel of Wisdom board.',
})

const event = (id, name, emoji, description, from, to = from, regions = null) =>
  Object.freeze({
    id,
    name,
    emoji,
    description,
    from: Object.freeze(from),
    to: Object.freeze(to),
    ...(regions ? { regions: Object.freeze(regions) } : {}),
  })

export const THEME_EVENTS = Object.freeze([
  // New Year starts on December 26, intentionally overlapping Christmas Week.
  event('new-year', 'New Year', '🎉', 'A little sparkle for fresh starts.', [12, 26], [1, 7]),
  event('valentines', 'Valentine’s Day', '💌', 'Love notes, hearts, and happy guesses.', [2, 10], [2, 16]),
  event('spring', 'Spring', '🌷', 'Fresh blooms for the Northern Hemisphere spring.', [3, 1], [5, 31]),
  event('st-patricks', 'St. Patrick’s Day', '🍀', 'A lucky little board for the week around St. Patrick’s Day.', [3, 14], [3, 18]),
  event('summer', 'Summer', '☀️', 'Sunshine and bright colors for summer.', [6, 1], [8, 31]),
  event('fall', 'Fall', '🍂', 'Cozy colors for the Northern Hemisphere fall.', [9, 1], [11, 30]),
  event('halloween', 'Halloween', '🎃', 'A delightfully spooky board.', [10, 24], [10, 31]),
  event('thanksgiving', 'Thanksgiving', '🦃', 'A harvest-season board for Thanksgiving.', [11, 20], [11, 27], ['US']),
  event('winter', 'Winter', '❄️', 'Snowy details for the Northern Hemisphere winter.', [12, 1], [2, 29]),
  event('christmas', 'Christmas Week', '🎄', 'Festive lights and evergreen cheer.', [12, 18], [12, 26]),

  event('world-braille-day', 'World Braille Day', '⠿', 'Celebrate access, reading, and a world of stories.', [1, 4]),
  event('australia-day', 'Australia Day', '🦘', 'A sunny celebration of Australia.', [1, 26], [1, 27], ['AU']),
  event('india-republic-day', 'India Republic Day', '🇮🇳', 'A tricolor celebration of India.', [1, 26], [1, 27], ['IN']),
  event('puzzle-day', 'International Puzzle Day', '🧩', 'For curious minds and satisfying solutions.', [1, 29]),
  event('groundhog-day', 'Groundhog Day', '🦫', 'Will winter stay, or is spring around the corner?', [2, 2], [2, 3], ['US', 'CA']),
  event('world-wetlands-day', 'World Wetlands Day', '🪷', 'A little love for marshes, swamps, and wildlife.', [2, 2]),
  event('waitangi-day', 'Waitangi Day', '🌿', 'A summer celebration of Aotearoa New Zealand.', [2, 6], [2, 7], ['NZ']),
  event('world-radio-day', 'World Radio Day', '📻', 'Tune in for a board full of good vibrations.', [2, 13]),
  event('arizona-statehood', 'Arizona Statehood Day', '🌵', 'Desert colors for the Grand Canyon State.', [2, 14], [2, 15], ['US-AZ']),
  event('oregon-statehood', 'Oregon Statehood Day', '🌲', 'Evergreen spirit from the Beaver State.', [2, 14], [2, 15], ['US-OR']),
  event('mother-language-day', 'International Mother Language Day', '🗣️', 'Celebrate the many ways we share a word.', [2, 21]),
  event('texas-independence', 'Texas Independence Day', '⭐', 'A bold board with Lone Star spirit.', [3, 2], [3, 3], ['US-TX']),
  event('florida-statehood', 'Florida Statehood Day', '🐊', 'A bright board for the Sunshine State.', [3, 3], [3, 4], ['US-FL']),
  event('world-wildlife-day', 'World Wildlife Day', '🐾', 'A wild board celebrating creatures great and small.', [3, 3]),
  event('world-storytelling-day', 'World Storytelling Day', '📚', 'Turn the page to a story-filled game night.', [3, 20]),
  event('maine-statehood', 'Maine Statehood Day', '🦞', 'Coastal charm from the Pine Tree State.', [3, 15], [3, 16], ['US-ME']),
  event('poetry-day', 'World Poetry Day', '✍️', 'A lyrical board made for words and wonder.', [3, 21]),
  event('world-water-day', 'World Water Day', '💧', 'Make a splash with this fresh board.', [3, 22]),
  event('maryland-day', 'Maryland Day', '🦀', 'A Chesapeake Bay celebration in red, white, and gold.', [3, 25], [3, 26], ['US-MD']),
  event('earth-day', 'Earth Day', '🌎', 'A little greener, a little brighter, together.', [4, 22]),
  event('world-book-day-april', 'World Book and Copyright Day', '📖', 'Celebrate books, authors, and big ideas.', [4, 23]),
  event('dance-day', 'International Dance Day', '💃', 'A lively board with plenty of rhythm.', [4, 29]),
  event('may-day', 'May Day', '💐', 'Welcome May with flowers and a little fun.', [5, 1]),
  event('star-wars-day', 'Star Wars Day', '🚀', 'A galaxy-sized game night. May the fourth be with you.', [5, 4]),
  event('world-bicycle-day', 'World Bicycle Day', '🚲', 'Pedal into a wheel-themed celebration.', [6, 3]),
  event('hawaii-kamehameha', 'King Kamehameha Day', '🌺', 'Island flowers and aloha spirit for Hawaiʻi.', [6, 11], [6, 12], ['US-HI']),
  event('philippines-independence', 'Philippines Independence Day', '🇵🇭', 'A bright celebration of the Philippines.', [6, 12], [6, 13], ['PH']),
  event('world-oceans-day', 'World Oceans Day', '🐚', 'Dive into an ocean-blue board.', [6, 8]),
  event('world-music-day', 'World Music Day', '🎶', 'A board that hits all the right notes.', [6, 21]),
  event('canada-day', 'Canada Day', '🍁', 'Red-and-white fun from coast to coast.', [7, 1], [7, 2], ['CA']),
  event('us-independence', 'Independence Day', '🗽', 'Stars, stripes, and a little friendly competition.', [7, 4], [7, 5], ['US']),
  event('world-chocolate-day', 'World Chocolate Day', '🍫', 'A sweet board for chocolate lovers.', [7, 7]),
  event('bastille-day', 'Bastille Day', '🇫🇷', 'A liberté-inspired celebration of France.', [7, 14], [7, 15], ['FR']),
  event('colorado-day', 'Colorado Day', '🏔️', 'Mountain-high fun for the Centennial State.', [8, 1], [8, 2], ['US-CO']),
  event('world-cat-day', 'International Cat Day', '🐈', 'A purr-fect board for feline fans.', [8, 8]),
  event('singapore-national-day', 'Singapore National Day', '🇸🇬', 'A vibrant celebration of Singapore.', [8, 9], [8, 10], ['SG']),
  event('world-book-lovers-day', 'Book Lovers Day', '📕', 'For one more chapter and one more round.', [8, 9]),
  event('india-independence', 'India Independence Day', '🇮🇳', 'A joyful tricolor celebration.', [8, 15], [8, 16], ['IN']),
  event('world-photography-day', 'World Photography Day', '📷', 'Frame a favorite memory with this playful board.', [8, 19]),
  event('world-dog-day', 'International Dog Day', '🐕', 'A tail-wagging board for good pups.', [8, 26]),
  event('california-admission', 'California Admission Day', '🌉', 'Golden-hour color from the Golden State.', [9, 9], [9, 10], ['US-CA']),
  event('world-literacy-day', 'International Literacy Day', '🔤', 'A celebration of letters, learning, and words.', [9, 8]),
  event('brazil-independence', 'Brazil Independence Day', '🇧🇷', 'A colorful celebration of Brazil.', [9, 7], [9, 8], ['BR']),
  event('mexico-independence', 'Mexico Independence Day', '🇲🇽', 'A festive celebration of Mexico.', [9, 16], [9, 17], ['MX']),
  event('south-africa-heritage', 'South Africa Heritage Day', '🇿🇦', 'Celebrate South Africa’s many cultures.', [9, 24], [9, 25], ['ZA']),
  event('world-tourism-day', 'World Tourism Day', '🧳', 'Pack your imagination for a little word-trip.', [9, 27]),
  event('world-animal-day', 'World Animal Day', '🦁', 'A wild celebration of the animal kingdom.', [10, 4]),
  event('world-teachers-day', 'World Teachers’ Day', '🍎', 'A board for the people who help us learn.', [10, 5]),
  event('canada-thanksgiving', 'Canadian Thanksgiving', '🥧', 'A cozy harvest board for Canadian Thanksgiving.', [10, 8], [10, 14], ['CA']),
  event('spain-national-day', 'Spain National Day', '🇪🇸', 'A lively celebration of Spain.', [10, 12], [10, 13], ['ES']),
  event('world-food-day', 'World Food Day', '🥕', 'A delicious board celebrating food and community.', [10, 16]),
  event('alaska-day', 'Alaska Day', '🐻', 'A wild, northern celebration of the Last Frontier.', [10, 18], [10, 19], ['US-AK']),
  event('world-pasta-day', 'World Pasta Day', '🍝', 'Twirl into a tasty game night.', [10, 25]),
  event('nevada-day-week', 'Nevada Day Week', '🎰', 'A little desert sparkle for the Silver State.', [10, 25], [10, 31], ['US-NV']),
  event('day-of-dead', 'Day of the Dead', '💀', 'Colorful marigolds and joyful remembrance.', [11, 1], [11, 2], ['MX']),
  event('japan-culture-day', 'Culture Day', '🎎', 'Celebrate art and culture in Japan.', [11, 3], [11, 4], ['JP']),
  event('world-kindness-day', 'World Kindness Day', '💛', 'A little kindness makes every game better.', [11, 13]),
  event('world-childrens-day', 'World Children’s Day', '🪁', 'A bright board for playful imaginations.', [11, 20]),
  event('world-soil-day', 'World Soil Day', '🌱', 'Celebrate the ground beneath our feet.', [12, 5]),
  event('human-rights-day', 'Human Rights Day', '🕊️', 'A hopeful board celebrating dignity and fairness.', [12, 10]),
  event('monkey-day', 'International Monkey Day', '🐒', 'A cheeky board for a little mischief.', [12, 14]),
  event('japan-showa-day', 'Showa Day', '🌸', 'A springtime start to Golden Week in Japan.', [4, 29], [4, 30], ['JP']),
  event('mexican-revolution-day', 'Mexican Revolution Day', '🌵', 'A spirited celebration of Mexican history.', [11, 20], [11, 21], ['MX']),
  event('uk-bonfire-night', 'Bonfire Night', '🎆', 'A sparkling autumn night in the United Kingdom.', [11, 5], [11, 6], ['GB']),
  event('ireland-bloomsday', 'Bloomsday', '📜', 'A literary celebration across Ireland.', [6, 16], [6, 17], ['IE']),
  // Matariki follows the lunar calendar; this fixed late-June/July window is a seasonal approximation.
  event('new-zealand-matariki', 'Matariki Season', '✨', 'Celebrate Matariki season in Aotearoa New Zealand.', [6, 20], [7, 24], ['NZ']),
  event('italy-republic-day', 'Italian Republic Day', '🇮🇹', 'A tricolor celebration of Italy.', [6, 2], [6, 3], ['IT']),
  event('washington-statehood', 'Washington Statehood Day', '🌲', 'Evergreen inspiration from the Evergreen State.', [11, 11], [11, 12], ['US-WA']),
  event('tennessee-statehood', 'Tennessee Statehood Day', '🎸', 'A little rhythm from the Volunteer State.', [6, 1], [6, 2], ['US-TN']),
  event('virginia-statehood', 'Virginia Day', '🏛️', 'A historic board from the Old Dominion.', [6, 25], [6, 26], ['US-VA']),
  event('georgia-statehood', 'Georgia Statehood Day', '🍑', 'Sweet Georgia peach colors for your board.', [1, 2], [1, 3], ['US-GA']),
  event('michigan-statehood', 'Michigan Statehood Day', '🚤', 'Great Lakes colors for the Wolverine State.', [1, 26], [1, 27], ['US-MI']),
  event('new-york-statehood', 'New York Statehood Day', '🗽', 'Big-city sparkle and upstate charm.', [7, 26], [7, 27], ['US-NY']),
  event('illinois-statehood', 'Illinois Statehood Day', '🌽', 'A heartland celebration from the Prairie State.', [12, 3], [12, 4], ['US-IL']),
  event('pennsylvania-statehood', 'Pennsylvania Statehood Day', '🔔', 'A historic celebration from the Keystone State.', [12, 12], [12, 13], ['US-PA']),
  event('ohio-statehood', 'Ohio Statehood Day', '✈️', 'A high-flying board for the Buckeye State.', [3, 1], [3, 2], ['US-OH']),
  event('wisconsin-statehood', 'Wisconsin Statehood Day', '🧀', 'A little cheesehead cheer for game night.', [5, 29], [5, 30], ['US-WI']),
  event('massachusetts-statehood', 'Massachusetts Statehood Day', '⚓', 'A coastal, colonial-inspired board.', [2, 6], [2, 7], ['US-MA']),
  event('connecticut-statehood', 'Connecticut Statehood Day', '⛵', 'A nautical board for the Constitution State.', [1, 9], [1, 10], ['US-CT']),
  event('new-jersey-statehood', 'New Jersey Statehood Day', '🏖️', 'Boardwalk colors from the Garden State.', [12, 18], [12, 19], ['US-NJ']),
  event('missouri-statehood', 'Missouri Statehood Day', '🚂', 'A crossroads celebration from the Show-Me State.', [8, 10], [8, 11], ['US-MO']),
  event('south-carolina-statehood', 'South Carolina Day', '🌴', 'Palmetto sunshine for a Lowcountry game night.', [5, 23], [5, 24], ['US-SC']),
  event('kentucky-statehood', 'Kentucky Statehood Day', '🐎', 'Bluegrass colors and a winner’s circle finish.', [6, 1], [6, 2], ['US-KY']),
  event('louisiana-statehood', 'Louisiana Statehood Day', '🎷', 'Jazz, beads, and a festive Louisiana board.', [4, 30], [5, 1], ['US-LA']),
  event('idaho-statehood', 'Idaho Statehood Day', '🥔', 'A fresh board from the Gem State.', [7, 3], [7, 4], ['US-ID']),
  event('montana-statehood', 'Montana Statehood Day', '🦬', 'Big-sky colors for the Treasure State.', [11, 8], [11, 9], ['US-MT']),
  event('wyoming-statehood', 'Wyoming Statehood Day', '🦬', 'Wide-open skies and western spirit.', [7, 10], [7, 11], ['US-WY']),
  event('utah-statehood', 'Utah Statehood Day', '🏜️', 'Red-rock colors for the Beehive State.', [1, 4], [1, 5], ['US-UT']),
  event('north-carolina-statehood', 'North Carolina Day', '🪁', 'A breezy board from the Tar Heel State.', [11, 21], [11, 22], ['US-NC']),
  event('alabama-statehood', 'Alabama Statehood Day', '🌼', 'A sunny board from the Heart of Dixie.', [12, 14], [12, 15], ['US-AL']),
  event('mississippi-statehood', 'Mississippi Statehood Day', '🎺', 'A soulful board from the Magnolia State.', [12, 10], [12, 11], ['US-MS']),
  event('arkansas-statehood', 'Arkansas Statehood Day', '💎', 'Natural-state colors and a little sparkle.', [6, 15], [6, 16], ['US-AR']),
  event('iowa-statehood', 'Iowa Statehood Day', '🌽', 'A golden harvest board for the Hawkeye State.', [12, 28], [12, 29], ['US-IA']),
  event('minnesota-statehood', 'Minnesota Statehood Day', '🛶', 'A lake-blue board for the North Star State.', [5, 11], [5, 12], ['US-MN']),
  event('indiana-statehood', 'Indiana Statehood Day', '🏁', 'Racing colors for the Hoosier State.', [12, 11], [12, 12], ['US-IN']),
  event('west-virginia-statehood', 'West Virginia Day', '⛰️', 'Mountain-state magic for a cozy game night.', [6, 20], [6, 21], ['US-WV']),
  event('delaware-statehood', 'Delaware Day', '🐚', 'A little First State pride for your board.', [12, 7], [12, 8], ['US-DE']),
  event('rhode-island-statehood', 'Rhode Island Statehood Day', '⛵', 'A seaside celebration from the Ocean State.', [5, 29], [5, 30], ['US-RI']),
  event('new-hampshire-statehood', 'New Hampshire Statehood Day', '🗻', 'A mountain-fresh board from the Granite State.', [6, 21], [6, 22], ['US-NH']),
  event('vermont-statehood', 'Vermont Statehood Day', '🍁', 'Maple colors from the Green Mountain State.', [3, 4], [3, 5], ['US-VT']),
  event('north-dakota-statehood', 'North Dakota Statehood Day', '🌾', 'Golden prairie colors for the Peace Garden State.', [11, 2], [11, 3], ['US-ND']),
  event('south-dakota-statehood', 'South Dakota Statehood Day', '🗿', 'Monumental fun from the Mount Rushmore State.', [11, 2], [11, 3], ['US-SD']),
  event('oklahoma-statehood', 'Oklahoma Statehood Day', '🌪️', 'A bold board from the Sooner State.', [11, 16], [11, 17], ['US-OK']),
  event('nebraska-statehood', 'Nebraska Statehood Day', '🌽', 'Prairie skies and Cornhusker colors.', [3, 1], [3, 2], ['US-NE']),
  event('kansas-statehood', 'Kansas Statehood Day', '🌻', 'Sunflower colors for the Sunflower State.', [1, 29], [1, 30], ['US-KS']),
  event('new-mexico-statehood', 'New Mexico Statehood Day', '🌶️', 'A chile-bright board from the Land of Enchantment.', [1, 6], [1, 7], ['US-NM']),
  event('hawaii-statehood', 'Hawaii Statehood Day', '🌺', 'Aloha colors for Hawaiʻi Statehood Day.', [8, 21], [8, 22], ['US-HI']),
  event('us-flag-day', 'U.S. Flag Day', '🇺🇸', 'A red, white, and blue board for Flag Day.', [6, 14], [6, 15], ['US']),
])

export const EVENT_REGIONS = Object.freeze([
  Object.freeze({ id: 'US', name: 'United States' }),
  Object.freeze({ id: 'CA', name: 'Canada' }),
  Object.freeze({ id: 'AU', name: 'Australia' }),
  Object.freeze({ id: 'NZ', name: 'New Zealand' }),
  Object.freeze({ id: 'IE', name: 'Ireland' }),
  Object.freeze({ id: 'GB', name: 'United Kingdom' }),
  Object.freeze({ id: 'FR', name: 'France' }),
  Object.freeze({ id: 'IT', name: 'Italy' }),
  Object.freeze({ id: 'JP', name: 'Japan' }),
  Object.freeze({ id: 'IN', name: 'India' }),
  Object.freeze({ id: 'MX', name: 'Mexico' }),
  Object.freeze({ id: 'BR', name: 'Brazil' }),
  Object.freeze({ id: 'ES', name: 'Spain' }),
  Object.freeze({ id: 'SG', name: 'Singapore' }),
  Object.freeze({ id: 'PH', name: 'Philippines' }),
  Object.freeze({ id: 'ZA', name: 'South Africa' }),
  ...[
    ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
    ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
    ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'],
    ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'],
    ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
    ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'],
    ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
    ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'],
    ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'],
    ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
    ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
    ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'],
    ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
  ].map(([code, name]) => Object.freeze({ id: `US-${code}`, name: `${name}, United States` })),
])

const compareMonthDay = ([monthA, dayA], [monthB, dayB]) =>
  monthA - monthB || dayA - dayB

export function suggestedEventRegion(language = globalThis.navigator?.language ?? '') {
  try {
    const region = new Intl.Locale(language).region
    return EVENT_REGIONS.some(({ id }) => id === region) ? region : 'WORLDWIDE'
  } catch {
    return 'WORLDWIDE'
  }
}

function regionMatches(event, selectedRegion) {
  if (!event.regions) return true
  if (selectedRegion === 'WORLDWIDE') return false
  return event.regions.some((region) =>
    region === selectedRegion || (region === 'US' && selectedRegion.startsWith('US-')),
  )
}

export function activeThemeEvents(date = new Date(), selectedRegion = 'WORLDWIDE') {
  const today = [date.getMonth() + 1, date.getDate()]
  return THEME_EVENTS.filter((theme) => {
    if (!regionMatches(theme, selectedRegion)) return false
    const { from, to } = theme
    const orderedWindow = compareMonthDay(from, to) <= 0
    const afterStart = compareMonthDay(today, from) >= 0
    const beforeEnd = compareMonthDay(today, to) <= 0
    return orderedWindow ? afterStart && beforeEnd : afterStart || beforeEnd
  })
}

export function themeForId(id) {
  return THEME_EVENTS.find((theme) => theme.id === id) ?? CLASSIC_THEME
}
