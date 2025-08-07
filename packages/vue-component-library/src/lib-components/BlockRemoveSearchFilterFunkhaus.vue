<script setup lang="ts">
// Helpers
import { defineAsyncComponent } from "vue"
import { computed } from "vue"
import { useTheme } from "@/composables/useTheme"
import { useRoute } from "vue-router"
import BlockTagFunkhaus from "./BlockTagFunkhaus.vue"
import {
    BlockTagIcons,
    BlockTagVariants,
} from "@/types/components/blockTag.types"
import getSectionName from "@/utils/getSectionName"

enum RemoveIcon {
    SvgGlyphClose = "SvgGlyphClose",
    SvgGlyphX = "SvgGlyphX",
}

// Async icon components
const removeIconMap = {
    [RemoveIcon.SvgGlyphClose]: defineAsyncComponent(
        () => import("ucla-library-design-tokens/assets/svgs/icon-close.svg")
    ),
    [RemoveIcon.SvgGlyphX]: defineAsyncComponent(
        () =>
            import("ucla-library-design-tokens/assets/svgs/icon-ftva-xtag.svg")
    ),
}

const emit = defineEmits(["onClick"])
const route = useRoute()
const theme = useTheme()

// Types
type BlockRemoveSearchFilterProps = {
    title?: string | string[]
    iconName?: BlockTagIcons
    isSelected?: boolean
}

// Props
const props = defineProps<BlockRemoveSearchFilterProps>()

// Methods
function handleClick() {
    emit("onClick")
}
// Computeds
const classes = computed(() => [
    "block-remove-search-filter",
    `color-${sectionName.value}`,
    theme?.value || "",
    { "is-selected": props.isSelected },
])

const sectionName = computed(() => {
    return route !== undefined && route.path
        ? getSectionName(route.path)
        : "default"
})

const removeIcon = computed(() => {
    if (!theme?.value) {
        return "SvgGlyphClose"
    }

    return "SvgGlyphX"
})
</script>

<template>
    <button type="button" @click="handleClick" :class="classes">
        <BlockTagFunkhaus
            :label="title"
            :icon-name="iconName"
            :variant="BlockTagVariants.Secondary"
        >
            <component :is="removeIconMap[removeIcon]" class="button-close" />
        </BlockTagFunkhaus>
    </button>
</template>

<style lang="scss" scoped>
@import "@/styles/default/_block-remove-search-filter-funkhaus.scss";
@import "@/styles/ftva/_block-remove-search-filter-funkhaus.scss";
@import "@/styles/dlc/_block-remove-search-filter-funkhaus.scss";
</style>
