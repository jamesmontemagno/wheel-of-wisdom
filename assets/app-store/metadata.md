# App Store metadata — Wheel of Wisdom

Copy-ready listing details for App Store Connect. Character limits are Apple's; counts are noted where a field has a limit.

## App information

| Field | Value |
| --- | --- |
| Name (30) | `Wheel of Wisdom` (15) |
| Subtitle (30) | `Pass & Play Word Puzzle Game` (28) |
| Bundle ID | `com.refractored.wheelofwisdom` |
| SKU | `wheelofwisdom-ios` |
| Primary language | English (U.S.) |
| Primary category | Games → Word |
| Secondary category | Games → Family |
| Price | Free (no in-app purchases) |
| Version | 1.0 (matches `ApplicationDisplayVersion` in `mobile/WheelOfWisdom.Maui/WheelOfWisdom.Maui.csproj`) |
| Copyright | `2026 James Montemagno` |
| Marketing URL | https://www.wheelofwisdom.app |
| Support URL | https://github.com/jamesmontemagno/wheel-of-wisdom/issues |
| Privacy Policy URL | **Required — not yet published.** Add a page (e.g. `https://www.wheelofwisdom.app/privacy`) stating that no data is collected. |

## Promotional text (170)

Updatable at any time without a new build.

```
Game night fits in your pocket! Spin the wheel, buy a vowel and solve original word puzzles with 2–3 friends on one phone. No accounts, no ads, works offline.
```

## Description (4000)

```
Turn any phone into game night.

Wheel of Wisdom is a pass-and-play word puzzle game for 2–3 players sharing one device. Spin the wheel, call out consonants, buy vowels and race to solve the board before your friends do. No accounts, no sign-ups, no internet required — just hand the phone around and play.

SPIN, GUESS, SOLVE
• Spin an animated prize wheel and pick a consonant — every match pays the wedge value
• Buy vowels for $250 to crack tougher puzzles
• Solve the whole phrase to bank your round winnings
• Watch out for Bankrupt and Lose a Turn!

FOUR ROUNDS + A BONUS ROUND
• The wheel grows every round, from 12 to 18 spaces
• Trip and Mystery wedges reveal surprise getaways and fun prizes
• Round three pays 1.5x and round four pays 2x
• The champion spins for one of six sealed envelopes worth up to $100,000 in the bonus round, then picks a category and solves against the clock

BUILT FOR THE COUCH
• 2–3 players on one shared phone
• A 30-second turn clock keeps everyone on their toes
• Bold turn banners make it obvious whose turn it is
• Confetti and fanfare for every solved puzzle

FRESH BOARDS ALL YEAR
• 600 original puzzles across fun categories
• 100+ holiday, seasonal and local event themes that decorate the board
• No repeat puzzles in a game, and recently played puzzles are skipped next time

YOUR GAME, YOUR DEVICE
• Leaderboard and game history saved privately on your device
• Plays fully offline
• No accounts, no ads, no tracking, no in-app purchases
• Sound is optional and reduced-motion settings are respected

All money in the game is pretend. Wheel of Wisdom is an independent fan-made game with original puzzles and is not affiliated with any television show.
```

## Keywords (100)

Comma-separated, no spaces after commas. Avoid trademarked show names — Apple rejects them.

```
word,puzzle,party,family,pass and play,game night,phrase,vowel,spin,guess,offline,multiplayer,trivia
```

(100 characters)

## What's New in this version (4000)

```
Welcome to Wheel of Wisdom! Spin the wheel, solve original word puzzles and crown a champion with 2–3 friends on one phone.
```

## Screenshots

Generated from `assets/app-store/screenshots.html` using the device captures in `assets/`.

| File | Size | Headline |
| --- | --- | --- |
| `iphone-6.5/01-game-night.png` | 1284 × 2778 | Game night in your pocket. |
| `iphone-6.5/02-spin-the-wheel.png` | 1284 × 2778 | Spin it. Win it. |
| `iphone-6.5/03-pass-the-phone.png` | 1284 × 2778 | Pass the phone. Beat the clock. |
| `iphone-6.5/04-bonus-round.png` | 1284 × 2778 | Big words. Bigger wins. |

Upload them to the **iPhone 6.5" Display** slot (1284 × 2778 is accepted there; App Store Connect scales them for smaller iPhones). The PNGs are RGB with no alpha channel, as Apple requires.

The iOS app also declares iPad support (`UIDeviceFamily` 1 and 2 in `Platforms/iOS/Info.plist`), so App Store Connect will additionally require **iPad 13" Display** screenshots (2064 × 2752 or 2048 × 2732) unless iPad support is removed.

To regenerate after editing the template or replacing the captures, serve the repo root and capture each slide with headless Chrome:

```sh
python3 -m http.server 8799   # from the repo root, in another terminal
for i in 1 2 3 4; do
  google-chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1284,2778 --virtual-time-budget=5000 \
    --screenshot=slide-$i.png "http://localhost:8799/assets/app-store/screenshots.html?slide=$i"
done
```

Chrome's screenshot may include an alpha channel; flatten to RGB (for example `magick slide-1.png -alpha off 01-game-night.png`) before uploading.

## App Privacy ("nutrition label")

- **Data collection:** Data Not Collected.
- The app has no accounts, analytics, ads, or backend. Player names, settings, and game history stay on the device (`Preferences` and a local SQLite database).

## Age rating

Answer **None** to every content question, including *Simulated Gambling* (the prize wheel uses pretend money with no wagering and nothing of real value). Expected rating: **4+**.

## Export compliance

The app uses no non-exempt encryption. `ITSAppUsesNonExemptEncryption` is already set in `Platforms/iOS/Info.plist`, so App Store Connect won't prompt for each build.

## App Review information

- **Sign-in required:** No.
- **Notes:**

```
Wheel of Wisdom is a pass-and-play word game for 2–3 people sharing one device. No login is required. Enter two or three player names and tap "Let's play". Spin the wheel, choose consonants, buy vowels, or solve the puzzle. All money is pretend, there are no purchases or real-world prizes, and no data leaves the device. The game is an independent fan-made project with original puzzles and is not affiliated with any television show.
```
