import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const INITIAL_STATE = { nick: '', comments: ''}

export const BanUser = () => {


  const [form, setForm] = useState(INITIAL_STATE)
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const addUserToBanList = () => {
    electron.notificationApi.sendNotification(form)
    setForm({...INITIAL_STATE})
  }

  return (
    <main className="container-fluid">
      <div style={{paddingTop: 25}}><Link to='/'>Back</Link></div>
      <div className='grid' style={{ padding: 50 }}>

        <h2>Add troll to my banlist</h2>
        <label htmlFor="firstname">
          Nick to ban
          <input type="text" name="nick" value={form.nick} onChange={handleChange} />
        </label>
        <label htmlFor="email">Comments</label>
        <input type="text" name="comments" value={form.comments} onChange={handleChange} />
        <small>Add a note to remember why you ban this user</small>
        <button type="button" style={{ width: '50%', margin: 'auto', marginTop: 50 }} onClick={addUserToBanList}>Ban</button>
      </div>
    </main>
  )
}


