# Missing Tokens for Component Library

This document lists tokens that need to be added to Tier 1 (Core) or Tier 2 (Semantic) to support all components in the Storybook.

## Tier 1 (Core) - Missing Tokens

### Cursor Tokens
**Status:** Missing
**Needed for:** All interactive components (buttons, inputs, checkboxes, etc.)
**Suggested structure:**
```json
{
  "cursor": {
    "pointer": { "$type": "string", "$value": "pointer" },
    "not-allowed": { "$type": "string", "$value": "not-allowed" },
    "default": { "$type": "string", "$value": "default" },
    "text": { "$type": "string", "$value": "text" },
    "grab": { "$type": "string", "$value": "grab" },
    "grabbing": { "$type": "string", "$value": "grabbing" },
    "move": { "$type": "string", "$value": "move" },
    "wait": { "$type": "string", "$value": "wait" }
  }
}
```

### Icon Size Tokens
**Status:** Missing (may exist as `icon.size.*` - need to verify)
**Needed for:** Icons in buttons, inputs, badges, etc.
**Suggested structure:**
```json
{
  "icon": {
    "size": {
      "xs": { "$type": "dimension", "$value": "12px" },
      "sm": { "$type": "dimension", "$value": "16px" },
      "md": { "$type": "dimension", "$value": "20px" },
      "lg": { "$type": "dimension", "$value": "24px" },
      "xl": { "$type": "dimension", "$value": "32px" }
    }
  }
}
```

### Gap/Grid Tokens
**Status:** May exist in spacing - need to verify
**Needed for:** Flexbox gaps, grid gaps, component spacing
**Note:** Can use spacing tokens, but semantic gap tokens might be useful

### Animation/Keyframe Tokens
**Status:** Missing
**Needed for:** Loading spinners, transitions, animations
**Suggested structure:**
```json
{
  "animation": {
    "duration": {
      "fast": { "$type": "duration", "$value": "150ms" },
      "default": { "$type": "duration", "$value": "300ms" },
      "slow": { "$type": "duration", "$value": "500ms" }
    },
    "easing": {
      "default": { "$type": "string", "$value": "ease-in-out" },
      "bounce": { "$type": "string", "$value": "cubic-bezier(0.68, -0.55, 0.265, 1.55)" }
    }
  }
}
```

## Tier 2 (Semantic) - Missing Tokens

### Input/Form Semantic Tokens
**Status:** Missing
**Needed for:** PaInput, PaForm, PaTextarea, PaSelect
**Suggested structure:**
```json
{
  "color": {
    "input": {
      "background": {
        "default": { "$value": "{surface.container.background}" },
        "hover": { "$value": "{surface.container.hover.background}" },
        "focus": { "$value": "{surface.container.active.background}" },
        "disabled": { "$value": "{surface.cards.disable.background}" }
      },
      "text": {
        "default": { "$value": "{text.primary}" },
        "placeholder": { "$value": "{text.muted}" },
        "disabled": { "$value": "{text.disabled}" }
      },
      "border": {
        "default": { "$value": "{surface.container.border}" },
        "hover": { "$value": "{color.action.primary.border.dafault}" },
        "focus": { "$value": "{color.action.primary.border.focus}" },
        "error": { "$value": "{color.status.error.border.dafault}" },
        "disabled": { "$value": "{surface.cards.disable.border}" }
      },
      "icon": {
        "default": { "$value": "{icon.default}" },
        "error": { "$value": "{color.status.error.text.default}" },
        "success": { "$value": "{color.status.success.text.default}" }
      }
    }
  }
}
```

