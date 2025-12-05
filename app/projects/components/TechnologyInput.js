// TODO: Students will implement this component
// This is an advanced component building exercise

// Component Requirements:
// 1. Create a component that accepts { technologies, onChange, error } props
// 2. Allow users to type in a technology name and add it to the list
// 3. Provide quick-add buttons for common technologies
// 4. Display selected technologies as removable tags
// 5. Prevent duplicate technologies
// 6. Support both keyboard (Enter) and button (Add) interactions
// 7. Handle error states with visual feedback

// Learning Objectives:
// - Advanced React state management
// - Array manipulation patterns
// - User input handling
// - Conditional styling
// - Accessibility considerations
// - Component prop patterns

// Suggested Technologies for Quick-Add:
// ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
//  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
//  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
//  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop']

// Implementation Hints:
// - Use 'use client' directive
// - Manage local input state with useState
// - Use filter() to remove technologies
// - Use includes() to check for duplicates
// - Handle keyPress event for Enter key
// - Style error states with conditional classes

'use client'
import { useState } from 'react'

const QUICK_TECHS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
]

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const tech = input.trim()
    if (tech && !technologies.includes(tech)) {
      onChange([...technologies, tech])
      setInput('')
    }
  }

  const handleRemove = (tech) => {
    onChange(technologies.filter(t => t !== tech))
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Type a technology"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border px-2 py-1 rounded w-48"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <button type="button" onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {QUICK_TECHS.map(tech => (
          <button
            key={tech}
            type="button"
            className={`text-sm px-3 py-1 rounded-full border ${technologies.includes(tech) ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-800'}`}
            onClick={() => !technologies.includes(tech) && onChange([...technologies, tech])}
            disabled={technologies.includes(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map(tech => (
          <span key={tech} className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full flex items-center">
            {tech}
            <button type="button" aria-label="Remove" className="ml-2 text-xs text-red-600" onClick={() => handleRemove(tech)}>
              ×
            </button>
          </span>
        ))}
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  )
}