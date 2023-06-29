import './style.css'
//import { setupCounter } from './counter.ts'
import { Pane } from 'tweakpane';
import { generateLogo, brandColorsOKLCH } from './logo.ts';

const SETTINGS = {
};


const pane = new Pane();

pane.on('change', (ev) => {

})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Internet Identity Logo Generator</h1>
    ${generateLogo({
      colors: brandColorsOKLCH,
      innerPointRadius: 20,
      rings: 2,
      ringStrokeWidth: 20,
    }).outerHTML}
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
