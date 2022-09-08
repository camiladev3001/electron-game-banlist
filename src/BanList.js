import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cleanTextAndFindBanneds, parseUnixToDateString } from './utils/bansChecker'

export const BanList = () => {
  const [nicks, setNicks] = useState('')
  const [bannedsFound, setBannedsFound] = useState([])
  const inputNickRef = useRef(null)

  const focusInputText = () => inputNickRef.current.focus()

  const checkMyBanList = () => {
    if(!nicks.trim()) {
      setNicks('')
      focusInputText()
      return
    }

    electron.notificationApi.getFileData(bans => {
      const banneds = cleanTextAndFindBanneds(nicks, bans)
      setBannedsFound(banneds)

      focusInputText()
      setNicks('')
    })  
  }

  const handleChange = (e) => {
    setNicks(e.target.value)
  }
  
  return (
    <main className="container-fluid">
      <div style={{paddingTop: 25}}><Link to='/'>Back</Link></div>
      <div className='grid' style={{ padding: 50 }}>
        <textarea ref={inputNickRef} rows={5} name="nick" placeholder='Paste here all nicks...' value={nicks} onChange={handleChange}></textarea>
        {bannedsFound.length > 0 
          ? (
            <div>
              <p>Usuarios baneados encontrados</p>
              <ul>
                {bannedsFound.map(({nick, comments, date}) => (
                  <li>{parseUnixToDateString(date)} - {nick} - {comments}</li>
                ))}
              </ul>
            </div>
          )
          : 
          <>
            <p>No hay usuarios baneados</p>
            <button type="button" style={{ width: '50%', margin: 'auto', marginTop: 50 }} onClick={checkMyBanList}>Ban</button>
          </>          
        }
      </div>
    </main>
  )
}