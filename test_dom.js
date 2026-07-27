const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf-8');
const script = fs.readFileSync('js/script.js', 'utf-8');

const dom = new JSDOM(html, { runScripts: 'dangerously' });
try {
  dom.window.eval(script);
  console.log(dom.window.document.getElementById('phoneGrid').innerHTML.substring(0, 1500));
} catch (e) {
  console.error("CATCH ERROR:", e);
}
