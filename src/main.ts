import './style.css';
import { Pane } from 'tweakpane';
import { generateLogo, brandColorsOKLCH, shuffle } from './logo.ts';
import { formatHex, parse, converter } from 'culori';

const colors = shuffle(brandColorsOKLCH);
const colorsAsHex = colors.map((color) => formatHex({
  mode: 'oklch', l: color[0]/100, c: color[1], h: color[2]
}));

console.log(colors,colorsAsHex)

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
};

const pane = new Pane();

pane.on('change', (ev) => {
  drawEverything();
});

pane.addInput(SETTINGS, 'innerPointRadius', {
  min: 1,
  max: 100,
  step: 1,
});

pane.addInput(SETTINGS, 'ringStrokeWidth', {
  min: 1,
  max: 100,
  step: 1,
});

pane.addInput(SETTINGS, 'rotation1', {
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'rotation2', {
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'rotation3', {
  min: 0,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'strokeLength1', {
  min: .01,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'strokeLength2', {
  min: .01,
  max: 1,
  step: 0.01,
});

pane.addInput(SETTINGS, 'outerRingColor1');
pane.addInput(SETTINGS, 'outerRingColor2');
pane.addInput(SETTINGS, 'innerRingColor1');
pane.addInput(SETTINGS, 'innerRingColor2');
pane.addInput(SETTINGS, 'innerPointColor1');

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

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <h1>Internet Identity Logo Generator</h1>
      ${generateLogo({
        colors: colors,
        innerPointRadius: SETTINGS.innerPointRadius,
        rings: SETTINGS.rings,
        ringStrokeWidth: SETTINGS.ringStrokeWidth,
        rotations: [SETTINGS.rotation1, SETTINGS.rotation2, SETTINGS.rotation3],
        strokeLengths: [SETTINGS.strokeLength1, SETTINGS.strokeLength2],
      }).outerHTML}
    </div>
  `
}

drawEverything();
