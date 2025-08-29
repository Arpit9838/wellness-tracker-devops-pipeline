import React, { useState } from 'react'

export default function Auth({ onLogin }){
  const [email,setEmail] = useState('demo@wellness.com')
  const [password,setPassword] = useState('Demo123!')
  const [err,setErr] = useState('')

  const submit = (e)=>{
    e.preventDefault()
    const res = onLogin(email,password)
    if(!res.ok) setErr(res.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome to Wellness Tracker</h2>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-sm block">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="text-sm block">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          {err && <div className="text-red-600">{err}</div>}
          <button className="w-full bg-blue-600 text-white py-2 rounded">Sign In </button>
          {/* <div className="text-xs text-gray-600 mt-2">Use demo@wellness.com / Demo123!</div> */}
        </form>
      </div>
    </div>
  )
}