# Design Token Structure Recommendations: Multi-Value Properties (Padding, Margin, Spacing)

## Current Implementation

Currently, padding tokens are structured as:
```json
{
  "button": {
    "size": {
      "sm": {
        "padding": {
          "x": { "$value": "{spacing.12}" },
          "y": { "$value": "{spacing.4}" }
        }
      }
    }
  }
}
```

This generates CSS variables:
- `--pa-button-size-sm-padding-x`
- `--pa-button-size-sm-padding-y`

Used in CSS as:
```css
padding: var(--pa-button-size-sm-padding-y) var(--pa-button-size-sm-padding-x);
```

## Best Practices Analysis

### Option 1: Separate X/Y Tokens (Current Approach) ✅ **RECOMMENDED**

**Structure:**
```json
{
  "padding": {
    "x": { "$value": "{spacing.12}" },
    "y": { "$value": "{spacing.4}" }
  }
}
```

**Pros:**
- ✅ Flexible - can use x and y independently
- ✅ Matches CSS shorthand: `padding: y x;`
- ✅ Clear and explicit
- ✅ Works well with CSS logical properties (`padding-block`, `padding-inline`)
- ✅ Easy to override individual directions
- ✅ Style Dictionary handles this naturally

**Cons:**
- ⚠️ Requires two tokens per padding definition
- ⚠️ Slightly more verbose in CSS

**CSS Usage:**
```css
/* Standard */
padding: var(--pa-button-size-sm-padding-y) var(--pa-button-size-sm-padding-x);

/* Logical properties (RTL-aware) */
padding-block: var(--pa-button-size-sm-padding-y);
padding-inline: var(--pa-button-size-sm-padding-x);
```

### Option 2: Individual Side Tokens (Top, Right, Bottom, Left)

**Structure:**
```json
{
  "padding": {
    "top": { "$value": "{spacing.4}" },
    "right": { "$value": "{spacing.12}" },
    "bottom": { "$value": "{spacing.4}" },
    "left": { "$value": "{spacing.12}" }
  }
}
```

**Pros:**
- ✅ Maximum flexibility - can control each side independently
- ✅ Useful for asymmetric padding needs
- ✅ Clear intent for each direction

**Cons:**
- ❌ More verbose (4 tokens vs 2)
- ❌ Most components don't need individual side control
- ❌ More complex CSS usage
- ❌ Not RTL-friendly without additional logic

**CSS Usage:**
```css
padding-top: var(--pa-button-size-sm-padding-top);
padding-right: var(--pa-button-size-sm-padding-right);
padding-bottom: var(--pa-button-size-sm-padding-bottom);
padding-left: var(--pa-button-size-sm-padding-left);
```

### Option 3: Composite/Shorthand Token

**Structure:**
```json
{
  "padding": {
    "$type": "dimension",
    "$value": "{spacing.4} {spacing.12}"  // y x format
  }
}
```

**Pros:**
- ✅ Single token
- ✅ Matches CSS shorthand directly

**Cons:**
- ❌ Less flexible - can't override individual directions
- ❌ Harder to reference individual spacing values
- ❌ Not standard in Style Dictionary (would need custom transform)
- ❌ Breaks token reference chain

**CSS Usage:**
```css
padding: var(--pa-button-size-sm-padding);
```

### Option 4: Logical Properties (Block/Inline)

**Structure:**
```json
{
  "padding": {
    "block": { "$value": "{spacing.4}" },    // top/bottom
    "inline": { "$value": "{spacing.12}" }   // left/right
  }
}
```

**Pros:**
- ✅ RTL-aware by default
- ✅ Semantic naming (block = vertical, inline = horizontal)
- ✅ Future-proof for CSS logical properties
- ✅ Clear intent

**Cons:**
- ⚠️ Requires CSS logical properties support
- ⚠️ Less familiar to some developers

**CSS Usage:**
```css
padding-block: var(--pa-button-size-sm-padding-block);
padding-inline: var(--pa-button-size-sm-padding-inline);
```

## Recommendation: **Option 1 (X/Y) with Option 4 Support**

### Primary Approach: X/Y Tokens

**Why:**
1. **Flexibility**: Works for 99% of use cases (symmetric padding)
2. **Familiarity**: Matches CSS shorthand `padding: y x;`
3. **Simplicity**: Only 2 tokens needed
4. **Compatibility**: Works everywhere, no browser support concerns
5. **Style Dictionary**: Native support, no custom transforms needed

### Enhanced Structure:

```json
{
  "button": {
    "size": {
      "sm": {
        "padding": {
          "x": {
            "$type": "dimension",
            "$value": "{spacing.12}"
          },
          "y": {
            "$type": "dimension",
            "$value": "{spacing.4}"
          }
        }
      }
    }
  }
}
```

### For Special Cases: Individual Sides

When a component truly needs asymmetric padding, use individual side tokens:

```json
{
  "card": {
    "padding": {
      "top": { "$value": "{spacing.16}" },
      "right": { "$value": "{spacing.24}" },
      "bottom": { "$value": "{spacing.16}" },
      "left": { "$value": "{spacing.24}" }
    }
  }
}
```

### CSS Usage Pattern:

```css
/* Standard symmetric padding (most common) */
.pa-button--sm {
  padding: var(--pa-button-size-sm-padding-y) var(--pa-button-size-sm-padding-x);
}

/* With logical properties for RTL support */
.pa-button--sm {
  padding-block: var(--pa-button-size-sm-padding-y);
  padding-inline: var(--pa-button-size-sm-padding-x);
}

/* Individual sides when needed */
.pa-card {
  padding-top: var(--pa-card-padding-top);
  padding-right: var(--pa-card-padding-right);
  padding-bottom: var(--pa-card-padding-bottom);
  padding-left: var(--pa-card-padding-left);
}
```

## Margin Tokens

Apply the same approach for margin:

```json
{
  "component": {
    "margin": {
      "x": { "$value": "{spacing.16}" },
      "y": { "$value": "{spacing.8}" }
    }
  }
}
```

## Spacing Tokens (Gap)

For `gap` property (flex/grid), use single values:

```json
{
  "stack": {
    "gap": {
      "default": { "$value": "{spacing.16}" }
    }
  }
}
```

## Summary

✅ **Use X/Y tokens** for padding and margin (current approach is correct)
✅ **Keep spacing tokens** as single values in Tier 1
✅ **Use individual sides** only when truly asymmetric padding is needed
✅ **Consider logical properties** (`padding-block`/`padding-inline`) for RTL support
✅ **Maintain consistency** - use the same pattern across all components

## Implementation Notes

1. **Token Naming**: `--pa-{component}-{property}-{direction}` (e.g., `--pa-button-size-sm-padding-x`)
2. **Reference Chain**: Component tokens → Semantic tokens → Base spacing tokens
3. **CSS Usage**: Always use CSS variables, never hardcode values
4. **Fallbacks**: Include fallback values in CSS: `var(--pa-button-size-sm-padding-x, 12px)`

