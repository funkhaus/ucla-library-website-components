import { ref } from "vue"
import PanelAnchorNav from "@/lib-components/PanelAnchorNav.vue"

/**
 * A panel component that displays anchor navigation with toggle functionality.
 *
 * Props:
 * - <b>title</b>: A string representing the title of the navigation block
 * - <b>items</b>: An array of objects containing label and to properties for navigation items
 * - <b>isOpened</b>: A boolean to control whether the panel is open or closed
 *
 * Events:
 * - <b>openPanel</b>: Emitted when the panel open button is clicked
 * - <b>closePanel</b>: Emitted when the panel close button is clicked
 */
export default {
    title: "Funkhaus / PanelAnchorNav",
    component: PanelAnchorNav,
    argTypes: {
        title: {
            control: "text",
            description: "Title of the navigation block",
        },
        items: {
            control: "object",
            description:
                "Array of navigation items with label and to properties",
        },
        isOpened: {
            control: "boolean",
            description: "Controls whether the panel is open or closed",
        },
        openPanel: {
            action: "openPanel",
            description: "Emitted when the panel open button is clicked",
        },
        closePanel: {
            action: "closePanel",
            description: "Emitted when the panel close button is clicked",
        },
    },
    decorators: [
        () => ({
            template: "<story />",
        }),
    ],
}

function Template(args) {
    return {
        setup() {
            const isOpened = ref(args.isOpened)

            const handleOpenPanel = () => {
                isOpened.value = true
                args.openPanel()
            }

            const handleClosePanel = () => {
                isOpened.value = false
                args.closePanel()
            }

            return {
                args,
                isOpened,
                handleOpenPanel,
                handleClosePanel,
            }
        },
        components: { PanelAnchorNav },
        template:
            '<PanelAnchorNav v-bind="args" :isOpened="isOpened" @openPanel="handleOpenPanel" @closePanel="handleClosePanel" />',
    }
}

function RealPageTemplate(args) {
    return {
        setup() {
            const isOpened = ref(args.isOpened)

            const handleOpenPanel = () => {
                isOpened.value = true
                args.openPanel()
            }

            const handleClosePanel = () => {
                isOpened.value = false
                args.closePanel()
            }

            return {
                args,
                isOpened,
                handleOpenPanel,
                handleClosePanel,
            }
        },
        components: { PanelAnchorNav },
        template: `
            <div class="real-page-scenario">
                <!-- Header -->
                <header class="page-header">
                    <h1>UCLA Library Documentation</h1>
                    <p>Complete guide to using the UCLA Library system</p>
                </header>

                <!-- Main Content -->
                <main class="page-content">
                    <section id="introduction" class="content-section">
                        <h2>Introduction</h2>
                        <p>Welcome to the comprehensive documentation for the UCLA Library system. This guide covers everything you need to know about accessing, searching, and utilizing our vast collection of resources.</p>
                        <p>The UCLA Library system provides access to millions of books, journals, databases, and digital resources. Whether you're a student, faculty member, or researcher, this documentation will help you make the most of our services.</p>
                    </section>

                    <section id="getting-started" class="content-section">
                        <h2>Getting Started</h2>
                        <p>Before you begin using the UCLA Library system, you'll need to set up your account and familiarize yourself with our basic services.</p>
                        <h3>Account Setup</h3>
                        <p>To access library resources, you'll need a valid UCLA ID or library card. Students and faculty automatically have access, while community members can apply for a library card.</p>
                        <h3>First Steps</h3>
                        <p>Once you have your credentials, you can start exploring our collections through the online catalog, databases, and special collections.</p>
                    </section>

                    <section id="searching" class="content-section">
                        <h2>Searching the Library</h2>
                        <p>Our library system offers multiple ways to search for materials, from basic keyword searches to advanced research tools.</p>
                        <h3>Basic Search</h3>
                        <p>Use the main search bar to find books, articles, and other materials by title, author, or subject.</p>
                        <h3>Advanced Search</h3>
                        <p>For more precise results, use our advanced search features to filter by date, format, language, and other criteria.</p>
                    </section>

                    <section id="databases" class="content-section">
                        <h2>Databases and Journals</h2>
                        <p>UCLA Library provides access to thousands of academic databases and journals covering all disciplines.</p>
                        <h3>Popular Databases</h3>
                        <p>Access major databases like JSTOR, ProQuest, Web of Science, and many more through our A-Z database list.</p>
                        <h3>Journal Access</h3>
                        <p>Find and access academic journals through our journal finder or by browsing subject-specific collections.</p>
                    </section>

                    <section id="special-collections" class="content-section">
                        <h2>Special Collections</h2>
                        <p>Explore our unique special collections, including rare books, manuscripts, archives, and digital collections.</p>
                        <h3>Rare Books</h3>
                        <p>Our rare book collection includes first editions, limited printings, and historically significant works.</p>
                        <h3>Archives</h3>
                        <p>Access primary source materials through our extensive archival collections.</p>
                    </section>

                    <section id="services" class="content-section">
                        <h2>Library Services</h2>
                        <p>Beyond books and databases, UCLA Library offers a wide range of services to support your research and learning.</p>
                        <h3>Research Support</h3>
                        <p>Get help with your research through consultations with subject librarians, workshops, and online guides.</p>
                        <h3>Technology Services</h3>
                        <p>Access computers, printers, scanners, and other technology resources in our library spaces.</p>
                    </section>

                    <section id="locations" class="content-section">
                        <h2>Library Locations</h2>
                        <p>UCLA Library consists of multiple locations across campus, each with unique collections and services.</p>
                        <h3>Powell Library</h3>
                        <p>Our main undergraduate library, featuring study spaces, computer labs, and general collections.</p>
                        <h3>Charles E. Young Research Library</h3>
                        <p>The main research library with extensive collections and specialized research services.</p>
                    </section>

                    <section id="help" class="content-section">
                        <h2>Getting Help</h2>
                        <p>Need assistance? We're here to help you succeed with your research and learning goals.</p>
                        <h3>Ask a Librarian</h3>
                        <p>Get help through chat, email, phone, or in-person consultations with our expert librarians.</p>
                        <h3>Research Guides</h3>
                        <p>Explore subject-specific research guides created by our librarians to help you get started.</p>
                    </section>

                    <section id="contact" class="content-section">
                        <h2>Contact Information</h2>
                        <p>Get in touch with us for questions, feedback, or assistance with your library needs.</p>
                        <h3>General Inquiries</h3>
                        <p>Email: library@ucla.edu | Phone: (310) 825-4321</p>
                        <h3>Hours</h3>
                        <p>Check our website for current hours of operation for all library locations.</p>
                    </section>
                </main>

                <!-- PanelAnchorNav Component -->
                <PanelAnchorNav 
                    v-bind="args" 
                    :isOpened="isOpened" 
                    @openPanel="handleOpenPanel" 
                    @closePanel="handleClosePanel" 
                />
            </div>
        `,
    }
}

// Normal usage stories
export const Default = Template.bind({})
Default.args = {
    title: "Quick Navigation:",
    items: [
        { label: "Overview", to: "#overview" },
        { label: "Features", to: "#features" },
        { label: "Documentation", to: "#documentation" },
        { label: "Contact", to: "#contact" },
    ],
    isOpened: false,
}

export const Opened = Template.bind({})
Opened.args = {
    title: "Quick Navigation:",
    items: [
        { label: "Overview", to: "#overview" },
        { label: "Features", to: "#features" },
        { label: "Documentation", to: "#documentation" },
        { label: "Contact", to: "#contact" },
    ],
    isOpened: true,
}

export const MultipleItems = Template.bind({})
MultipleItems.args = {
    title: "Table of Contents:",
    items: [
        { label: "Introduction", to: "#introduction" },
        { label: "Getting Started", to: "#getting-started" },
        { label: "Installation", to: "#installation" },
        { label: "Configuration", to: "#configuration" },
        { label: "Usage Examples", to: "#usage-examples" },
        { label: "API Reference", to: "#api-reference" },
        { label: "Troubleshooting", to: "#troubleshooting" },
        { label: "FAQ", to: "#faq" },
    ],
    isOpened: false,
}

export const ManyItems = Template.bind({})
ManyItems.args = {
    title: "Complete Documentation Index:",
    items: [
        { label: "Getting Started", to: "#getting-started" },
        { label: "Installation Guide", to: "#installation-guide" },
        { label: "Quick Start Tutorial", to: "#quick-start" },
        { label: "Basic Configuration", to: "#basic-config" },
        { label: "Advanced Configuration", to: "#advanced-config" },
        { label: "Environment Setup", to: "#env-setup" },
        { label: "Development Environment", to: "#dev-env" },
        { label: "Production Deployment", to: "#prod-deploy" },
        { label: "API Overview", to: "#api-overview" },
        { label: "Authentication", to: "#auth" },
        { label: "User Management", to: "#user-management" },
        { label: "Data Models", to: "#data-models" },
        { label: "Database Schema", to: "#db-schema" },
        { label: "Query Examples", to: "#query-examples" },
        { label: "CRUD Operations", to: "#crud" },
        { label: "File Uploads", to: "#file-uploads" },
        { label: "Image Processing", to: "#image-processing" },
        { label: "Email Integration", to: "#email" },
        { label: "Payment Processing", to: "#payments" },
        { label: "Third-party Integrations", to: "#integrations" },
        { label: "Webhooks", to: "#webhooks" },
        { label: "Real-time Features", to: "#realtime" },
        { label: "Caching Strategies", to: "#caching" },
        { label: "Performance Optimization", to: "#performance" },
        { label: "Security Best Practices", to: "#security" },
        { label: "Error Handling", to: "#error-handling" },
        { label: "Logging and Monitoring", to: "#logging" },
        { label: "Testing Strategies", to: "#testing" },
        { label: "Unit Tests", to: "#unit-tests" },
        { label: "Integration Tests", to: "#integration-tests" },
        { label: "End-to-End Tests", to: "#e2e-tests" },
        { label: "CI/CD Pipeline", to: "#cicd" },
        { label: "Docker Configuration", to: "#docker" },
        { label: "Kubernetes Deployment", to: "#kubernetes" },
        { label: "Cloud Deployment", to: "#cloud-deploy" },
        { label: "Scaling Strategies", to: "#scaling" },
        { label: "Load Balancing", to: "#load-balancing" },
        { label: "Database Optimization", to: "#db-optimization" },
        { label: "Backup and Recovery", to: "#backup" },
        { label: "Disaster Recovery", to: "#disaster-recovery" },
        { label: "Compliance and Regulations", to: "#compliance" },
        { label: "GDPR Compliance", to: "#gdpr" },
        { label: "Accessibility Guidelines", to: "#accessibility" },
        { label: "Internationalization", to: "#i18n" },
        { label: "Localization", to: "#l10n" },
        { label: "Mobile Optimization", to: "#mobile" },
        { label: "Progressive Web App", to: "#pwa" },
        { label: "Offline Functionality", to: "#offline" },
        { label: "Push Notifications", to: "#push-notifications" },
        { label: "Analytics Integration", to: "#analytics" },
        { label: "SEO Optimization", to: "#seo" },
        { label: "Content Management", to: "#cms" },
        { label: "User Experience Design", to: "#ux-design" },
        { label: "Design System", to: "#design-system" },
        { label: "Component Library", to: "#components" },
        { label: "Style Guide", to: "#style-guide" },
        { label: "Brand Guidelines", to: "#brand" },
        { label: "API Documentation", to: "#api-docs" },
        { label: "SDK Documentation", to: "#sdk-docs" },
        { label: "Plugin Development", to: "#plugins" },
        { label: "Custom Extensions", to: "#extensions" },
        { label: "Migration Guides", to: "#migrations" },
        { label: "Version History", to: "#versions" },
        { label: "Changelog", to: "#changelog" },
        { label: "Roadmap", to: "#roadmap" },
        { label: "Community Guidelines", to: "#community" },
        { label: "Contributing Guide", to: "#contributing" },
        { label: "Code of Conduct", to: "#code-of-conduct" },
        { label: "Support Channels", to: "#support" },
        { label: "Troubleshooting Guide", to: "#troubleshooting" },
        { label: "Common Issues", to: "#common-issues" },
        { label: "FAQ", to: "#faq" },
        { label: "Contact Information", to: "#contact" },
        { label: "Feedback and Suggestions", to: "#feedback" },
        { label: "Feature Requests", to: "#feature-requests" },
        { label: "Bug Reports", to: "#bug-reports" },
        { label: "Release Notes", to: "#release-notes" },
        { label: "Deprecation Notices", to: "#deprecation" },
        { label: "Breaking Changes", to: "#breaking-changes" },
        { label: "Upgrade Guide", to: "#upgrade" },
        { label: "Legacy Support", to: "#legacy" },
        { label: "Architecture Overview", to: "#architecture" },
        { label: "System Requirements", to: "#requirements" },
        { label: "Dependencies", to: "#dependencies" },
        { label: "License Information", to: "#license" },
        { label: "Privacy Policy", to: "#privacy" },
        { label: "Terms of Service", to: "#terms" },
        { label: "Acknowledgments", to: "#acknowledgments" },
        { label: "Credits", to: "#credits" },
    ],
    isOpened: false,
}

