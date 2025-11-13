import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const docsDir = path.join(rootDir, 'src/views')
const files = fs.readdirSync(docsDir)
  .filter(file => file.endsWith('Docs.vue'))
  .filter(file => !['PaButtonDocs.vue', 'PaInputDocs.vue', 'PaCheckboxDocs.vue'].includes(file))

files.forEach(file => {
  const filePath = path.join(docsDir, file)
  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Extract component ID from filename (e.g., PaCheckboxDocs.vue -> pacheckbox)
  const componentId = file
    .replace('Docs.vue', '')
    .replace(/^Pa/, 'pa')
    .replace(/([A-Z])/g, (match, p1, offset) => offset > 0 ? match.toLowerCase() : match.toLowerCase())
  
  // Add import if not present
  if (!content.includes('getComponentStyleSource')) {
    content = content.replace(
      /import { getComponentTokens } from '\.\.\/utils\/tokenExtractor'/,
      `import { getComponentTokens } from '../utils/tokenExtractor'\nimport { getComponentStyleSource } from '../config/componentStyleSource'`
    )
  }
  
  // Add Style Source section before Token Source section
  const tokenSourcePattern = /(\s*)<!-- Token Source Section -->/
  const styleSourceSection = `$1<!-- Style Source Section -->
$1<div class="documentation-section">
$1  <h3 class="documentation-section-title">Style Source</h3>
$1  <p class="documentation-section-description">
$1    The complete SCSS styles for the ${file.replace('Docs.vue', '')} component.
$1  </p>
$1  <CodeBlock 
$1    :code="getComponentStyleSource('${componentId}')"
$1    copy-key="${componentId}-style-source"
$1    :show-line-numbers="true"
$1    language="scss"
$1  />
$1</div>
$1
$1`
  
  if (!content.includes('Style Source Section')) {
    content = content.replace(tokenSourcePattern, styleSourceSection)
  }
  
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`Updated ${file}`)
})

console.log(`\nUpdated ${files.length} documentation files.`)

