import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import NotificationsPage from '../NotificationsPage'

const sample = {
  notifications: [
    { ID: '1', Type: 'Placement', Message: 'Company hiring', Timestamp: '2026-04-22T17:51:18Z' },
    { ID: '2', Type: 'Event', Message: 'Tech fest', Timestamp: '2026-04-22T17:50:06Z' }
  ]
}

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(sample) }))
})

afterEach(() => {
  jest.restoreAllMocks()
  localStorage.clear()
})

test('renders controls and fetches notifications', async () => {
  render(<NotificationsPage />)

  expect(screen.getByLabelText(/Limit/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Page/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Refresh/i })).toBeInTheDocument()

  // Wait for fetch to be called
  await waitFor(() => expect(global.fetch).toHaveBeenCalled())

  // Wait for loading spinner to disappear
  await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument())

  // Logging middleware should have recorded the fetch event
  const logs = JSON.parse(localStorage.getItem('notification_logs') || '[]')
  expect(Array.isArray(logs)).toBe(true)
  expect(logs.length).toBeGreaterThanOrEqual(1)
})
