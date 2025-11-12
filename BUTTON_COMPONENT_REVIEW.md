# Button Component Review

## Issues Found

### 1. Critical Bug - Line 75: Wrong Token Reference
**Location:** `src/components/PaButton/PaButton.vue:75`
**Issue:** Secondary variant's `focus-visible` outline uses wrong token
```scss
outline: var(--pa-button-outline-width-default, var(--pa-outline-offset-default, 2px)) solid ...;
```
**Should be:**
```scss
outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid ...;
```
**Impact:** Secondary button focus outline will be incorrect

### 2. Hardcoded Cursor Values
**Location:** `src/components/PaButton/PaButton.vue:26, 130`
**Issue:** Cursor values are hardcoded instead of tokenized
- Line 26: `cursor: pointer;`
- Line 130: `cursor: not-allowed;`

**Recommendation:** Add cursor tokens to `button.json`:
```json
"cursor": {
  "default": { "$type": "string", "$value": "pointer" },
  "disabled": { "$type": "string", "$value": "not-allowed" }
}
```

### 3. Border Radius Token Inconsistency
**Location:** `src/components/PaButton/PaButton.vue:33`
**Issue:** Uses `--pa-button-primary-radius` for all variants, but each variant has its own radius token
- `--pa-button-primary-radius` exists
- `--pa-button-secondary-radius` exists  
- `--pa-button-tertiary-radius` exists

**Current code:**
```scss
border-radius: var(--pa-button-primary-radius, var(--pa-border-radius-100, 8px));
```

**Problem:** This hardcodes primary radius for all variants. Should use variant-specific radius dynamically.

**Options:**
- Option A: Use variant-specific radius in each variant block
- Option B: Create shared `--pa-button-radius-default` token

**Recommendation:** Option A - use variant-specific tokens:
```scss
&--primary {
  border-radius: var(--pa-button-primary-radius, var(--pa-Border-radius-100, 8px));
}
&--secondary {
  border-radius: var(--pa-button-secondary-radius, var(--pa-Border-radius-100, 8px));
}
&--tertiary {
  border-radius: var(--pa-button-tertiary-radius, var(--pa-Border-radius-100, 8px));
}
```

### 4. Incorrect Fallback Token Names
**Location:** Multiple lines
**Issue:** Fallback tokens use lowercase `border` but actual tokens use capital `Border`

**Lines affected:**
- Line 33: `--pa-border-radius-100` → should be `--pa-Border-radius-100`
- Line 38, 64, 90: `--pa-border-width-50` → should be `--pa-Border-width-50`

**Impact:** Fallbacks won't work if component tokens fail

### 5. Border Property Structure
**Location:** Lines 38, 64, 90
**Issue:** Border uses inline `solid` keyword instead of tokenized border style

**Current:**
```scss
border: var(--pa-button-border-width-default, ...) solid var(--pa-button-primary-border-default);
```

**Recommendation:** If border style should be tokenized, add to `button.json`:
```json
"border": {
  "style": {
    "default": { "$type": "string", "$value": "{Border.style.solid}" }
  }
}
```

**Note:** If border style is always `solid`, this may be acceptable as-is.

### 6. Typo in Token References (Consistent but Wrong)
**Location:** `src/tokens/tier3-component/button.json` AND `src/tokens/tier2-semantic/*.json`
**Issue:** Typo `dafault` instead of `default` exists in both Tier 2 and Tier 3
- Tier 2 semantic tokens use `dafault` (lines 34, 78, 122, etc. in pay-advantage-light.json)
- Tier 3 component tokens correctly reference `dafault` to match

**Impact:** Currently works because both tiers have the typo, but should be fixed for correctness

**Fix needed in:**
- `src/tokens/tier2-semantic/pay-advantage-light.json` (all `dafault` → `default`)
- `src/tokens/tier2-semantic/pay-advantage-dark.json` (if same typo exists)
- `src/tokens/tier2-semantic/marshal-freeman.json` (if same typo exists)
- `src/tokens/tier3-component/button.json` (update references to `default`)

### 7. Missing Line Height Token
**Location:** Component doesn't specify line-height
**Issue:** Button text may need specific line-height for proper vertical alignment

**Recommendation:** Add to size tokens if needed:
```json
"size": {
  "sm": {
    "line-height": { "$value": "{line.height.200}" }
  }
}
```

## What's Working Well

✅ **Token Architecture:** Properly follows 3-tier structure
- Tier 1: Base tokens (colors, spacing, typography)
- Tier 2: Semantic tokens (color.action.*)
- Tier 3: Component tokens (button.*)

✅ **Token Prefixing:** All tokens correctly use `--pa-` prefix

✅ **Size Tokens:** Padding and font-size tokens are well-structured with x/y separation

✅ **State Management:** All states (default, hover, active, focus, disabled) are tokenized

✅ **Theme Support:** Tokens reference semantic tokens that change with theme

✅ **SCSS Integration:** Component uses SCSS with proper nesting

## Token Structure Verification

### Tier 1 (Base) ✅
- Colors: `gray.*`, `brand.red.*`, `brand.blue.*`
- Spacing: `spacing.*`
- Typography: `font.*`
- Borders: `Border.radius.*`, `Border.width.*`
- Transitions: `transition.duration.*`, `transition.easing.*`
- Outline: `outline.width.*`, `outline.offset.*`
- Opacity: `opacity.*`

### Tier 2 (Semantic) ✅
- `color.action.primary/secondary/tertiary.*` (background, text, border states)
- Properly references Tier 1 tokens

### Tier 3 (Component) ✅
- `button.border.width.default`
- `button.transition.duration/easing.default`
- `button.outline.width/offset.default`
- `button.primary/secondary/tertiary.*` (background, text, border, radius)
- `button.size.sm/md/lg.*` (padding-x/y, font)

## Recommendations Summary

### High Priority
1. Fix line 75 outline bug
2. Fix typo in `button.json` (`dafault` → `default`)
3. Fix fallback token names (capitalize `Border`)
4. Use variant-specific border-radius tokens

### Medium Priority
5. Add cursor tokens to `button.json`
6. Consider tokenizing border style if it varies

### Low Priority
7. Add line-height tokens if needed for vertical alignment

## Testing Checklist

After fixes:
- [ ] All variants render correctly
- [ ] All sizes work (sm, md, lg)
- [ ] Hover states work
- [ ] Active states work
- [ ] Focus-visible states work (especially secondary)
- [ ] Disabled states work
- [ ] Theme switching works (light/dark)
- [ ] Border radius is correct for each variant
- [ ] Cursor changes on disabled state
- [ ] No console errors for missing tokens

