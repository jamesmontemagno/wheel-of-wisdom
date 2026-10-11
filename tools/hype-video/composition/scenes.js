export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const outCubic = (x) => 1 - (1 - x) ** 3
const inCubic = (x) => x ** 3
const outBack = (x) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2
}
const tween = (local, start, length, ease = outCubic) => ease(clamp((local - start) / length))

function reveal(element, progress, { x = 0, y = 55, scale = 1, rotate = 0, blur = 12 } = {}) {
  const inverse = 1 - progress
  element.style.opacity = clamp(progress * 1.5)
  element.style.transform = `translate(${x * inverse}px,${y * inverse}px) scale(${1 + (scale - 1) * inverse}) rotate(${rotate * inverse}deg)`
  element.style.filter = blur ? `blur(${blur * inverse}px)` : ''
}

const rich = (text) => String(text).replace(/\*(.+?)\*/g, '<span class="hot">$1</span>')
const lines = (text) => String(text).split('\n').map((line) => `<span class="line anim">${rich(line)}</span>`).join('')
const image = (src) => new URL(`../../../${src}`, import.meta.url).href
const phone = (src, extra = '') => `<div class="phone anim ${extra}"><img alt="" src="${image(src)}"></div>`
const wheel = (extra = '') => `<div class="wheel anim ${extra}"></div>`

function copy(scene) {
  return `<div class="copy">
    <div class="kicker anim">${scene.kicker}</div>
    <h2 class="headline">${lines(scene.headline)}</h2>
    ${scene.body ? `<p class="body anim">${scene.body}</p>` : ''}
  </div>`
}

function updateCopy(root, local) {
  reveal(root.querySelector('.kicker'), tween(local, 0, .42), { x: -55, y: 0, blur: 0 })
  root.querySelectorAll('.line').forEach((line, index) => reveal(line, tween(local, .08 + index * .16, .58), { y: 75 }))
  const body = root.querySelector('.body')
  if (body) reveal(body, tween(local, .56, .55), { y: 36, blur: 6 })
}

function intro(root, scene) {
  root.innerHTML = `<div class="intro-center">
    ${wheel()}${wheel('second')}
    <div class="kicker anim">${scene.kicker}</div>
    <img class="intro-logo anim" alt="" src="${image(scene.logo)}">
    <h1 class="headline">${lines(scene.headline)}</h1>
    <div class="intro-tagline anim">${scene.tagline}</div>
  </div>`
  const logo = root.querySelector('.intro-logo')
  const wheels = root.querySelectorAll('.wheel')
  return (local, global) => {
    reveal(root.querySelector('.kicker'), tween(local, 0, .45), { y: -30, blur: 0 })
    reveal(logo, tween(local, .18, .65, outBack), { y: 0, scale: .18, rotate: -24, blur: 0 })
    root.querySelectorAll('.line').forEach((line, index) => reveal(line, tween(local, .55 + index * .18, .62), { y: 80 }))
    reveal(root.querySelector('.intro-tagline'), tween(local, 1.05, .55), { y: 35, blur: 4 })
    wheels[0].style.transform = `rotate(${global.t * 62}deg) scale(${1 + .02 * Math.sin(global.t * 2)})`
    wheels[1].style.transform = `rotate(${-global.t * 48}deg)`
    logo.style.boxShadow = `0 32px 100px rgba(0,0,0,.4),0 0 ${82 + global.pulse * 20}px rgba(103,217,209,.42)`
  }
}

