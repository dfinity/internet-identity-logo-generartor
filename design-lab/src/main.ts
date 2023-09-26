import './style.css';
import { Pane } from 'tweakpane';
import { 
  generateLogo,
  StrokeLinecap,
} from '../../src/logo';
import {
  generator,
  shuffleArray,
  randomUniqueColorPairs,
  brandColorsAsRGBAPairs,
  brandColorsAsRGBAforCenter,
} from '../../src/generator';
import anime from 'animejs/lib/anime.es.js';
import { converter } from 'culori';
import seedrandom from 'seedrandom';
import colorNameList from 'color-name-list/dist/colornames.json';

const toRgb = converter('rgb');

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
  strokeLengthOuter: number,
  strokeLengthInner: number,
  strokeLinecap: StrokeLinecap,
  outerRingColor1: RGBAcolorObject | string,
  outerRingColor2: RGBAcolorObject | string,
  innerRingColor1: RGBAcolorObject | string,
  innerRingColor2: RGBAcolorObject | string,
  innerPointColor1: RGBAcolorObject | string,
  gradientStopStart: number,
  gradientStopEnd: number,
  darkMode: boolean,
  visualDebug: boolean,
  animationDuration: number,
  easingFunction: string,
  fontFamily: string,
  showDesignRules: boolean,
  cardBlur: number,
  cardOverlayOpacity: number,
  cardMixBlendMode: string,
}

function reroll (newSeed?:string) {
  const seed = newSeed || colorNameList[Math.floor(Math.random() * colorNameList.length)].name;
  const rand = seedrandom(seed);
  /*const colorsAsHex = colors.map((color) => formatHex({
    mode: 'oklch', l: color[0]/100, c: color[1], h: color[2]
  }));*/
  const shuffeledColorsAsRGBAPairs = randomUniqueColorPairs(brandColorsAsRGBAPairs, rand);

  const shuffeledColorsAsRGBAPairsObj = shuffeledColorsAsRGBAPairs.map((colorPair) => {
    return colorPair.map((color) => {
      const [ r, g, b, a ] = color;
      return {r, g, b, a}
    })
  });
  const centerColor = shuffleArray(brandColorsAsRGBAforCenter, rand)[0];
  const centerColorAsRGBA = {r: centerColor[0], g: centerColor[1], b: centerColor[2], a: centerColor[3]};

  let rotation = rand();
  let innserCricleLength = 0.45 + rand() * 0.30;

  const SETTINGS:Settings = {
    seed,
    innerPointRadius: 15,
    rings: 2,
    ringStrokeWidth: 15,
    rotation1: ((rotation + innserCricleLength * .5) + (-0.1 + rand() * 0.2)) % 1, // rotate inner ring
    rotation2: rotation,
    rotation3: rotation + (-0.25 + rand() * 0.5),
    rotationOffset1: 0,
    rotationOffset2: 0,
    strokeLengthOuter: 0.5 + rand() * 0.16,
    strokeLengthInner: innserCricleLength,
    
    strokeLinecap: 'round',

    outerRingColor1: shuffeledColorsAsRGBAPairsObj[0][0],
    outerRingColor2: shuffeledColorsAsRGBAPairsObj[0][1],
    innerRingColor1: shuffeledColorsAsRGBAPairsObj[1][0],
    innerRingColor2: shuffeledColorsAsRGBAPairsObj[1][1],
    innerPointColor1: centerColorAsRGBA,

    gradientStopStart: 0.25,
    gradientStopEnd: 0.75,

    darkMode: false,

    visualDebug: false,
    showDesignRules: false,

    animationDuration: 1000,
    easingFunction: 'easeInOutQuad',

    fontFamily: 'strawfordmedium',

    cardBlur: 20,
    cardOverlayOpacity: 0.35,
    cardMixBlendMode: 'color-dodge',
  };

  return { SETTINGS, rand };
}

let SETTINGS: Settings = reroll().SETTINGS;

