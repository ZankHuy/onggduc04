# Ong Thị Đức · Marketing Executive

A Vietnamese editorial portfolio rebuilt from the existing Sleep Well scroll experience and the user's public Drive collection. Plain HTML, CSS, JavaScript and a local optional Three.js renderer. No framework, dependency install or build step required. Published output is `dist`.

## Content and editing

- `dist/index.html`: introduction, wavy portal, approach, three concept dossiers, films, complete archive and opening-book closing scene.
- `dist/portfolio-data.js`: all 52 source records, titles, groups, original filenames/Drive links, three projects and featured films. Edit project copy and grouping here.
- `dist/portfolio.css`: portfolio art direction and responsive rules. `dist/style.css` retains shared foundation, portal and book styles.
- `dist/app.js`: native-scroll choreography, project/film controls, filters, accent-insensitive search, paginated archive, image zoom and media dialogs.
- `dist/portal-motion.js`: existing shared portal profile, camera projection and continuous easing, preserved from the approved spiral revision.
- `dist/media`: 43 image pairs, seven full-length MP4s, seven short muted previews/posters and PDF feature images.
- `dist/documents`: Flora Valley (42 pages) and The Ori brochure (2 pages).
- `content/source-inventory.json`: recursive source-folder inventory and media mapping. Empty source folders are recorded but create no invented portfolio content.

The supplied folder contained 52 files across 15 folders, including two shortcuts resolved to their actual video targets. All 52 originals were downloaded before processing (about 1,016 MB), including duplicate files retained as separate archive records. Original downloads are in `/workspace/scratch/a7d6eb758e71/portfolio-source/originals`; their permanent source links are retained in the data/inventory. Web assets are committed in this repository. Owner identity, bio, capabilities and work responsibilities now come from the supplied Word outline and CV PDF. Project descriptions remain tied to the supplied media, and evidence is grouped by the Word hyperlinks. Certificate templates in the asset collection are not treated as earned credentials.

## Motion and loading

The original 18-ring wavy spiral, depth-staggered winding, continuous logarithmic travel and cream exit remain. Renderer selection happens before entry; a late GPU import cannot replace an already-visible CSS portal. CSS perspective and Three.js share camera/profile math. New scenes add portrait/sheet parallax, line-by-line typography, a three-project horizontal journey, five scroll-selected featured films and the retained opening book.

Thumbnails use centered cover cropping; the full viewer uses contain and image zoom for tall documents. Image sources supported by the browser include SVG, JPG, JPEG, PNG and WebP; this Drive collection's raster images were normalized to WebP. Source MOV/video files were transcoded to H.264/AAC MP4 with faststart. All seven videos retain their complete original durations (12–185 seconds, checked against originals with ffprobe). Low-resolution nine-second muted previews load independently; full video files load only when opened. Off-scene previews pause. Images lazy-load; the archive initially renders 16 entries and loads 16 more on request. The Ori web PDF is rasterized at 144 dpi to fit the hosting per-file limit; the unchanged original remains linked on Drive. Flora Valley retains its original PDF text.

Desktop/tablet/mobile use the same normalized scroll timeline with responsive composition. Reduced-motion preferences flatten the project journey, remove parallax and pause automatic video previews. Keyboard access, native dialogs, image previous/next arrows, source downloads and visible focus states are provided.

## Validation

`npm test` checks portal projection/continuity across viewport sizes, near-plane safety, smooth exit, expressive winding, renderer-selection continuity, all 52 data entries, asset existence, project references and per-file hosting limits. `node --check dist/app.js` checks JavaScript syntax. Media duration/resolution and both PDF page counts were independently checked before publishing.

Browser checks cover desktop opening/projects, project dossiers, nested media dialogs, image zoom/next, archive filtering/search/load-more through all 52 items, full video playback, embedded PDF, and 390px mobile/768px tablet compositions. The cloud browser uses the CSS 3D path because WebGL2 is unavailable there; optional GPU playback remains a verification limit.

## Credits

Portfolio images, video and documents: user-provided Google Drive folder, linked per item. Cormorant Garamond and Be Vietnam Pro: Google Fonts (local files). Older shared styles also retain DM Sans for small English labels. Three.js r170: MIT, license bundled in `dist/vendor`. Legacy generated Sleep Well assets remain in the repository but are unused by the portfolio scenes.

## Film & Motion scroll sequence

