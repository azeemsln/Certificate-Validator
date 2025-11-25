// AddCertificateForm.jsx (Refactored for Figma Style with Dropdown)

import React, { useState } from 'react'

// Define the list of fixed domain options
const DOMAIN_OPTIONS = [
  'Java Developer',
  'Python',
  'ReactJs',
  'MERN/MEAN Stack',
  'Data Science',
  'React-Native',
  'Flutter',
  'Software Testing',
  'UI/UX'
]

const AddCertificateForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeID: '',
    startDate: '',
    endDate: new Date().toISOString().slice(0, 10),
    Domain: '' // Domain starts empty
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Simple client-side validation check (ensure all fields are filled)
    if (Object.values(formData).some(val => val === '')) {
      if (window.Swal) {
        window.Swal.fire({
          icon: 'warning',
          title: 'Missing Information',
          text: 'Please fill out all fields before submitting.',
          timer: 2000
        })
      } else {
        console.warn('Please fill out all fields before submitting.')
      }
      return
    }

    // Check if a domain was actually selected (since we use an empty default value)
    if (formData.Domain === '') {
      if (window.Swal) {
        window.Swal.fire({
          icon: 'warning',
          title: 'Missing Domain',
          text: 'Please select a domain.',
          timer: 2000
        })
      } else {
        console.warn('Please select a domain.')
      }
      return
    }

    //Validating the employeeID
    const arr = formData.employeeID.split('/')

    if (arr.length !== 3 || arr[0] !== 'TEN' || arr[1] !== '' || arr[2] !== '') {
      if (window.Swal) {
        window.Swal.fire({
          icon: 'warning',
          title: 'Invalid employeeID',
          text: 'Please write the correct employeeID',
          timer: 2000
        })
      } else {
        console.warn('Please write the correct employeeID')
      }
      return
    }

    onAdd(formData)
  }

  return (
    <div className='bg-white rounded-xl shadow-md p-8 max-w-4xl w-full mx-auto'>
      <h3 className='text-3xl font-bold text-gray-800 mb-8'>
        Add New Certificate
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Grid Layout for Inputs */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Name */}
          <div className='space-y-2'>
            <label htmlFor='name' className='block text-gray-700 font-medium'>
              Name
            </label>
            <input
              id='name'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter full name'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
              required
            />
          </div>

          {/* Email */}
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-gray-700 font-medium'>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email address'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
              required
            />
          </div>

          {/* Phone */}
          <div className='space-y-2'>
            <label htmlFor='phone' className='block text-gray-700 font-medium'>
              Phone
            </label>
            <input
              id='phone'
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter phone number'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
              required
            />
          </div>

          {/* Employee ID */}
          <div className='space-y-2'>
            <label
              htmlFor='employeeID'
              className='block text-gray-700 font-medium'
            >
              Employee ID
            </label>
            <input
              id='employeeID'
              type='text'
              name='employeeID'
              value={formData.employeeID}
              onChange={handleChange}
              placeholder='Enter employee ID'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
              required
            />
          </div>

          {/* Start Date */}
          <div className='space-y-2'>
            <label
              htmlFor='startDate'
              className='block text-gray-700 font-medium'
            >
              Start Date
            </label>
            <input
              id='startDate'
              type='date'
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
              required
            />
          </div>

          {/* End Date */}
          <div className='space-y-2'>
            <label
              htmlFor='endDate'
              className='block text-gray-700 font-medium'
            >
              End Date
            </label>
            <input
              id='endDate'
              type='date'
              name='endDate'
              value={formData.endDate}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
              required
            />
          </div>

          {/* Domain (Updated to Dropdown) */}
          <div className='space-y-2 md:col-span-2'>
            <label htmlFor='Domain' className='block text-gray-700 font-medium'>
              Domain
            </label>
            <select
              id='Domain'
              name='Domain'
              value={formData.Domain}
              onChange={handleChange}
              className='w-full px-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition appearance-none cursor-pointer'
              required
            >
              <option value='' disabled>
                --- Select a Domain ---
              </option>
              {DOMAIN_OPTIONS.map(domain => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </div>{' '}
        {/* End Grid */}
        {/* Buttons */}
        <div className='flex justify-end space-x-4 mt-8'>
          {/* Cancel Button */}
          <button
            type='button'
            onClick={onCancel}
            className='px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 transition-all'
          >
            Cancel
          </button>
          {/* Submit Button */}
          <button
            type='submit'
            className='px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transform transition-all'
          >
            Save Certificate
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCertificateForm
