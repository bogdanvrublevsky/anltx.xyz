Single style guide for predictable AI-generated code.

## Naming

- Files and directories: `kebab-case`.
- Components/classes/templates: `PascalCase`.
- Functions and variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.
- Database tables and columns: `snake_case`.
- CSS classes: `kebab-case`.

## JavaScript patterns

- Prefer const function expressions over function declarations.
- Use early return / guard clauses.
- Keep functions small and focused.
- Avoid deep nesting.
- Avoid hidden side effects.
- Prefer explicit parameters over reading global state.
- Prefer named objects for functions with many parameters.
- Do not use console.log in production code.
- Avoid inline scripts.
- Keep JS on the server. Only use client JS for safe browser logic.

## Modules

- One module should have one clear responsibility.
- Keep HTTP parsing in controllers/adapters.
- Keep business rules in use cases/entities.
- Keep database queries in repositories.
- Keep Markdown parsing in content modules.
- Keep template rendering in templates or template engine modules.

## Error handling

- Use explicit domain errors for expected business failures.
- Use infrastructure errors for dependency failures.
- Do not silently catch and ignore errors.
- Do not expose raw infrastructure error messages to users.

## CSS

- CSS should be predictable and easy to scan.
- Prefer semantic class names over visual names.
- Avoid inline styles.
