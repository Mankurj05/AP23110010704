import React from 'react'
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material'
import NotificationsPage from './components/NotificationsPage'

export default function App() {
  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Campus Notifications</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <NotificationsPage />
      </Container>
    </Box>
  )
}
