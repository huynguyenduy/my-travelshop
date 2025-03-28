import { useEffect, useState } from 'react';

export default function Home() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => setTours(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tour Du Lịch</h1>
      <ul>
        {tours.map(tour => (
          <li key={tour.id} className="text-blue-500">
            {tour.title} - {tour.price} VNĐ
          </li>
        ))}
      </ul>
    </div>
  );
}