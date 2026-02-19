import { computed, ref, onMounted } from 'vue'

import RichText from '../lib-components/RichText.vue'
import { setupGlobalStore } from './helpers/storyHelpers'

import './PageUsingIiif.scss'

const CRAFT_API = 'https://craft.library.ucla.edu/api'

// Query for Using Digital Collections Content with IIIF page (from playground app.vue)
const STATIC_PAGE_QUERY = `
query MyQuery {
  entry(section: "dcpGeneralContentPage", uri: ["dcp/using-digital-collections-content-with-iiif"]) {
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

export default {
  title: 'Funkhaus / Pages / Using IIIF',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Page for Using Digital Collections Content with IIIF. Fetches from Craft and renders rich text.',
      },
    },
  },
}

// Fetch dcp/using-digital-collections-content-with-iiif and render rich text
export const FetchedData = () => ({
  components: {
    RichText,
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
  },
  template: `
    <div class="page-using-iiif">
      <p v-if="pending" style="padding: 1rem;">Fetching…</p>
      <p v-else-if="error" style="color: #c00; padding: 1rem;">Error: {{ error }}</p>
      <template v-else-if="entry">
        <h1>{{ entry.title }}</h1>
        <rich-text :rich-text-content="entry.summary" />
        <template v-for="block in entry.blocks" :key="block.id">
          <h2 v-if="block.sectionTitle">{{ block.sectionTitle }}</h2>
          <rich-text v-if="block.richText" :rich-text-content="block.richText" />
        </template>
      </template>
    </div>
  `,
})
