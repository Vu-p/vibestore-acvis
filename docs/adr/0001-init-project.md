# ADR-0001: Architecture Decision Record - Base Project Tech Stack

## Status
Accepted

## Context
We need a TypeScript Node.js project foundation that is fast, modern, strictly typed, and equipped with engineering skills for agent-assisted workflows.

## Decision
- Language: TypeScript 5.x with `strict: true` and ESM `NodeNext` resolution.
- Runtime: Node.js (v20+ / v24).
- Testing: Built-in Node.js test runner (`node:test`, `node:assert/strict`).
- Dev Tooling: `tsx` for TypeScript execution without compilation overhead during development.
- Agent Skills: Matt Pocock's engineering skills in `.agents/skills` with local markdown issue tracking in `.scratch/`.

## Consequences
- High type safety across all codebase modules.
- Fast zero-extra-dependency testing.
- Ready for agent-driven planning, spec drafting (`/to-spec`), tickets (`/to-tickets`), and TDD (`/tdd`).
