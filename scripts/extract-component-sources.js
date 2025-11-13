const fs = require('fs');
const path = require('path');

function extractComponentSource(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
  
  if (!scriptMatch || !templateMatch) return null;
  
  const script = scriptMatch[0];
  const template = templateMatch[0];
  
  return script + '\n\n' + template;
}

const componentsDir = 'src/components';
const components = fs.readdirSync(componentsDir)
  .filter(f => f.startsWith('Pa') && fs.statSync(path.join(componentsDir, f)).isDirectory())
  .sort();

const result = {};
components.forEach(comp => {
  const vueFile = path.join(componentsDir, comp, comp + '.vue');
  if (fs.existsSync(vueFile)) {
    const source = extractComponentSource(vueFile);
    if (source) {
      const componentId = comp.toLowerCase();
      result[componentId] = source;
    }
  }
});

console.log(JSON.stringify(result, null, 2));

