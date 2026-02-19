import { computed, ref, onMounted } from 'vue'

// Craft API and static page query (ported from playground pages/index.vue)
const CRAFT_API = 'https://craft.library.ucla.edu/api'

const STATIC_PAGE_QUERY = `
query MyQuery {
  entry(section: "dcpGeneralContentPage", uri: ["dcp/about"]) {
    title
    summary
    blocks: allFpb {
        id
        typeHandle
        ... on allFpb_associatedTopicCards_BlockType {
            ...BlockAssociatedTopicCardsFragment
        }
        ... on allFpb_bannerFeatured_BlockType {
            ...BlockBannerFeaturedFragment
        }
        ... on allFpb_cardWithImage_BlockType {
            ...BlockCardWithImageFragment
        }
        ... on allFpb_highlight_BlockType {
            ...BlockHighlightFragment
        }
        ... on allFpb_impactNumbersCarousel_BlockType {
            ...BlockImpactNumbersCarouselFragment
        }
        ... on allFpb_mediaGallery_BlockType {
            ...BlockMediaGalleryFragment
        }
        ... on allFpb_mediaWithText_BlockType {
            ...BlockMediaWithTextFragment
        }
        ... on allFpb_pullQuote_BlockType {
            ...BlockPullQuoteFragment
        }
        ... on allFpb_richText_BlockType {
            ...BlockRichTextFragment
        }
        ...on allFpb_simpleCards_BlockType {
            ...BlockSimpleCardsFragment
        }
        ... on allFpb_callToAction_BlockType {
            ...BlockCallToActionFragment
        }
        ... on allFpb_form_BlockType {
            ...BlockFormFragment
        }
        ... on allFpb_impactNumberCards_BlockType {
            ...BlockImpactNumberCardsFragment
        }
    }
    image {
      ...Image
    }
  }
}
fragment Image on AssetInterface {
  id
  src: url(transform: "fullscreen")
  height(transform: "fullscreen")
  width(transform: "fullscreen")
  srcset(sizes: ["375", "960", "1280", "1920", "2560"])
  alt: altText
  focalPoint
}
fragment BlockAssociatedTopicCardsFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    associatedTopicsFlexiblePageBlock {
        ... on associatedTopicsFlexiblePageBlock_associatedTopics_BlockType {
            id
            topics {
                title
                typeHandle
                externalResourceUrl
                uri
                text: summary
                uri
                iconName: illustrationsResourcesAndServices
            }
        }
    }
}
fragment BlockBannerFeaturedFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    content: bannerFeatured {
        ... on bannerFeatured_internalContent_BlockType {
            id
            contentLink {
                contentType: sectionHandle
                title
                to: uri
                summary
                physicalDigital
                workshopOrEventSeriesType
                eventType {
                    title
                }
                eventDescription
                projectCategory: format
                articleCategory: articleCategories {
                    title
                }
                projectByline1: meapProjectTopic {
                    ... on meapProjectTopics_Category {
                        id
                        title
                    }
                }
                startDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                startDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                articleByline1: staffMember {
                    id
                    slug
                    uri
                    url
                    title
                }
                articleByline2: postDate
                articleLocations: associatedLocations {
                    id
                    title
                    to: uri
                    uri
                }
                projectLocations: region {
                    ... on meapProjectRegion_Category {
                        id
                        title
                    }
                }
                heroImage {
                    ... on heroImage_heroImage_BlockType {
                        image {
                            ...Image
                        }
                    }
                }
            }
        }
        ... on bannerFeatured_externalContent_BlockType {
            id
            image {
                ...Image
            }
            title: titleGeneral
            summary
            alignment
            byline1
            byline2
            to: buttonUrl
            category
            contentType
        }
    }
}
fragment BlockCardWithImageFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    cardWithImage {
        id
        ... on cardWithImage_internalContent_BlockType {
            id
            typeHandle
            contentLink {
                id
                contentType: sectionHandle
                to: uri
                title
                text: summary
                eventDescription
                projectCategory: format
                articleCategory: articleCategories {
                    title
                }
                projectByline1: meapProjectTopic {
                    ... on meapProjectTopics_Category {
                        id
                        title
                    }
                }
                articleByline1: staffMember {
                    id
                    to: uri
                    title
                }
                articleByline2: postDate
                ongoing
                startDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                startDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                eventType {
                    ... on eventType_Category {
                        id
                        title
                    }
                }
                associatedLocations {
                    id
                    title
                    to: uri
                    uri
                }
                projectLocations: region {
                    ... on meapProjectRegion_Category {
                        id
                        title
                    }
                }
                heroImage {
                    ... on heroImage_heroImage_BlockType {
                        id
                        image {
                            ...Image
                        }
                        altText
                    }
                }
            }
        }
        ... on cardWithImage_externalContent_BlockType {
            id
            typeHandle
            title: titleGeneral
            image {
                ...Image
            }
            byline1
            byline2
            category
            text: summary
            to: externalLink
        }
    }
}
fragment BlockHighlightFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    highlight {
        ... on highlight_internalContent_BlockType {
            id
            typeHandle
            contentLink {
                id
                contentType: sectionHandle
                to: uri
                title
                text: summary
                eventDescription
                projectCategory: format
                articleCategory: articleCategories {
                    title
                }
                projectByline1: meapProjectTopic {
                    ... on meapProjectTopics_Category {
                        id
                        title
                    }
                }
                articleByline1: staffMember {
                    id
                    to: uri
                    title
                }
                articleByline2: postDate
                ongoing
                startDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                startDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                eventType {
                    ... on eventType_Category {
                        id
                        title
                    }
                }
                associatedLocations {
                    id
                    title
                    to: uri
                    uri
                }
                projectLocations: region {
                    ... on meapProjectRegion_Category {
                        id
                        title
                    }
                }
                heroImage {
                    ... on heroImage_heroImage_BlockType {
                        id
                        image {
                            ...Image
                        }
                        altText
                    }
                }
            }
        }
        ... on highlight_externalContent_BlockType {
            id
            typeHandle
            title: titleGeneral
            image {
                ...Image
            }
            byline1
            byline2
            category
            text: summary
            to: externalLink
        }
    }
}
fragment BlockImpactNumbersCarouselFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    blocks: impactNumbersCarousel {
        ... on impactNumbersCarousel_impactNumbersCarousel_BlockType {
            id
            largeText: impactNumber
            mediumText: impactText
            smallDescriptor: summary
            image {
                ...Image
            }
        }
    }
}
fragment BlockMediaGalleryFragment on ElementInterface {
    dataId: id
    sectionTitle: titleGeneral
    sectionSummary: summary
    mediaGallery {
        dataId: id
        captionTitle: captionHeading
        captionText: caption
        altText
        sortOrder
        ... on mediaGallery_image_BlockType {
            item: imageFile {
                ...MediaAsset
            }
        }
        ... on mediaGallery_audio_BlockType {
            item: audioFile {
                ...MediaAsset
            }
            embedCode: audioEmbedCode
            coverImage {
              ...MediaAsset
            }
        }
        ... on mediaGallery_video_BlockType {
            item: videoFile {
                ...MediaAsset
            }
            embedCode: embedCode
            coverImage {
              ...MediaAsset
            }
        }
    }
}
fragment BlockMediaWithTextFragment on ElementInterface {
    dataId : id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    mediaWithText {
        ... on mediaWithText_mediaEmbed_BlockType {
            titleLink: titleEmbed
            description
            coverImage {
                ...MediaAsset
            }
            buttonText
            buttonUrl
            embedCode
            typeMedia
        }
        ... on mediaWithText_mediaUpload_BlockType {
            titleUpload
            description
            buttonText
            buttonUrl
            coverImage {
                ...MediaAsset
            }
            item: upload {
                ...MediaAsset
            }
            typeMedia
        }
    }
}
fragment BlockPullQuoteFragment on ElementInterface {
    id
    typeHandle
    pullQuote {
        ... on pullQuote_pullQuote_BlockType {
            text
            attribution
        }
    }
}
fragment BlockRichTextFragment on ElementInterface {
    richText
    typeHandle
    sectionTitle: titleGeneral
}
fragment BlockSimpleCardsFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    cards: simpleCards {
        ... on simpleCards_internalServiceOrResource_BlockType {
            id
            typeHandle
            contentLink {
                id
                uri
                slug
                title
                summary
                externalResourceUrl
            }
        }
        ... on simpleCards_externalServiceOrResource_BlockType {
            id
            typeHandle
            title: titleGeneral
            summary
            externalLink
        }
    }
}
fragment BlockCallToActionFragment on ElementInterface {
    id
    typeHandle
    callToAction {
        ... on callToAction_callToAction_BlockType {
            id
            titleCta
            summary
            icon
            buttonText
            buttonUrl: buttonLink
            backgroundColor
        }
    }
}
fragment BlockFormFragment on ElementInterface {
    id
    form
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
}
fragment BlockImpactNumberCardsFragment on ElementInterface {
    id
    typehandle
    sectionSummary: summary
    sectionTitle: titleGeneral
    impactNumberCards {
        ... on impactNumberCards_impactNumberCard_BlockType {
            id
            title: titleGeneral
            text: description
            impactNumber
        }
    }
}
fragment MediaAsset on AssetInterface {
  dataId: id
  src: url(transform: "fullscreen")
  srcset(sizes: ["375", "960", "1280", "1920", "2560"])
  height(transform: "fullscreen")
  width(transform: "fullscreen")
  title
  focalPoint
  kind
  type: mimeType
  alt: altText
}`