function solve(root, scene) {
  const rows = scene.rows
    .map(
      (row) =>
        `<div class="tile-row">${[...row]
          .map((character) =>
            character === ' '
              ? '<span class="tile space"></span>'
              : `<span class="tile anim" data-letter="${character}"><span></span></span>`,
          )
          .join('')}</div>`,
    )
    .join('')
  root.innerHTML = `${copy(scene)}
    <div class="puzzle-shell anim">
      <div class="board-category">${scene.category}</div>
      <div class="puzzle-board">${rows}</div>
      <div class="solved-stamp anim">SOLVED!</div>
    </div>
    <div class="letter-picker">${scene.picks.map((letter) => `<span class="letter-pick anim">${letter}</span>`).join('')}</div>`

  const shell = root.querySelector('.puzzle-shell')
  const tiles = [...root.querySelectorAll('.tile[data-letter]')]
  const picks = [...root.querySelectorAll('.letter-pick')]
  const solved = root.querySelector('.solved-stamp')
  return (local) => {
    updateCopy(root, local)
    reveal(shell, tween(local, .08, .72, outBack), { x: 180, y: 0, scale: .92, blur: 8 })
    const pickCount = Math.min(scene.picks.length, Math.floor(Math.max(0, local - .75) / .55) + 1)
    const solveAll = local >= 4.25
    const chosen = new Set(scene.picks.slice(0, Math.max(0, pickCount)))

    picks.forEach((pick, index) => {
      reveal(pick, tween(local, .55 + index * .12, .4, outBack), { y: 45, scale: .65, blur: 0 })
      pick.classList.toggle('active', index === pickCount - 1 && !solveAll)
      pick.style.transform += ` translateY(${index === pickCount - 1 && !solveAll ? -10 : 0}px)`
    })

    tiles.forEach((tile, index) => {
      const letter = tile.dataset.letter
      const revealed = chosen.has(letter) || solveAll
      const previous = tile.classList.contains('revealed')
      tile.classList.toggle('revealed', revealed)
      tile.firstElementChild.textContent = revealed ? letter : ''
      const cascade = solveAll ? Math.max(0, local - 4.25 - index * .018) : 1
      const flip = revealed ? Math.min(1, cascade * 7) : 0
      tile.style.transform = `rotateX(${revealed && (!previous || solveAll) ? (1 - flip) * 90 : 0}deg) scale(${revealed ? 1 : .96})`
      tile.style.opacity = String(.65 + .35 * (revealed ? 1 : 0))
    })

    reveal(solved, tween(local, 4.45, .45, outBack), { y: 0, scale: .2, rotate: -20, blur: 0 })
  }
}

function spin(root, scene) {
  root.innerHTML = `${copy(scene)}${wheel()}<div class="pointer anim"></div>${phone(scene.shot, 'feature-shot')}`
  const shot = root.querySelector('.phone')
  const wheelEl = root.querySelector('.wheel')
  const pointer = root.querySelector('.pointer')
  return (local, global) => {
    updateCopy(root, local)
    const enter = tween(local, .08, .72, outBack)
    shot.style.opacity = clamp(enter * 1.5)
    shot.style.transform = `translateX(${(1 - enter) * 720}px) translateY(${Math.sin(global.t * 1.7) * 9}px) rotate(${(1 - enter) * 8}deg)`
    wheelEl.style.opacity = String(.34 * enter)
    wheelEl.style.transform = `rotate(${local * 210 + 18 * Math.sin(local * 1.8)}deg) scale(${.65 + .35 * enter})`
    reveal(pointer, tween(local, .5, .35, outBack), { y: -50, scale: .3, blur: 0 })
    pointer.style.transform += ` rotate(${Math.sin(local * 17) * Math.exp(-local * 1.1) * 11}deg)`
  }
}

function pass(root, scene) {
  root.innerHTML = `${phone(scene.shots[0], 'first')}${phone(scene.shots[1], 'second')}${copy(scene)}<div class="timer anim">30s</div>`
  const phones = root.querySelectorAll('.phone')
  const timer = root.querySelector('.timer')
  return (local, global) => {
    updateCopy(root, local)
    phones.forEach((item, index) => {
      const progress = tween(local, .08 + index * .23, .75, outBack)
      const base = index ? .88 : 1
      item.style.opacity = clamp(progress * 1.5)
      item.style.transform = `translateY(${(1 - progress) * 900 + Math.sin(global.t * 1.5 + index) * 9}px) rotate(${index ? 7 : -7}deg) scale(${base})`
    })
    const pulse = 1 + .025 * Math.exp(-(local % .5) * 8)
    reveal(timer, tween(local, .8, .48, outBack), { y: 0, scale: .25, rotate: -12, blur: 0 })
    timer.style.transform += ` scale(${pulse})`
  }
}

