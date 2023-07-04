import './style.css';
import { Pane } from 'tweakpane';
import { 
  generateLogo, 
  brandColorsRGBA, 
  shuffle,
  ColorsRGBA,
  StrokeLinecap 
} from './logo.ts';
import anime from 'animejs/lib/anime.es.js';
import * as Rand from 'random-seed';
import colorNameList from 'color-name-list/dist/colornames.json';

// will hold the current logo svg element
let $logo: SVGElement | null = null;

// set a timer variable that will hold the setTimeout reference for the throttle
let timer: number | null = null;

function updateFavicon ($svg: SVGElement) {
  const $canvas = document.createElement('canvas');
  const ctx = $canvas.getContext('2d');
  const $favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  
  $canvas.width = 64;
  $canvas.height = 64;

  const svgString = new XMLSerializer().serializeToString($svg);
  const img = new Image();
  img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  img.onload = () => {
    ctx?.drawImage(img, 0, 0);
    $favicon.href = $canvas.toDataURL();
  }

  $favicon.href = $canvas.toDataURL();
}

type RGBAcolorObject = {
  r: number,
  g: number,
  b: number,
  a: number,
};

type Settings = {
  seed: string,
  innerPointRadius: number,
  rings: number,
  ringStrokeWidth: number,
  rotation1: number,
  rotation2: number,
  rotation3: number,
  rotationOffset1: number,
  rotationOffset2: number,
  strokeLength1: number,
  strokeLength2: number,
  strokeLinecap: StrokeLinecap,
  outerRingColor1: RGBAcolorObject,
  outerRingColor2: RGBAcolorObject,
  innerRingColor1: RGBAcolorObject,
  innerRingColor2: RGBAcolorObject,
  innerPointColor1: RGBAcolorObject,
  gradientStopStart: number,
  gradientStopEnd: number,
  darkMode: boolean,
  visualDebug: boolean,
  animationDuration: number,
  easingFunction: string,
  fontFamily: string,
}



function reroll (newSeed?:string) {
  const seed = newSeed || colorNameList[Math.floor(Math.random() * colorNameList.length)].name;
  const rand = Rand.create(seed);
  const colors = shuffle(brandColorsRGBA, rand.random);
  /*const colorsAsHex = colors.map((color) => formatHex({
    mode: 'oklch', l: color[0]/100, c: color[1], h: color[2]
  }));*/
  const colorsAsRGBA = colors.map((color) => {
    const [ r, g, b, a ] = color;
    return {r, g, b, a}
  });

  const SETTINGS:Settings = {
    seed,
    innerPointRadius: 15,
    rings: 2,
    ringStrokeWidth: 15,
    rotation1: rand.random(),
    rotation2: rand.random(),
    rotation3: rand.random(),
    rotationOffset1: 0,
    rotationOffset2: 0,

    strokeLength1: 0.4 + rand.random() * 0.35,
    strokeLength2: 0.4 + rand.random() * 0.3,
    
    strokeLinecap: 'round',

    outerRingColor1: colorsAsRGBA[0],
    outerRingColor2: colorsAsRGBA[1],
    innerRingColor1: colorsAsRGBA[2],
    innerRingColor2: colorsAsRGBA[3],
    innerPointColor1: colorsAsRGBA[4],

    gradientStopStart: 0.2,
    gradientStopEnd: 0.8,

    darkMode: false,

    visualDebug: false,
    animationDuration: 1000,
    easingFunction: 'easeInOutQuad',

    fontFamily: 'strawfordmedium',
  };
  return { colors, SETTINGS, rand };
}

let SETTINGS: Settings;

const pane = new Pane({
  title: 'Logo Generator Settings',
});

// check the url for settings and apply them if they exist
const url = new URL(window.location.href);
const settingsString = url.searchParams.get('settings');
if (settingsString) {
  const newSettings = JSON.parse(atob(settingsString)) as Settings;
  SETTINGS = newSettings;
  pane.importPreset(newSettings);
  drawEverything();
} else {
  SETTINGS = reroll().SETTINGS;
  drawEverything();
}

pane.on('change', () => {
  drawEverything();
});

pane.addInput(SETTINGS, 'seed').on('change', (ev) => {
  const newSettings = reroll(ev.value).SETTINGS;
  newSettings.darkMode = SETTINGS.darkMode;
  newSettings.visualDebug = SETTINGS.visualDebug;
  Object.assign(SETTINGS, newSettings);
  drawEverything();
  return false
});

