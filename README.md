# Obsidian Kanban — LiveCards / Swimlanes fork

This repository is an **agent-editable source snapshot of v6.14.0** of the customized Obsidian Kanban fork developed from the classic Kanban plugin and the Dhruv-0-Arora fork.

## Important source provenance

The customized 5.x/6.x work was developed against the plugin's compiled bundle rather than against a checked-out TypeScript repository. To avoid pretending that module boundaries exist when they do not, this repository contains the exact current runtime reconstructed into readable JavaScript in `src/main.js`, plus the current stylesheet in `src/styles.css`.

`src/main.js` is therefore the canonical source for this snapshot. It is **not** the original upstream TypeScript tree. It was parsed and reprinted from the exact v6.14 runtime bundle so that GitHub-connected coding agents can inspect, edit, diff, and refactor it normally.

A future cleanup can progressively port stable areas back into TypeScript modules without losing the current behavior.

## Build

No dependency install is required for this reconstructed snapshot.

```bash
npm run check
npm run build
```

The build creates:

```text
dist/main.js
dist/styles.css
dist/manifest.json
```

Copy those three files into the Obsidian plugin directory for testing.

## Current major custom features

- persistent Live Preview card editors instead of preview/edit mode switching
- safe live card saving and Relay realtime collaboration integration
- board-wide, view-scoped undo/redo
- card drag-out to normal Markdown notes
- card metadata header with configurable date, priority, category, story points, and assignment fields
- `[start::YYYY-MM-DD]` / `[due::YYYY-MM-DD]` date metadata
- tag-backed priorities (`#P1`, `#P2`, `#P3`), including priority card borders
- board-specific member list and `[assignee:: Name]`
- floating/toolbar search with date and priority filters
- `##` columns + `###` swimlanes, including collapse, rename, delete, reorder, and 2D drag/drop
- mobile drag/autoscroll and editor-focus fixes
- extensive lane-header / collapsed-column visual customization
- ZotFlow Evo integration: items dragged from ZotFlow's library browser become source-note link cards; a board can follow a ZotFlow collection (board settings → "ZotFlow collection") and receives new items in its inbox list

## Upstream lineage

Original project / archive:
- https://github.com/community-archive/obsidian-kanban

Dhruv feature fork used as the initial customized base:
- https://github.com/Dhruv-0-Arora/obsidian-kanban
- https://github.com/community-archive/obsidian-kanban/pull/1187

The upstream project is GPL-3.0; this derivative snapshot retains that license.

## For AI coding agents

Read `AGENTS.md` before modifying the plugin. The most important rule is that Kanban-specific keyboard/event interception must never alter behavior outside an active Kanban view.