/** Run GraphQL query against Craft API (no Nuxt $fetch in Storybook). */
async function runQuery (query, variables = {}) {
  const res = await fetch(CRAFT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const data = await res.json()
  if (data?.errors) {
    return { status: res.status, ok: res.ok, data: { ...data } }
  }
  return { status: res.status, ok: res.ok, data }
}

// Import components
import FooterPrimary from '../lib-components/FooterPrimary.vue'
import FooterSock from '../lib-components/FooterSock.vue'
import BannerFeatured from '../lib-components/BannerFeatured.vue'
import HeaderSmart from '../lib-components/HeaderSmart.vue'
import NavSearch from '../lib-components/NavSearch.vue'

// Import mock data
import {
  getMockGlobalNavSearch,
  setupGlobalStore,
} from './helpers/storyHelpers'
import { mockPageAbout } from '@/stories/mock/Funkhaus/MockPageAbout'

// Import styles
import './PageAbout.scss'

export default {
  title: 'Funkhaus / Pages / Page About',
  component: {},
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
                    'A single page layout with header, main content area, and footer. This serves as a template for about pages.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['default', 'dlc'],
      description: 'Theme variant for the page',
    },
  },
}

// Template function for the main landing page
function Template(args) {
  return {
    components: {
      FooterPrimary,
      FooterSock,
      BannerFeatured,
      HeaderSmart,
      NavSearch,
    },
    provide() {
      return {
        theme: computed(() => args.theme || 'dlc'),
      }
    },
    setup() {
      // Set up global store with mock header navigation
      setupGlobalStore()

      const mockGlobalNavSearch = getMockGlobalNavSearch()

      const { missionData, aboutData, questionsData } = mockPageAbout

      return {
        args,
        mockGlobalNavSearch,
        missionData,
        aboutData,
        questionsData,
      }
    },
    template: `
      <div class="about-page">
        <!-- Header -->
        <HeaderSmart />

        <div class="search-field-composite-wrapper">
          <NavSearch
            :show-divider="true"
            :dropdown-options="mockGlobalNavSearch.dropdownOptions"
            :dropdown-default-value="mockGlobalNavSearch.dropdownDefaultValue"
            :placeholder="mockGlobalNavSearch.placeholder"
            bottom-text=""
            :bottom-link="null"
          />
        </div>

        <main class="main-content">
          <!-- Our Mission Section -->
          <BannerFeatured
            class="mission-section color-help"
            :media="missionData.image"
            :title="missionData.title" 
            :description="missionData.description"
            :align-right="missionData.alignRight"
          />
          <!-- About UCLA Library Section -->
          <BannerFeatured
            class="about-section color-visit"
            :media="aboutData.image"
            :title="aboutData.title"
            :description="aboutData.description"
            :align-right="aboutData.alignRight"
          />
          <!-- Have Other Questions Section -->
          <BannerFeatured
            class="questions-section"
            :media="questionsData.image"
            :title="questionsData.title"
            :description="questionsData.description"
            :secondary-buttons="questionsData.secondaryButtons"
            :align-right="questionsData.alignRight"
          />
        </main>
        
        <!-- Footer -->
        <FooterPrimary />
        <!-- Footer Sock -->
        <FooterSock />
      </div>
    `,
  }
}

