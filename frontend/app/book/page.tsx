'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function BookPage() {
  const [userName, setUserName] = useState('');
  const [unitId, setUnitId] = useState('');
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [units, setUnits] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    axios.get(`${API}/units`)
      .then(res => setUnits(res.data));
  }, [API]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const parsedUnitId = parseInt(unitId);

    if (!userName.trim() || !unitId || isNaN(parsedUnitId) || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }

    try {
      console.log({
        userName,
        unitId: parsedUnitId,
        startDate,
        endDate,
      });

      await axios.post(`${API}/bookings`, {
        userName,
        unitId: parsedUnitId,
        startDate,
        endDate,
      });

      setSuccess(true);
      setError('');

      setTimeout(() => {
        router.push(`/my-bookings?userName=${encodeURIComponent(userName)}`);
      }, 2000);
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.response?.data?.error || 'Booking failed.');
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md mt-10 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Book a Unit</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow w-full">
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">✅ Booking successful! Redirecting...</p>}

          <input
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <select
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a unit</option>
            {units.map((unit: any) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} — {unit.size} in {unit.location} (${unit.pricePerDay}/day)
              </option>
            ))}
          </select>

          <div className="flex gap-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Start Date"
              className="w-full p-2 border rounded"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="End Date"
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Book</button>
        </form>
      </div>
    </div>
  );
}
