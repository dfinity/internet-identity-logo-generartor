import './style.css'
//import { setupCounter } from './counter.ts'
import { Pane } from 'tweakpane';
import { generateLogo } from './logo.ts';

const pane = new Pane();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Generative Logo</h1>
    ${generateLogo()}
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
