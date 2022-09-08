import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const INITIAL_STATE = { nick: '', comments: ''}

export const BanUser = () => {

  const inputNickRef = useRef(null)

  const [form, setForm] = useState(INITIAL_STATE)
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const addUserToBanList = () => {
    const nicknameToBan = form.nick.trim()
    const commentsToBan = form.comments.trim()
    if(!nicknameToBan) {
      setForm({
        ...form,
        nick: ''
      })
      inputNickRef.current.focus()
      return
    }

    electron.notificationApi.sendNotification({ nick: nicknameToBan, comments: commentsToBan })
    setForm({...INITIAL_STATE})
  }

  return (
    <main className="container-fluid">
      <div style={{ margin: 25, marginLeft: 0}}><Link to='/'>Back</Link></div>
      <div className='grid' style={{ padding: 10 }}>
        <input ref={inputNickRef} type="text" name="nick" placeholder='Nick to ban...' value={form.nick} onChange={handleChange} style={{marginBottom: 30}} />
        <input type="text" name="comments" placeholder='Ban reason...' value={form.comments} onChange={handleChange} />
        <button type="button" style={{ width: '50%', margin: 'auto', marginTop: 50 }} onClick={addUserToBanList}>Ban</button>
      </div>
    </main>
  )
}


