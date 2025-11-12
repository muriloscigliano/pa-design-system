<script setup lang="ts">
import { ref } from 'vue'
import { setTheme, getTheme } from './utils/theme'
import {
  PaButton,
  PaInput,
  PaCheckbox,
  PaRadio,
  PaRadioButtonGroup,
  PaToggleSwitch,
  PaForm,
  PaFormContainer,
  PaContainer,
  PaSectionContainer,
  PaCard,
  PaHeader,
  PaListItem,
  PaModal,
  PaTooltip,
  PaBadge,
  PaInlineMessage,
  PaLoading,
  PaEmptyState,
  PaTable,
  PaAccordion,
  PaPagination,
  PaSlider,
  PaRangeSlider,
  PaSegmentedControl,
  PaToggleSegmentation,
  PaToggleChip,
  PaKebabMenu,
  PaFileUploader,
  PaContentSeparator,
  PaDropdown,
  PaDropdownItem,
  PaSelect,
  PaTextarea,
  PaAutocomplete,
  PaTimePicker,
  PaTabs,
  PaTab,
  PaBreadcrumbs,
  PaStepper,
  PaDrawer,
  PaProgress
} from './components'

const currentTheme = ref<'light' | 'dark'>(getTheme())
const inputValue = ref('')
const checkboxValue = ref(false)
const radioValue = ref('option1')
const toggleValue = ref(false)
const modalOpen = ref(false)
const accordionOpen = ref(false)
const paginationPage = ref(1)
const sliderValue = ref(50)
const rangeValue = ref<[number, number]>([20, 80])
const segmentedValue = ref('option1')
const toggleSegValue = ref<string | null>('option1')
const chipValue = ref(false)
const selectValue = ref<string | number>()
const textareaValue = ref('')
const autocompleteValue = ref('')
const timeValue = ref('')
const activeTab = ref('tab1')
const drawerOpen = ref(false)
const progressValue = ref(60)

const radioOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

const segmentedOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

const selectOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3', disabled: true },
  { label: 'Option 4', value: 'opt4', group: 'Group A' },
  { label: 'Option 5', value: 'opt5', group: 'Group A' }
]

const autocompleteOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' }
]

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Category', to: '/products/category' },
  { label: 'Current Page' }
]

const stepperSteps = [
  { title: 'Step 1', description: 'Description 1' },
  { title: 'Step 2', description: 'Description 2' },
  { title: 'Step 3', description: 'Description 3' }
]

const kebabOptions = [
  { label: 'Edit', action: () => console.log('Edit') },
  { label: 'Delete', action: () => console.log('Delete') },
  { label: 'Share', action: () => console.log('Share') }
]

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  currentTheme.value = newTheme
}
</script>

<template>
  <div>
    <PaHeader sticky>
      <template #logo>
        <h1 style="margin: 0;">PA UI Library</h1>
      </template>
      <template #actions>
        <PaButton variant="secondary" size="sm" @click="toggleTheme">
          Theme: {{ currentTheme }}
        </PaButton>
      </template>
    </PaHeader>

    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <section style="margin-bottom: 3rem;">
        <h2>Buttons</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
          <PaButton variant="primary">Primary</PaButton>
          <PaButton variant="secondary">Secondary</PaButton>
          <PaButton variant="tertiary">Tertiary</PaButton>
          <PaButton variant="payment-navigation">Payment Nav</PaButton>
          <PaButton variant="action">Action</PaButton>
          <PaButton variant="primary" size="sm">Small</PaButton>
          <PaButton variant="primary" size="lg">Large</PaButton>
          <PaButton variant="primary" :disabled="true">Disabled</PaButton>
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Form Inputs</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin-top: 1rem;">
          <PaInput v-model="inputValue" placeholder="Enter text..." />
          <PaInput v-model="inputValue" size="sm" placeholder="Small input" />
          <PaInput v-model="inputValue" size="lg" placeholder="Large input" />
          <PaInput v-model="inputValue" error placeholder="Error state" />
          <PaInput v-model="inputValue" :disabled="true" placeholder="Disabled" />
          
          <PaSelect
            v-model="selectValue"
            :options="selectOptions"
            placeholder="Select an option..."
            clearable
            searchable
          />
          <PaSelect
            v-model="selectValue"
            :options="selectOptions"
            size="sm"
            placeholder="Small select"
          />
          
          <PaTextarea
            v-model="textareaValue"
            placeholder="Enter text..."
            :rows="4"
            show-count
            :max-length="100"
          />
          <PaTextarea
            v-model="textareaValue"
            placeholder="Auto-resize textarea"
            auto-resize
            :rows="3"
          />
          
          <PaAutocomplete
            v-model="autocompleteValue"
            :options="autocompleteOptions"
            placeholder="Type to search..."
          />
          
          <PaTimePicker
            v-model="timeValue"
            placeholder="Select time"
            format="12h"
          />
          <PaTimePicker
            v-model="timeValue"
            format="24h"
            :show-seconds="true"
          />
          
          <PaCheckbox v-model="checkboxValue" label="Checkbox" />
          <PaCheckbox v-model="checkboxValue" size="sm" label="Small checkbox" />
          <PaCheckbox v-model="checkboxValue" size="lg" label="Large checkbox" />
          <PaCheckbox v-model="checkboxValue" :disabled="true" label="Disabled" />
          
          <PaRadio v-model="radioValue" value="option1" label="Radio 1" />
          <PaRadio v-model="radioValue" value="option2" label="Radio 2" />
          
          <PaRadioButtonGroup v-model="radioValue" :options="radioOptions" />
          
          <PaToggleSwitch v-model="toggleValue" label="Toggle Switch" />
          <PaToggleSwitch v-model="toggleValue" size="sm" label="Small" />
          <PaToggleSwitch v-model="toggleValue" size="lg" label="Large" />
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Sliders</h2>
        <div style="max-width: 400px; margin-top: 1rem;">
          <PaSlider v-model="sliderValue" :min="0" :max="100" />
          <p>Value: {{ sliderValue }}</p>
          <PaRangeSlider v-model="rangeValue" :min="0" :max="100" />
          <p>Range: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Navigation Components</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <PaTabs v-model="activeTab" :tabs="[
            { label: 'Tab 1', value: 'tab1', badge: '3' },
            { label: 'Tab 2', value: 'tab2', icon: '⭐' },
            { label: 'Tab 3', value: 'tab3', disabled: true }
          ]">
            <PaTab label="Tab 1" value="tab1">Content for Tab 1</PaTab>
            <PaTab label="Tab 2" value="tab2">Content for Tab 2</PaTab>
            <PaTab label="Tab 3" value="tab3">Content for Tab 3</PaTab>
          </PaTabs>
          
          <PaBreadcrumbs :items="breadcrumbItems" />
          
          <PaStepper :current="1" :steps="stepperSteps" clickable />
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Selection Controls</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <PaSegmentedControl v-model="segmentedValue" :options="segmentedOptions" />
          <PaToggleSegmentation v-model="toggleSegValue" :options="segmentedOptions" />
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <PaToggleChip v-model="chipValue">Toggle Chip</PaToggleChip>
            <PaToggleChip v-model="chipValue" removable>Removable</PaToggleChip>
          </div>
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Feedback Components</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <PaBadge variant="default">Default</PaBadge>
          <PaBadge variant="success">Success</PaBadge>
          <PaBadge variant="warning">Warning</PaBadge>
          <PaBadge variant="error">Error</PaBadge>
          <PaBadge variant="default" size="sm">Small</PaBadge>
          <PaBadge variant="default" dot />
          
          <PaInlineMessage variant="info" dismissible>
            Info message
          </PaInlineMessage>
          <PaInlineMessage variant="success">
            Success message
          </PaInlineMessage>
          <PaInlineMessage variant="warning">
            Warning message
          </PaInlineMessage>
          <PaInlineMessage variant="error">
            Error message
          </PaInlineMessage>
          
          <PaLoading />
          <PaLoading variant="secondary" size="lg" />
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <PaProgress :percentage="progressValue" />
            <PaProgress :percentage="progressValue" status="success" />
            <PaProgress :percentage="progressValue" status="warning" />
            <PaProgress :percentage="progressValue" status="error" />
            <PaProgress :percentage="progressValue" type="circle" show-text />
            <PaProgress :percentage="progressValue" type="circle" size="lg" show-text />
          </div>
          
          <PaButton @click="modalOpen = true">Open Modal</PaButton>
          
          <PaButton @click="drawerOpen = true">Open Drawer</PaButton>
          <PaDrawer v-model="drawerOpen" placement="right" size="md">
            <template #header>
              <h3>Drawer Title</h3>
            </template>
            <p>Drawer content goes here</p>
            <template #footer>
              <PaButton variant="secondary" @click="drawerOpen = false">Close</PaButton>
            </template>
          </PaDrawer>
          <PaModal v-model="modalOpen" size="md">
            <template #header>
              <h3>Modal Title</h3>
            </template>
            <p>Modal content goes here</p>
            <template #footer>
              <PaButton variant="secondary" @click="modalOpen = false">Close</PaButton>
            </template>
          </PaModal>
          
          <PaTooltip placement="top">
            <PaButton>Hover for tooltip</PaButton>
            <template #content>This is a tooltip</template>
          </PaTooltip>
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Layout Components</h2>
        <div style="margin-top: 1rem;">
          <PaCard hoverable>
            <template #header>
              <h3>Card Header</h3>
            </template>
            <p>Card content</p>
            <template #footer>
              <PaButton size="sm">Action</PaButton>
            </template>
          </PaCard>
          
          <div style="margin-top: 1rem;">
            <PaListItem hoverable>
              <template #avatar>👤</template>
              <div>
                <strong>List Item Title</strong>
                <p style="margin: 0; color: var(--pa-gray-500);">Subtitle</p>
              </div>
              <template #actions>
                <PaKebabMenu :options="kebabOptions" />
              </template>
            </PaListItem>
          </div>
          
          <PaAccordion v-model="accordionOpen">
            <template #header>Accordion Header</template>
            <p>Accordion content</p>
          </PaAccordion>
          
          <PaContentSeparator text="OR" style="margin: 2rem 0;" />
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Data Display</h2>
        <div style="margin-top: 1rem;">
          <PaTable striped hoverable>
            <template #header>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>Item 1</td>
                <td><PaBadge variant="success">Active</PaBadge></td>
                <td><PaButton size="sm">Edit</PaButton></td>
              </tr>
              <tr>
                <td>Item 2</td>
                <td><PaBadge variant="warning">Pending</PaBadge></td>
                <td><PaButton size="sm">Edit</PaButton></td>
              </tr>
            </template>
          </PaTable>
          
          <PaPagination v-model="paginationPage" :total="100" :page-size="10" style="margin-top: 1rem;" />
          
          <PaEmptyState
            title="No items found"
            description="Try adjusting your filters"
            style="margin-top: 2rem;"
          >
            <template #icon>📭</template>
            <template #action>
              <PaButton>Create Item</PaButton>
            </template>
          </PaEmptyState>
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Other Components</h2>
        <div style="margin-top: 1rem;">
          <PaDropdown>
            <template #trigger>
              <PaButton variant="secondary">Dropdown</PaButton>
            </template>
            <PaDropdownItem>Option 1</PaDropdownItem>
            <PaDropdownItem selected>Option 2</PaDropdownItem>
            <PaDropdownItem disabled>Option 3</PaDropdownItem>
          </PaDropdown>
          
          <PaFileUploader accept="image/*" style="margin-top: 1rem;" />
          
          <PaForm style="margin-top: 1rem;">
            <PaInput placeholder="Form input" />
            <PaButton type="submit">Submit</PaButton>
          </PaForm>
        </div>
      </section>

      <section style="margin-bottom: 3rem;">
        <h2>Container Components</h2>
        <div style="margin-top: 1rem;">
          <PaContainer variant="outlined" size="md" max-width="md" centered style="margin-bottom: 2rem;">
            <h3>PaContainer</h3>
            <p>General purpose container with variants, sizes, and max-width options.</p>
          </PaContainer>

          <PaFormContainer 
            title="Form Container" 
            description="Container specifically designed for forms with consistent spacing"
            variant="outlined"
            style="margin-bottom: 2rem;"
          >
            <PaInput v-model="inputValue" placeholder="Name" />
            <PaInput v-model="inputValue" placeholder="Email" />
            <PaCheckbox v-model="checkboxValue" label="I agree to terms" />
            <template #footer>
              <PaButton variant="secondary">Cancel</PaButton>
              <PaButton variant="primary">Submit</PaButton>
            </template>
          </PaFormContainer>

          <PaSectionContainer
            title="Section Container"
            description="Container for page sections with header and optional actions"
          >
            <template #actions>
              <PaButton size="sm" variant="secondary">Edit</PaButton>
              <PaButton size="sm" variant="primary">Save</PaButton>
            </template>
            <p>This is the section content area. It can contain any content.</p>
            <PaCard>
              <p>Nested content inside section container</p>
            </PaCard>
          </PaSectionContainer>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
section {
  padding: 1.5rem;
  background: var(--pa-color-surface-container-background, var(--pa-gray-white, #ffffff));
  border-radius: var(--pa-Border-radius-100, 8px);
  border: 1px solid var(--pa-color-surface-container-border, var(--pa-gray-200, #e9ecef));
}

h2 {
  margin: 0 0 1rem 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
}
</style>
