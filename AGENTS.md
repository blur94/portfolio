# AGENTS.md
Universal AI collaboration instructions for all coding agents (Claude Code, Cursor, Windsurf, ChatGPT, etc.).

---

## Startup Protocol

Before writing any code or making any decisions, read these files in order:

1. `PLAN.md` - current project state and active tasks
2. `DECISIONS.md` - frozen architectural and product decisions
3. `CHANGELOG.md` - completed work history
4. `STYLE.md` - compact style and implementation-pattern reference

Then briefly summarize what you understand about the current project state before proceeding.

---

## Project Overview

Personal developer portfolio - **portfolio** - built with Next.js App Router (TypeScript), Tailwind CSS, and shadcn/ui. Designed desktop-first (1440px canvas) with a dark-first aesthetic. Contact form uses Resend for email delivery. Animations via GSAP and Motion (Framer).

Key pages: Home, Works, Works > View, Contact, About Me. Design tokens are documented in `DESIGN.md`; compact style guidance is documented in `STYLE.md`.

---

## File Responsibilities

| File | Purpose |
|------|---------|
| `PLAN.md` | Active working memory - what is being built right now |
| `DECISIONS.md` | Frozen decisions - things that are settled and should not change |
| `CHANGELOG.md` | Historical record - completed implementation work |
| `DESIGN.md` | Design tokens, typography, color, spacing - single source of truth for all visual decisions |
| `STYLE.md` | Compact style and implementation-pattern reference derived from the repo |

---

## Core Behavioral Rules

- **Never override frozen decisions** in `DECISIONS.md` unless the user explicitly instructs you to.
- **Always read `DESIGN.md`** before making any visual or UI decisions. Do not deviate from its tokens without approval.
- **Use `STYLE.md`** as the compact reference for visual identity, stack boundaries, and reusable implementation patterns.
- **Keep implementation consistent** with existing architecture described in `DECISIONS.md`.
- **Prefer incremental changes** over full rewrites. If a rewrite is necessary, flag it explicitly and ask first.
- **Avoid assumptions from previous chats**. The repo files are the source of truth, not conversation history.
- **Remove completed tasks** from `PLAN.md` after they are done. Do not let it accumulate stale entries.
- **Do not invent requirements**. If something is unclear, ask before implementing.
- **Prefer typed, explicit, maintainable code** over clever shortcuts.

---

## End-of-Session Workflow

At the end of every implementation session, update the following files:

### PLAN.md
- Remove tasks that were completed
- Update the status/context of in-progress work
- Add any newly discovered tasks or complications

### DECISIONS.md
- Record any new architectural or product decisions that were made
- Include the date, decision, reasoning, and implications

### CHANGELOG.md
- Record completed implementation work under `## Unreleased`
- Use developer-facing, concise language

---

## What Belongs Where

**In PLAN.md:** what you're building right now, acceptance criteria, deferred ideas (Parking Lot section)

**In DECISIONS.md:** technology choices, structural patterns, anything you'd explain to a new engineer joining the project

**In CHANGELOG.md:** features added, bugs fixed, things changed or removed, completed milestones

**In DESIGN.md:** all visual decisions - colors, typography, spacing, border-radius, icons

**In STYLE.md:** compact implementation-facing style guidance derived from `DESIGN.md` and current code

**Not in any file:** temporary debug notes, speculative ideas (use Parking Lot in `PLAN.md` instead)

---

<!-- ═══════════════════════════════════════════════════════════════
     MULTI-AGENT ORG UPGRADE
     The sections below extend this file for use with a self-organizing
     multi-agent org (CEO → HR → Researcher → Worker → QA).
     ═══════════════════════════════════════════════════════════════ -->

## Agent Registry

**HR must read this table before employing any agent.**
**Researcher must check this table before drafting a spec for a new agent.**

If an agent already exists that fits the task, use it. Commission a new one only
when no existing agent scores adequately for fit against the current task.

| Agent | File | Specialization | Last Used | QA Pass Rate |
|-------|------|---------------|-----------|-------------|
| ui-stylist | `.claude/agents/ui-stylist.md` | Visual/CSS restyling of React/TSX components using Tailwind + inline style props | 2026-05-24 | 3/3 (100%) |
| registry-component-integrator | `.claude/agents/registry-component-integrator.md` | shadcn registry component installation and narrow React/TypeScript UI integration | 2026-05-22 | approved after rework (0/1 first-pass) |
| next-lint-migrator | `.claude/agents/next-lint-migrator.md` | Next.js lint command and ESLint CLI migration with narrow tooling scope | 2026-05-22 | 1/1 (100%) |
| animation-lint-reworker | `.claude/agents/animation-lint-reworker.md` | Narrow lint fixes inside existing React animation components | 2026-05-22 | 1/1 (100%) |
| plinth-data-assets-integrator | `.claude/agents/plinth-data-assets-integrator.md` | Plinth redesign data transcription and public asset integration with narrow data-layer scope | 2026-05-29 | 3/3 (100%) |
| plinth-page-assembler | `.claude/agents/plinth-page-assembler.md` | Plinth redesign Next.js route/page assembly using existing data, components, and style rules | 2026-05-29 | 3/3 (100%) |

