<script setup lang="ts">
// Helpers
import { defineAsyncComponent } from "vue"
import { computed } from "vue"
import ButtonTag from "./ButtonTag.vue"
import { useTheme } from "@/composables/useTheme"
import {
    ButtonTagIcons,
    ButtonTagVariants,
} from "@/types/components/buttonTag.types"

// Async icon components
const SvgGlyphX = defineAsyncComponent(
    () => import("ucla-library-design-tokens/assets/svgs/icon-ftva-xtag.svg")
)

type ButtonRemoveSearchFilterProps = {
    title?: string | string[]
    iconName?: ButtonTagIcons
    isSelected?: boolean
}

const emit = defineEmits(["onClick"])

// Props
const props = defineProps<ButtonRemoveSearchFilterProps>()

const theme = useTheme()

// Methods
function handleClick() {
    emit("onClick")
}
// Computeds
const classes = computed(() => [
    "button-remove-search-filter",
    theme?.value || "",
    { "is-selected": props.isSelected },
])
</script>

<template>
    <button type="button" @click="handleClick" :class="classes">
        <ButtonTag
            :label="title"
            :icon-name="iconName"
            :variant="ButtonTagVariants.Secondary"
        >
            <component :is="SvgGlyphX" class="button-close" />
        </ButtonTag>
    </button>
</template>

<style lang="scss" scoped>
.button-remove-search-filter {
    --transition-duration: 0.2s;
    padding: 0px;

    // X Icon
    .button-close {
        opacity: 0;
        width: 0;
        margin-left: -10px;

        transition: opacity var(--transition-duration) ease-in-out,
            width var(--transition-duration) ease-in-out,
            margin-left var(--transition-duration) ease-in-out;

        :deep(svg) {
            margin-top: 3px;
        }
        :deep(path) {
            transition: fill var(--transition-duration) ease-in-out;
        }
    }

    // Selected state
    &.is-selected {
        .button-close {
            opacity: 1;

            width: 15px;
            height: 15px;
            margin-left: 0;

            :deep(path) {
                fill: $subtitle-grey;
            }
        }
    }

    // Is FTVA Variant
    &.ftva {
        :deep(.button-tag) {
            height: 40px;
            .label {
                font-size: 18px;
            }
        }

        &.is-selected {
            :deep(.button-tag) {
                border-color: $accent-blue;
                background-color: $accent-blue;

                .label {
                    color: $pure-white;
                }
            }

            :deep(.icon-arrow) {
                path {
                    stroke: $pure-white;
                }
            }

            :deep(path.svg__fill--medium-grey) {
                fill: $pure-white;
            }
            .button-close {
                width: 10px;
                height: 10px;

                :deep(path) {
                    fill: $pure-white;
                }
            }
        }
    }

    // Hovers
    @media #{$has-hover} {
        &:not(.ftva):hover {
            .button-close {
                :deep(path) {
                    fill: $accent-blue;
                }
            }
        }

        // FTVA Hover state
        &.ftva:hover {
            :deep(.button-tag) {
                border-color: $accent-blue;
                background-color: $accent-blue;

                .label {
                    color: $pure-white;
                }
            }

            :deep(path.svg__fill--medium-grey) {
                fill: $pure-white;
            }
        }
    }
}
</style>
