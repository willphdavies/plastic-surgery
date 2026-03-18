# AGENTS Rules

## Project Structure

- Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## CSS Rule

- All components must have a container class unique to this project.
- All CSS for a component must be defined inside that container class.

## Frontend Data Rule

- Never display internal IDs in frontend UI (for example: DB IDs, request IDs, subscription IDs, queue IDs).

## SSR Rule

- Public-facing page content must not use `"use client"`.
- If client-side behavior is necessary, isolate it inside a small focused component so the page shell and public content still render via SSR.

## Feature Files

- All feature files in `features/` and `features/completed/` must use a timestamped filename format:
  - `YYYYMMDD-HHMMSS-feature-name.md`
- Do not implement any feature spec until the user explicitly says to proceed (e.g. “go ahead”, “implement”, or equivalent).
- When the user answers feature/spec clarification questions, update the relevant feature spec file immediately to reflect those decisions.

## Infra Safety

- Be very careful with production infrastructure changes.
- Avoid deleting or replacing production resources unless the user explicitly requests it.