> **Org agents** (CEO, HR, Researcher, QA) live globally at `~/.claude/agents/` and are available in every project.
> **Specialist agents** (e.g. ui-stylist) live per-project at `.claude/agents/` and are tuned to this codebase.
> New specialist agent definitions are written by HR to `.claude/agents/`, not into this file.
> HR updates this table after every session with the agent's last-used date and QA pass rate.

---

## Agent Org Protocol

This section describes the multi-agent org structure for this repository.
All agents must read this section at session start before beginning any work.

### Roles and Responsibilities

**CEO**
- Receives the task from the engineer.
- Decomposes it into phases and delegates each phase to HR.
- Synthesizes the final output from QA-approved worker outputs.
- Never implements directly.
- Reads: `PLAN.md`, `DECISIONS.md`. Writes: `PLAN.md` (task decomposition).

**HR Agent**
- Reads the Agent Registry above before making any hiring decision.
- Consults Researcher to assess which existing agents fit the task and which gaps exist.
- Employs existing agents or commissions new ones based on Researcher's scoring.
- Assigns each agent an explicit scope, toolset, and success criteria.
- Writes new agent definitions to `.claude/agents/` on demand.
- Updates the Agent Registry (above) after every session.
- Reads: `AGENTS.md` (registry + protocol), `DECISIONS.md` (routing rules), `PLAN.md`.
- Writes: `AGENTS.md` (registry), `.claude/agents/` (new agent definitions), `PLAN.md` (active agents section).

**Researcher Agent**
- Audits the codebase and the Agent Registry before HR makes any hiring decision.
- Scores existing agents for fit against the current task.
- If no agent fits, drafts a spec for a new one and hands it to HR.
- Reads `CHANGELOG.md` to understand patterns already established in this codebase.
- Reads: `AGENTS.md` (registry), `CHANGELOG.md`, `DECISIONS.md`, relevant codebase files.
- Writes: agent specs (handed to HR; not committed directly to the registry).

**Worker Agents**
- Spawned by HR. In Claude Code, definitions live in `.claude/agents/` (or `~/.claude/agents/` for org agents).
- Either pre-existing or written on demand by HR based on Researcher's spec.
- Execute in parallel (sub-agents) or with peer coordination (Agent Teams) per the routing rules in `DECISIONS.md`.
- Reads: assigned scope from HR, relevant codebase files.
- Writes: implementation output within their assigned scope only.

**QA Agent**
- Reviews worker output against the original task spec before CEO synthesizes.
- Flags rework to HR if output does not meet acceptance criteria.
- Updates the QA Pass Rate column in the Agent Registry after each review.
- Only passes work to CEO when all outputs meet acceptance criteria.
- Reads: original task spec (`PLAN.md`), worker outputs.
- Writes: `AGENTS.md` (pass rates), `CHANGELOG.md` (completed task summaries at end-of-session).

### Tool Portability

The **workflow pattern** (CEO → HR → parallel workers → QA) is portable to any AI runtime
that exposes delegation or subagent primitives. The **file layout** is not — each tool has
its own convention for where agent definitions live:

| Tool | Subagent capability | Agent definition location |
|------|---------------------|--------------------------|
| Claude Code | `Agent` tool — isolated context, configurable tools, returns to parent | `~/.claude/agents/` (global) · `.claude/agents/` (per-project) |
| GitHub Copilot (VS Code) | `runSubagent` / `agent` tool path, parallel orchestration | Copilot extension agent API |
| Codex | `spawn_agent`, `send_input`, `wait_agent`, `close_agent` primitives | Runtime-specific; varies by Codex client |

When adapting this org chain to a non-Claude Code runtime: map each role (CEO, HR,
Researcher, Worker, QA) to that runtime's subagent invocation mechanism, and translate
agent definitions to the tool's native format. The `PLAN.md` / `AGENTS.md` / `DECISIONS.md`
repo files remain the shared memory layer regardless of which tool is orchestrating.

> **Do not treat any tool's subagent feature set as frozen.** Copilot, Codex, and other
> tools are evolving quickly. Verify current capabilities against each tool's own docs
> before assuming a feature is absent.

### Escalation Path

1. HR assigns workers as parallel sub-agents (default).
2. If the escalation trigger is met (see `DECISIONS.md` → Agent Routing Decisions), HR switches to Agent Teams for the affected phases.
3. QA reviews all worker outputs before passing to CEO.
4. CEO synthesizes and delivers to the engineer.
5. HR updates the Agent Registry. QA writes the session summary to `CHANGELOG.md`.
