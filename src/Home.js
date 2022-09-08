import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <main className="container-fluid">
      <h1 style={{marginTop: 20}}>Menu</h1>
      <div style={{marginBottom: 10}}><Link to='/ban-user'>Ban User</Link></div>
      <div style={{marginBottom: 10}}><Link to='/check-bans'>Check Banlist</Link></div>      
    </main>
  )
}


