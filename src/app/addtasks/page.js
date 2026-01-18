"use client";
import React, { useContext, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import axios from 'axios';
import UserContext from '../context/userContext';

const AddTasks = () => {
  const {user} = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [userid,setUserid] = useState(user.id)
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // FIXED
    try {
      const response = await axios.post("/api/tasks", {
        title,
        description,
        status,
        userid
      });
      console.log("task added successfully", response);
      setTitle("")
      setDescription("")
      setStatus("")
    } catch (error) {
      console.log("failed to add task", error);
    }
  };

  return (
    <div className='mx-40 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='rounded-md bg-white/5 flex flex-col justify-center items-center w-2xl mx-auto border-b border-white/10 pb-12'
      >
        <h1 className='text-2xl mt-10'>ADD TASK</h1>

        <div className="w-80 h-12 my-8 mx-4">
          <label htmlFor="title" className="block text-sm/6 font-medium text-white">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-span-full w-80">
          <label htmlFor="description" className="block text-sm/6 font-medium text-white">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={3}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <p className="mt-3 text-sm/6 text-gray-400">
            Write a description about your task.
          </p>
        </div>

        <div className="sm:col-span-3 w-80 mb-4">
          <label htmlFor="status" className="block text-sm/6 font-medium text-white">
            Status
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="status"
              name="status"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-gray-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className=" cursor-pointer mt-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:text-black"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTasks;
