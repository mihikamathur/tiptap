# Tiptap Document Editor

A modern, aesthetic rich-text editor with real-time A4 pagination, optimized for professional documents and resumes.

## 📄 Pagination Approach

The editor implements real-time pagination using the `tiptap-pagination-plus` extension, which manages a virtualized representation of A4 pages. The core logic handles the complex mapping between a single ProseMirror document and multiple physical page containers:

1.  **Virtual Page Boxing:** Instead of splitting the underlying ProseMirror document into multiple editors (which breaks undo/redo and global search), the extension uses a "Gap Widget" strategy. It injects visual spacers and page breaks into the DOM while keeping the document model contiguous.
2.  **Precise DOM Measurement:** Every document change triggers a re-calculation. The engine iterates through top-level ProseMirror nodes, measuring their rendered `offsetHeight`.
3.  **Threshold Calculation:** Using the configured page height (e.g., 1123px for A4 at 96 DPI) and margins, it calculates the cumulative height. When the next node exceeds the remaining space, a `page-break` container is inserted.
4.  **Table Row Awareness:** Tables are handled by specifically measuring row heights. If a table spans across a break, the extension ensures the table header is repeated (optional) and rows are distributed to prevent mid-cell clipping.

## ⚖️ Trade-offs & Limitations

- **DOM Reflow Headroom:** Measuring DOM heights is synchronous and can be expensive. We use a debounced approach to ensure typing remains fluid, but extremely complex layouts may show a slight delay in "repaging."
- **Sub-pixel Differences:** Browsers calculate font smoothing and line heights slightly differently. A document that perfectly fits on one page in Chrome might have a single line overflow in Safari.
- **Node-level Splitting:** Currently, the logic splits at the *node* level (i.e., between paragraphs). If a single paragraph is longer than a whole page, it requires manual intervention or specific "widows and orphans" logic which adds significant complexity.

## 🚀 Improvements with More Time

1.  **Canvas-based Ghost Rendering:** Use an off-screen Canvas or hidden DOM element to pre-calculate heights more efficiently, reducing layout thrashing on the main thread.
2.  **True PDF Export:** While the CSS is optimized for `@media print`, integrating a backend service like **Puppeteer** would allow for pixel-perfect PDF generation that bypasses browser-specific print engine quirks.
3.  **Dynamic Sections:** Support for changing margins, orientation (portrait/landscape), or page size midway through a document.
4.  **Floating Elements:** Implementing "Anchored" images or text boxes that can be positioned relative to the page rather than the text flow.

---


