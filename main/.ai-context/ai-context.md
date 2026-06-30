This file explains product terms and expected behavior. AI agents should use these definitions when naming code, interpreting tasks, and generating product logic.

This project is a server-side web application for `anltx.xyz` website. 

`anltx.xyz` is a practice-oriented portal for web analysts and internet marketers.

The application serves public educational content, supports comments and forms, and gives the author an admin UI for creating and editing Markdown-based articles.

Session is a server-side authorization context that identifies the current visitor or admin.

For admin actions, the session must prove that the current user is the single authorized author/admin.

A user is a person interacting with the website.

A user can be anonymous unless he started an authentication proccess.

An Admin is a single author who can access the admin panel and mutate articles, comments, metadata, and site settings.

Article is a markdown-based content page managed through the admin UI and rendered publicly when published.

Comment is a markdown-based user response attached to an article or page.

Comments require moderation before public display.

Dynamic analytical markup (dam) is a content-processing feature that automatically detects elements that should be tracked as analytics events. May include links, buttons, forms, downloads, embedded tools, calculators, or other interactive content.

Tracked event element - an element detected by the dynamic analytical markup service as meaningful for analytics tracking.

A tracked event element should have stable identifiers and enough metadata to explain why it was marked.

## Typical user mistakes and safe interpretation

### “Delete everything”

Do not delete the workspace.

Safe interpretation: delete or archive visible items in the current scope, after confirmation if the action is destructive.

### “Remove this article”

Do not physically delete the Markdown file immediately.

Safe interpretation: soft-delete or archive the article, set `deleted_at`, and hide it from public views.

### “Publish it”

Safe interpretation: publish the current article or draft only, not all drafts.

### “Approve comments”

Safe interpretation: approve selected comments or comments in the current moderation view, not every comment globally unless explicitly stated.

### “Track all buttons”

Safe interpretation: detect candidate button elements and mark them as trackable, but do not invent business event names without rules.

### “Generate a hint”

Safe interpretation: create a non-destructive AI suggestion. Do not automatically apply changes to content, workspace items, or tracking configuration.

## AI behavior rules

- Prefer safe, reversible actions.
- Ask for confirmation before destructive mutations when the scope is unclear.
- Never treat AI output as trusted data.
- Validate and normalize LLM responses before saving or rendering.
- Cache AI answers when the prompt and context are stable.
- Do not expose raw prompts, provider errors, tokens, or internal context to public users.