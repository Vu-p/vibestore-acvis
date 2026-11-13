# ts-node-app

A TypeScript Node.js project pre-configured with **Matt Pocock's Agent Skills** (`mattpocock/skills`) for engineering-grade AI pair programming.

---

## 🛠 Tech Stack

- **Language:** TypeScript 5.x (ESM, `NodeNext`, `strict: true`)
- **Runtime:** Node.js (v20+)
- **Testing:** Node.js built-in test runner (`node:test`, `node:assert`)
- **Dev Runner:** `tsx` for hot-reloading development
- **Agent Workflows:** Matt Pocock Skills (`.agents/skills/`)

---

## 📁 Project Structure

```text
ts-node-app/
├── .agents/skills/          # Matt Pocock's skills (39 skills)
├── .scratch/                # Local markdown issue tracking & specs
├── docs/
│   ├── adr/                 # Architecture Decision Records
│   │   └── 0001-init-project.md
│   └── agents/              # Matt Pocock skills configuration
│       ├── domain.md
│       ├── issue-tracker.md
│       └── triage-labels.md
├── src/
│   ├── app.ts               # Core application logic & types
│   ├── index.ts             # Entry point
│   └── tests/
│       └── app.test.ts      # Unit tests
├── AGENTS.md                # Agent guidelines & instructions
├── GLOSSARY.md              # Domain terminology
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
Run with automatic restart on file changes:
```bash
npm run dev
```

### 3. Build & Run
```bash
# Compile TypeScript to dist/
npm run build

# Run production build
npm start
```

### 4. Run Tests
```bash
npm test
```

### 5. Type Check
```bash
npm run typecheck
```

---

## 🤖 Available Matt Pocock Skills

Installed under `.agents/skills/`:

| Skill | Purpose |
| :--- | :--- |
| `/ask-matt` | Skill router: helps choose the right workflow for your goal |
| `/grill-with-docs` | Interactive interview stress-testing your design while generating ADRs & glossary |
| `/grill-me` | Rigorous interview to sharpen ideas and edge cases |
| `/to-spec` | Synthesize current conversation into a formal specification document |
| `/to-tickets` | Break specification down into granular, actionable tickets |
| `/implement` | Execute spec implementation step-by-step |
| `/tdd` | Test-driven development loop (Red-Green-Refactor) |
| `/code-review` | Standards & spec compliance review using parallel sub-agents |
| `/diagnosing-bugs` | Structured diagnosis loop for stubborn bugs |
| `/domain-modeling` | Maintain and sharpen `GLOSSARY.md` and ADRs |
| `/setup-matt-pocock-skills`| Configuration skill for tracker & domain docs |