pane.addInput(SETTINGS, 'innerPointRadius', {
  label: 'inner radius',
  min: 1,
  max: 100,
  step: 0.001,
});

pane.addInput(SETTINGS, 'ringStrokeWidth', {
  label: 'stroke width',
  min: 1,
  max: 100,
  step: 0.001,
});

pane.addInput(SETTINGS, 'strokeLinecap', {
  label: 'stroke linecap',
  options: {
    butt: 'butt',
    round: 'round',
    square: 'square',
  },
});

pane.addInput(SETTINGS, 'rotation1', {
  label: 'center rotation',
  min: 0,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'rotation2', {
  label: 'outer rotation',
  min: 0,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'rotation3', {
  label: 'inner rotation',
  min: 0,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'strokeLength1', {
  label: 'outer length',
  min: .01,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'strokeLength2', {
  label: 'inner length',
  min: .01,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'outerRingColor1');
pane.addInput(SETTINGS, 'outerRingColor2');
pane.addInput(SETTINGS, 'innerRingColor1');
pane.addInput(SETTINGS, 'innerRingColor2');
pane.addInput(SETTINGS, 'innerPointColor1');


pane.addInput(SETTINGS, 'gradientStopStart', {
  label: 'gradient start',
  min: 0,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'gradientStopEnd', {
  label: 'gradient end',
  min: 0,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'rotationOffset1', {
  label: 'inner offset',
  min: -1,
  max: 1,
  step: 0.001,
});


pane.addInput(SETTINGS, 'rotationOffset2', {
  label: 'outer offset',
  min: -1,
  max: 1,
  step: 0.001,
});

pane.addButton({
  title: 'Reroll',
}).on('click', () => {
  const newSettings = reroll().SETTINGS;
  newSettings.darkMode = SETTINGS.darkMode;
  newSettings.visualDebug = SETTINGS.visualDebug;
  Object.assign(SETTINGS, newSettings);
  drawEverything();
  pane.refresh();
});

pane.addSeparator();

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function drawEverything() {
  const colorArr = [
    SETTINGS.outerRingColor1, SETTINGS.outerRingColor2,
    SETTINGS.innerRingColor1, SETTINGS.innerRingColor2,
    SETTINGS.innerPointColor1,
  ];

  const colors:ColorsRGBA = colorArr.map((color) => {
    const {r, g, b, a} = color;
    return [r, g, b, a];
  });

  $logo = generateLogo({
    colors,
    innerPointRadius: SETTINGS.innerPointRadius,
    rings: SETTINGS.rings,
    ringStrokeWidth: SETTINGS.ringStrokeWidth,
    rotations: [SETTINGS.rotation1, SETTINGS.rotation2, SETTINGS.rotation3],
    rotationOffsets: [SETTINGS.rotationOffset1, SETTINGS.rotationOffset2],
    strokeLengths: [SETTINGS.strokeLength1, SETTINGS.strokeLength2],
    gradientStops: [SETTINGS.gradientStopStart, SETTINGS.gradientStopEnd],
    strokeLinecap: SETTINGS.strokeLinecap as StrokeLinecap,
  });

  $logo.setAttribute('id', 'logo');

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <h1>Logo Master</h1>
      <a href="${svgToDataUri($logo.outerHTML)}" download="internet-identity-logo.svg"> 
        <div class="logo logo--main">${$logo.outerHTML}</div>
      </a>
      <div class="logo logo--line">
        <h2>Logo Inline</h2>
        <svg viewBox="0 0 2000 300">
          <use href="#logo" x="0" y="0" width="300" height="300" />
          <text x="400" y="220" font-size="200" font-family="${SETTINGS.fontFamily}" fill="currentColor">internet identity</text>
        </svg>
      </div>
      <div class="logo logo--stacked">
        <h2>Logo Stacked</h2>
        <svg viewBox="0 0 300 500">
          <use href="#logo" x="50" y="80" width="200" height="200" />
          <text x="150" y="330" font-size="38" font-family="${SETTINGS.fontFamily}" dominant-baseline="middle" text-anchor="middle" fill="currentColor">internet identity</text>
        </svg>
      </div>
    </div>
  `;

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    updateFavicon($logo as SVGElement);
    updateSettings();
  }, 500);
}

type SvgInHtml = HTMLElement & SVGElement;

function animateRotations() {
  if ($logo === null) return;

  const currentRotations = [SETTINGS.rotation1, SETTINGS.rotation2, SETTINGS.rotation3];

  const $layers:SvgInHtml[] = Array.from(document.querySelectorAll('svg [data-layer]'));
  
  const $layer11 = $layers[0];
  const $layer21 = $layers[1];
  const $layer3 = $layers[2];
  const $layer12 = $layers[4];
  const $layer22 = $layers[3];

  const currentRotationsObject = {
    rotation1: currentRotations[0],
    rotation2: currentRotations[1],
    rotation3: currentRotations[2], 
  };

  anime({
    targets: currentRotationsObject,
    rotation1: Math.random() * 2,
    rotation2: Math.random() * 2,
    rotation3: Math.random() * 2,
    easing: SETTINGS.easingFunction,
    duration: SETTINGS.animationDuration,
    update: () => {
      $layer11.style.setProperty('--rotation', `${currentRotationsObject.rotation1}`);
      $layer21.style.setProperty('--rotation', `${currentRotationsObject.rotation2}`);
      $layer3.style.setProperty('--rotation', `${currentRotationsObject.rotation3}`);
      $layer12.style.setProperty('--rotation', `${currentRotationsObject.rotation1}`);
      $layer22.style.setProperty('--rotation', `${currentRotationsObject.rotation2}`);
    },
    complete: () => {
      SETTINGS.rotation1 = currentRotationsObject.rotation1 % 1;
      SETTINGS.rotation2 = currentRotationsObject.rotation2 % 1;
      SETTINGS.rotation3 = currentRotationsObject.rotation3 % 1;
      //pane.refresh();
    }
  }) 
}

pane.addInput(SETTINGS, 'animationDuration', {
  label: 'animation duration',
  min: 100,
  max: 5000,
  step: 1,
});

pane.addInput(SETTINGS, 'easingFunction', {
  label: 'easing function',
  options: {
    'easeInQuad': 'easeInQuad',
    'easeInCubic': 'easeInCubic',
    'easeInQuart': 'easeInQuart',
    'easeInQuint': 'easeInQuint',
    'easeInSine': 'easeInSine',
    'easeInExpo': 'easeInExpo',
    'easeInCirc': 'easeInCirc',
    'easeInBack': 'easeInBack',
    'easeInElastic': 'easeInElastic',
    'easeOutQuad': 'easeOutQuad',
    'easeOutCubic': 'easeOutCubic',
    'easeOutQuart': 'easeOutQuart',
    'easeOutQuint': 'easeOutQuint',
    'easeOutSine': 'easeOutSine',
    'easeOutExpo': 'easeOutExpo',
    'easeOutCirc': 'easeOutCirc',
    'easeOutBack': 'easeOutBack',
    'easeOutElastic': 'easeOutElastic',
    'easeInOutQuad': 'easeInOutQuad',
    'easeInOutCubic': 'easeInOutCubic',
    'easeInOutQuart': 'easeInOutQuart',
    'easeInOutQuint': 'easeInOutQuint',
    'easeInOutSine': 'easeInOutSine',
    'easeInOutExpo': 'easeInOutExpo',
    'easeInOutCirc': 'easeInOutCirc',
    'easeInOutBack': 'easeInOutBack',
    'easeInOutElastic': 'easeInOutElastic',
    'linear': 'linear',
  },
});

pane.addButton({
  title: 'Animate',
}).on('click', () => {
  animateRotations();
});

pane.addSeparator();

pane.addInput(SETTINGS, 'fontFamily', {
  label: 'font family',
  options: {
    'strawfordblack': 'strawfordblack',
    'strawfordbold': 'strawfordbold',
    'strawfordextralight': 'strawfordextralight',
    'strawfordlight': 'strawfordlight',
    'strawfordmedium': 'strawfordmedium',
    'strawfordregular': 'strawfordregular',
    'strawfordthin': 'strawfordthin',
  },
});

pane.addInput(SETTINGS, 'darkMode').on('change', () => {
  document.body.classList.toggle('is-dark', SETTINGS.darkMode);
});

pane.addInput(SETTINGS, 'visualDebug').on('change', () => {
  document.body.classList.toggle('visual-debug', SETTINGS.visualDebug);
});

function updateSettings() {
  const currentPreset = pane.exportPreset();

  // change the url to reflect the current settings
  const url = new URL(window.location.href);
  url.searchParams.set('settings', btoa(JSON.stringify(currentPreset)));
  window.history.replaceState({}, '', url.toString());
}

// restore last settings on command+z
document.addEventListener('keydown', (e) => {
  if (e.metaKey && e.key === 'z') {
    window.history.back();
  }
});