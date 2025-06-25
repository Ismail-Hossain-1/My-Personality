'use client'
import React, { useState } from 'react'

const questions = [
  {
    key: 'Time_spent_Alone',
    label: 'How many hours do you spend alone daily?',
    type: 'number',
    min: 0,
    max: 24,
    step: 1,
    placeholder: 'e.g., 6'
  },
  {
    key: 'Stage_fear',
    label: 'Do you have stage fear?',
    type: 'select',
    options: [
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' }
    ]
  },
  {
    key: 'Social_event_attendance',
    label: 'How often do you attend social events per month?',
    type: 'number',
    min: 0,
    max: 30,
    step: 1,
    placeholder: 'e.g., 1'
  },
  {
    key: 'Going_outside',
    label: 'How many times do you go outside per week?',
    type: 'number',
    min: 0,
    max: 14,
    step: 1,
    placeholder: 'e.g., 2'
  },
  {
    key: 'Drained_after_socializing',
    label: 'Do you feel drained after socializing?',
    type: 'select',
    options: [
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' }
    ]
  },
  {
    key: 'Friends_circle_size',
    label: 'How many close friends do you have?',
    type: 'number',
    min: 0,
    max: 20,
    step: 1,
    placeholder: 'e.g., 3'
  },
  {
    key: 'Post_frequency',
    label: 'How many times do you post on social media per week?',
    type: 'number',
    min: 0,
    max: 50,
    step: 1,
    placeholder: 'e.g., 4'
  }
]

export default function PersonalityTest() {
  const [form, setForm] = useState({
    Time_spent_Alone: '',
    Stage_fear: '',
    Social_event_attendance: '',
    Going_outside: '',
    Drained_after_socializing: '',
    Friends_circle_size: '',
    Post_frequency: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = [
        Number(form.Time_spent_Alone),
        Number(form.Stage_fear),
        Number(form.Social_event_attendance),
        Number(form.Going_outside),
        Number(form.Drained_after_socializing),
        Number(form.Friends_circle_size),
        Number(form.Post_frequency)
      ]
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/personalitytest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_data: payload })
      })
      if (!res.ok) throw new Error('Failed to get prediction')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-gradient-to-tr from-gray-700 via-cyan-900 to-slate-950 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-100 mb-6">Personality Test</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {questions.map(q => (
            <div key={q.key}>
              <label className="block text-teal-100 font-semibold mb-2">{q.label}</label>
              {q.type === 'select' ? (
                <select
                  className="w-full rounded-md p-2 bg-gray-800 text-teal-100 focus:outline-none"
                  value={form[q.key]}
                  onChange={e => handleChange(e, q.key)}
                  required
                >
                  <option value="">Select</option>
                  {q.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={q.type}
                  min={q.min}
                  max={q.max}
                  step={q.step}
                  className="w-full rounded-md p-2 bg-gray-800 text-teal-100 focus:outline-none"
                  placeholder={q.placeholder}
                  value={form[q.key]}
                  onChange={e => handleChange(e, q.key)}
                  required
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-md transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Submit'}
          </button>
        </form>
        {result && (
          <div className="mt-6 bg-gray-800 text-teal-100 rounded-md p-4 text-center font-serif">
            <div className="text-lg font-bold mb-2">Prediction:</div>
            <div className="text-2xl">{result.personality}</div>
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-300 text-center">{error}</div>
        )}
      </div>
    </div>
  )
}