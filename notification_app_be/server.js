const http = require('http')
const url = require('url')

const PORT = process.env.PORT || 4000

const notifications = [
  { ID: 'd146095a-e0d6-4a34-9e69-390ea14576bc', Type: 'Result', Message: 'mid-sem', Timestamp: '2026-04-22 17:51:30' },
  { ID: 'b283218f-ea5a-4b7c-93a9-1f2f240d64be', Type: 'Placement', Message: 'CSX Corporation hiring', Timestamp: '2026-04-22 17:51:18' },
  { ID: '81589ada-ead3-4f77-9554-f52fb558e09d', Type: 'Event', Message: 'farewell', Timestamp: '2026-04-22 17:51:06' },
  { ID: '0005513a-142b-4bbc-8678-eefec65e1ede', Type: 'Result', Message: 'mid-sem', Timestamp: '2026-04-22 17:50:54' },
  { ID: 'ea836726-c25e-4f21-a72f-544a6af8a37f', Type: 'Result', Message: 'project-review', Timestamp: '2026-04-22 17:50:42' },
  { ID: '003cb427-8fc6-47f7-bb00-be228f6b0d2c', Type: 'Result', Message: 'external', Timestamp: '2026-04-22 17:50:30' },
  { ID: 'e5c4ff22-31bf-44d8-8f62-72fda59e8918', Type: 'Result', Message: 'project-review', Timestamp: '2026-04-22 17:50:18' },
  { ID: '1cfce5ee-ad37-4894-8946-d706727176a5', Type: 'Event', Message: 'tech-fest', Timestamp: '2026-04-22 17:50:06' },
  { ID: 'cf2885a6-45ac-4ba0-b548-6e9e9d4c52c8', Type: 'Result', Message: 'project-review', Timestamp: '2026-04-22 17:49:54' },
  { ID: '8a7412bd-6065-40d9-8501-a37f11cc848b', Type: 'Placement', Message: 'Advanced Micro Devices Inc. hiring', Timestamp: '2026-04-22 17:49:42' }
]

function sendJSON(res, obj){
  const body = JSON.stringify(obj)
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  res.end(body)
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true)
  if(parsed.pathname === '/evaluation-service/notifications'){
    const q = parsed.query || {}
    let items = notifications.slice()
    if(q.notification_type){
      items = items.filter(i => i.Type === q.notification_type)
    }
    const limit = q.limit ? Math.max(1, Number(q.limit)||10) : 10
    const page = q.page ? Math.max(1, Number(q.page)||1) : 1
    const start = (page - 1) * limit
    const paged = items.slice(start, start + limit)
    return sendJSON(res, { notifications: paged })
  }

  if(parsed.pathname === '/health'){
    return sendJSON(res, { status: 'ok' })
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not found')
})

server.listen(PORT, () => {
  console.log(`Mock notification server listening on http://localhost:${PORT}`)
})
