import { computed } from "vue"
import router from "@/router"
import ButtonRemoveSearchFilter from "@/lib-components/ButtonRemoveSearchFilter"
import { ButtonTagIcons } from "@/types/components/buttonTag.types"

export default {
    title: "Funkhaus / Button Remove Search Filter",
    component: ButtonRemoveSearchFilter,
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
        components: { ButtonRemoveSearchFilter },
        template: `
        <button-remove-search-filter
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
        components: { ButtonRemoveSearchFilter },
        template: `
        <button-remove-search-filter
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
            return { isSelected: false, iconName: ButtonTagIcons.SvgIconGuest }
        },
        methods: {
            handleClick() {
                this.isSelected = !this.isSelected
            },
        },
        components: { ButtonRemoveSearchFilter },
        template: `
        <button-remove-search-filter
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
        components: { ButtonRemoveSearchFilter },
        template: `
        <button-remove-search-filter
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
        components: { ButtonRemoveSearchFilter },
        template:
            '<button-remove-search-filter v-bind="args" :is-selected="isSelected" @onClick="handleClick"  />',
    }
}

export const FTVA = FTVATemplate.bind({})
FTVA.args = {
    title: "FTVA",
    iconName: ButtonTagIcons.SvgIconGuest,
    isSelected: false,
}

export const FTVASelected = FTVATemplate.bind({})
FTVASelected.args = {
    title: "FTVA",
    iconName: ButtonTagIcons.SvgIconGuest,
    isSelected: true,
}
