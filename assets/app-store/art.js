// Shared artwork helpers for the App Store screenshot templates.
const sparkPath = 'M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0Z';
const sparkSvg = (size, color = 'currentColor') => `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><path d="${sparkPath}" fill="${color}"/></svg>`;

function wheelSvg(size, { labels = true, hub = true } = {}) {
  const segs = [
    ['$900', '#e7ab65'], ['$500', '#a8cdbb'], ['$650', '#e78371'], ['$2,500', '#f1d98a'], ['TRIP', '#a7bcd4'], ['$800', '#e9cb74'],
    ['$550', '#d0bbd9'], ['$600', '#e9ba76'], ['BANKRUPT', '#283f34'], ['$500', '#dce1d8'], ['MYSTERY', '#e68b7a'], ['$700', '#aebfd7'],
  ];
  const c = 160, r = 144, step = 360 / segs.length;
  const pt = (deg, rad) => { const a = (deg - 90) * Math.PI / 180; return [c + rad * Math.cos(a), c + rad * Math.sin(a)]; };
  let out = `<svg width="${size}" height="${size}" viewBox="0 0 320 320" font-family="Outfit, sans-serif">
    <circle cx="160" cy="160" r="159" fill="#e9dfc4"/><circle cx="160" cy="160" r="154" fill="#284b3b"/>`;
  segs.forEach(([label, fill], i) => {
    const a0 = i * step, a1 = a0 + step, mid = a0 + step / 2;
    const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
    out += `<path d="M160 160 L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z" fill="${fill}" stroke="#f8f6ef" stroke-width="1.5"/>`;
    if (labels) {
      const [tx, ty] = pt(mid, 96);
      const dark = fill === '#283f34';
      const fs = label.length > 5 ? 12 : 17;
      out += `<text x="${tx}" y="${ty}" fill="${dark ? '#f8f6ef' : '#283f34'}" font-size="${fs}" font-weight="800" text-anchor="middle" dominant-baseline="middle" transform="rotate(${mid + 90} ${tx} ${ty})">${label}</text>`;
    }
    const [dx, dy] = pt(a0, 150);
    out += `<circle cx="${dx}" cy="${dy}" r="2.4" fill="#f8f6ef"/>`;
  });
  if (hub) {
    out += `<circle cx="160" cy="160" r="36" fill="#f8f6ef" stroke="#284b3b" stroke-width="6"/>
      <path transform="translate(140 140) scale(.4)" d="${sparkPath}" fill="#bf482d"/>
      <path d="M160 34 l-15 -32 h30 z" fill="#bf482d" stroke="#f8f6ef" stroke-width="2.5" stroke-linejoin="round"/>`;
  }
  return out + '</svg>';
}