### Checkbox/Radio Semantic Tokens
**Status:** Missing
**Needed for:** PaCheckbox, PaRadio, PaRadioButtonGroup
**Suggested structure:**
```json
{
  "color": {
    "checkbox": {
      "background": {
        "default": { "$value": "{gray.white}" },
        "checked": { "$value": "{color.action.primary.background.default}" },
        "hover": { "$value": "{color.action.primary.background.hover}" },
        "disabled": { "$value": "{gray.400}" }
      },
      "border": {
        "default": { "$value": "{gray.400}" },
        "checked": { "$value": "{color.action.primary.border.dafault}" },
        "focus": { "$value": "{color.action.primary.border.focus}" },
        "disabled": { "$value": "{gray.600}" }
      },
      "checkmark": {
        "default": { "$value": "{color.action.primary.text.default}" },
        "disabled": { "$value": "{gray.700}" }
      }
    },
    "radio": {
      // Similar structure to checkbox
    }
  }
}
```

### Toggle/Switch Semantic Tokens
**Status:** Missing
**Needed for:** PaToggleSwitch, PaToggleSegmentation, PaToggleChip
**Suggested structure:**
```json
{
  "color": {
    "toggle": {
      "background": {
        "off": { "$value": "{gray.400}" },
        "on": { "$value": "{color.action.primary.background.default}" },
        "disabled": { "$value": "{gray.500}" }
      },
      "thumb": {
        "off": { "$value": "{gray.white}" },
        "on": { "$value": "{gray.white}" },
        "disabled": { "$value": "{gray.300}" }
      },
      "border": {
        "focus": { "$value": "{color.action.primary.border.focus}" }
      }
    }
  }
}
```

### Modal/Dialog Semantic Tokens
**Status:** Missing
**Needed for:** PaModal
**Suggested structure:**
```json
{
  "color": {
    "modal": {
      "overlay": {
        "background": { "$value": "rgba(0, 0, 0, 0.5)" }
      },
      "container": {
        "background": { "$value": "{surface.container.background}" },
        "border": { "$value": "{surface.container.border}" }
      },
      "header": {
        "background": { "$value": "{surface.base.background}" },
        "text": { "$value": "{text.primary}" }
      },
      "footer": {
        "background": { "$value": "{surface.base.background}" },
        "border": { "$value": "{surface.base.divider}" }
      }
    }
  }
}
```

### Tooltip Semantic Tokens
**Status:** Missing
**Needed for:** PaTooltip
**Suggested structure:**
```json
{
  "color": {
    "tooltip": {
      "background": { "$value": "{gray.900}" },
      "text": { "$value": "{gray.white}" },
      "arrow": { "$value": "{gray.900}" }
    }
  }
}
```

### Badge Semantic Tokens
**Status:** Missing
**Needed for:** PaBadge
**Suggested structure:**
```json
{
  "color": {
    "badge": {
      "background": {
        "default": { "$value": "{color.status.info.background.default}" },
        "success": { "$value": "{color.status.success.background.default}" },
        "warning": { "$value": "{color.status.warning.background.default}" },
        "error": { "$value": "{color.status.error.background.default}" }
      },
      "text": {
        "default": { "$value": "{color.status.info.text.default}" },
        "success": { "$value": "{color.status.success.text.default}" },
        "warning": { "$value": "{color.status.warning.text.default}" },
        "error": { "$value": "{color.status.error.text.default}" }
      }
    }
  }
}
```

### Table Semantic Tokens
**Status:** Missing
**Needed for:** PaTable
**Suggested structure:**
```json
{
  "color": {
    "table": {
      "header": {
        "background": { "$value": "{surface.container.background}" },
        "text": { "$value": "{text.primary}" },
        "border": { "$value": "{surface.container.border}" }
      },
      "row": {
        "background": {
          "default": { "$value": "{surface.base.background}" },
          "hover": { "$value": "{surface.cards.hover.background}" },
          "selected": { "$value": "{surface.cards.selected.background}" },
          "striped": { "$value": "{surface.container.background}" }
        },
        "border": { "$value": "{surface.base.divider}" }
      },
      "cell": {
        "text": { "$value": "{text.primary}" },
        "border": { "$value": "{surface.base.divider}" }
      }
    }
  }
}
```

