# Architecture notes for the reconstructed v6.14 source

This is a reconstructed single-file runtime source, so upstream class/function names coexist with minified internal identifiers. Search by user-facing strings and class names when navigating.

## Useful search anchors

Search `src/main.js` for these strings/symbol names to locate major systems:

- `KanbanView` — Obsidian TextFileView integration and view actions
- `StateManager` — canonical board state and mutations
- `registerTextView` / `system3-relay` — Relay integration
- `Undo change in active board` — board-level history
- `Swimlanes` / `Add swimlane` — swimlane management UI
- `Delete swimlane` — swimlane deletion/migration
- `assignee::` — assignment metadata projection
- `start::` / `due::` — date metadata projection
- `#P1` / `#P2` / `#P3` — priority parsing/projection
- `+ Add card` — swimlane grid add-card UI
- `Due before` — search date filtering
- `MarkdownEditor` — embedded Live Preview editor integration

## Why this is not yet TypeScript modules

The original upstream plugin is TypeScript/Preact, but the customized fork was developed from the installed compiled plugin. Reconstructing fake module boundaries would make the repository misleading and risk losing working behavior. The safe migration path is incremental:

1. keep `src/main.js` as the behavioral reference;
2. obtain/check out the original upstream TypeScript source;
3. port one subsystem at a time into modules;
4. compare behavior against this source snapshot after each port;
5. only remove the reconstructed source when the modular build is feature-equivalent.
