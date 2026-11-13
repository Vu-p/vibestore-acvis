# Agent Instructions

## Project Overview
This is a TypeScript Node.js project (`ts-node-app`) running on modern Node.js with ESM modules, strict TypeScript configuration, and Matt Pocock's engineering agent skills.

## Development Workflow
- `npm run build`: Compile TypeScript to `dist/`
- `npm run dev`: Run in watch mode using `tsx`
- `npm start`: Run the compiled entrypoint (`dist/index.js`)
- `npm test`: Run unit tests via Node.js test runner (`node:test`)
- `npm run typecheck`: Perform type-checking with `tsc --noEmit`

## Coding Standards
- Strictly typed TypeScript; avoid using `any`.
- Keep modules clean and decoupled.
- Write unit tests alongside implementation.

## Agent skills

### Issue tracker
Local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels
Default five canonical triage roles. See `docs/agents/triage-labels.md`.

### Domain docs
Single-context repo (`GLOSSARY.md` + `docs/adr/`). See `docs/agents/domain.md`.
