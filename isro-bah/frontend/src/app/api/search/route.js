import { NextResponse } from 'next/server';

const PRESETS = {
  bangalore: {
    id: 'bangalore',
    name: 'Bangalore Urban Area',
    useCase: 'Urban Development & Layout Analysis',
    coordinates: [12.9716, 77.5946],
    description: 'Sprawl showing major arterial roads, commercial zones, and lakes.',
    sar: createSvgSatellite('urban', 'sar'),
    optical: createSvgSatellite('urban', 'optical')
  },
  kerala: {
    id: 'kerala',
    name: 'Kerala Flood Zone (Kuttanad)',
    useCase: 'Disaster Response & Damage Assessment',
    coordinates: [9.4981, 76.3388],
    description: 'Low-lying agricultural backwater region showing flooded fields.',
    sar: createSvgSatellite('flood', 'sar'),
    optical: createSvgSatellite('flood', 'optical')
  },
  rajasthan: {
    id: 'rajasthan',
    name: 'Bhadla Solar Park, Rajasthan',
    useCase: 'Infrastructure & Solar Resource Monitoring',
    coordinates: [27.3506, 72.0326],
    description: 'Massive solar energy harvesting facility in the Thar Desert.',
    sar: createSvgSatellite('desert', 'sar'),
    optical: createSvgSatellite('desert', 'optical')
  },
  mumbai: {
    id: 'mumbai',
    name: 'Mumbai Harbor & Coastal Port',
    useCase: 'Maritime Security & Ship Monitoring',
    coordinates: [18.9500, 72.8500],
    description: 'Busy shipping lanes showing metal hull reflections.',
    sar: createSvgSatellite('coastal', 'sar'),
    optical: createSvgSatellite('coastal', 'optical')
  },
  sundarbans: {
    id: 'sundarbans',
    name: 'Sundarbans Mangrove Delta',
    useCase: 'Ecological Conservation & Wetland Forestry',
    coordinates: [21.9497, 89.1833],
    description: 'World\'s largest mangrove forest delta boundary mapping.',
    sar: createSvgSatellite('delta', 'sar'),
    optical: createSvgSatellite('delta', 'optical')
  }
};

