import './style.css';
import { Pane } from 'tweakpane';
import { generateLogo, brandColorsOKLCH, shuffle } from './logo.ts';
import { formatHex, parse, converter } from 'culori';
import anime from 'animejs/lib/anime.es.js';


function reroll () {
  const colors = shuffle(brandColorsOKLCH);
  const colorsAsHex = colors.map((color) => formatHex({
    mode: 'oklch', l: color[0]/100, c: color[1], h: color[2]
  }));
  const SETTINGS = {
    innerPointRadius: 20,
    rings: 2,
    ringStrokeWidth: 20,
    rotation1: Math.random(),
    rotation2: Math.random(),
    rotation3: Math.random(),
    strokeLength1: 0.4 + Math.random() * 0.35,
    strokeLength2: 0.2 + Math.random() * 0.2,
    
    outerRingColor1: colorsAsHex[0],
    outerRingColor2: colorsAsHex[1],
    innerRingColor1: colorsAsHex[2],
    innerRingColor2: colorsAsHex[3],
    innerPointColor1: colorsAsHex[4],

    darkMode: false,

    visualDebug: false,
    animationDuration: 1000,
    easingFunction: 'easeInOutQuad',
  };
  return { colors, SETTINGS };
}

const { SETTINGS } = reroll();

const pane = new Pane();

pane.on('change', (ev) => {
  drawEverything();
});

pane.addInput(SETTINGS, 'innerPointRadius', {
  label: 'inner radius',
  min: 1,
  max: 100,
  step: 1,
});

pane.addInput(SETTINGS, 'ringStrokeWidth', {
  label: 'stroke width',
  min: 1,
  max: 100,
  step: 1,
});

pane.addInput(SETTINGS, 'rotation1', {
  label: 'center rotation',
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'rotation2', {
  label: 'outer rotation',
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'rotation3', {
  label: 'inner rotation',
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'strokeLength1', {
  label: 'outer length',
  min: .01,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'strokeLength2', {
  label: 'inner length',
  min: .01,
  max: 1,
  step: 0.01,
});


pane.addInput(SETTINGS, 'outerRingColor1');
pane.addInput(SETTINGS, 'outerRingColor2');
pane.addInput(SETTINGS, 'innerRingColor1');
pane.addInput(SETTINGS, 'innerRingColor2');
pane.addInput(SETTINGS, 'innerPointColor1');

pane.addInput(SETTINGS, 'darkMode').on('change', (ev) => {
  document.body.classList.toggle('is-dark', SETTINGS.darkMode);
});

pane.addInput(SETTINGS, 'visualDebug').on('change', (ev) => {
  document.body.classList.toggle('visual-debug', SETTINGS.visualDebug);
});

pane.addButton({
  title: 'Reroll',
}).on('click', (ev) => {
  const newSettings = reroll().SETTINGS;
  newSettings.darkMode = SETTINGS.darkMode;
  newSettings.visualDebug = SETTINGS.visualDebug;
  Object.assign(SETTINGS, newSettings);
  drawEverything();
  pane.refresh();
});
  

/*

const SETTINGS = {
  innerPointRadius: 20,
  ringStrokeWidth: 20,
  rotation1: Math.random(),
  rotation2: Math.random(),
  rotation3: Math.random(),
};
*/

const toOKlch = converter('oklch');

let $logo: SVGElement | null = null;

function drawEverything() {
  const colors = [
    SETTINGS.outerRingColor1, SETTINGS.outerRingColor2,
    SETTINGS.innerRingColor1, SETTINGS.innerRingColor2,
    SETTINGS.innerPointColor1,
  ].map((color) => {
    const c = parse(color);
    const lch = toOKlch(c);
    return [(lch?.l || 0) * 100, lch?.c || 0, lch?.h || 0];
  });

  $logo = generateLogo({
    colors,
    innerPointRadius: SETTINGS.innerPointRadius,
    rings: SETTINGS.rings,
    ringStrokeWidth: SETTINGS.ringStrokeWidth,
    rotations: [SETTINGS.rotation1, SETTINGS.rotation2, SETTINGS.rotation3],
    strokeLengths: [SETTINGS.strokeLength1, SETTINGS.strokeLength2],
  })

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <h1>Internet Identity Logo Generator</h1>
      <div class="logo logo--main">${$logo.outerHTML}</div>
    </div>
  `
}

type SvgInHtml = HTMLElement & SVGElement;

function animateRotations() {
  if ($logo === null) return;

  const currentRotations = [SETTINGS.rotation1, SETTINGS.rotation2, SETTINGS.rotation3];

  const $layers:SvgInHtml[] = Array.from(document.querySelectorAll('svg [data-layer]'));
  
  const $layer11 = $layers[0];
  const $layer21 = $layers[1];
  const $layer3 = $layers[2];
  const $layer12 = $layers[3];
  const $layer22 = $layers[4];

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

      SETTINGS.rotation1 = currentRotationsObject.rotation1 % 1;
      SETTINGS.rotation2 = currentRotationsObject.rotation2 % 1;
      SETTINGS.rotation3 = currentRotationsObject.rotation3 % 1;


        pane.refresh();
    },
    complete: () => {

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
}).on('click', (ev) => {
  animateRotations();
});


drawEverything();
