import type Anthropic from '@anthropic-ai/sdk'
import { generateStructured, type JsonSchema } from './anthropic'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SocialLinks = {
  instagram?: string
  linkedin?: string
  twitter?: string
  youtube?: string
  facebook?: string
}

export type PageContent = {
  home?: string
  about?: string
  services?: string
  contact?: string
}

export type PolicyParams = {
  refundDays?: string
  physicalProducts?: boolean
  paymentGateways?: string
  recurringBilling?: boolean
  specialLegal?: string
}

export type PluginInputs = {
  businessName: string
  cssPrefix: string // e.g. "ngf"
  pluginSlug: string // e.g. "nextgen-fusion"
  websiteUrl: string // e.g. "nextgenfusion.in"
  logoUrl: string
  tagline?: string
  description?: string
  contactEmail?: string
  whatsapp?: string // full number, no +
  country?: string
  targetAudience?: string
  social?: SocialLinks
  pageContent?: PageContent
  policy?: PolicyParams
  extraPages?: string // free-text description of any extra pages
}

export type Palette = {
  bg: string
  primary: string
  accent: string
  surface: string
  palette: string[]
}

export type PluginFile = { path: string; content: string }

export type GeneratedPlugins = {
  slug: string
  prefix: string
  pages: PluginFile[]
  hf: PluginFile[]
}

// ---------------------------------------------------------------------------
// Page registry — a fixed contract both the per-page calls and the main plugin
// file follow, so cross-file references resolve deterministically.
// ---------------------------------------------------------------------------

type PageDef = {
  key: string
  title: string
  slugKind: 'home' | 'fixed'
  slug: string // "home" => "[prefix]-home"; "fixed" => literal
}

const PAGE_REGISTRY: PageDef[] = [
  { key: 'home', title: 'Home', slugKind: 'home', slug: 'home' },
  { key: 'about_us', title: 'About Us', slugKind: 'fixed', slug: 'about-us' },
  { key: 'services', title: 'Services', slugKind: 'fixed', slug: 'services' },
  { key: 'contact', title: 'Contact', slugKind: 'fixed', slug: 'contact' },
  { key: 'privacy_policy', title: 'Privacy Policy', slugKind: 'fixed', slug: 'privacy-policy' },
  { key: 'terms_of_service', title: 'Terms of Service', slugKind: 'fixed', slug: 'terms-of-service' },
  { key: 'terms_and_conditions', title: 'Terms & Conditions', slugKind: 'fixed', slug: 'terms-and-conditions' },
  { key: 'refund_policy', title: 'Refund & Return Policy', slugKind: 'fixed', slug: 'refund-policy' },
  { key: 'cancellation_policy', title: 'Cancellation Policy', slugKind: 'fixed', slug: 'cancellation-policy' },
  { key: 'shipping_policy', title: 'Shipping & Delivery Policy', slugKind: 'fixed', slug: 'shipping-policy' },
]

function resolveSlug(prefix: string, def: PageDef): string {
  return def.slugKind === 'home' ? `${prefix}-home` : def.slug
}

function pageFunctionName(prefix: string, key: string): string {
  return `${prefix}_page_content_${key}`
}

// ---------------------------------------------------------------------------
// JSON schemas (structured outputs — no length constraints, additionalProps:false)
// ---------------------------------------------------------------------------

const FILE_SCHEMA: JsonSchema = {
  type: 'object',
  properties: { content: { type: 'string' } },
  required: ['content'],
  additionalProperties: false,
}

const PAGE_FN_SCHEMA: JsonSchema = {
  type: 'object',
  properties: { php: { type: 'string' } },
  required: ['php'],
  additionalProperties: false,
}

const PALETTE_SCHEMA: JsonSchema = {
  type: 'object',
  properties: {
    bg: { type: 'string' },
    primary: { type: 'string' },
    accent: { type: 'string' },
    surface: { type: 'string' },
    palette: { type: 'array', items: { type: 'string' } },
  },
  required: ['bg', 'primary', 'accent', 'surface', 'palette'],
  additionalProperties: false,
}

// ---------------------------------------------------------------------------
// Brief parsing — free-text blob -> structured form fields
// ---------------------------------------------------------------------------

