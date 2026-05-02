export function logEvent(event, payload={}){
  try{
    const logs = JSON.parse(localStorage.getItem('notification_logs')||'[]')
    logs.push({ event, payload, ts: new Date().toISOString() })
    localStorage.setItem('notification_logs', JSON.stringify(logs))
  }catch(e){ }
}

export function getLogs(){
  try{ return JSON.parse(localStorage.getItem('notification_logs')||'[]') }catch(e){ return [] }
}
