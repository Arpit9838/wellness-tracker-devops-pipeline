import React, { useState } from 'react'

function EntryForm({ onSave, initial }){
  const [date,setDate] = useState(initial?.date || new Date().toISOString().slice(0,10))
  const [steps,setSteps] = useState(initial?.steps || 0)
  const [sleep,setSleep] = useState(initial?.sleep || 7)
  const [mood,setMood] = useState(initial?.mood || 3)
  const [notes,setNotes] = useState(initial?.notes || '')

  const submit = (e)=>{
    e.preventDefault()
    onSave({ date, steps: Number(steps), sleep: Number(sleep), mood: Number(mood), notes })
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="number" value={steps} onChange={e=>setSteps(e.target.value)} className="border px-2 py-1 rounded" placeholder="steps" />
        <input type="number" value={sleep} onChange={e=>setSleep(e.target.value)} className="border px-2 py-1 rounded" placeholder="sleep hrs" />
        <input type="number" value={mood} onChange={e=>setMood(e.target.value)} className="border px-2 py-1 rounded" placeholder="mood 1-5" />
      </div>
      <div>
        <input value={notes} onChange={e=>setNotes(e.target.value)} className="w-full border px-2 py-1 rounded" placeholder="notes" />
      </div>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">Save</button>
      </div>
    </form>
  )
}

export default function Entries({ entries, addEntry, updateEntry, deleteEntry }){
  const [editing, setEditing] = useState(null)

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Entries</h3>
      <div className="mb-4 p-4 bg-gray-50 rounded border">
        <EntryForm onSave={(data)=>{ if(editing){ updateEntry(editing.id, data); setEditing(null) } else { addEntry(data) } }} initial={editing} />
      </div>

      <div className="space-y-3">
        {entries.map(e=> (
          <div key={e.id} className="p-3 bg-white rounded border flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">{e.date}</div>
              <div className="font-medium">Steps: {e.steps} | Sleep: {e.sleep} | Mood: {e.mood}</div>
              <div className="text-sm text-gray-600">{e.notes}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setEditing(e)} className="px-2 py-1 border rounded text-sm">Edit</button>
              <button onClick={()=>deleteEntry(e.id)} className="px-2 py-1 border rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}