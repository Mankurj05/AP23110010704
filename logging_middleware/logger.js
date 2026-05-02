function getLogConfig() {
  const baseUrl = window.__VITE_API_BASE_URL__ || 'http://20.207.122.201/evaluation-service'
  const token = window.__VITE_API_TOKEN__
  // Only send logs to server if using protected API (not localhost)
  if (baseUrl && baseUrl.includes('20.207.122.201')) {
    return {
      LOG_API: `${baseUrl}/logs`,
      API_TOKEN: token
    }
  }
  return { LOG_API: null, API_TOKEN: null }
}

function mapEventToLogLevel(event) {
  if (event.includes('error')) return 'error'
  if (event.includes('fetch')) return 'info'
  return 'debug'
}

function mapEventToPackage(event) {
  if (event.includes('fetch')) return 'api'
  if (event.includes('view')) return 'ui'
  if (event.includes('mark')) return 'state'
  return 'component'
}

async function sendLogToServer(event, payload) {
  const { LOG_API, API_TOKEN } = getLogConfig()
  if (!LOG_API || !API_TOKEN) return
  try {
    const logPayload = {
      stack: 'frontend',
      level: mapEventToLogLevel(event),
      package: mapEventToPackage(event),
      message: `${event}: ${JSON.stringify(payload)}`
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    }
    await fetch(LOG_API, {
      method: 'POST',
      headers,
      body: JSON.stringify(logPayload)
    }).catch(() => {}) // ignore server log failures
  } catch (e) {}
}

export function logEvent(event, payload={}){
  try{
    const logs = JSON.parse(localStorage.getItem('notification_logs')||'[]')
    logs.push({ event, payload, ts: new Date().toISOString() })
    localStorage.setItem('notification_logs', JSON.stringify(logs))
  }catch(e){ }
  sendLogToServer(event, payload)
}

export function getLogs(){
  try{ return JSON.parse(localStorage.getItem('notification_logs')||'[]') }catch(e){ return [] }
}