### Accordion Semantic Tokens
**Status:** Missing
**Needed for:** PaAccordion
**Suggested structure:**
```json
{
  "color": {
    "accordion": {
      "header": {
        "background": {
          "default": { "$value": "{surface.base.background}" },
          "hover": { "$value": "{surface.cards.hover.background}" }
        },
        "text": { "$value": "{text.primary}" },
        "border": { "$value": "{surface.base.border}" }
      },
      "content": {
        "background": { "$value": "{surface.container.background}" },
        "text": { "$value": "{text.primary}" }
      },
      "icon": { "$value": "{icon.default}" }
    }
  }
}
```

### Card Semantic Tokens
**Status:** Partially exists (`surface.cards.*`)
**Needed for:** PaCard
**Note:** May already have most tokens in `surface.cards.*`, but verify completeness

### List Item Semantic Tokens
**Status:** Missing
**Needed for:** PaListItem
**Suggested structure:**
```json
{
  "color": {
    "list-item": {
      "background": {
        "default": { "$value": "{surface.base.background}" },
        "hover": { "$value": "{surface.cards.hover.background}" },
        "selected": { "$value": "{surface.cards.selected.background}" }
      },
      "text": { "$value": "{text.primary}" },
      "border": { "$value": "{surface.base.divider}" }
    }
  }
}
```

### Dropdown/Select Semantic Tokens
**Status:** Missing
**Needed for:** PaDropdown, PaSelect
**Suggested structure:**
```json
{
  "color": {
    "dropdown": {
      "menu": {
        "background": { "$value": "{surface.container.background}" },
        "border": { "$value": "{surface.container.border}" }
      },
      "item": {
        "background": {
          "default": { "$value": "transparent" },
          "hover": { "$value": "{surface.cards.hover.background}" },
          "selected": { "$value": "{surface.cards.selected.background}" }
        },
        "text": { "$value": "{text.primary}" }
      }
    }
  }
}
```

### Slider/Range Semantic Tokens
**Status:** Missing
**Needed for:** PaSlider, PaRangeSlider
**Suggested structure:**
```json
{
  "color": {
    "slider": {
      "track": {
        "background": { "$value": "{gray.300}" },
        "filled": { "$value": "{color.action.primary.background.default}" }
      },
      "thumb": {
        "background": { "$value": "{gray.white}" },
        "border": { "$value": "{color.action.primary.border.dafault}" },
        "hover": { "$value": "{color.action.primary.background.hover}" }
      },
      "mark": {
        "background": { "$value": "{gray.500}" }
      }
    }
  }
}
```

### Loading/Spinner Semantic Tokens
**Status:** Missing
**Needed for:** PaLoading
**Suggested structure:**
```json
{
  "color": {
    "loading": {
      "spinner": {
        "primary": { "$value": "{color.action.primary.background.default}" },
        "secondary": { "$value": "{color.action.secondary.background.default}" }
      }
    }
  }
}
```

### Pagination Semantic Tokens
**Status:** Missing
**Needed for:** PaPagination
**Suggested structure:**
```json
{
  "color": {
    "pagination": {
      "item": {
        "background": {
          "default": { "$value": "{surface.base.background}" },
          "hover": { "$value": "{surface.cards.hover.background}" },
          "active": { "$value": "{color.action.primary.background.default}" }
        },
        "text": {
          "default": { "$value": "{text.primary}" },
          "active": { "$value": "{color.action.primary.text.default}" }
        },
        "border": { "$value": "{surface.container.border}" }
      }
    }
  }
}
```