const pane = new Pane({
  title: 'Logo Generator Settings',
});

function fixUpColor(color: string | RGBAcolorObject): RGBAcolorObject {
  if (typeof color === 'string') {
    let rgbaColor = toRgb(color);
    if (rgbaColor) {
      // multiply r g and b by 255 to get the correct values
      let newColor: RGBAcolorObject = {
        r: rgbaColor.r * 255,
        g: rgbaColor.g * 255,
        b: rgbaColor.b * 255,
        //a: rgbaColor?.a && rgbaColor?.a !== 0 || 1,
        a: 1,
      };
      return newColor;
    }
  } else {
    return color;
  }
  return {r: 1, g: 1, b: 1, a: 1};
}

// check the url for settings and apply them if they exist
function restoreSettingsFromUrl () {
  const url = new URL(window.location.href);
  const settingsString = url.searchParams.get('settings');

  if (settingsString) {
    const newSettings = JSON.parse(atob(settingsString)) as Settings;

    // extend with eventual missing settings from the default settings
    Object.assign(SETTINGS, newSettings);

    // fix up the colors
    newSettings.outerRingColor1 = fixUpColor(newSettings.outerRingColor1);
    newSettings.outerRingColor2 = fixUpColor(newSettings.outerRingColor2);
    newSettings.innerRingColor1 = fixUpColor(newSettings.innerRingColor1);
    newSettings.innerRingColor2 = fixUpColor(newSettings.innerRingColor2);
    newSettings.innerPointColor1 = fixUpColor(newSettings.innerPointColor1);

    SETTINGS = newSettings;

    pane.importPreset(newSettings);
    drawEverything();
  } else {
    SETTINGS = reroll().SETTINGS;
    drawEverything();
  }
}

restoreSettingsFromUrl();

// on hisory back or forward, restore the settings from the url
window.addEventListener('popstate', restoreSettingsFromUrl);

pane.on('change', () => {
  drawEverything();
});

