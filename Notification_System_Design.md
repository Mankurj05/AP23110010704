# Notification System Design

## Approach

- Fetch notifications from the provided API endpoint and present a Priority Inbox.
- Priority is computed from a combination of notification type weight and recency:
  - Weights: `Placement` = 3, `Result` = 2, `Event` = 1.
  - Score = weight * 1e12 + timestamp (ms) to ensure weight dominates recency.

## Frontend behaviour

- Default view shows top `limit` notifications sorted by computed score (desc).
- Clicking a notification marks it as viewed (persisted in `localStorage` under `viewed_ids`).
- Filtering by `notification_type`, `limit` and `page` supported via query parameters to the API.

## Logging

- The `logging_middleware` module stores structured logs in `localStorage` under `notification_logs`.
- Events logged: `fetch_notifications`, `fetch_error`, `mark_viewed`.

## Running the app

1. Start the mock backend: `node notification_app_be/server.js` (port 4000)
2. In `notification_app_fe`, install deps and start dev server: `npm install` then `npm run dev` (port 3000)

## Screenshots

- `screenshots/controls_top.png` — top controls and first notifications view.
- `screenshots/notifications_list.png` — full notifications list view used for submission.
