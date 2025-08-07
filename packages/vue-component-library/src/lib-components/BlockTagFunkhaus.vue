<script setup lang="ts">
// Imports
import { computed, defineAsyncComponent } from "vue"
import { useTheme } from "@/composables/useTheme"
import {
    BlockTagIcons,
    BlockTagVariants,
} from "@/types/components/blockTag.types"
const SvgArrowRight = defineAsyncComponent(
    () => import("ucla-library-design-tokens/assets/svgs/icon-arrow-right.svg")
) // TODO: use the correct icon for this component

// Types
interface BlockTagProps {
    label?: string | Array<string>
    valueText?: string
    iconName?: BlockTagIcons
    variant?: BlockTagVariants
    isHighlighted?: boolean
    onClick?: () => void
}

// Async icon components
const iconMap = {
    [BlockTagIcons.SvgIconGuest]: defineAsyncComponent(
        () =>
            import("ucla-library-design-tokens/assets/svgs/icon-ftva-guest.svg")
    ),
    [BlockTagIcons.SvgIconFilm]: defineAsyncComponent(
        () =>
            import("ucla-library-design-tokens/assets/svgs/icon-ftva-film.svg")
    ),
    [BlockTagIcons.SvgIconTV]: defineAsyncComponent(
        () => import("ucla-library-design-tokens/assets/svgs/icon-ftva-tv.svg")
    ),
    [BlockTagIcons.SvgIconFilmreel]: defineAsyncComponent(
        () =>
            import(
                "ucla-library-design-tokens/assets/svgs/icon-ftva-filmreel.svg"
            )
    ),
    [BlockTagIcons.SvgIconDigital]: defineAsyncComponent(
        () =>
            import(
                "ucla-library-design-tokens/assets/svgs/icon-ftva-digitalformat.svg"
            )
    ),
    [BlockTagIcons.SvgIconOnline]: defineAsyncComponent(
        () =>
            import(
                "ucla-library-design-tokens/assets/svgs/icon-ftva-online.svg"
            )
    ),
    [BlockTagIcons.SvgIconFamilyFriendly]: defineAsyncComponent(
        () =>
            import(
                "ucla-library-design-tokens/assets/svgs/icon-ftva-familyfriendly.svg"
            )
    ),
}

const theme = useTheme()

// Props
const props = withDefaults(defineProps<BlockTagProps>(), {
    label: "",
    variant: BlockTagVariants.Primary,
    isHighlighted: false,
})

// Computeds
const classes = computed(() => [
    "block-tag",
    theme?.value || "",
    `is-${props.variant}`,
    { "is-highlighted": props.isHighlighted },
    { "has-on-click": props.onClick || hasLinkInLabel.value },
])

const hasLinkInLabel = computed(() => {
    if (typeof props.label === "string") {
        return props.label.includes("<a")
    } else if (Array.isArray(props.label)) {
        return props.label.some((item) => item.includes("<a"))
    }
    return false
})

const isLabelArray = computed(() => {
    return Array.isArray(props.label)
})
</script>

<template>
    <span :class="classes" @click="onClick">
        <component
            v-if="iconName"
            :is="iconMap[iconName]"
            class="icon-left"
            aria-hidden="true"
        />

        <div v-if="!isLabelArray" class="label" v-html="label" />
        <template v-else>
            <template v-for="(item, index) in label" :key="item">
                <div class="label" v-html="item" />

                <component
                    v-if="index !== label.length - 1"
                    :is="SvgArrowRight"
                    class="icon-arrow"
                    aria-hidden="true"
                />
            </template>
        </template>

        <!-- slot for 'x' button or any additional content parent needs to display in tag -->
        <slot />
    </span>
</template>

<style lang="scss" scoped>
@import "@/styles/default/_block-tag-funkhaus.scss";
@import "@/styles/ftva/_block-tag-funkhaus.scss";
@import "@/styles/dlc/_block-tag-funkhaus.scss";
</style>
