Hard security rules for AI agents.

If generated code violates this file, the agent must stop, explicitly call out the violation, and rewrite the solution safely.

Never generate production code with ant of following:

- `eval()`;
- `new Function()`;
- `innerHTML = userInput`;
- direct rendering of unescaped user content;
- SQL string concatenation with user input;
- raw LLM output rendered as trusted HTML;
- secrets committed to source files;
- `console.log` in production code.

Console output is allowed only for local scripts, tests, or temporary debugging that is removed before final code.

## SQL and database safety

Always use parameterized queries.

Allowed:

- Prisma-style parameterized API if Prisma is introduced later by explicit decision;
- MariaDB prepared statements with `?` placeholders;
- repository methods that parameterize internally.

Example:

```js
await db.query('select * from articles where id = ? and deleted_at is null', [articleId]);
```

Forbidden:
await db.query(`select * from articles where id = ${articleId}`);

Regex safety

Escape user input before using it in RegExp.

Example:
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = new RegExp(escapeRegex(userInput), 'i');

HTML escaping
	•	Escape user-generated content before rendering.
	•	Markdown output must be sanitized before rendering as HTML.
	•	Comments must not render raw HTML from users unless an explicit sanitizer allow-list exists.
	•	Never assign user content to innerHTML.

Authorization before mutation

Before every mutation, check permissions.

Required rule for user-owned resources:
session.user.id === resource.userId
For admin-only mutations:
session.user.role === 'ADMIN'

Mutations include:
	•	create;
	•	update;
	•	delete;
	•	archive;
	•	publish;
	•	moderate;
	•	reorder;
	•	attach/detach relationship;
	•	trigger AI action that stores output.

Admin session rule

Admin panel actions are allowed only when the current session is authenticated as the administrator.

Do not rely on hidden form fields, client-side flags, cookies without server validation, or route names as proof of admin access.

Rate limits

AI endpoints must be rate-limited.

Default limits:
	•	Anonymous users: 10 AI requests per hour per IP.
	•	Authenticated users: 60 AI requests per hour per user.
	•	Admin: 120 AI requests per hour.
	•	Failed AI requests: maximum 20 failed attempts per hour per IP.

Comment submission limits:
	•	Anonymous users: 5 comments per 10 minutes per IP.
	•	Authenticated users: 20 comments per 10 minutes per user.

Login limits:
	•	5 failed login attempts per 15 minutes per IP.

LLM safety
	•	Treat LLM output as untrusted.
	•	Validate output shape before use.
	•	Sanitize generated HTML or Markdown before rendering.
	•	Do not send secrets, tokens, passwords, or private server configuration to the LLM.
	•	Do not expose raw prompts or provider stack traces to public users.

Soft delete

All tables that support deletion must use deleted_at.

Physical deletion is allowed only after 30 days and only through an explicit cleanup process.

Logging
	•	Do not use console.log in production code.
	•	Do not log passwords, tokens, session IDs, raw cookies, or personal data.
	•	Infrastructure errors should be logged through the project logger.
	•	User-facing errors must be safe and generic. 