The featured-film chapter now uses `dist/film-motion.js` for a continuous five-stop timeline. Each stop includes a viewing hold followed by a smooth overlapping handoff. Separate image panels follow a perspective sheet path with translation, depth, tilt, rotation and opacity derived from the same normalized scroll value in both directions. One muted preview video follows the active panel, so five simultaneous video decoders are not required.

Masked headline lines enter in sequence; the description, metadata, traced orbit paths, oversized index, outline typography, thumbnail progress and closing drift also follow scroll. The thumbnail strip and previous/next controls seek the same settled positions. On mobile, a scoped clipping window keeps neighboring sheets away from the heading and metadata. The pinned scene uses `overflow: clip` to prevent focus navigation from internally scrolling its content. Reduced motion uses a static selected panel and direct video selection.

`tests/film-motion.mjs` validates all five stops, responsive settled anchors, continuous monotonic handoffs, finite transforms/opacity and the final-film exit. Desktop and responsive browser checks cover cue navigation, reverse travel, active preview source, full-length video opening and the pinned region remaining at scrollTop zero.

## Word and CV alignment

The owner supplied a two-page Word content outline and a separate two-page CV PDF. Both were text-extracted and visually reviewed. All ten Word hyperlinks were resolved against the existing Drive inventory: one portrait and nine work groups, covering the remaining 51 media records without overlap. `content/word-paragraphs.json` preserves the extracted wording/links; `content/content-map.json` records each link, mapped section/media IDs and editorial notes. `dist/profile-data.js` contains the editable public owner details and exact work copy.

The narrative follows research, concept, communication planning, sales materials, project clips, creative content, OOH, event and iFactor. Seven new/reworked pinned evidence chapters use `dist/practice-motion.js`; the project and film chapters retain their approved animation systems. Evidence controls, changing captions and Event details use the same active index. Media dialogs repeat the corresponding Word responsibilities. Concept dossiers now contain only concept evidence; the archive has separate filters for all nine groups. A profile section adds the supplied bio, five capabilities, education, certification, award, experience and contact details.

CV ambiguity: the BHS range is printed T11/2025–T6/2025. Its dates are omitted rather than guessed. The CV's unlinked placeholder `hiiiiiiii` is excluded. The raw CV PDF is background context, not a public download. The portfolio includes source-backed event wording about the Andora launch and the ANmaison CEO Meeting; it does not infer additional numerical results.

`tests/content-alignment.mjs` checks all ten hyperlink targets against the inventory, verbatim descriptions against extracted Word paragraphs, complete non-overlapping work coverage, source-specific concept scopes, owner identity, exclusion of ambiguous dates and settled responsive evidence positions.

## Portal headline readability

The portal headline uses one responsive typography definition in `dist/portfolio.css` (56–112px desktop; 42–66px mobile). Legacy tiny overrides and the scroll-linked copy scale/fade are removed. The copy remains at full opacity and natural size throughout the pinned portal, changes to blue as the scene becomes cream, and leaves with the scene itself. The winding geometry, camera and ring timing are unchanged.

## October annotated review

Applied all 11 supplied annotated screenshots: removed the hero role description and bottom statistics/tagline; framed the five CV capabilities in a 5-column desktop, 3+2 tablet and 2+2+1 mobile layout; transcribed all 16 experience bullets from the newly supplied CV without summary or disclosure controls; moved 01/02/03 into the large headings; removed the small concept scope list; capitalized IFactor in the displayed training title; removed the complete archive section and its JavaScript, menu link and observer. The source evidence remains available in its corresponding work chapters and case dialogs.

The final chapter now reads “Nghĩ có chiều sâu. Làm có dấu ấn.” The book's right page reads “Hiểu đúng bài toán. Tìm ra góc nhìn. Làm rõ thông điệp. Theo sát kết quả.” The email action names the actual address. Book geometry and all approved scroll systems remain intact; its mobile width is constrained to preserve the page edges.

`content/cv-2026-10.txt` is the text extraction used by the source-copy checks. Superseding the previous omission, the latest explicit request for verbatim CV experience includes its printed BHS date range T11/2025 - T6/2025 unchanged; no corrected dates are inferred. The raw CV is not exposed as a website asset.

## Portal type zoom restored

The follow-up review restores a visible 0.34-to-1.10 scale for the complete center copy, driven by the same eased logarithmic depth phase as the rings. It keeps full opacity and the late cream/blue palette change. Reduced motion holds the readable unscaled copy. This supersedes the earlier decision to keep a constant scale; ring geometry, camera and all other chapter timing remain unchanged.
