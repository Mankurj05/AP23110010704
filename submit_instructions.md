# Submission Instructions

Repository layout (what to include in your GitHub submission):

- `notification_app_fe/` — Frontend application (React + Vite)
  - `src/` — source code
  - `src/components/NotificationsPage.jsx` — main UI
  - `src/components/__tests__/NotificationsPage.test.jsx` — Jest test(s)
  - `package.json` — contains scripts: `dev`, `build`, `test`
- `logging_middleware/` — logging integration (no console logging)
- `notification_app_be/` — mock backend used for local testing
  - `server.js` — Node mock server listening on port 4000
  - `test_fetch.js` — small script demonstrating API response
- `notification_system_design.md` — architecture and approach
- `screenshots/` — screenshots used for submission

Checklist before submission:

- [ ] Remove any mentions of Affordmed or your name from repository name, README and commit messages.
- [ ] Ensure `notification_system_design.md` is present at repo root and explains priority algorithm and logging.
- [ ] Ensure `logging_middleware` is included and referenced from the frontend (no console logging used).
- [ ] Include screenshots in `screenshots/` showing the controls and full notifications list.
- [ ] Commit frequently and push the final commit to GitHub repository.
- [ ] Provide brief README at repo root with run steps and ports (already present in `README.md`).

How to run locally (exact commands):

```bash
# Start mock backend (port 4000)
node notification_app_be/server.js

# In a new terminal, start frontend (port 3000)
cd notification_app_fe
npm install
npm run dev

# Run tests
npm test
```

What to include in the GitHub submission message:

- Short description: "Campus Notifications — Frontend (Priority Inbox)"
- Files included and how to run locally (copy the quick start commands above)
- Mention that `logging_middleware` is implemented and tests are available in `notification_app_fe/src/components/__tests__`.