// Panel state variations
export const PanelOpenedWithContent = Template.bind({})
PanelOpenedWithContent.args = {
    title: "Navigation Menu:",
    items: [
        { label: "Home", to: "#home" },
        { label: "About", to: "#about" },
        { label: "Services", to: "#services" },
        { label: "Contact", to: "#contact" },
    ],
    isOpened: true,
}

export const PanelClosed = Template.bind({})
PanelClosed.args = {
    title: "Navigation Menu:",
    items: [
        { label: "Home", to: "#home" },
        { label: "About", to: "#about" },
        { label: "Services", to: "#services" },
        { label: "Contact", to: "#contact" },
    ],
    isOpened: false,
}

// Real page scenario stories
export const RealPageScenario = RealPageTemplate.bind({})
RealPageScenario.args = {
    title: "Page Navigation:",
    items: [
        { label: "Introduction", to: "#introduction" },
        { label: "Getting Started", to: "#getting-started" },
        { label: "Searching the Library", to: "#searching" },
        { label: "Databases and Journals", to: "#databases" },
        { label: "Special Collections", to: "#special-collections" },
        { label: "Library Services", to: "#services" },
        { label: "Library Locations", to: "#locations" },
        { label: "Getting Help", to: "#help" },
        { label: "Contact Information", to: "#contact" },
    ],
    isOpened: false,
}

export const RealPageWithManySections = RealPageTemplate.bind({})
RealPageWithManySections.args = {
    title: "Complete Guide:",
    items: [
        { label: "Introduction", to: "#introduction" },
        { label: "Getting Started", to: "#getting-started" },
        { label: "Account Setup", to: "#account-setup" },
        { label: "First Steps", to: "#first-steps" },
        { label: "Searching the Library", to: "#searching" },
        { label: "Basic Search", to: "#basic-search" },
        { label: "Advanced Search", to: "#advanced-search" },
        { label: "Databases and Journals", to: "#databases" },
        { label: "Popular Databases", to: "#popular-databases" },
        { label: "Journal Access", to: "#journal-access" },
        { label: "Special Collections", to: "#special-collections" },
        { label: "Rare Books", to: "#rare-books" },
        { label: "Archives", to: "#archives" },
        { label: "Library Services", to: "#services" },
        { label: "Research Support", to: "#research-support" },
        { label: "Technology Services", to: "#technology-services" },
        { label: "Library Locations", to: "#locations" },
        { label: "Powell Library", to: "#powell-library" },
        { label: "Charles E. Young Research Library", to: "#charles-young" },
        { label: "Getting Help", to: "#help" },
        { label: "Ask a Librarian", to: "#ask-librarian" },
        { label: "Research Guides", to: "#research-guides" },
        { label: "Contact Information", to: "#contact" },
        { label: "General Inquiries", to: "#general-inquiries" },
        { label: "Hours", to: "#hours" },
    ],
    isOpened: false,
}

// Add CSS for real page scenario
const style = document.createElement("style")
style.textContent = `
.real-page-scenario {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.page-header {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: white;
    padding: 60px 40px;
    margin: -20px -20px 40px -20px;
    border-radius: 0 0 20px 20px;
    text-align: center;
}

.page-header h1 {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
    font-weight: 700;
}

.page-header p {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.9;
}

.page-content {
    display: grid;
    gap: 40px;
}

.content-section {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
}

.content-section h2 {
    font-size: 2rem;
    color: #1f2937;
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 3px solid #3b82f6;
    font-weight: 600;
}

.content-section h3 {
    font-size: 1.3rem;
    color: #374151;
    margin: 30px 0 15px 0;
    font-weight: 600;
}

.content-section p {
    font-size: 1rem;
    margin: 0 0 15px 0;
    color: #4b5563;
}

.content-section p:last-child {
    margin-bottom: 0;
}

/* Responsive design */
@media (max-width: 768px) {
    .real-page-scenario {
        padding: 15px;
    }
    
    .page-header {
        padding: 40px 20px;
        margin: -15px -15px 30px -15px;
    }
    
    .page-header h1 {
        font-size: 2rem;
    }
    
    .content-section {
        padding: 30px 20px;
    }
    
    .content-section h2 {
        font-size: 1.5rem;
    }
}
`
document.head.appendChild(style)
