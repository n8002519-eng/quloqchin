const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function createOverEarSvg(title, color1, color2, accent, hasMic = false, isWire = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="bandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${color2}" />
      <stop offset="50%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="cupGradL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="70%" stop-color="${color2}" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="cupGradR" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="70%" stop-color="${color2}" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="500" height="500" rx="32" fill="#0f172a" fill-opacity="0.03" />
  <circle cx="250" cy="240" r="190" fill="url(#bgGlow)" />

  <g filter="url(#softShadow)">
    <!-- Headband Arch -->
    <path d="M 140 280 C 135 120, 365 120, 360 280" 
          fill="none" stroke="url(#bandGrad)" stroke-width="28" stroke-linecap="round" />
    <!-- Inner Cushion -->
    <path d="M 160 250 C 158 140, 342 140, 340 250" 
          fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="8" stroke-linecap="round" />

    <!-- Left Metal Slider -->
    <rect x="132" y="250" width="16" height="45" rx="6" fill="#94a3b8" />
    <!-- Right Metal Slider -->
    <rect x="352" y="250" width="16" height="45" rx="6" fill="#94a3b8" />

    <!-- Left Fork / Hanger -->
    <path d="M 140 280 Q 120 310 135 340" fill="none" stroke="${color2}" stroke-width="12" stroke-linecap="round" />
    <!-- Right Fork / Hanger -->
    <path d="M 360 280 Q 380 310 365 340" fill="none" stroke="${color2}" stroke-width="12" stroke-linecap="round" />

    <!-- Left Earcup -->
    <g transform="translate(135, 335) rotate(8)">
      <ellipse cx="0" cy="0" rx="48" ry="74" fill="url(#cupGradL)" />
      <ellipse cx="-4" cy="0" rx="36" ry="58" fill="#1e293b" />
      <ellipse cx="-4" cy="0" rx="26" ry="44" fill="${accent}" fill-opacity="0.2" />
      <circle cx="2" cy="0" r="14" fill="${color1}" />
    </g>

    <!-- Right Earcup -->
    <g transform="translate(365, 335) rotate(-8)">
      <ellipse cx="0" cy="0" rx="48" ry="74" fill="url(#cupGradR)" />
      <ellipse cx="4" cy="0" rx="36" ry="58" fill="#1e293b" />
      <ellipse cx="4" cy="0" rx="26" ry="44" fill="${accent}" fill-opacity="0.2" />
      <circle cx="-2" cy="0" r="14" fill="${color1}" />
    </g>

    ${hasMic ? `
    <!-- Gaming Boom Mic -->
    <path d="M 150 360 Q 180 430 250 415" fill="none" stroke="#475569" stroke-width="7" stroke-linecap="round" />
    <ellipse cx="254" cy="414" rx="14" ry="10" fill="${accent}" />
    <circle cx="258" cy="414" r="3" fill="#ffffff" />
    ` : ''}

    ${isWire ? `
    <!-- Studio Cable -->
    <path d="M 135 390 C 130 460, 200 480, 250 465 C 290 450, 310 480, 370 470" 
          fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 4" />
    <rect x="365" y="465" width="22" height="10" rx="4" fill="#f59e0b" />
    ` : ''}
  </g>

  <!-- Product Tag / Branding -->
  <text x="250" y="460" font-family="system-ui, sans-serif" font-size="14" font-weight="700" 
        fill="#64748b" text-anchor="middle" letter-spacing="2">${title.toUpperCase()}</text>
</svg>`;
}

function createTwsSvg(title, color1, color2, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="twsGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <filter id="twsShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="500" height="500" rx="32" fill="#0f172a" fill-opacity="0.03" />
  <circle cx="250" cy="250" r="180" fill="url(#twsGlow)" />

  <g filter="url(#twsShadow)">
    <!-- Case Base -->
    <rect x="160" y="210" width="180" height="150" rx="55" fill="url(#bodyGrad)" stroke="${accent}" stroke-opacity="0.3" stroke-width="2"/>
    <!-- Case Lid Line -->
    <path d="M 162 275 L 338 275" stroke="#94a3b8" stroke-opacity="0.3" stroke-width="2" />
    <!-- LED indicator -->
    <circle cx="250" cy="305" r="4" fill="${accent}" />

    <!-- Left Earbud floating -->
    <g transform="translate(180, 150) rotate(-15)">
      <ellipse cx="0" cy="0" rx="24" ry="20" fill="${color1}" stroke="${accent}" stroke-width="1.5" />
      <rect x="-8" y="14" width="16" height="38" rx="8" fill="${color2}" />
      <ellipse cx="-16" cy="4" rx="10" ry="12" fill="#64748b" opacity="0.6" />
      <circle cx="-4" cy="2" r="3" fill="#0f172a" />
    </g>

    <!-- Right Earbud floating -->
    <g transform="translate(320, 150) rotate(15)">
      <ellipse cx="0" cy="0" rx="24" ry="20" fill="${color1}" stroke="${accent}" stroke-width="1.5" />
      <rect x="-8" y="14" width="16" height="38" rx="8" fill="${color2}" />
      <ellipse cx="16" cy="4" rx="10" ry="12" fill="#64748b" opacity="0.6" />
      <circle cx="4" cy="2" r="3" fill="#0f172a" />
    </g>
  </g>

  <text x="250" y="440" font-family="system-ui, sans-serif" font-size="14" font-weight="700" 
        fill="#64748b" text-anchor="middle" letter-spacing="2">${title.toUpperCase()}</text>
</svg>`;
}

const products = [
  // Wireless Over-Ear
  { file: 'sony-wh-1000xm5.svg', title: 'Sony WH-1000XM5', type: 'overear', c1: '#334155', c2: '#0f172a', acc: '#6366f1' },
  { file: 'sony-wh-1000xm5-side.svg', title: 'Sony WH-1000XM5 Side', type: 'overear', c1: '#475569', c2: '#1e293b', acc: '#818cf8' },
  { file: 'sony-wh-1000xm5-case.svg', title: 'Sony Hard Case', type: 'tws', c1: '#1e293b', c2: '#0f172a', acc: '#6366f1' },
  { file: 'apple-airpods-max.svg', title: 'AirPods Max', type: 'overear', c1: '#cbd5e1', c2: '#64748b', acc: '#0ea5e9' },
  { file: 'apple-airpods-max-side.svg', title: 'AirPods Max Side', type: 'overear', c1: '#94a3b8', c2: '#475569', acc: '#38bdf8' },
  { file: 'apple-airpods-max-case.svg', title: 'Smart Case', type: 'tws', c1: '#cbd5e1', c2: '#94a3b8', acc: '#0ea5e9' },
  { file: 'marshall-major-iv.svg', title: 'Marshall Major IV', type: 'overear', c1: '#27272a', c2: '#09090b', acc: '#f59e0b' },
  { file: 'marshall-major-iv-fold.svg', title: 'Major IV Folded', type: 'overear', c1: '#3f3f46', c2: '#18181b', acc: '#d97706' },

  // TWS
  { file: 'apple-airpods-pro-2.svg', title: 'AirPods Pro 2', type: 'tws', c1: '#f8fafc', c2: '#e2e8f0', acc: '#10b981' },
  { file: 'apple-airpods-pro-2-open.svg', title: 'AirPods Pro 2 Open', type: 'tws', c1: '#ffffff', c2: '#cbd5e1', acc: '#059669' },
  { file: 'sony-wf-1000xm5.svg', title: 'Sony WF-1000XM5', type: 'tws', c1: '#1e293b', c2: '#0f172a', acc: '#d97706' },
  { file: 'sony-wf-1000xm5-case.svg', title: 'WF-1000XM5 Case', type: 'tws', c1: '#334155', c2: '#1e293b', acc: '#f59e0b' },
  { file: 'samsung-galaxy-buds2-pro.svg', title: 'Galaxy Buds2 Pro', type: 'tws', c1: '#312e81', c2: '#1e1b4b', acc: '#8b5cf6' },
  { file: 'samsung-galaxy-buds2-pro-open.svg', title: 'Buds2 Pro Open', type: 'tws', c1: '#4338ca', c2: '#312e81', acc: '#a78bfa' },

  // Gaming
  { file: 'hyperx-cloud-ii.svg', title: 'HyperX Cloud II', type: 'overear', c1: '#1e293b', c2: '#0f172a', acc: '#ef4444', mic: true },
  { file: 'hyperx-cloud-ii-side.svg', title: 'HyperX Side', type: 'overear', c1: '#334155', c2: '#111827', acc: '#dc2626', mic: true },
  { file: 'steelseries-arctis-nova-7.svg', title: 'Arctis Nova 7', type: 'overear', c1: '#1f2937', c2: '#111827', acc: '#f97316', mic: true },
  { file: 'steelseries-arctis-nova-7-side.svg', title: 'Nova 7 Side', type: 'overear', c1: '#374151', c2: '#1f2937', acc: '#ea580c', mic: true },
  { file: 'razer-blackshark-v2-pro.svg', title: 'Razer BlackShark', type: 'overear', c1: '#18181b', c2: '#09090b', acc: '#22c55e', mic: true },
  { file: 'razer-blackshark-v2-pro-side.svg', title: 'BlackShark Side', type: 'overear', c1: '#27272a', c2: '#18181b', acc: '#16a34a', mic: true },

  // Studio / Wired
  { file: 'audio-technica-ath-m50x.svg', title: 'Audio-Technica M50x', type: 'overear', c1: '#1e293b', c2: '#090d16', acc: '#0284c7', wire: true },
  { file: 'audio-technica-ath-m50x-fold.svg', title: 'M50x Folded', type: 'overear', c1: '#334155', c2: '#1e293b', acc: '#0ea5e9', wire: true },
  { file: 'sennheiser-hd-600.svg', title: 'Sennheiser HD 600', type: 'overear', c1: '#334155', c2: '#1e293b', acc: '#64748b', wire: true },
  { file: 'sennheiser-hd-600-open.svg', title: 'HD 600 Detail', type: 'overear', c1: '#475569', c2: '#0f172a', acc: '#94a3b8', wire: true },
  { file: 'beyerdynamic-dt-770-pro.svg', title: 'Beyerdynamic DT 770', type: 'overear', c1: '#1e293b', c2: '#0f172a', acc: '#94a3b8', wire: true },
  { file: 'beyerdynamic-dt-770-pro-side.svg', title: 'DT 770 Side', type: 'overear', c1: '#334155', c2: '#1e293b', acc: '#cbd5e1', wire: true },
];

for (const p of products) {
  let content = '';
  if (p.type === 'overear') {
    content = createOverEarSvg(p.title, p.c1, p.c2, p.acc, p.mic, p.wire);
  } else {
    content = createTwsSvg(p.title, p.c1, p.c2, p.acc);
  }
  fs.writeFileSync(path.join(dir, p.file), content, 'utf8');
}

console.log('Created ' + products.length + ' high quality product images!');
