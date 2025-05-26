'use client';
import { useState } from 'react';
import axios from 'axios';

export default function CreateUnitPage() {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [message, setMessage] = useState('');

  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !size || !location || !pricePerDay) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      await axios.post(`${API}/units`, {
        name,
        size,
        location,
        pricePerDay: parseFloat(pricePerDay),
      });

      setMessage('✅ Unit created successfully!');
      setName('');
      setSize('');
      setLocation('');
      setPricePerDay('');
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to create unit.');
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md mt-10 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Storage Unit</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 w-full">
          {message && <p className="text-blue-600 text-center">{message}</p>}

          <input
            type="text"
            placeholder="Unit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price Per Day ($)"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Create Unit</button>
        </form>
      </div>
    </div>
  );
}