function puzzles(root, scene) {
  root.innerHTML = `${copy(scene)}<div class="stats">${scene.stats
    .map(([value, label]) => `<div class="stat anim"><strong>${value}</strong><span>${label}</span></div>`)
    .join('')}</div>${phone(scene.shot)}${wheel()}`
  const shot = root.querySelector('.phone')
  const wheelEl = root.querySelector('.wheel')
  return (local, global) => {
    updateCopy(root, local)
    root.querySelectorAll('.stat').forEach((stat, index) => reveal(stat, tween(local, .68 + index * .3, .5, outBack), { x: -65, y: 0, blur: 0 }))
    const enter = tween(local, .12, .8, outBack)
    shot.style.opacity = clamp(enter * 1.5)
    shot.style.transform = `translateY(${(1 - enter) * 850 + Math.sin(global.t * 1.35) * 10}px) rotate(${(1 - enter) * -7}deg)`
    wheelEl.style.transform = `rotate(${global.t * 45}deg)`
  }
}

function benefits(root, scene) {
  root.innerHTML = `${copy(scene)}<div class="benefit-list">${scene.benefits
    .map((benefit) => `<div class="benefit anim"><span class="check">✓</span>${benefit}</div>`)
    .join('')}</div>${phone(scene.shots[0], 'first')}${phone(scene.shots[1], 'second')}`
  const phones = root.querySelectorAll('.phone')
  return (local, global) => {
    updateCopy(root, local)
    root.querySelectorAll('.benefit').forEach((benefit, index) =>
      reveal(benefit, tween(local, .62 + index * .28, .45, outBack), { x: -70, y: 0, blur: 0 }),
    )
    phones.forEach((item, index) => {
      const progress = tween(local, .12 + index * .25, .75, outBack)
      item.style.opacity = clamp(progress * 1.6)
      item.style.transform = `translateX(${(1 - progress) * 700}px) translateY(${Math.sin(global.t * 1.5 + index * 1.8) * 10}px) rotate(${index ? 6 : -5}deg)`
    })
  }
}

function outro(root, scene, ctx) {
  root.innerHTML = `<div class="outro-center">${wheel()}${wheel('second')}
    <img class="outro-logo anim" alt="" src="${image(scene.logo)}">
    <h2 class="headline">${lines(scene.headline)}</h2>
    <div class="outro-tagline anim">${scene.tagline}</div>
    <div class="url"><span class="typed"></span><span class="underline"></span></div>
    <div class="store-chip anim">Download now · ${ctx.url}</div>
  </div>`
  const logo = root.querySelector('.outro-logo')
  const typed = root.querySelector('.typed')
  const underline = root.querySelector('.underline')
  const wheels = root.querySelectorAll('.wheel')
  return (local, global) => {
    reveal(logo, tween(local, 0, .62, outBack), { y: 0, scale: .15, rotate: -20, blur: 0 })
    root.querySelectorAll('.line').forEach((line, index) => reveal(line, tween(local, .34 + index * .18, .6), { y: 70 }))
    reveal(root.querySelector('.outro-tagline'), tween(local, .82, .5), { y: 30, blur: 5 })
    const urlProgress = tween(local, 1.05, 1.15, (x) => x)
    typed.textContent = ctx.url.slice(0, Math.round(ctx.url.length * urlProgress))
    underline.style.transform = `scaleX(${tween(local, 2.18, .45)})`
    reveal(root.querySelector('.store-chip'), tween(local, 2.35, .5, outBack), { y: 38, scale: .8, blur: 0 })
    wheels[0].style.transform = `rotate(${global.t * 48}deg)`
    wheels[1].style.transform = `rotate(${-global.t * 55}deg)`
  }
}

export const builders = { intro, spin, pass, solve, puzzles, benefits, outro }
