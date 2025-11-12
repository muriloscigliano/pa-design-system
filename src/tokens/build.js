import StyleDictionary from 'style-dictionary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Convert W3C format ($type, $value) to Style Dictionary format (type, value)
function convertW3CFormat(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(convertW3CFormat)
  }

  const converted = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$type') {
      converted.type = value
    } else if (key === '$value') {
      converted.value = value
    } else if (key === '$extensions') {
      converted.$extensions = value
    } else {
      converted[key] = convertW3CFormat(value)
    }
  }
  return converted
}

// Load and convert token files
function loadTokens(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const json = JSON.parse(content)
  return convertW3CFormat(json)
}

// Merge token objects
function mergeTokens(...tokens) {
  return tokens.reduce((acc, token) => {
    return deepMerge(acc, token)
  }, {})
}

function deepMerge(target, source) {
  const output = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key])
    } else {
      output[key] = source[key]
    }
  }
  return output
}

// Convert token reference to CSS variable name with pa- prefix
function refToCSSVar(ref) {
  const cleanRef = ref.replace(/[{}]/g, '')
  return '--pa-' + cleanRef.split('.').join('-')
}

// Custom format that preserves references as CSS variables with pa- prefix
StyleDictionary.registerFormat({
  name: 'css/variables-tiered',
  formatter: function({ dictionary, options }) {
    const selector = options.selector || ':root'
    let output = `/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n\n${selector} {\n`
    
    dictionary.allTokens.forEach(token => {
      const name = token.path.join('-')
      let value = token.value
      
      // Check if original value was a reference
      if (token.original && token.original.value && 
          typeof token.original.value === 'string' && 
          token.original.value.startsWith('{') && 
          token.original.value.endsWith('}')) {
        value = `var(${refToCSSVar(token.original.value)})`
      }
      
      output += `  --pa-${name}: ${value};\n`
    })
    
    output += '}\n'
    return output
  }
})

// Custom format for Tier 1 tokens with pa- prefix
StyleDictionary.registerFormat({
  name: 'css/variables-pa',
  formatter: function({ dictionary, options }) {
    const selector = options.selector || ':root'
    let output = `/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n\n${selector} {\n`
    
    dictionary.allTokens.forEach(token => {
      const name = token.path.join('-')
      output += `  --pa-${name}: ${token.value};\n`
    })
    
    output += '}\n'
    return output
  }
})

// Load all token files
const coreTokens = loadTokens(path.join(__dirname, 'tier1-core/core.json'))
const brandPayAdvantage = loadTokens(path.join(__dirname, 'tier1-core/brand-pay-advantage.json'))
const brandMarshalFreeman = loadTokens(path.join(__dirname, 'tier1-core/brand-marshal-freeman.json'))

const semanticLight = loadTokens(path.join(__dirname, 'tier2-semantic/pay-advantage-light.json'))
const semanticDark = loadTokens(path.join(__dirname, 'tier2-semantic/pay-advantage-dark.json'))
const semanticTypography = loadTokens(path.join(__dirname, 'tier2-semantic/typography.json'))

// Load all component tokens
const componentTokenFiles = fs.readdirSync(path.join(__dirname, 'tier3-component'))
  .filter(file => file.endsWith('.json'))
  .map(file => loadTokens(path.join(__dirname, 'tier3-component', file)))

const componentTokens = mergeTokens(...componentTokenFiles)

// Merge tier1 tokens (core + brands)
const tier1Tokens = mergeTokens(coreTokens, brandPayAdvantage, brandMarshalFreeman)

