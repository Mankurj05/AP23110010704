# Notification App Backend (placeholder)

This folder is a placeholder for backend submission artifacts. For the Frontend track this can contain:

- A simple mock server or a JSON file representing notification responses.
- Instructions for running the backend if implemented.

A small Node.js mock server is included in `server.js` to help run the frontend locally without depending on the remote API.

Run the mock server:

```bash
node server.js
```

The server listens on port `4000` by default and exposes:

- `GET /evaluation-service/notifications` — returns JSON `{ notifications: [...] }` and accepts query parameters `limit`, `page`, `notification_type`.
- `GET /health` — health check