function createSvgSatellite(type, modality) {
  let colors = {};
  if (modality === 'sar') {
    colors = { bg: '#111827', primary: '#D1D5DB', secondary: '#4B5563', water: '#030712', active: '#FFFFFF' };
  } else {
    colors = { bg: '#1A361D', primary: '#92400E', secondary: '#15803D', water: '#1D4ED8', active: '#F59E0B' };
  }

  let content = '';
  if (type === 'urban') {
    if (modality === 'sar') {
      content = `
        <path d="M 0,50 L 256,50 M 0,150 L 256,150 M 50,0 L 50,256 M 180,0 L 180,256" stroke="${colors.primary}" stroke-width="2" stroke-dasharray="1,4" />
        <path d="M 0,100 L 256,120 M 100,0 L 120,256" stroke="${colors.active}" stroke-width="3" />
        <rect x="60" y="60" width="30" height="20" fill="none" stroke="${colors.active}" stroke-width="1.5" stroke-dasharray="2,2" />
        <circle cx="70" cy="70" r="2" fill="${colors.active}" />
        <path d="M 120,160 Q 140,140 180,160 T 240,150 L 256,160 L 256,256 L 120,256 Z" fill="${colors.water}" opacity="0.9" />
        <text x="10" y="240" fill="${colors.secondary}" font-size="8">S1-SAR (VV+VH)</text>
      `;
    } else {
      content = `
        <path d="M 0,50 L 256,50 M 0,150 L 256,150 M 50,0 L 50,256 M 180,0 L 180,256" stroke="${colors.primary}" stroke-width="3" />
        <circle cx="120" cy="80" r="40" fill="${colors.secondary}" opacity="0.6" filter="blur(4px)" />
        <rect x="60" y="60" width="30" height="20" fill="${colors.primary}" rx="2" />
        <rect x="145" y="75" width="10" height="10" fill="#B45309" />
        <path d="M 120,160 Q 140,140 180,160 T 240,150 L 256,160 L 256,256 L 120,256 Z" fill="${colors.water}" />
        <text x="10" y="240" fill="#94A3B8" font-size="8">S2-Optical (RGB)</text>
      `;
    }
  } else if (type === 'flood') {
    if (modality === 'sar') {
      content = `
        <rect width="256" height="256" fill="${colors.secondary}" />
        <path d="M 10,20 C 50,40 80,10 120,50 C 160,90 140,150 180,180 C 220,210 230,240 256,256 L 0,256 L 0,0 Z" fill="${colors.water}" />
        <path d="M 150,20 Q 200,60 220,10 T 256,70 L 256,0 Z" fill="${colors.primary}" opacity="0.4" />
        <text x="10" y="240" fill="${colors.primary}" font-size="8">S1-SAR (Flood Extent)</text>
      `;
    } else {
      content = `
        <rect width="256" height="256" fill="${colors.bg}" />
        <path d="M 10,20 C 50,40 80,10 120,50 C 160,90 140,150 180,180 C 220,210 230,240 256,256 L 0,256 L 0,0 Z" fill="#1E40AF" />
        <path d="M 150,20 Q 200,60 220,10 T 256,70 L 256,0 Z" fill="${colors.secondary}" />
        <text x="10" y="240" fill="#94A3B8" font-size="8">S2-Optical (True Color)</text>
      `;
    }
  } else if (type === 'desert') {
    if (modality === 'sar') {
      content = `
        <rect width="256" height="256" fill="${colors.bg}" />
        <g fill="none" stroke="${colors.active}" stroke-width="1.5">
          <line x1="40" y1="40" x2="140" y2="40" stroke-dasharray="2,2" />
          <line x1="40" y1="50" x2="140" y2="50" stroke-dasharray="2,2" />
          <line x1="60" y1="120" x2="200" y2="120" stroke-dasharray="2,2" />
        </g>
        <text x="10" y="240" fill="${colors.primary}" font-size="8">S1-SAR (Polarimetric)</text>
      `;
    } else {
      content = `
        <rect width="256" height="256" fill="#FCD34D" />
        <g fill="${colors.water}" stroke="#475569" stroke-width="0.5">
          <rect x="40" y="38" width="100" height="34" rx="1" fill="#1E3A8A" />
          <rect x="60" y="118" width="140" height="26" rx="1" fill="#1E3A8A" />
        </g>
        <text x="10" y="240" fill="#78350F" font-size="8">S2-Optical (Solar Array)</text>
      `;
    }
  } else if (type === 'coastal') {
    if (modality === 'sar') {
      content = `
        <rect width="256" height="256" fill="${colors.water}" />
        <path d="M 0,80 L 100,80 L 180,140 L 256,140" stroke="${colors.primary}" stroke-width="3" fill="none" />
        <g transform="translate(80, 160)">
          <path d="M -5,0 L 5,0 M 0,-5 L 0,5" stroke="${colors.active}" stroke-width="1.5" />
        </g>
        <text x="10" y="240" fill="${colors.primary}" font-size="8">S1-SAR (Coastal Guard)</text>
      `;
    } else {
      content = `
        <rect width="256" height="256" fill="${colors.water}" />
        <path d="M 0,80 L 100,80 L 180,140 L 256,140 L 256,0 L 0,0 Z" fill="#064E3B" />
        <g transform="translate(80, 160) rotate(15)">
          <path d="M -10,-1 C -5,-4 5,-4 10,-1 L 8,3 C 3,4 -3,4 -8,3 Z" fill="#FFFFFF" />
        </g>
        <text x="10" y="240" fill="#94A3B8" font-size="8">S2-Optical (Coastal Port)</text>
      `;
    }
  } else {
    if (modality === 'sar') {
      content = `
        <rect width="256" height="256" fill="${colors.secondary}" />
        <path d="M 100,0 C 80,60 180,120 120,180 C 90,210 50,200 40,256" stroke="${colors.water}" stroke-width="16" fill="none" stroke-linecap="round" />
        <text x="10" y="240" fill="${colors.primary}" font-size="8">S1-SAR (Coherent)</text>
      `;
    } else {
      content = `
        <rect width="256" height="256" fill="#064E3B" />
        <path d="M 100,0 C 80,60 180,120 120,180 C 90,210 50,200 40,256" stroke="#78350F" stroke-width="16" fill="none" stroke-linecap="round" />
        <text x="10" y="240" fill="#94A3B8" font-size="8">S2-Optical (Bio-diversity)</text>
      `;
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
    <rect width="256" height="256" fill="${colors.bg}" />
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
      <feBlend mode="overlay" in2="SourceGraphic" />
    </filter>
    <rect width="256" height="256" filter="url(#noise)" opacity="${modality === 'sar' ? 0.35 : 0.1}" pointer-events="none" />
    ${content}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function generateSearchResults(targetPreset, queryModality, count = 10) {
  const targetModality = queryModality === 'sar' ? 'optical' : 'sar';
  const results = [
    {
      rank: 1,
      score: 0.9482,
      id: targetPreset.id,
      name: targetPreset.name,
      useCase: targetPreset.useCase,
      coordinates: targetPreset.coordinates,
      image: targetPreset[targetModality],
      isPerfectMatch: true,
      satellite: targetModality === 'sar' ? 'Sentinel-1 (SAR)' : 'Sentinel-2 (Optical)'
    }
  ];

  const presetsList = Object.values(PRESETS).filter(p => p.id !== targetPreset.id);
  
  for (let i = 1; i < count; i++) {
    const template = presetsList[i % presetsList.length];
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    const score = 0.85 - (i * 0.04) - (Math.random() * 0.02);

    results.push({
      rank: i + 1,
      score: parseFloat(score.toFixed(4)),
      id: `${template.id}_alt_${i}`,
      name: `${template.name} (Sector ${String.fromCharCode(65 + i)})`,
      useCase: template.useCase,
      coordinates: [template.coordinates[0] + latOffset, template.coordinates[1] + lngOffset],
      image: template[targetModality],
      isPerfectMatch: false,
      satellite: targetModality === 'sar' ? 'Sentinel-1 (SAR)' : 'Sentinel-2 (Optical)'
    });
  }

  return results;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const modality = formData.get('modality') || 'sar';
    const presetId = formData.get('presetId');

    await new Promise((resolve) => setTimeout(resolve, 800));

    let selectedPreset = PRESETS.bangalore;
    if (presetId && PRESETS[presetId]) {
      selectedPreset = PRESETS[presetId];
    } else if (file) {
      const hash = file.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const keys = Object.keys(PRESETS);
      selectedPreset = PRESETS[keys[hash % keys.length]];
    }

    const results = generateSearchResults(selectedPreset, modality);

    return NextResponse.json({
      success: true,
      queryImage: selectedPreset[modality],
      queryModality: modality,
      queryCoordinates: selectedPreset.coordinates,
      queryName: selectedPreset.name,
      results: results
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}