try {
  // Build Tier 1 (base tokens) - outputs raw values with pa- prefix
  const tier1Config = {
    tokens: tier1Tokens,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: __dirname + '/',
        files: [
          {
            destination: 'tier1.css',
            format: 'css/variables-pa',
            options: {
              selector: ':root'
            }
          }
        ]
      }
    }
  }
  
  const tier1SD = StyleDictionary.extend(tier1Config)
  tier1SD.buildAllPlatforms()
  
  // Build Tier 2 + Tier 3 (semantic + component tokens) - references Tier 1
  // For light theme
  const tier2LightTokens = mergeTokens(semanticLight, semanticTypography)
  const lightTier23Tokens = mergeTokens(tier2LightTokens, componentTokens)
  
  // Include Tier 1 tokens so references can be resolved, but we'll filter them out
  const lightAllTokens = mergeTokens(tier1Tokens, lightTier23Tokens)
  
  const lightConfig = {
    tokens: lightAllTokens,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: __dirname + '/',
        files: [
          {
            destination: 'tier23-light.css',
            format: 'css/variables-tiered',
            options: {
              selector: ':root'
            }
          }
        ]
      }
    }
  }
  
  // For dark theme
  const tier2DarkTokens = mergeTokens(semanticDark, semanticTypography)
  const darkTier23Tokens = mergeTokens(tier2DarkTokens, componentTokens)
  const darkAllTokens = mergeTokens(tier1Tokens, darkTier23Tokens)
  
  const darkConfig = {
    tokens: darkAllTokens,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: __dirname + '/',
        files: [
          {
            destination: 'tier23-dark.css',
            format: 'css/variables-tiered',
            options: {
              selector: '[data-theme="dark"]'
            }
          }
        ]
      }
    }
  }

  const lightSD = StyleDictionary.extend(lightConfig)
  const darkSD = StyleDictionary.extend(darkConfig)
  
  lightSD.buildAllPlatforms()
  darkSD.buildAllPlatforms()

  // Read Tier 1 CSS (base values)
  const tier1CSS = fs.readFileSync(path.join(__dirname, 'tier1.css'), 'utf-8')
  
  // Read Tier 2/3 CSS and filter out Tier 1 tokens
  let lightCSS = fs.readFileSync(path.join(__dirname, 'tier23-light.css'), 'utf-8')
  let darkCSS = fs.readFileSync(path.join(__dirname, 'tier23-dark.css'), 'utf-8')
  
  // Extract CSS variable declarations and filter
  function filterTier23CSS(css) {
    const lines = css.split('\n')
    const filtered = []
    let inRootBlock = false
    
    for (const line of lines) {
      if (line.includes(':root') || line.includes('[data-theme')) {
        inRootBlock = true
        filtered.push(line)
        continue
      }
      if (line.includes('}')) {
        inRootBlock = false
        filtered.push(line)
        continue
      }
      
      if (inRootBlock && line.trim().startsWith('--pa-')) {
        // Extract the variable name (everything before the colon)
        const varNameMatch = line.match(/^[\s]*--pa-([^:]+):/)
        if (varNameMatch) {
          const varName = varNameMatch[1]
          // Check if this is a Tier 1 token (starts with tier1 prefixes in the NAME only)
          const tier1Prefixes = ['gray-', 'blue-', 'green-', 'yellow-', 'red-', 'spacing-', 'font-', 'text-', 'line-', 'letter-', 'icon-', 'border-', 'opacity-', 'shadow-', 'z-index-', 'brand-', 'transition-', 'outline-', 'Border-']
          const isTier1 = tier1Prefixes.some(prefix => varName.startsWith(prefix))
          
          // Include Tier 2/3 tokens (pa-color-action-*, pa-color-surface-*, pa-color-status-*, pa-button-*, pa-typography-*)
          // Exclude Tier 1 tokens
          if (!isTier1) {
            filtered.push(line)
          }
        } else {
          // If we can't parse it, include it to be safe
          filtered.push(line)
        }
      } else {
        filtered.push(line)
      }
    }
    
    return filtered.join('\n')
  }
  
  lightCSS = filterTier23CSS(lightCSS)
  darkCSS = filterTier23CSS(darkCSS)
  
  // Combine: Tier 1 (base) + Tier 2/3 (semantic + component) for light theme
  // Then dark theme overrides
  const combinedCSS = tier1CSS + '\n\n' + lightCSS + '\n\n' + darkCSS
  
  fs.writeFileSync(path.join(__dirname, 'index.css'), combinedCSS)
  fs.unlinkSync(path.join(__dirname, 'tier23-light.css'))
  fs.unlinkSync(path.join(__dirname, 'tier23-dark.css'))
  fs.unlinkSync(path.join(__dirname, 'tier1.css'))
  
  console.log('✅ Tokens compiled successfully!')
} catch (error) {
  console.error('❌ Error building tokens:', error.message)
  console.error(error.stack)
  process.exit(1)
}
