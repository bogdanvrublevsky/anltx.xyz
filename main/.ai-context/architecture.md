This document explains why `anltx.xyz` is organized this way.

## Confirmed architecture decisions

- Runtime: Node.js.
- HTTP server and routing: built-in Node.js `http` module.
- Backend framework: none.
- Frontend framework: none.
- Template system: custom server-side templating written inside the project.
- Database: MariaDB.
- Article storage: Markdown files.
- Comment storage: Markdown files.
- Database responsibility: relationships, indexes, metadata, moderation state, sessions, and links between content entities.
- Admin model: one author.
- Comment visibility: comments require moderation before public display.
- Dynamic analytical markup (dam): automatic detection of event elements that should be tracked.

## Why native Node.js and custom templates

The project intentionally avoids large frameworks to keep the codebase simple, inspectable, and predictable for both humans and AI agents.

The application should not become a SPA. Pages are rendered on the server and sent as HTML. Client-side JavaScript is allowed only for small UX improvements and admin-panel interactions.

Do not add dependencies for routing, rendering, or SPA behavior.

## Clean architecture principle

Code should be organized by responsibility, not by framework convention.

Suggested boundaries:

src/
  entities/          # Domain entities and domain rules
  use-cases/         # Application actions and business workflows
  adapters/          # HTTP, database, file system, Redis, LLM adapters
  server/            # Native HTTP server, router, request lifecycle
  controllers/       # Convert HTTP requests to use-case calls
  repositories/      # Data access interfaces and implementations
  templates/         # Server-rendered templates
  template-engine/   # Custom template rendering logic
  content/           # Markdown parsing and content preparation
  dynamic-analytics-markup/  # Detection of trackable event elements
  comments/          # Comment-specific domain logic
  forms/             # Form-specific domain logic
  admin/             # Admin-panel-specific controllers and views
  utils/             # Small shared utilities

Entities - Entities contain business meaning and rules that do not depend on HTTP, MariaDB, Redis, Markdown files, or LLM providers.

Use cases - Use cases describe what the application does.

Use cases may call repositories and adapters, but should not know HTTP request/response details.

Adapters - Adapters connect the application to the outside world.

Adapters should be replaceable without rewriting domain logic.

Data flow: public article page
  HTTP request
  -> router
  -> controller
  -> renderArticlePage use case
  -> article repository reads Markdown file + metadata from MariaDB
  -> content service parses Markdown
  -> analytical markup service detects trackable event elements
  -> template engine renders HTML
  -> HTTP response

Data flow: comment submission
  HTTP request
  -> router
  -> controller
  -> submitComment use case
  -> validation and spam checks
  -> authorization/session check if required
  -> comment Markdown file is created
  -> MariaDB stores relationship and moderation metadata
  -> comment is hidden until approved
  -> HTTP response with success or validation error

Data flow: admin article editing
  HTTP request
  -> router
  -> admin auth middleware
  -> controller
  -> create/update article use case
  -> validate input
  -> write Markdown content
  -> update MariaDB metadata and indexes
  -> redirect or render admin response 