export type ParsedBrief = {
  businessName: string
  cssPrefix: string
  pluginSlug: string
  websiteUrl: string
  logoUrl: string
  tagline: string
  description: string
  contactEmail: string
  whatsapp: string
  country: string
  targetAudience: string
  social: { instagram: string; linkedin: string; twitter: string; youtube: string; facebook: string }
  pageContent: { home: string; about: string; services: string; contact: string }
  policy: {
    refundDays: string
    physicalProducts: boolean
    paymentGateways: string
    recurringBilling: boolean
    specialLegal: string
  }
  extraPages: string
}

const PARSE_SCHEMA: JsonSchema = {
  type: 'object',
  properties: {
    businessName: { type: 'string' },
    cssPrefix: { type: 'string' },
    pluginSlug: { type: 'string' },
    websiteUrl: { type: 'string' },
    logoUrl: { type: 'string' },
    tagline: { type: 'string' },
    description: { type: 'string' },
    contactEmail: { type: 'string' },
    whatsapp: { type: 'string' },
    country: { type: 'string' },
    targetAudience: { type: 'string' },
    social: {
      type: 'object',
      properties: {
        instagram: { type: 'string' },
        linkedin: { type: 'string' },
        twitter: { type: 'string' },
        youtube: { type: 'string' },
        facebook: { type: 'string' },
      },
      required: ['instagram', 'linkedin', 'twitter', 'youtube', 'facebook'],
      additionalProperties: false,
    },
    pageContent: {
      type: 'object',
      properties: {
        home: { type: 'string' },
        about: { type: 'string' },
        services: { type: 'string' },
        contact: { type: 'string' },
      },
      required: ['home', 'about', 'services', 'contact'],
      additionalProperties: false,
    },
    policy: {
      type: 'object',
      properties: {
        refundDays: { type: 'string' },
        physicalProducts: { type: 'boolean' },
        paymentGateways: { type: 'string' },
        recurringBilling: { type: 'boolean' },
        specialLegal: { type: 'string' },
      },
      required: ['refundDays', 'physicalProducts', 'paymentGateways', 'recurringBilling', 'specialLegal'],
      additionalProperties: false,
    },
    extraPages: { type: 'string' },
  },
  required: [
    'businessName',
    'cssPrefix',
    'pluginSlug',
    'websiteUrl',
    'logoUrl',
    'tagline',
    'description',
    'contactEmail',
    'whatsapp',
    'country',
    'targetAudience',
    'social',
    'pageContent',
    'policy',
    'extraPages',
  ],
  additionalProperties: false,
}

const PARSE_SYSTEM = `You are a data-extraction assistant for a WordPress plugin generator.
You receive a free-form text brief about a business (it may be messy, pasted from notes, emails, or
a chat) and you map it onto a fixed set of form fields. Rules:
- Extract ONLY what the text states or strongly implies. NEVER invent businesses, URLs, emails, or
  numbers that are not present.
- For any field with no information in the text, return an empty string "" (or false for booleans).
- Do not fill cssPrefix or pluginSlug unless the text explicitly gives them — leave them "" so they
  can be auto-derived from the business name later.
- whatsapp: digits only including country code, no "+", spaces, or dashes (e.g. "919876543210").
- contactEmail: a single email address only.
- websiteUrl: bare domain or full URL exactly as given.
- logoUrl: only an https image URL if one is explicitly present; otherwise "".
- social.*: the full profile URL or handle as given; "" if absent.
- pageContent.home/about/services/contact: copy the relevant descriptive content from the brief,
  lightly cleaned but NOT rewritten or expanded — that happens later.
- policy.physicalProducts: true if the business ships/sells physical goods. policy.recurringBilling:
  true if there are subscriptions or recurring charges. Infer conservatively; default false.
- policy.refundDays: just the number of days if stated (e.g. "7"), else "".
- extraPages: any additional pages requested beyond the standard set, as free text.
Return ONLY the JSON object.`

export async function parseBrief(text: string): Promise<ParsedBrief> {
  const { data } = await generateStructured<ParsedBrief>({
    system: PARSE_SYSTEM,
    prompt: `Extract the structured fields from this brief:\n\n${text}`,
    schema: PARSE_SCHEMA,
    maxTokens: 4000,
  })
  return data
}

// ---------------------------------------------------------------------------
// Palette extraction (vision)
// ---------------------------------------------------------------------------

const PALETTE_SYSTEM =
  'You are a brand designer. You will be shown a logo image. Extract EVERY distinct color ' +
  'visible in the logo as hex codes. Then choose semantic roles strictly from those colors: ' +
  '"bg" = the darkest or most background-like color in the logo; "primary" = the dominant ' +
  'foreground/text color; "accent" = the highlight/contrast color; "surface" = a slightly ' +
  'lighter variant of the background color. STRICT RULE: do not invent any color that is not ' +
  'present in the logo. Return all hex values uppercase (e.g. "#1A2B3C"). "palette" must list ' +
  'every distinct color you found.'

