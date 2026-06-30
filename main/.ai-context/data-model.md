## Global rules

- Every table must have `id` as primary key.
- Every table must have `created` timestamp.
- Every table must have `updated` timestamp.
- Every table must have `deleted` nullable timestamp.
- Use soft delete by setting `deleted`.
- Physical deletion is allowed only after 30 days.
- Queries should filter `deleted is null` unless intentionally reading archived/deleted records.
- All flags or boolean fields must be writen as 1 or 0

## Tables

### articles

Stores metadata and file references for Markdown articles.

Columns:
	•	id - primary key, incremental int
	•	author - string
	•	slug - string
	•	title - string
	•	excerpt - string
	•	status - enum: DRAFT, PUBLISHED, ARCHIVED, DELETED
	•	markdown_path - string
	•	seo_title - string
	•	seo_description - string
	•	created - datetime
	•	updated - datetime
	•	published - datetime or empty
	•	deleted - datetime or empty

Indexes:
	•	unique index on slug

### comments

Stores metadata and file references for Markdown comments.

Columns:
	•	id - primary key, incremental int
	•	article_id
	•	author_name
	•	status enum: PENDING_MODERATION, APPROVED, REJECTED, DELETED
	•	markdown_path
	•	moderated
	•	created
	•	updated
	•	deleted

Indexes: