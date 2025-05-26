'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Unit {
  id: number;
  name: string;
  size: string;
  location: string;
  pricePerDay: number;
  isAvailable: boolean;
}

export default function HomePage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sizeOptions = ['Small', 'Medium', 'Large'];
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    axios.get(`${API}/units`)
      .then(res => {
        setUnits(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch units.');
        console.error(err);
        setLoading(false);
      });
  }, [API]);

  const filteredUnits = units.filter(unit =>
    unit.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
    (sizeFilter === '' || unit.size === sizeFilter)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Storage Units</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          placeholder="Filter by location"
          onChange={e => setLocationFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <select
          value={sizeFilter}
          onChange={e => setSizeFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        >
          <option value="">All Sizes</option>
          {sizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-600">Loading units...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredUnits.length === 0 && (
        <p className="text-gray-500">No units match your filters.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-bold">{unit.name}</h3>
            <p>📦 Size: {unit.size}</p>
            <p>📍 Location: {unit.location}</p>
            <p>💰 ${unit.pricePerDay}/day</p>
          </div>
        ))}
      </div>
    </div>
  );
}
