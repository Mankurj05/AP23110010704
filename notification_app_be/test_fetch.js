const http = require('http')

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/evaluation-service/notifications?limit=5&page=1',
  method: 'GET'
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  let body = ''
  res.on('data', chunk => body += chunk)
  res.on('end', () => {
    try{
      const json = JSON.parse(body)
      console.log('received notifications:', Array.isArray(json.notifications) ? json.notifications.length : 'none')
      console.log(JSON.stringify(json, null, 2))
    }catch(e){
      console.error('failed to parse response', e.message)
    }
  })
})

req.on('error', err => console.error('request error', err.message))
req.end()
