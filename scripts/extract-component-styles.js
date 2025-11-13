import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const componentsDir = path.join(rootDir, 'src/components')
const outputFile = path.join(rootDir, 'src/config/componentStyleSource.ts')

// Component ID mapping (component folder name -> component ID)
const componentIdMap = {
  'PaButton': 'pabutton',
  'PaInput': 'painput',
  'PaCheckbox': 'pacheckbox',
  'PaRadio': 'paradio',
  'PaRadioButtonGroup': 'paradiobuttongroup',
  'PaSwitch': 'paswitch',
  'PaSelect': 'paselect',
  'PaTextarea': 'patextarea',
  'PaAutocomplete': 'paautocomplete',
  'PaTimePicker': 'patimepicker',
  'PaFileUploader': 'pafileuploader',
  'PaCurrencyInput': 'pacurrencyinput',
  'PaDatePicker': 'padatepicker',
  'PaInputGroup': 'painputgroup',
  'PaPhoneNumberInputGroup': 'paphonenumberinputgroup',
  'PaCheckboxGroup': 'pacheckboxgroup',
  'PaToggleInputGroup': 'patoggleinputgroup',
  'PaOptionalGroup': 'paoptionalgroup',
  'PaForm': 'paform',
  'PaFormContainer': 'paformcontainer',
  'PaSectionContainer': 'pasectioncontainer',
  'PaFormDivider': 'paformdivider',
  'PaCard': 'pacard',
  'PaContainer': 'pacontainer',
  'PaPageLayout': 'papagelayout',
  'PaContentSeparator': 'pacontentseparator',
  'PaHeader': 'paheader',
  'PaListItem': 'palistitem',
  'PaPageDivider': 'papagedivider',
  'PaTextContainer': 'patextcontainer',
  'PaTextDivider': 'patextdivider',
  'PaSlottedLayout': 'paslottedlayout',
  'PaSlottedLayoutHeader': 'paslottedlayoutheader',
  'PaTabs': 'patabs',
  'PaBreadcrumbs': 'pabreadcrumbs',
  'PaStepper': 'pastepper',
  'PaDrawer': 'padrawer',
  'PaDropdown': 'padropdown',
  'PaKebabMenu': 'pakebabmenu',
  'PaNavButton': 'panavbutton',
  'PaNavButtonGroup': 'panavbuttongroup',
  'PaSegmentedControl': 'pasegmentedcontrol',
  'PaToggleSegmentation': 'patogglesegmentation',
  'PaToggleChip': 'patogglechip',
  'PaModal': 'pamodal',
  'PaTooltip': 'patooltip',
  'PaBadge': 'pabadge',
  'PaInlineMessage': 'painlinemessage',
  'PaLoading': 'paloading',
  'PaEmptyState': 'paemptystate',
  'PaProgress': 'paprogress',
  'PaTable': 'patable',
  'PaAccordion': 'paaccordion',
  'PaPagination': 'papagination',
  'PaSlider': 'paslider',
  'PaRangeSlider': 'parangeslider',
  'PaHeroHeader': 'paheroheader',
  'PaHeroIcon': 'paheroicon',
  'PaHeroSubheader': 'paherosubheader',
  'PaHeroSubheaderGroup': 'paherosubheadergroup',
  'PaCircle': 'pacircle',
  'PaSquare': 'pasquare',
  'PaDivider': 'padivider',
  'PaIcon': 'paicon',
  'PaColorPicker': 'pacolorpicker',
  'PaSheet': 'pasheet',
  'PaToggle': 'patoggle',
  'PaActionButton': 'paactionbutton',
  'PaActionButtonGroup': 'paactionbuttongroup',
  'PaActionGroup': 'paactiongroup',
  'PaButtonDropdown': 'pabuttondropdown'
}

function extractStyles(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf-8')
    
    // Extract style block
    const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/)
    if (!styleMatch) {
      return null
    }
    
    let styleContent = styleMatch[1].trim()
    
    // Remove scoped attribute if present (we'll add it back in the template)
    // Keep the lang attribute if present
    const styleTag = styleMatch[0].match(/<style[^>]*>/)[0]
    const hasLang = styleTag.includes('lang=')
    const langMatch = styleTag.match(/lang="([^"]+)"/)
    const lang = langMatch ? langMatch[1] : 'scss'
    
    // Wrap in style tag
    return `<style lang="${lang}" scoped>\n${styleContent}\n</style>`
  } catch (error) {
    console.error(`Error reading ${componentPath}:`, error.message)
    return null
  }
}

function getComponentId(folderName) {
  return componentIdMap[folderName] || folderName.toLowerCase().replace(/^pa/, 'pa')
}

const componentStyles = {}
const componentFolders = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('Pa'))
  .map(dirent => dirent.name)

console.log(`Found ${componentFolders.length} component folders`)

componentFolders.forEach(folderName => {
  const componentPath = path.join(componentsDir, folderName, `${folderName}.vue`)
  
  if (!fs.existsSync(componentPath)) {
    console.warn(`Component file not found: ${componentPath}`)
    return
  }
  
  const componentId = getComponentId(folderName)
  const styles = extractStyles(componentPath)
  
  if (styles) {
    // Escape backticks and template literals for JavaScript string
    const escapedStyles = styles
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${')
    
    componentStyles[componentId] = `\`${escapedStyles}\``
    console.log(`✓ Extracted styles for ${componentId}`)
  } else {
    console.warn(`⚠ No styles found for ${componentId}`)
  }
})

// Read existing file to preserve PaButton and PaInput if they exist
let existingContent = ''
if (fs.existsSync(outputFile)) {
  existingContent = fs.readFileSync(outputFile, 'utf-8')
}

// Generate the new file content
const fileContent = `export const componentStyleSource: Record<string, string> = {
${Object.entries(componentStyles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([id, styles]) => `  '${id}': ${styles}`)
  .join(',\n')}
}

export function getComponentStyleSource(componentId: string): string {
  return componentStyleSource[componentId] || '/* No styles available for this component */'
}
`

fs.writeFileSync(outputFile, fileContent, 'utf-8')
console.log(`\n✓ Updated ${outputFile}`)
console.log(`✓ Extracted styles for ${Object.keys(componentStyles).length} components`)

