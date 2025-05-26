'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function MyBookingsPage() {
  const [userName, setUserName] = useState('');
  const [bookings, setBookings] = useState([]);
  const searchParams = useSearchParams();

  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchBookings = async (name = userName) => {
    const url = name
      ? `${API}/bookings?userName=${encodeURIComponent(name)}`
      : `${API}/bookings`;

    try {
      const res = await axios.get(url);
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  useEffect(() => {
    const initialName = searchParams.get('userName') || '';
    setUserName(initialName);
    if (initialName) {
      fetchBookings(initialName);
    }
  }, [searchParams]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      <div className="mb-4 flex gap-2">
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder="Search by name (or leave blank for all)"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={() => fetchBookings()}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="space-y-3">
        {bookings.map((b: any) => (
          <div key={b.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{b.unit.name}</h3>
            <p>📍 {b.unit.location}</p>
            <p>📦 {b.unit.size}</p>
            <p>👤 Booked by: {b.userName}</p>
            <p>From: {new Date(b.startDate).toLocaleDateString()}</p>
            <p>To: {new Date(b.endDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
