export interface NavigationItem {
  label: string
  id: string
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export const navigation: Record<string, NavigationSection> = {
  'get-started': {
    title: 'Get Started',
    items: [
      { label: 'Introduction', id: 'introduction' },
      { label: 'Installation', id: 'installation' },
      { label: 'Theming', id: 'theming' }
    ]
  },
  'buttons': {
    title: 'Buttons',
    items: [
      { label: 'PaButton', id: 'pabutton' }
    ]
  },
  'form-inputs': {
    title: 'Form Inputs',
    items: [
      { label: 'PaInput', id: 'painput' },
      { label: 'PaCheckbox', id: 'pacheckbox' },
      { label: 'PaRadio', id: 'paradio' },
      { label: 'PaRadioButtonGroup', id: 'paradiobuttongroup' },
      { label: 'PaToggleSwitch', id: 'patoggleswitch' },
      { label: 'PaSelect', id: 'paselect' },
      { label: 'PaTextarea', id: 'patextarea' },
      { label: 'PaAutocomplete', id: 'paautocomplete' },
      { label: 'PaTimePicker', id: 'patimepicker' },
      { label: 'PaFileUploader', id: 'pafileuploader' },
      { label: 'PaForm', id: 'paform' }
    ]
  },
  'layout': {
    title: 'Layout',
    items: [
      { label: 'PaCard', id: 'pacard' },
      { label: 'PaHeader', id: 'paheader' },
      { label: 'PaListItem', id: 'palistitem' },
      { label: 'PaPageLayout', id: 'papagelayout' },
      { label: 'PaContentSeparator', id: 'pacontentseparator' },
      { label: 'PaContainer', id: 'pacontainer' },
      { label: 'PaFormContainer', id: 'paformcontainer' },
      { label: 'PaSectionContainer', id: 'pasectioncontainer' }
    ]
  },
  'navigation': {
    title: 'Navigation',
    items: [
      { label: 'PaDropdown', id: 'padropdown' },
      { label: 'PaSegmentedControl', id: 'pasegmentedcontrol' },
      { label: 'PaToggleSegmentation', id: 'patogglesegmentation' },
      { label: 'PaToggleChip', id: 'patogglechip' },
      { label: 'PaKebabMenu', id: 'pakebabmenu' },
      { label: 'PaTabs', id: 'patabs' },
      { label: 'PaBreadcrumbs', id: 'pabreadcrumbs' },
      { label: 'PaStepper', id: 'pastepper' },
      { label: 'PaDrawer', id: 'padrawer' }
    ]
  },
  'feedback': {
    title: 'Feedback',
    items: [
      { label: 'PaModal', id: 'pamodal' },
      { label: 'PaTooltip', id: 'patooltip' },
      { label: 'PaBadge', id: 'pabadge' },
      { label: 'PaInlineMessage', id: 'painlinemessage' },
      { label: 'PaLoading', id: 'paloading' },
      { label: 'PaEmptyState', id: 'paemptystate' },
      { label: 'PaProgress', id: 'paprogress' }
    ]
  },
  'data-display': {
    title: 'Data Display',
    items: [
      { label: 'PaTable', id: 'patable' },
      { label: 'PaAccordion', id: 'paaccordion' },
      { label: 'PaPagination', id: 'papagination' },
      { label: 'PaSlider', id: 'paslider' },
      { label: 'PaRangeSlider', id: 'parangeslider' }
    ]
  }
}

