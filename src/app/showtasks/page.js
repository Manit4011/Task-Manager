'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext'

const ShowTasksPage = () => {
  const { user } = useContext(UserContext)

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return

    const getTasks = async () => {
      try {
        const response = await axios.get(`/api/user/${user.id}/tasks`)
        setTasks(response.data)
      } catch (error) {
        console.error('Failed to load tasks', error)
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [user])

  const handleDelete = async (taskId) => {
    try {
      // Optimistic update
      setTasks((prev) => prev.filter((task) => task._id !== taskId))

      await axios.delete(`/api/tasks/${taskId}`)
    } catch (error) {
      console.error('Failed to delete task', error)
    }
  }

  if (!user) {
    return <p className="text-white">Please login to view tasks</p>
  }

  if (loading) {
    return <p className="text-white">Loading tasks...</p>
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-white/70">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex items-start justify-between rounded-lg bg-white/10 p-4 text-white"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-white/70">{task.description}</p>
            </div>

            <button
              onClick={() => handleDelete(task._id)}
              className="ml-4 rounded-md bg-red-500 px-3 py-1 text-sm font-medium hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default ShowTasksPage
