#This document explains how AI agents should generate tests.

## Test pyramid

Target split:

- 70% unit tests with Vitest.
- 20% integration tests with Testcontainers.
- 10% e2e tests with Playwright.

## Unit tests

Use unit tests for:

- entities;
- use cases;
- validation;
- Markdown parsing helpers;
- analytical markup detection;
- prompt building;
- error mapping.

Unit tests should be fast and deterministic.

## Integration tests

Use integration tests for:

- MariaDB repositories;
- Redis cache behavior;
- file storage for Markdown articles/comments;
- use cases that coordinate database and file system;
- native HTTP route behavior where useful.

Use Testcontainers for MariaDB and Redis.

Do not mock the database in integration tests.

## E2E tests

Use Playwright for critical user flows:

- public article page opens;
- comment can be submitted and stays hidden until moderation;
- admin can log in;
- admin can create, preview, publish, and edit an article;
- AI hint endpoint handles success, cache hit, and fallback behavior.

## AAA pattern

Structure tests as:

1. Arrange — prepare data, mocks, test server, database state.
2. Act — execute the action.
3. Assert — check result and side effects.

Example:

```js
it('keeps submitted comments hidden until moderation', async () => {
  // Arrange
  const article = await createTestArticle({ status: 'published' });

  // Act
  const result = await submitComment({
    articleId: article.id,
    authorName: 'Test User',
    content: 'Useful article',
  });

  // Assert
  expect(result.ok).toBe(true);
  expect(result.comment.status).toBe('PENDING_MODERATION');
});

Mocking rules

Mock only external services:
	•	LLM provider;
	•	S3 or external file storage if used later;
	•	email provider;
	•	external analytics APIs.

Do not mock:
	•	MariaDB in integration tests;
	•	Redis in integration tests;
	•	domain entities;
	•	use cases being tested.

Example: testing UI behavior with fetch

The project does not use React. If a small client-side module uses fetch, test it as a DOM behavior module.

Example

```js
import { describe, expect, it, vi } from 'vitest';
import { initCommentForm } from './comment-form.js';

it('shows success message after comment submit', async () => {
  // Arrange
  document.body.innerHTML = `
    <form data-comment-form>
      <textarea name="content">Nice article</textarea>
      <button type="submit">Send</button>
      <p data-comment-message></p>
    </form>
  `;

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  });

  initCommentForm(document);

  // Act
  document.querySelector('[data-comment-form]').dispatchEvent(
    new Event('submit', { bubbles: true, cancelable: true })
  );

  await Promise.resolve();

  // Assert
  expect(global.fetch).toHaveBeenCalledOnce();
  expect(document.querySelector('[data-comment-message]').textContent).toContain('sent');
});

```

Required checks

When relevant, run:
	•	unit tests;
	•	integration tests;
	•	e2e tests;
	•	lint;
	•	build or startup check.

If a check cannot be run, mention it in the final response. 