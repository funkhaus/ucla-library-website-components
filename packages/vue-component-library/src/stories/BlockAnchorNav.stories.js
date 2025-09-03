import BlockAnchorNav from '@/lib-components/BlockAnchorNav.vue'

/**
 * A component to display a navigation block with a title and anchor links.
 *
 * Props:
 * - <b>title</b>: A string representing the title of the navigation block
 * - <b>items</b>: An array of objects containing label and to properties for navigation items
 */
export default {
  title: 'Funkhaus / Block Anchor Navigation',
  component: BlockAnchorNav,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the navigation block',
    },
    items: {
      control: 'object',
      description:
                'Array of navigation items with label and to properties',
    },
  },
  decorators: [
    () => ({
      template: '<story />',
    }),
  ],
}

function Template(args) {
  return {
    setup() {
      return { args }
    },
    components: { BlockAnchorNav },
    template: '<BlockAnchorNav v-bind="args" />',
  }
}

// Normal usage stories
export const Default = Template.bind({})
Default.args = {
  title: 'Quick Navigation:',
  items: [
    { label: 'Overview', to: '#overview' },
    { label: 'Features', to: '#features' },
    { label: 'Documentation', to: '#documentation' },
    { label: 'Contact', to: '#contact' },
  ],
}

export const SingleItem = Template.bind({})
SingleItem.args = {
  title: 'Jump to Section:',
  items: [{ label: 'One Thing', to: '#one-thing' }],
}

export const MultipleItems = Template.bind({})
MultipleItems.args = {
  title: 'Table of Contents:',
  items: [
    { label: 'Introduction', to: '#introduction' },
    { label: 'Getting Started', to: '#getting-started' },
    { label: 'Installation', to: '#installation' },
    { label: 'Configuration', to: '#configuration' },
    { label: 'Usage Examples', to: '#usage-examples' },
    { label: 'API Reference', to: '#api-reference' },
    { label: 'Troubleshooting', to: '#troubleshooting' },
    { label: 'FAQ', to: '#faq' },
  ],
}

export const ExternalLinks = Template.bind({})
ExternalLinks.args = {
  title: 'External Resources:',
  items: [
    { label: 'GitHub', to: 'https://github.com/' },
    { label: 'Google', to: 'https://google.com' },
    { label: 'UCLA', to: 'https://ucla.edu' },
  ],
}

// Edge cases and error scenarios
export const InvalidItems = Template.bind({})
InvalidItems.args = {
  title: 'Testing Invalid Items:',
  items: [
    { label: 'Valid Item', to: '#valid' },
    { label: '', to: '#invalid' }, // Empty label
    { to: '#missing-label' }, // Missing label
    { label: 'Missing URL' }, // Missing to
    { label: 'Invalid URL', to: 'not-a-url' }, // Malformed URL
    null, // Null item
    undefined, // Undefined item
    'string', // String instead of object
    123, // Number instead of object
    { label: 'Valid Again', to: '#valid-again' },
  ],
}

export const WhitespaceOnly = Template.bind({})
WhitespaceOnly.args = {
  title: '   Whitespace Title   :',
  items: [
    { label: '   Item with spaces   ', to: '   #spaces   ' },
    { label: '\tTabbed\tItem\t', to: '\t#tabs\t' },
    { label: '\n\nNewlines\n\n', to: '\n\n#newlines\n\n' },
  ],
}

export const NoTitle = Template.bind({})
NoTitle.args = {
  title: '',
  items: [{ label: 'Item without title', to: '#no-title' }],
}

export const NullTitle = Template.bind({})
NullTitle.args = {
  title: null,
  items: [{ label: 'Item with null title', to: '#null-title' }],
}

export const NonArrayItems = Template.bind({})
NonArrayItems.args = {
  title: 'Testing Non-Array Items:',
  items: 'not-an-array', // Invalid: should be array
}

export const EmptyArray = Template.bind({})
EmptyArray.args = {
  title: 'Empty Items Array:',
  items: [],
}

export const NullItems = Template.bind({})
NullItems.args = {
  title: 'Null Items:',
  items: null,
}

export const UndefinedItems = Template.bind({})
UndefinedItems.args = {
  title: 'Undefined Items:',
  items: undefined,
}

export const SpecialCharacters = Template.bind({})
SpecialCharacters.args = {
  title: 'Special Characters & Unicode:',
  items: [
    { label: 'Emoji 🚀', to: '#emoji' },
    { label: 'Special chars: !@#$%^&*()', to: '#special' },
    { label: 'Unicode: 中文 Español Français', to: '#unicode' },
    { label: 'HTML: <script>alert(\'xss\')</script>', to: '#html' },
    { label: 'SQL: DROP TABLE users;', to: '#sql' },
    {
      label: 'Very long label that might cause layout issues and wrap to multiple lines',
      to: '#long',
    },
  ],
}

export const CompletelyEmpty = Template.bind({})
CompletelyEmpty.args = {
  title: '',
  items: [],
}

export const NoProps = Template.bind({})
NoProps.args = {}
