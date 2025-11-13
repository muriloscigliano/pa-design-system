const fs = require('fs');
const path = require('path');

function extractComponentSource(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
    
    if (!scriptMatch || !templateMatch) return null;
    
    const script = scriptMatch[0];
    const template = templateMatch[0];
    
    return script + '\n\n' + template;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

const componentsDir = 'src/components';
const components = fs.readdirSync(componentsDir)
  .filter(f => f.startsWith('Pa') && fs.statSync(path.join(componentsDir, f)).isDirectory())
  .sort();

const result = {};
const existing = ['pabutton', 'painput', 'pacheckbox', 'paradio', 'pacard', 'pabadge', 'paradiobuttongroup', 'patoggleswitch', 'paselect', 'patextarea', 'paautocomplete', 'patimepicker', 'pafileuploader', 'paform'];

components.forEach(comp => {
  const componentId = comp.toLowerCase();
  if (existing.includes(componentId)) {
    console.log(`Skipping ${comp} (already added)`);
    return;
  }
  
  const vueFile = path.join(componentsDir, comp, comp + '.vue');
  if (fs.existsSync(vueFile)) {
    const source = extractComponentSource(vueFile);
    if (source) {
      result[componentId] = source.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      console.log(`✓ Extracted ${comp}`);
    } else {
      console.log(`✗ Failed to extract ${comp}`);
    }
  } else {
    console.log(`✗ File not found: ${vueFile}`);
  }
});

console.log('\n=== EXTRACTED COMPONENTS ===');
console.log(JSON.stringify(result, null, 2).substring(0, 5000));
console.log(`\nTotal: ${Object.keys(result).length} components`);