export async function extractPalette(logoUrl: string): Promise<Palette> {
  const content: Anthropic.ContentBlockParam[] = [
    { type: 'image', source: { type: 'url', url: logoUrl } },
    {
      type: 'text',
      text:
        'Analyse this logo and return the color palette as JSON with keys bg, primary, ' +
        'accent, surface, and palette (array of every distinct hex color in the logo).',
    },
  ]

  try {
    const { data } = await generateStructured<Palette>({
      system: PALETTE_SYSTEM,
      prompt: content,
      schema: PALETTE_SCHEMA,
      maxTokens: 2000,
    })
    return data
  } catch (err) {
    // Some hosts block hotlinking — fall back to base64.
    const b64 = await fetchImageBase64(logoUrl)
    const fallback: Anthropic.ContentBlockParam[] = [
      { type: 'image', source: { type: 'base64', media_type: b64.mediaType, data: b64.data } },
      {
        type: 'text',
        text:
          'Analyse this logo and return the color palette as JSON with keys bg, primary, ' +
          'accent, surface, and palette (array of every distinct hex color in the logo).',
      },
    ]
    const { data } = await generateStructured<Palette>({
      system: PALETTE_SYSTEM,
      prompt: fallback,
      schema: PALETTE_SCHEMA,
      maxTokens: 2000,
    })
    return data
  }
}

