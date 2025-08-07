import { computed } from "vue"
import BlockTagFunkhaus from "@/lib-components/BlockTagFunkhaus"
import {
    BlockTagIcons,
    BlockTagVariants,
} from "@/types/components/blockTag.types"

/**
 * A component to display a non-interactive tag with a label and an optional icon. <br>
 * <sub>(For an interactive tag that can be clicked to remove it from a list, try BlockRemoveSearchFilter). </sub>
 *
 * Props:
 * - <b>label</b>: A string representing the text to display in the tag
 * - <b>iconName</b>: An optional icon to display in the tag, imported from `@/types/components/BlockTag.types`
 * <sub>Valid names: `BlockTagIcons.SvgIconGuest`, `BlockTagIcons.SvgIconFilm`, `BlockTagIcons.SvgIconTV`, `BlockTagIcons.SvgIconFilmreel`, `BlockTagIcons.SvgIconDigital`, `BlockTagIcons.SvgIconOnline`, `BlockTagIcons.SvgIconFamilyFriendly`</sub>
 * - <b>variant</b>: The visual style of the tag, imported from `@/types/components/BlockTag.types`
 * <sub>Valid variants: `BlockTagVariants.Primary`, `BlockTagVariants.Secondary`</sub>
 *
 */

export default {
    title: "Funkhaus / BlockTag",
    component: BlockTagFunkhaus,
}

export function Default() {
    return {
        data() {
            return {
                props: {
                    label: "label text",
                },
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DefaultHighlighted() {
    return {
        data() {
            return {
                props: {
                    label: "label text",
                    isHighlighted: true,
                },
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DefaultWithMultipleLabels() {
    return {
        data() {
            return {
                props: {
                    label: ["Genre", "Black and White Photographs"],
                    iconName: BlockTagIcons.SvgIconFilmreel,
                },
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DefaultWithOnClick() {
    return {
        data() {
            return {
                props: {
                    label: "Clear Filter",
                    isHighlighted: true,
                    onClick: () => {
                        alert("Filter cleared!")
                    },
                },
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DefaultWithLink() {
    return {
        data() {
            return {
                props: {
                    label: "<a href='https://www.google.com'>Link to Google</a>",
                    isHighlighted: true,
                },
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function PrimaryFTVAWithMultipleLabels() {
    return {
        data() {
            return {
                props: {
                    label: ["Genre", "Black and White Photographs"],
                    iconName: BlockTagIcons.SvgIconFilmreel,
                    variant: BlockTagVariants.Primary,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function SecondaryFTVAWithMultipleLabels() {
    return {
        data() {
            return {
                props: {
                    label: ["Genre", "Black and White Photographs"],
                    iconName: BlockTagIcons.SvgIconFilmreel,
                    variant: BlockTagVariants.Secondary,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function PrimaryFTVA() {
    return {
        data() {
            return {
                props: {
                    label: "ftva label text",
                    variant: BlockTagVariants.Primary,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function SecondaryFTVA() {
    return {
        data() {
            return {
                props: {
                    label: "ftva label text",
                    iconName: BlockTagIcons.SvgIconGuest,
                    variant: BlockTagVariants.Secondary,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function SecondaryFTVANoIcon() {
    return {
        data() {
            return {
                props: {
                    label: "ghost tag",
                    variant: BlockTagVariants.Secondary,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function SecondaryFTVAHighlighted() {
    return {
        data() {
            return {
                props: {
                    label: "ftva label text",
                    variant: BlockTagVariants.Secondary,
                    isHighlighted: true,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "ftva"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DLC() {
    return {
        data() {
            return {
                props: {
                    label: "default label",
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "dlc"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DLCHighlighted() {
    return {
        data() {
            return {
                props: {
                    label: "highlighted label",
                    isHighlighted: true,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "dlc"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DLCWithMultipleLabels() {
    return {
        data() {
            return {
                props: {
                    label: ["Genre", "Black and White Photographs"],
                    iconName: BlockTagIcons.SvgIconFilmreel,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "dlc"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DLCWithOnClick() {
    return {
        data() {
            return {
                props: {
                    label: "Clear Filter",
                    isHighlighted: true,
                    onClick: () => {
                        alert("Filter cleared!")
                    },
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "dlc"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}

export function DLCWithLink() {
    return {
        data() {
            return {
                props: {
                    label: "<a href='https://www.google.com'>Link to Google</a>",
                    isHighlighted: true,
                },
            }
        },
        provide() {
            return {
                theme: computed(() => "dlc"),
            }
        },
        components: { BlockTagFunkhaus },
        template: `
            <block-tag-funkhaus
                v-bind="props"
            />
        `,
    }
}
