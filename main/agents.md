Entry point for all AI working on `anltx.xyz` project.

Before generating or changing code, read the relevant context files. All the neccessary information about the project lies in `ai-context/ai-context.md`

While writing code keep strict to naming, code style, CSS rules in `ai-context/style-guide.md`, organizing rules in `ai-context/architecture.md`, database schema, relationships, indexes, soft delete rules in `ai-context/data-model.md`.

To avoid security keep to the hard security restrictions in `ai-context/security-rules.md`.

If generated code violates `ai-context/security-rules.md`, the agent must stop, call out the violation, and rewrite the solution safely.

While writing tests keep to naming `ai-context/test-specs.md` on how to generate and structure tests.

Before finalizing, verify that the change does not violate any file in `.ai-context/` catalog