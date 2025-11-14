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
      { label: 'PaButton', id: 'pabutton' },
      { label: 'PaActionButton', id: 'paactionbutton' },
      { label: 'PaActionButtonGroup', id: 'paactionbuttongroup' },
      { label: 'PaActionGroup', id: 'paactiongroup' },
      { label: 'PaButtonDropdown', id: 'pabuttondropdown' }
    ]
  },
  'form-inputs': {
    title: 'Form Inputs',
    items: [
      { label: 'PaInput', id: 'painput' },
      { label: 'PaTextarea', id: 'patextarea' },
      { label: 'PaAutocomplete', id: 'paautocomplete' },
      { label: 'PaTimePicker', id: 'patimepicker' },
      { label: 'PaFileUploader', id: 'pafileuploader' },
      { label: 'PaCurrencyInput', id: 'pacurrencyinput' },
      { label: 'PaDatePicker', id: 'padatepicker' },
      { label: 'PaInputGroup', id: 'painputgroup' },
      { label: 'PaPhoneNumberInputGroup', id: 'paphonenumberinputgroup' }
    ]
  },
  'form-controls': {
    title: 'Form Controls',
    items: [
      { label: 'PaSelect', id: 'paselect' },
      { label: 'PaToggleInputGroup', id: 'patoggleinputgroup' },
      { label: 'PaOptionalGroup', id: 'paoptionalgroup' }
    ]
  },
  'form-layout': {
    title: 'Form Layout',
    items: [
      { label: 'PaForm', id: 'paform' },
      { label: 'PaFormContainer', id: 'paformcontainer' },
      { label: 'PaSectionContainer', id: 'pasectioncontainer' },
      { label: 'PaFormDivider', id: 'paformdivider' }
    ]
  },
  'layout': {
    title: 'Layout',
    items: [
      { label: 'PaCard', id: 'pacard' },
      { label: 'PaContainer', id: 'pacontainer' },
      { label: 'PaPageLayout', id: 'papagelayout' },
      { label: 'PaContentSeparator', id: 'pacontentseparator' },
      { label: 'PaHeader', id: 'paheader' },
      { label: 'PaListItem', id: 'palistitem' },
      { label: 'PaPageDivider', id: 'papagedivider' },
      { label: 'PaTextContainer', id: 'patextcontainer' },
      { label: 'PaTextDivider', id: 'patextdivider' },
      { label: 'PaSlottedLayout', id: 'paslottedlayout' },
      { label: 'PaSlottedLayoutHeader', id: 'paslottedlayoutheader' },
      { label: 'PaSettingsPanel', id: 'pasettingspanel' }
    ]
  },
  'navigation': {
    title: 'Navigation',
    items: [
      { label: 'PaTabs', id: 'patabs' },
      { label: 'PaBreadcrumbs', id: 'pabreadcrumbs' },
      { label: 'PaStepper', id: 'pastepper' },
      { label: 'PaDrawer', id: 'padrawer' },
      { label: 'PaDropdown', id: 'padropdown' },
      { label: 'PaKebabMenu', id: 'pakebabmenu' },
      { label: 'PaNavButton', id: 'panavbutton' },
      { label: 'PaNavButtonGroup', id: 'panavbuttongroup' }
    ]
  },
  'selection': {
    title: 'Selection',
    items: [
      { label: 'PaCheckbox', id: 'pacheckbox' },
      { label: 'PaRadio', id: 'paradio' },
      { label: 'PaRadioButtonGroup', id: 'paradiobuttongroup' },
      { label: 'PaSwitch', id: 'paswitch' },
      { label: 'PaCheckboxGroup', id: 'pacheckboxgroup' },
      { label: 'PaSegmentedControl', id: 'pasegmentedcontrol' },
      { label: 'PaToggleSegmentation', id: 'patogglesegmentation' },
      { label: 'PaToggleChip', id: 'patogglechip' }
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
  },
  'hero': {
    title: 'Hero',
    items: [
      { label: 'PaHeroHeader', id: 'paheroheader' },
      { label: 'PaHeroIcon', id: 'paheroicon' },
      { label: 'PaHeroSubheader', id: 'paherosubheader' },
      { label: 'PaHeroSubheaderGroup', id: 'paherosubheadergroup' }
    ]
  },
  'shapes': {
    title: 'Shapes',
    items: [
      { label: 'PaCircle', id: 'pacircle' },
      { label: 'PaSquare', id: 'pasquare' }
    ]
  },
  'utilities': {
    title: 'Utilities',
    items: [
      { label: 'PaDivider', id: 'padivider' },
      { label: 'PaIcon', id: 'paicon' },
      { label: 'PaColorPicker', id: 'pacolorpicker' },
      { label: 'PaSheet', id: 'pasheet' },
      { label: 'PaToggle', id: 'patoggle' }
    ]
  }
}
