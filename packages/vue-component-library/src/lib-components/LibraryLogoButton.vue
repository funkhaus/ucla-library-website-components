<script setup lang="ts">
// Components
import LogoLibrary from "ucla-library-design-tokens/assets/svgs/logo-library.svg"
import SmartLink from "@/lib-components/SmartLink.vue"

type LibraryLogoButtonProps = {
    to?: string
}
const props = withDefaults(defineProps<LibraryLogoButtonProps>(), {
    to: "",
})
</script>

<template>
    <smart-link class="library-logo-button" :to="props.to">
        <LogoLibrary />
    </smart-link>
</template>
