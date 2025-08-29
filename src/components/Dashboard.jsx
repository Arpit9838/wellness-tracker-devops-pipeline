import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function summary(entries){
  if(entries.length===0) return {steps:0,sleep:0,mood:0}
  const latest = entries[0]
  const avgSteps = Math.round(entries.reduce((s,e)=>s+e.steps,0)/entries.length)
  const avgSleep = (entries.reduce((s,e)=>s+e.sleep,0)/entries.length).toFixed(1)
  const avgMood = (entries.reduce((s,e)=>s+e.mood,0)/entries.length).toFixed(1)
  return { latest, avgSteps, avgSleep, avgMood }
}

export default function Dashboard({ entries }){
  const s = summary(entries)
  const labels = entries.slice(0,7).map(e=>e.date).reverse()
  const stepsData = entries.slice(0,7).map(e=>e.steps).reverse()

  const data = {
    labels,
    datasets: [
      {
        label: 'Steps (last 7)',
        data: stepsData,
        tension: 0.4,
        fill: false,
      }
    ]
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded border">
          <div className="text-xs text-gray-500">Latest Steps</div>
          <div className="text-xl font-bold">{s.latest?.steps ?? 0}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded border">
          <div className="text-xs text-gray-500">Average Sleep (hrs)</div>
          <div className="text-xl font-bold">{s.avgSleep ?? 0}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded border">
          <div className="text-xs text-gray-500">Average Mood</div>
          <div className="text-xl font-bold">{s.avgMood ?? 0}</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded border">
        <h3 className="font-semibold mb-2">Steps Trend</h3>
        <Line data={data} />
      </div>
    </div>
  )
}