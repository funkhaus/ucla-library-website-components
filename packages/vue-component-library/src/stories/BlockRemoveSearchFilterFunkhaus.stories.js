import { computed } from "vue"
import router from "@/router"
import BlockRemoveSearchFilterFunkhaus from "@/lib-components/BlockRemoveSearchFilterFunkhaus"
import { BlockTagIcons } from "@/types/components/blockTag.types"

export default {
    title: "Funkhaus / Block Remove Search Filter",
    component: BlockRemoveSearchFilterFunkhaus,
    decorators: [
        () => ({
            router,
            template: "<story />",
        }),
    ],
}

const mock = {
    title: " Default Amenities",
}

// Variations of stories below
export function Default() {
    return {
        data() {
            return { ...mock, isSelected: false }
        },
        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { BlockRemoveSearchFilterFunkhaus },
        template: `
        <block-remove-search-filter-funkhaus
            :title="title"
            :is-selected="isSelected"
            @onClick="handleClick"
        />
    `,
    }
}

export function DefaultSelected() {
    return {
        data() {
            return { ...mock, isSelected: true }
        },
        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { BlockRemoveSearchFilterFunkhaus },
        template: `
        <block-remove-search-filter-funkhaus
            :title="title"
            :is-selected="isSelected"
            @onClick="handleClick"
        />
    `,
    }
}

export function WithIcon() {
    return {
        data() {
            return { isSelected: false, iconName: BlockTagIcons.SvgIconGuest }
        },
        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { BlockRemoveSearchFilterFunkhaus },
        template: `
        <block-remove-search-filter-funkhaus
            title="Visit"  :icon-name="iconName"
            :is-selected="isSelected"
            @onClick="handleClick"
        />
    `,
    }
}

export function MultipleLabels() {
    return {
        data() {
            return {
                isSelected: false,
                title: ["This", "One", "Has", "Multiple", "Labels"],
            }
        },

        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { BlockRemoveSearchFilterFunkhaus },
        template: `
        <block-remove-search-filter-funkhaus
            :title="title"
            :is-selected="isSelected"
            @onClick="handleClick"
        />
    `,
    }
}

function FTVATemplate(args) {
    return {
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        setup() {
            return { args }
        },
        data() {
            return {
                isSelected: args.isSelected,
            }
        },
        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { BlockRemoveSearchFilterFunkhaus },
        template:
            '<block-remove-search-filter-funkhaus v-bind="args" :is-selected="isSelected" @onClick="handleClick"  />',
    }
}

export const FTVA = FTVATemplate.bind({})
FTVA.args = {
    title: "FTVA",
    iconName: BlockTagIcons.SvgIconGuest,
    isSelected: false,
}

export const FTVASelected = FTVATemplate.bind({})
FTVASelected.args = {
    title: "FTVA",
    iconName: BlockTagIcons.SvgIconGuest,
    isSelected: true,
}

function DLCTemplate(args) {
    return {
        provide() {
            return {
                theme: computed(() => "dlc"),
            }
        },
        setup() {
            return { args }
        },
        data() {
            return {
                isSelected: args.isSelected,
            }
        },
        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { BlockRemoveSearchFilterFunkhaus },
        template:
            '<block-remove-search-filter-funkhaus v-bind="args" :is-selected="isSelected" @onClick="handleClick"  />',
    }
}

export const DLC = DLCTemplate.bind({})
DLC.args = {
    title: "Funkhaus DLC",
    isSelected: false,
}

export const DLCSelected = DLCTemplate.bind({})
DLCSelected.args = {
    title: "Funkhaus DLC Selected",
    isSelected: true,
}

export const DLCSelectedWithIcon = DLCTemplate.bind({})
DLCSelectedWithIcon.args = {
    title: "Funkhaus DLC Selected",
    iconName: BlockTagIcons.SvgIconGuest,
    isSelected: true,
}

export const DLCWithMultipleLabels = DLCTemplate.bind({})
DLCWithMultipleLabels.args = {
    title: ["This", "One", "Has", "Multiple", "Labels"],
    isSelected: false,
}
