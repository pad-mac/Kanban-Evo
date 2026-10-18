# Agent instructions

## Canonical source

- `src/main.js` is the current executable source snapshot.
- `src/styles.css` is the current stylesheet source.
- Do not edit generated files in `dist/`; run `npm run build` instead.

## Non-negotiable behavioral invariants

1. **Never intercept Obsidian behavior globally when the behavior belongs to Kanban.** Keyboard handlers such as undo/redo must be scoped to the active Kanban view.
2. **Never write to a card by a stale positional path.** Persistent card editors must resolve the current canonical card by stable runtime identity before mutation. If identity cannot be resolved, refuse the write rather than risk changing a neighboring card.
3. **Managed metadata is not part of the editable Live Preview body.** Date, priority, configured category tags, story points, and assignment metadata are projected out of the editor and reconstructed when writing Markdown.
4. **Relay collaboration must not overwrite newer local editor content with stale echoes.** Preserve the existing echo/revision protections.
5. **Swimlane Markdown contract:** H2 (`##`) headings are columns; H3 (`###`) headings are swimlanes repeated under columns.
6. **Outside an active Kanban board, the plugin must have no behavioral effect on normal Markdown editing.**
7. **ZotFlow's database is read-only for this plugin.** `KbZf*` code opens the IndexedDB database `zotflow-dev` without a version, never creates it, closes every connection after reading and on `versionchange`, and never writes to it. Collection inboxes only add cards; they never remove or edit existing ones.
8. Prefer conservative changes. This snapshot grew through many incremental fixes; regression safety is more important than architectural elegance during feature work.

## Current metadata contract

Examples:

```markdown
- [ ] [start::2026-10-18] [due::2026-10-22] #P1 #Research [assignee::Jane Doe] Card title
```

The visible card editor should show only the human-facing card body. Managed metadata is represented through the card header controls.

Priorities:
- P1 = high
- P2 = medium
- P3 = blue (`#4e75ed`)

Assignment initials use the first letters of the first two words of the selected member name.

## Swimlanes

Canonical Markdown shape:

```markdown
## Todo

### Research
- [ ] A

### Admin
- [ ] B

## Doing

### Research
- [ ] C

### Admin
```

Swimlane operations must preserve card identity, live editors, global undo/redo, and Relay state.

## ZotFlow collection inbox

Board settings keys: `zotflow-collection` (`libraryID:collectionKey`), `zotflow-inbox` (list title, default `Inbox`), `zotflow-imported` (item keys already imported; a deleted card's item is not re-added). Sub-collections are included. Triggers: board open or setting change, the workspace event `zotflow-evo:collections-changed` from ZotFlow Evo, and the metadata of a source note appearing (`zotero-key` / `library-id` frontmatter) for an item that had none yet. Cards are `- [ ] [[source note]]` links in the vault's link format; on swimlane boards they go to the first swimlane.

## Verification after changes

At minimum:

```bash
npm run check
npm run build
```

Then test inside Obsidian:
- open/reopen a large board
- edit multiline/link-heavy cards
- undo/redo after blur, picker changes, and card moves
- drag within and across swimlanes, including drop-after-last
- Relay simultaneous editing if collaboration code changed
- ordinary Markdown `Ctrl/Cmd+Z` outside Kanban if keyboard code changed
- mobile focus and horizontal/vertical scrolling if layout/editor code changed
