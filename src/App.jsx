import React, { useState, useEffect } from 'react'
import { demoUser, mockEntries as initialEntries } from './mockData'
import Dashboard from './components/Dashboard'
import Entries from './components/Entries'
import Auth from './components/Auth'

export default function App(){
  const [user, setUser] = useState(null) // null = signed out
  const [entries, setEntries] = useState([])

  useEffect(()=>{
    // load from localStorage if present
    const saved = localStorage.getItem('wt_entries')
    if(saved){
      setEntries(JSON.parse(saved))
    } else {
      setEntries(initialEntries)
    }
    const savedUser = localStorage.getItem('wt_user')
    if(savedUser) setUser(JSON.parse(savedUser))
  },[])

  useEffect(()=>{
    localStorage.setItem('wt_entries', JSON.stringify(entries))
  },[entries])

  const handleLogin = (email, password) => {
    if(email === demoUser.email && password === demoUser.password){
      const u = { email: demoUser.email, name: demoUser.name }
      setUser(u)
      localStorage.setItem('wt_user', JSON.stringify(u))
      return { ok: true }
    }
    return { ok:false, message: 'Invalid demo credentials' }
  }

  const handleLogout = ()=>{
    setUser(null)
    localStorage.removeItem('wt_user')
  }

  const addEntry = (entry) => {
    entry.id = Date.now()
    setEntries(prev => [entry, ...prev])
  }
  const updateEntry = (id, data) => {
    setEntries(prev => prev.map(e => e.id===id? {...e,...data}: e))
  }
  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e=>e.id!==id))
  }

  if(!user) return <Auth onLogin={handleLogin} />

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Wellness Tracker</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm">Hi, {user.name}</div>
            <button className="text-sm px-3 py-1 border rounded" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <Dashboard entries={entries} />
        <hr className="my-6" />
        <Entries entries={entries} addEntry={addEntry} updateEntry={updateEntry} deleteEntry={deleteEntry} />
      </div>
    </div>
  )
}/*************  ✨ Windsurf Command ⭐  *************/
/*******  ffadf761-deaf-462b-ba00-b6dd6ce0cde8  *******/  /**

   * Main App component.

   *

   * Manages the application state, including the signed in user and their entries.

   *

   * Handles the following routes:

   * - `/` redirects to `/signin`

   * - `/signin` renders the SignIn component

   * - `/signup` renders the SignUp component

   * - `/dashboard` renders the Dashboard and Entries components if the user is signed in,

   *   otherwise redirects to `/signin`

   *
   * @returns {JSX.Element} The rendered JSX
   */
