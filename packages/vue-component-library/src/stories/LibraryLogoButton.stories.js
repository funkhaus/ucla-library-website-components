import LibraryLogoButton from '@/lib-components/LibraryLogoButton'

export default {
  title: 'Funkhaus / LibraryLogoButton',
  component: LibraryLogoButton,
}

// Variations
export function Default() {
  return {
    data() {
      return {
        to: '/home/',
      }
    },
    components: { LibraryLogoButton },
    template: `<library-logo-button :to="to" />`,
  }
}