type Base64Image = { mediaType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp'; data: string }

async function fetchImageBase64(url: string): Promise<Base64Image> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch logo image (${res.status})`)
  const ct = res.headers.get('content-type') || ''
  const mediaType: Base64Image['mediaType'] = ct.includes('jpeg')
    ? 'image/jpeg'
    : ct.includes('gif')
      ? 'image/gif'
      : ct.includes('webp')
        ? 'image/webp'
        : 'image/png'
  const buf = Buffer.from(await res.arrayBuffer())
  return { mediaType, data: buf.toString('base64') }
}

// ---------------------------------------------------------------------------
// System prefix — the fixed spec + brand context + palette. Identical across
// every per-file call in a generation, so it is cached.
// ---------------------------------------------------------------------------

function buildSystemPrefix(inputs: PluginInputs, palette: Palette): string {
  const prefix = inputs.cssPrefix
  const slug = inputs.pluginSlug
  const social = inputs.social ?? {}
  const policy = inputs.policy ?? {}
  const page = inputs.pageContent ?? {}

  const socialLines = Object.entries(social)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `  ${k}: ${v}`)
    .join('\n') || '  (none provided — omit social icons where a link is absent)'

  const registryLines = PAGE_REGISTRY.map(
    (p) =>
      `  - key="${p.key}" title="${p.title}" slug="${resolveSlug(prefix, p)}" ` +
      `content-function="${pageFunctionName(prefix, p.key)}()"`,
  ).join('\n')

  return `You are an expert WordPress plugin developer. You generate complete, production-ready,
self-contained WordPress plugins with all styling baked in as HTML/CSS — NO Elementor, NO page
builder. Every file you return must be complete with no placeholder comments or "..." omissions.

OUTPUT CONTRACT: You always reply with ONLY the JSON object requested for the specific file or
page asked about. Never wrap code in markdown fences. The JSON string value contains the raw file
or PHP contents verbatim.

══════════════════════════ BRAND CONTEXT ══════════════════════════
Business name:        ${inputs.businessName}
CSS class prefix:     ${prefix}      (prepend "${prefix}-" to EVERY CSS class)
Plugin slug prefix:   ${slug}
Website URL:          ${inputs.websiteUrl}
Logo URL:             ${inputs.logoUrl}
Tagline:              ${inputs.tagline ?? ''}
What the business does:
${inputs.description ?? ''}
Contact email:        ${inputs.contactEmail ?? ''}
WhatsApp (no +):      ${inputs.whatsapp ?? ''}
Country / law:        ${inputs.country ?? ''}
Target audience:      ${inputs.targetAudience ?? ''}
Social links:
${socialLines}

PAGE CONTENT PROVIDED BY THE CLIENT (use, expand, and structure professionally):
  HOME:     ${page.home ?? '(use brand description to craft compelling content)'}
  ABOUT:    ${page.about ?? '(use brand description)'}
  SERVICES: ${page.services ?? '(derive from brand description)'}
  CONTACT:  ${page.contact ?? '(use the contact details above)'}

POLICY PARAMETERS (use these to write accurate, legally-complete policy pages):
  Refund window (days):        ${policy.refundDays ?? 'not specified'}
  Physical products involved:  ${policy.physicalProducts ? 'yes' : 'no'}
  Payment gateways:            ${policy.paymentGateways ?? 'not specified'}
  Subscription / recurring:    ${policy.recurringBilling ? 'yes' : 'no'}
  Special legal requirements:  ${policy.specialLegal ?? 'none'}
${inputs.extraPages ? `  Extra pages requested:       ${inputs.extraPages}\n` : ''}
══════════════════════════ COLOR SYSTEM (from the logo) ══════════════════════════
Use ONLY these colors. Define them as CSS variables in :root and use semantic aliases.
Do NOT introduce any color not in this list. The ONLY hardcoded exception anywhere is
#25D366 for the WhatsApp floating button.
  --${prefix}-bg:        ${palette.bg}
  --${prefix}-primary:   ${palette.primary}
  --${prefix}-accent:    ${palette.accent}
  --${prefix}-surface:   ${palette.surface}
  Full palette: ${palette.palette.join(', ')}
Also expose each distinct palette color as --${prefix}-color-1, --${prefix}-color-2, etc.

FONTS: Cinzel (serif) for ALL headings; Manrope (sans-serif) for body. Load via Google Fonts.

══════════════════════════ PAGE REGISTRY (fixed contract) ══════════════════════════
The Pages plugin creates exactly these pages. The includes/pages.php file defines one PHP
function per page (named below) that RETURNS the page's HTML string. The main plugin file calls
these functions on activation to populate page content. Follow these names exactly:
${registryLines}

PLACEHOLDER SYSTEM (used inside page content, replaced at runtime via add_filter('the_content')):
  %%BRAND_LOGO%%   -> the ${prefix.toUpperCase()}_LOGO_URL constant
  %%URL_HOME%%, %%URL_ABOUT%%, %%URL_SERVICES%%, %%URL_CONTACT%%,
  %%URL_PRIVACY%%, %%URL_TERMS%%, %%URL_TERMS_C%%, %%URL_REFUND%%,
  %%URL_CANCEL%%, %%URL_SHIPPING%%  -> get_permalink of the matching page slug

LAYOUT: every page = (1) Hero section (gradient from logo colors, eyebrow chip, large Cinzel
heading, intro paragraph) (2) feature/card/content grid (CSS Grid auto-fit minmax, fully
responsive) (3) contact CTA panel at the bottom. The Home page additionally ends with a full
footer section containing all nav links and all six policy links. Keep content full-width.`
}

// ---------------------------------------------------------------------------
// Per-unit generation
// ---------------------------------------------------------------------------

async function generateFile(
  system: string,
  instruction: string,
  maxTokens: number,
  usageAcc: UsageAcc,
): Promise<string> {
  const { data, usage } = await generateStructured<{ content: string }>({
    system,
    prompt: instruction,
    schema: FILE_SCHEMA,
    maxTokens,
  })
  usageAcc.add(usage)
  return data.content
}

type UsageAcc = { add: (u: Anthropic.Usage) => void; cacheRead: number; total: number }

function newUsageAcc(): UsageAcc {
  const acc: UsageAcc = {
    cacheRead: 0,
    total: 0,
    add(u) {
      acc.cacheRead += u.cache_read_input_tokens ?? 0
      acc.total += (u.input_tokens ?? 0) + (u.output_tokens ?? 0)
    },
  }
  return acc
}

export async function generatePluginFiles(
  inputs: PluginInputs,
  palette: Palette,
): Promise<GeneratedPlugins> {
  const prefix = inputs.cssPrefix
  const slug = inputs.pluginSlug
  const system = buildSystemPrefix(inputs, palette)
  const usage = newUsageAcc()

  // 1. Per-page content functions -> assemble includes/pages.php
  const pageFns: string[] = []
  for (const def of PAGE_REGISTRY) {
    const fnName = pageFunctionName(prefix, def.key)
    const instruction =
      `Generate the page-content PHP function for the "${def.title}" page ` +
      `(registry key "${def.key}", slug "${resolveSlug(prefix, def)}").\n` +
      `Return JSON {"php": "..."} where php is a COMPLETE PHP function:\n` +
      `function ${fnName}() { ... return the full page HTML as a NOWDOC heredoc ... }\n` +
      `Do NOT include the opening <?php tag. Prefix every CSS class with "${prefix}-". ` +
      (def.key.includes('policy') || def.key.startsWith('terms') || def.key.startsWith('refund') || def.key.startsWith('cancellation') || def.key.startsWith('shipping')
        ? `Write REAL, legally-complete policy content tailored to the brand, country, and policy parameters above (no boilerplate placeholders). `
        : `Build a premium, fully-responsive layout (hero + grid + CTA) using the baked-in HTML/CSS classes. `) +
      (def.key === 'home'
        ? `This is the HOME page: include the hero with logo, a feature grid, a 3-4 metric stats bar, a why-us section, a CTA panel, AND a full footer section with all nav links and all six policy links. `
        : '') +
      (def.key === 'contact'
        ? `Include a contact info panel (email, WhatsApp, social icons) on the left and the Contact Form 7 shortcode [contact-form-7 id="d1513a7" title="Contact form 1"] on the right. `
        : '') +
      `Use the placeholder tokens (%%URL_*%%, %%BRAND_LOGO%%) where appropriate.`

    const { data, usage: u } = await generateStructured<{ php: string }>({
      system,
      prompt: instruction,
      schema: PAGE_FN_SCHEMA,
      maxTokens: 16000,
    })
    usage.add(u)
    pageFns.push(data.php.trim())
  }

  const pagesIncludes =
    `<?php\n` +
    `// Page content functions for the ${inputs.businessName} Pages plugin.\n` +
    `// Each returns the raw HTML for one page (wrapped in wp:html at insertion time).\n` +
    `if ( ! defined( 'ABSPATH' ) ) { exit; }\n\n` +
    pageFns.join('\n\n') +
    '\n'

  // 2. Main pages plugin file
  const mainPagesPhp = await generateFile(
    system,
    `Generate the MAIN plugin file "${slug}-pages/${slug}-pages.php" for the Pages plugin.\n` +
      `Requirements: standard plugin header (Plugin Name: ${inputs.businessName} Pages; ` +
      `Description: Creates all website content pages on activation; Version 1.0.0; ` +
      `Author ${inputs.businessName}; Author URI https://${inputs.websiteUrl}/). ` +
      `Define the constant ${prefix.toUpperCase()}_LOGO_URL = '${inputs.logoUrl}' and use it everywhere. ` +
      `require_once the includes/pages.php file. On activation: for each page in the registry, ` +
      `check get_page_by_path(slug) and skip if it exists, else wp_insert_post with status=publish ` +
      `and post_content = the matching ${prefix}_page_content_* function output wrapped in ` +
      `<!-- wp:html --> ... <!-- /wp:html -->. Store created IDs in option ${prefix}_page_ids. ` +
      `Register the the_content filter that replaces %%...%% placeholders at runtime. ` +
      `Enqueue ${prefix}-pages.css + Google Fonts ONLY on plugin-created pages (check stored IDs). ` +
      `Add body class ${prefix}-page on those pages. On those pages, remove wpautop/wptexturize via ` +
      `template_redirect. Do NOT delete pages on deactivation. Return JSON {"content": "..."} with the ` +
      `full PHP file including the opening <?php tag.`,
    20000,
    usage,
  )

  // 3. Pages CSS
  const pagesCss = await generateFile(
    system,
    `Generate the stylesheet "${slug}-pages/assets/css/${prefix}-pages.css". ` +
      `Define :root variables for every logo color and the semantic aliases. Style the hero, ` +
      `feature/card grids (CSS Grid auto-fit minmax, responsive at 1024/768/540px), stats bar, ` +
      `CTA panel, and the home-page footer. Include body.${prefix}-page rules that hide the theme's ` +
      `.entry-title, force .entry-content to full width (max-width:100%; padding:0), and set the page ` +
      `background to var(--${prefix}-bg). Prefix every class with "${prefix}-". Use ONLY logo colors. ` +
      `Return JSON {"content": "..."}.`,
    16000,
    usage,
  )

  // 4. Header & Footer plugin main file
  const hfPhp = await generateFile(
    system,
    `Generate the MAIN plugin file "${slug}-hf/${slug}-hf.php" for the Header & Footer plugin.\n` +
      `Plugin header: Plugin Name: ${inputs.businessName} Header & Footer; Description: Auto-injects ` +
      `branded header and footer site-wide (configure under Appearance → ${inputs.businessName} Header ` +
      `& Footer; shortcodes [${prefix}_header] and [${prefix}_footer]); Version 1.0.0; Author ` +
      `${inputs.businessName}; Author URI https://${inputs.websiteUrl}/. ` +
      `Define ${prefix.toUpperCase()}_HF_LOGO_URL = '${inputs.logoUrl}'. Always enqueue Font Awesome ` +
      `6.4.0 + Google Fonts (Cinzel + Manrope) + ${prefix}-hf.css on every front-end page. ` +
      `Header auto-inject via wp_body_open (priority 1) with a wp_footer (priority 1) fallback, guarded ` +
      `by a global $${prefix}_hdr_injected flag to prevent double injection. Footer auto-inject via ` +
      `wp_footer (priority 5), including the WhatsApp floating button. On activation set options ` +
      `${prefix}_hf_enable_header='1' and ${prefix}_hf_enable_footer='1'. body_class filter appends ` +
      `'${prefix}-header-active' when the header is enabled. ` +
      `Settings page under Appearance → ${inputs.businessName} Header & Footer with two ON-by-default ` +
      `toggles (Enable Header / Enable Footer), saved via the admin_post_${prefix}_hf_save handler ` +
      `(check_admin_referer('${prefix}_hf_save_nonce'); use isset() so unchecked boxes save as '0'; ` +
      `then purge caches: wp_cache_flush, do_action('litespeed_purge_all'), w3tc_flush_all, ` +
      `rocket_clean_domain if available; redirect back with ${prefix}_saved=1 and show a green banner). ` +
      `Add a Settings quick-link on the Plugins page. ` +
      `Render the fixed header (logo links to home, desktop search — WooCommerce-aware, icon group with ` +
      `search toggle, cart badge when WC active, account link, hamburger), mobile nav + mobile search ` +
      `panels with close-on-outside-click, all JS inline; use the ${prefix}-hdr- class prefix. ` +
      `Render the 4-column footer (Brand+socials, Quick Links, Policies, Contact) using get_permalink, ` +
      `bottom bar "© <year> ${inputs.businessName}. Developed by NextGen Fusion" linking ` +
      `"NextGen Fusion" to https://nextgenfusionl.in, and the pulsing WhatsApp button (#25D366); use ` +
      `${prefix}-ftr- and ${prefix}-wa- prefixes. Also register [${prefix}_header] and [${prefix}_footer] ` +
      `shortcodes pointing to the same render functions. No output buffering; only wp_body_open and ` +
      `wp_footer hooks. Return JSON {"content": "..."} with the full PHP file including <?php.`,
    24000,
    usage,
  )

  // 5. Header & Footer CSS
  const hfCss = await generateFile(
    system,
    `Generate "${slug}-hf/assets/css/${prefix}-hf.css". :root defines all logo colors (only #25D366 is ` +
      `allowed as a non-logo color, for the WhatsApp button). body.${prefix}-header-active gets ` +
      `padding-top: var(--${prefix}-hdr-height) !important. .${prefix}-hdr-bar is position:fixed; top/left/right:0; ` +
      `z-index:9999; background var(--${prefix}-bg); border-bottom 1px solid var(--${prefix}-accent). ` +
      `Footer column h4::after animated underline (scaleX keyframes, accent color); footer nav links get an ` +
      `accent text-shadow glow on hover; @keyframes ${prefix}WaPulse for the WhatsApp button. Responsive at ` +
      `1024/768/540px (hamburger shows, desktop search hides, footer stacks to 1 column). Prefix every class. ` +
      `Return JSON {"content": "..."}.`,
    16000,
    usage,
  )

  console.log(
    `[wp-plugin-generator] generation complete — cache_read_input_tokens=${usage.cacheRead}, ` +
      `total_io_tokens=${usage.total}`,
  )

  return {
    slug,
    prefix,
    pages: [
      { path: `${slug}-pages/${slug}-pages.php`, content: mainPagesPhp },
      { path: `${slug}-pages/includes/pages.php`, content: pagesIncludes },
      { path: `${slug}-pages/assets/css/${prefix}-pages.css`, content: pagesCss },
    ],
    hf: [
      { path: `${slug}-hf/${slug}-hf.php`, content: hfPhp },
      { path: `${slug}-hf/assets/css/${prefix}-hf.css`, content: hfCss },
    ],
  }
}