### Inline Message Semantic Tokens
**Status:** Missing
**Needed for:** PaInlineMessage
**Suggested structure:**
```json
{
  "color": {
    "message": {
      "background": {
        "info": { "$value": "{color.status.info.background.default}" },
        "success": { "$value": "{color.status.success.background.default}" },
        "warning": { "$value": "{color.status.warning.background.default}" },
        "error": { "$value": "{color.status.error.background.default}" }
      },
      "text": {
        "info": { "$value": "{color.status.info.text.default}" },
        "success": { "$value": "{color.status.success.text.default}" },
        "warning": { "$value": "{color.status.warning.text.default}" },
        "error": { "$value": "{color.status.error.text.default}" }
      },
      "border": {
        "info": { "$value": "{color.status.info.border.dafault}" },
        "success": { "$value": "{color.status.success.border.dafault}" },
        "warning": { "$value": "{color.status.warning.border.dafault}" },
        "error": { "$value": "{color.status.error.border.dafault}" }
      },
      "icon": {
        "info": { "$value": "{color.status.info.text.default}" },
        "success": { "$value": "{color.status.success.text.default}" },
        "warning": { "$value": "{color.status.warning.text.default}" },
        "error": { "$value": "{color.status.error.text.default}" }
      }
    }
  }
}
```

### Empty State Semantic Tokens
**Status:** Missing
**Needed for:** PaEmptyState
**Suggested structure:**
```json
{
  "color": {
    "empty-state": {
      "icon": { "$value": "{icon.muted}" },
      "text": {
        "primary": { "$value": "{text.primary}" },
        "secondary": { "$value": "{text.muted}" }
      }
    }
  }
}
```

### Content Separator Semantic Tokens
**Status:** Missing
**Needed for:** PaContentSeparator
**Suggested structure:**
```json
{
  "color": {
    "separator": {
      "border": { "$value": "{surface.base.divider}" }
    }
  }
}
```

### Header Semantic Tokens
**Status:** Missing
**Needed for:** PaHeader
**Suggested structure:**
```json
{
  "color": {
    "header": {
      "background": { "$value": "{surface.container.background}" },
      "text": { "$value": "{text.primary}" },
      "border": { "$value": "{surface.container.border}" }
    }
  }
}
```

### Kebab Menu Semantic Tokens
**Status:** Missing
**Needed for:** PaKebabMenu
**Note:** Can reuse dropdown tokens

### Segmented Control Semantic Tokens
**Status:** Missing
**Needed for:** PaSegmentedControl
**Suggested structure:**
```json
{
  "color": {
    "segmented-control": {
      "background": { "$value": "{surface.container.background}" },
      "item": {
        "background": {
          "default": { "$value": "transparent" },
          "selected": { "$value": "{color.action.primary.background.default}" }
        },
        "text": {
          "default": { "$value": "{text.primary}" },
          "selected": { "$value": "{color.action.primary.text.default}" }
        },
        "border": { "$value": "{surface.container.border}" }
      }
    }
  }
}
```

## Summary

### High Priority (Core Components)
1. ✅ Cursor tokens (Tier 1)
2. ✅ Input/Form semantic tokens (Tier 2)
3. ✅ Checkbox/Radio semantic tokens (Tier 2)
4. ✅ Toggle/Switch semantic tokens (Tier 2)

### Medium Priority (Common Components)
5. ✅ Modal semantic tokens (Tier 2)
6. ✅ Tooltip semantic tokens (Tier 2)
7. ✅ Badge semantic tokens (Tier 2)
8. ✅ Dropdown semantic tokens (Tier 2)

### Lower Priority (Complex Components)
9. ✅ Table semantic tokens (Tier 2)
10. ✅ Accordion semantic tokens (Tier 2)
11. ✅ Slider semantic tokens (Tier 2)
12. ✅ Pagination semantic tokens (Tier 2)

### Verify Existing
- Icon size tokens (may exist)
- Card tokens (may exist in `surface.cards.*`)
- Text tokens (may exist)
- Icon color tokens (may exist)

## Next Steps

1. Review existing semantic tokens to avoid duplication
2. Add missing Tier 1 tokens (cursor, icon sizes if missing)
3. Add missing Tier 2 semantic tokens for each component category
4. Update build script if needed
5. Test token generation

