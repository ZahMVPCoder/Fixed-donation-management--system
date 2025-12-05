'use client'
import { useState } from 'react'
import TechnologyInput from './TechnologyInput'

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!title) newErrors.title = 'Title is required'
    if (!description) newErrors.description = 'Description is required'
    if (!technologies || technologies.length === 0) newErrors.technologies = 'At least one technology is required'
    if (imageUrl && !/^https?:\/\/.+\..+/.test(imageUrl)) newErrors.imageUrl = 'Invalid image URL'
    if (projectUrl && !/^https?:\/\/.+\..+/.test(projectUrl)) newErrors.projectUrl = 'Invalid project URL'
    if (githubUrl && !/^https?:\/\/.+\..+/.test(githubUrl)) newErrors.githubUrl = 'Invalid GitHub URL'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    setLoading(true)
    try {
      await onSubmit({ title, description, imageUrl, projectUrl, githubUrl, technologies })
      setTitle('')
      setDescription('')
      setImageUrl('')
      setProjectUrl('')
      setGithubUrl('')
      setTechnologies([])
      setErrors({})
    } catch (err) {
      setErrors({ submit: 'Failed to submit project' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">Project Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`w-full border px-3 py-2 rounded${errors.title ? ' border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={`w-full border px-3 py-2 rounded${errors.description ? ' border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block font-bold mb-2">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          className={`w-full border px-3 py-2 rounded${errors.imageUrl ? ' border-red-500' : ''}`}
        />
        {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="projectUrl" className="block font-bold mb-2">Live Demo URL</label>
        <input
          id="projectUrl"
          type="text"
          value={projectUrl}
          onChange={e => setProjectUrl(e.target.value)}
          className={`w-full border px-3 py-2 rounded${errors.projectUrl ? ' border-red-500' : ''}`}
        />
        {errors.projectUrl && <p className="text-red-600 text-sm mt-1">{errors.projectUrl}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="githubUrl" className="block font-bold mb-2">GitHub URL</label>
        <input
          id="githubUrl"
          type="text"
          value={githubUrl}
          onChange={e => setGithubUrl(e.target.value)}
          className={`w-full border px-3 py-2 rounded${errors.githubUrl ? ' border-red-500' : ''}`}
        />
        {errors.githubUrl && <p className="text-red-600 text-sm mt-1">{errors.githubUrl}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Technologies</label>
        <TechnologyInput technologies={technologies} onChange={setTechnologies} />
        {errors.technologies && <p className="text-red-600 text-sm mt-1">{errors.technologies}</p>}
      </div>
      {errors.submit && <p className="text-red-600 text-sm mb-2">{errors.submit}</p>}
      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded" disabled={loading}>
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
        <button type="button" className="bg-gray-300 px-6 py-2 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}