pane.addInput(SETTINGS, 'seed').on('change', (ev) => {
  const newSettings = reroll(ev.value).SETTINGS;
  newSettings.darkMode = SETTINGS.darkMode;
  newSettings.visualDebug = SETTINGS.visualDebug;
  newSettings.showDesignRules = SETTINGS.showDesignRules;
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

pane.addInput(SETTINGS, 'strokeLengthOuter', {
  label: 'outer length',
  min: .01,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'strokeLengthInner', {
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
  newSettings.showDesignRules = SETTINGS.showDesignRules;
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
    SETTINGS.innerPointColor1,
    SETTINGS.outerRingColor1, SETTINGS.outerRingColor2,
    SETTINGS.innerRingColor1, SETTINGS.innerRingColor2,
  ] as RGBAcolorObject[];

  const colorPairs = [
    [colorArr[1], colorArr[2]],
    [colorArr[3], colorArr[4]],
  ] as RGBAcolorObject[][];

  const innerPointColor = colorArr[0];

  $logo = generateLogo({
    colorPairs: colorPairs.map(pair => pair.map(color => [color.r, color.g, color.b, color.a])),
    colorCenter: [innerPointColor.r, innerPointColor.g, innerPointColor.b, innerPointColor.a],
    innerPointRadius: SETTINGS.innerPointRadius,
    rings: SETTINGS.rings,
    ringStrokeWidth: SETTINGS.ringStrokeWidth,
    rotations: [SETTINGS.rotation1, SETTINGS.rotation2, SETTINGS.rotation3],
    rotationOffsets: [SETTINGS.rotationOffset1, SETTINGS.rotationOffset2],
    strokeLengths: [SETTINGS.strokeLengthOuter, SETTINGS.strokeLengthInner],
    gradientStops: [SETTINGS.gradientStopStart, SETTINGS.gradientStopEnd],
    strokeLinecap: SETTINGS.strokeLinecap as StrokeLinecap,
    showDesignRules: SETTINGS.showDesignRules,
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
      
      <div class="">
        <h2>Logo Cards</h2>
        <div class="c-card c-card--logo">
          <svg viewBox="0 0 368 200" style="--bg: transparent;">
            <defs>
              <filter id="logo-blur" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="${SETTINGS.cardBlur}" />
              </filter>
            </defs>
            <use href="#logo" x="${(368 - 900 * 1.2) / 2}" y="${(200 - 900 * 1.2) / 2}" width="900" height="900" filter="url(#logo-blur)"/>
            <use href="#logo" x="${(368 - 900 * 1.2) / 2}" y="${(200 - 900 * 1.2) / 2}" width="900" height="900" style="opacity: ${SETTINGS.cardOverlayOpacity}; mix-blend-mode: ${SETTINGS.cardMixBlendMode}"/>
          </svg>
          <strong class="c-card__anchor">
            <b>internet identity</b>
            ${Math.round( Math.random() * 1000000000)}
          </strong>
        </div>
      </div>

      <div class="logo logo--stacked">
        <h2>Logo Stacked</h2>
        <svg viewBox="0 0 300 280">
          <use href="#logo" x="50" y="0" width="200" height="200" />
          <text x="150" y="250" font-size="38" font-family="${SETTINGS.fontFamily}" dominant-baseline="middle" text-anchor="middle" fill="currentColor">internet identity</text>
        </svg>
      </div>
      <h2>Possible color pairs</h2>
      <div class="colorPairs">
        ${brandColorsAsRGBAPairs.map((pair) => {
          return `
            <div class="colorPair">
              <div class="colorPair__color" style="--color: rgba(${pair.colors[0].join()});"></div>
              <div class="colorPair__color" style="--color: rgba(${pair.colors[1].join()});"></div>
            </div>
          `;
        }).join('')}
    </div>
    <div class="logo">
      ${generateLogo( generator(SETTINGS.seed) ).outerHTML}
    </div>
  `;

  if (timer) {
    clearTimeout(timer);
  }
  timer = window.setTimeout(() => {
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

pane.addInput(SETTINGS, 'showDesignRules', {
  label: 'Design Rules',
})

pane.addInput(SETTINGS, 'darkMode').on('change', () => {
  document.body.classList.toggle('is-dark', SETTINGS.darkMode);
});

pane.addInput(SETTINGS, 'visualDebug').on('change', () => {
  document.body.classList.toggle('visual-debug', SETTINGS.visualDebug);
});


pane.addInput(SETTINGS, 'cardBlur', {
  label: 'Card blur',
  min: 0,
  max: 500,
  step: 0.001,
});

pane.addInput(SETTINGS, 'cardOverlayOpacity', {
  label: 'Card Overlay Opacity',
  min: 0,
  max: 1,
  step: 0.001,
});

pane.addInput(SETTINGS, 'cardMixBlendMode', {
  label: 'Card Mix Blend Mode',
  options: {
    'normal': 'normal',
    'multiply': 'multiply',
    'screen': 'screen',
    'overlay': 'overlay',
    'darken': 'darken',
    'lighten': 'lighten',
    'color-dodge': 'color-dodge',
    'color-burn': 'color-burn',
    'hard-light': 'hard-light',
    'soft-light': 'soft-light',
    'difference': 'difference',
    'exclusion': 'exclusion',
    'hue': 'hue',
    'saturation': 'saturation',
    'plus-lighter': 'plus-lighter',
  }
});

function updateSettings() {
  const currentPreset = pane.exportPreset();

  // change the url to reflect the current settings
  const url = new URL(window.location.href);
  url.searchParams.set('settings', btoa(JSON.stringify(currentPreset)));
  //window.history.replaceState({}, '', url.toString());
  window.history.pushState({}, '', url.toString());
}

// restore last settings on command+z
document.addEventListener('keydown', (e) => {
  if (e.metaKey && e.key === 'z') {
    window.history.back();
  }
});