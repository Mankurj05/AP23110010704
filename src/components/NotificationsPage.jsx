import React, {useEffect, useState, useCallback} from 'react'
import { Box, TextField, Button, MenuItem, Grid, Card, CardContent, Typography, Chip, CircularProgress } from '@mui/material'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { logEvent } from '../logging/logger'

const NOTIF_API = 'http://20.207.122.201/evaluation-service/notifications'

const TYPE_OPTIONS = ['Event', 'Result', 'Placement']

const WEIGHT = { 'Placement': 3, 'Result': 2, 'Event': 1 }

function computeScore(n) {
  const weight = WEIGHT[n.Type] || 1
  const ts = new Date(n.Timestamp).getTime() || 0
  return weight * 1e12 + ts
}

export default function NotificationsPage(){
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [viewedIds, setViewedIds] = useState(() => JSON.parse(localStorage.getItem('viewed_ids')||'[]'))

  const fetchNotes = useCallback(async ()=>{
    setLoading(true); setError(null)
    try{
      const params = new URLSearchParams()
      params.set('limit', String(limit))
      params.set('page', String(page))
      if(typeFilter) params.set('notification_type', typeFilter)
      const url = `${NOTIF_API}?${params.toString()}`
      const res = await fetch(url)
      if(!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const items = (data.notifications||[]).map(n=>({
        ...n,
        score: computeScore(n)
      }))
      items.sort((a,b)=>b.score - a.score)
      setNotifications(items)
      logEvent('fetch_notifications', {url, count: items.length})
    }catch(e){
      setError(e.message)
      logEvent('fetch_error', {message: e.message})
    }finally{ setLoading(false) }
  }, [limit, page, typeFilter])

  useEffect(()=>{ fetchNotes() }, [fetchNotes])

  function markViewed(id){
    if(viewedIds.includes(id)) return
    const next = [...viewedIds, id]
    setViewedIds(next)
    localStorage.setItem('viewed_ids', JSON.stringify(next))
    logEvent('mark_viewed', {id})
  }

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField label="Limit" type="number" value={limit} onChange={e=>setLimit(Number(e.target.value||0))} InputProps={{ inputProps: { min: 1 }}} />
        </Grid>
        <Grid item>
          <TextField label="Page" type="number" value={page} onChange={e=>setPage(Number(e.target.value||1))} InputProps={{ inputProps: { min: 1 }}} />
        </Grid>
        <Grid item>
          <TextField select label="Type" value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} sx={{width:160}}>
            <MenuItem value="">All</MenuItem>
            {TYPE_OPTIONS.map(t=> <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={fetchNotes}>Refresh</Button>
        </Grid>
      </Grid>

      <Box sx={{mt:3}}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}
        {!loading && !error && notifications.length===0 && <Typography>No notifications</Typography>}

        <Grid container spacing={2} sx={{mt:1}}>
          {notifications.map(n=>{
            const unread = !viewedIds.includes(n.ID)
            return (
              <Grid item xs={12} md={6} key={n.ID}>
                <Card onClick={()=>markViewed(n.ID)} sx={{cursor:'pointer', borderLeft: unread? '4px solid #1976d2' : '4px solid transparent'}}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">{n.Message}</Typography>
                      <Chip label={n.Type} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">{formatDistanceToNow(parseISO(n.Timestamp), { addSuffix: true })}</Typography>
                    <Box sx={{mt:1}}>
                      <Typography variant="caption">ID: {n.ID}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
