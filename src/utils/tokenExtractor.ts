interface TokenValue {
  $type?: string
  $value: string | number
}

function convertRefToCSSVar(ref: string): string {
  const cleanRef = ref.replace(/[{}]/g, '')
  const parts = cleanRef.split('.')
  return `var(--pa-${parts.join('-')})`
}

function traverseTokens(
  obj: any,
  prefix: string[] = [],
  result: string[] = []
): string[] {
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$type') continue

    const currentPath = [...prefix, key]

    if (value && typeof value === 'object' && '$value' in value) {
      const tokenValue = value as TokenValue
      const cssVarName = `--pa-${currentPath.join('-')}`
      
      let cssValue: string
      if (typeof tokenValue.$value === 'string' && tokenValue.$value.startsWith('{')) {
        cssValue = convertRefToCSSVar(tokenValue.$value)
      } else {
        cssValue = String(tokenValue.$value)
      }
      
      result.push(`  ${cssVarName}: ${cssValue};`)
    } else if (value && typeof value === 'object' && !('$type' in value)) {
      traverseTokens(value, currentPath, result)
    }
  }

  return result
}

const tokenImports: Record<string, () => Promise<any>> = {
  'pabutton': () => import('../tokens/tier3-component/button.json'),
  'painput': () => import('../tokens/tier3-component/input.json'),
  'pacheckbox': () => import('../tokens/tier3-component/checkbox.json'),
  'paradio': () => import('../tokens/tier3-component/radio.json'),
  'paradiobuttongroup': () => import('../tokens/tier3-component/radio.json'),
  'patoggleswitch': () => import('../tokens/tier3-component/toggle-switch.json'),
  'paselect': () => import('../tokens/tier3-component/select.json'),
  'patextarea': () => import('../tokens/tier3-component/textarea.json'),
  'paautocomplete': () => import('../tokens/tier3-component/autocomplete.json'),
  'patimepicker': () => import('../tokens/tier3-component/time-picker.json'),
  'pafileuploader': () => import('../tokens/tier3-component/input.json'),
  'paform': () => import('../tokens/tier3-component/input.json'),
  'pacard': () => import('../tokens/tier3-component/card.json'),
  'paheader': () => import('../tokens/tier3-component/header.json'),
  'palistitem': () => import('../tokens/tier3-component/list-item.json'),
  'papagelayout': () => import('../tokens/tier3-component/container.json'),
  'pacontentseparator': () => import('../tokens/tier3-component/container.json'),
  'pacontainer': () => import('../tokens/tier3-component/container.json'),
  'paformcontainer': () => import('../tokens/tier3-component/form-container.json'),
  'pasectioncontainer': () => import('../tokens/tier3-component/section-container.json'),
  'padropdown': () => import('../tokens/tier3-component/dropdown.json'),
  'pasegmentedcontrol': () => import('../tokens/tier3-component/segmented-control.json'),
  'patogglesegmentation': () => import('../tokens/tier3-component/segmented-control.json'),
  'patogglechip': () => import('../tokens/tier3-component/toggle-chip.json'),
  'pakebabmenu': () => import('../tokens/tier3-component/dropdown.json'),
  'patabs': () => import('../tokens/tier3-component/tabs.json'),
  'pabreadcrumbs': () => import('../tokens/tier3-component/breadcrumbs.json'),
  'pastepper': () => import('../tokens/tier3-component/stepper.json'),
  'padrawer': () => import('../tokens/tier3-component/drawer.json'),
  'pamodal': () => import('../tokens/tier3-component/modal.json'),
  'patooltip': () => import('../tokens/tier3-component/tooltip.json'),
  'pabadge': () => import('../tokens/tier3-component/badge.json'),
  'painlinemessage': () => import('../tokens/tier3-component/inline-message.json'),
  'paloading': () => import('../tokens/tier3-component/loading.json'),
  'paemptystate': () => import('../tokens/tier3-component/empty-state.json'),
  'paprogress': () => import('../tokens/tier3-component/progress.json'),
  'patable': () => import('../tokens/tier3-component/table.json'),
  'paaccordion': () => import('../tokens/tier3-component/accordion.json'),
  'papagination': () => import('../tokens/tier3-component/pagination.json'),
  'paslider': () => import('../tokens/tier3-component/slider.json'),
  'parangeslider': () => import('../tokens/tier3-component/slider.json')
}

const componentNameMap: Record<string, string> = {
  'pabutton': 'button',
  'painput': 'input',
  'pacheckbox': 'checkbox',
  'paradio': 'radio',
  'paradiobuttongroup': 'radio',
  'patoggleswitch': 'toggle-switch',
  'paselect': 'select',
  'patextarea': 'textarea',
  'paautocomplete': 'autocomplete',
  'patimepicker': 'time-picker',
  'pafileuploader': 'input',
  'paform': 'input',
  'pacard': 'card',
  'paheader': 'header',
  'palistitem': 'list-item',
  'papagelayout': 'container',
  'pacontentseparator': 'container',
  'pacontainer': 'container',
  'paformcontainer': 'form-container',
  'pasectioncontainer': 'section-container',
  'padropdown': 'dropdown',
  'pasegmentedcontrol': 'segmented-control',
  'patogglesegmentation': 'segmented-control',
  'patogglechip': 'toggle-chip',
  'pakebabmenu': 'dropdown',
  'patabs': 'tabs',
  'pabreadcrumbs': 'breadcrumbs',
  'pastepper': 'stepper',
  'padrawer': 'drawer',
  'pamodal': 'modal',
  'patooltip': 'tooltip',
  'pabadge': 'badge',
  'painlinemessage': 'inline-message',
  'paloading': 'loading',
  'paemptystate': 'empty-state',
  'paprogress': 'progress',
  'patable': 'table',
  'paaccordion': 'accordion',
  'papagination': 'pagination',
  'paslider': 'slider',
  'parangeslider': 'slider'
}

export async function getComponentTokens(componentId: string): Promise<string> {
  const tokenImport = tokenImports[componentId.toLowerCase()]
  const componentName = componentNameMap[componentId.toLowerCase()] || componentId.replace(/^pa/, '').toLowerCase()
  
  if (!tokenImport) {
    return `:root {\n  /* No tokens found for ${componentId} */\n}`
  }

  try {
    const tokenModule = await tokenImport()
    const tokenFile = tokenModule.default || tokenModule
    const componentTokens = tokenFile[componentName] || tokenFile
    
    if (!componentTokens) {
      return `:root {\n  /* No tokens found for ${componentId} */\n}`
    }

    const cssVars = traverseTokens(componentTokens, [componentName])
    
    if (cssVars.length === 0) {
      return `:root {\n  /* No tokens found for ${componentId} */\n}`
    }

    return `:root {\n${cssVars.join('\n')}\n}`
  } catch (error) {
    console.warn(`Failed to load tokens for ${componentId}:`, error)
    return `:root {\n  /* Failed to load tokens for ${componentId} */\n}`
  }
}