// Default story
export const Default = Template.bind({})
Default.args = {
  theme: 'dlc',
}

// Test story: fetch dcp/about via STATIC_PAGE_QUERY and render BannerFeatured blocks
export const FetchedData = () => ({
  components: {
    BannerFeatured,
  },
  setup() {
    setupGlobalStore()
    const pending = ref(true)
    const result = ref(null)
    const error = ref(null)
    onMounted(async () => {
      try {
        const out = await runQuery(STATIC_PAGE_QUERY, {})
        result.value = out
      } catch (e) {
        error.value = e?.message ?? String(e)
      } finally {
        pending.value = false
      }
    })
    return { pending, result, error }
  },
  provide() {
    return {
      theme: computed(() => 'dlc'),
    }
  },
  computed: {
    entry() {
      return this.result?.data?.data?.entry ?? this.result?.data?.entry ?? null
    },
    parsedItems() {
      const blocks = this.entry?.blocks ?? []
      return blocks
    }
  },
  template: `
    <div class="about-page">
      <p v-if="pending">Fetching…</p>
      <p v-else-if="error" style="color: #c00; padding: 1rem;">Error: {{ error }}</p>
      <template v-else>
        <p v-if="parsedItems.length === 0" style="padding: 1rem;">No banner blocks.</p>
        <BannerFeatured
          v-for="block in parsedItems"
          :key="block.id"
          :title="block.content[0].title"
          :description="block.content[0].summary"
          :media="block.content[0].image[0]"
          :align-right="block.content[0].alignment === 'right'"
        />
      </template>
    </div>
  `,
})
