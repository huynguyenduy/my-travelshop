import { useEffect, useState } from 'react';

export default function Home() {
  const [tours, setTours] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => setTours(data));
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedTour || !customerName) return alert('Chọn tour và nhập tên!');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId: selectedTour, customerName })
      });
      const data = await res.json();
      alert(data.message || data.error);
      setCustomerName('');
      setSelectedTour(null);
    } catch (err) {
      alert('Lỗi khi đặt tour!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Tour Du Lịch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map(tour => (
          <div key={tour.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600">{tour.title}</h2>
            <p className="text-gray-600">{tour.description}</p>
            <p className="text-lg font-bold text-green-500 mt-2">{tour.price.toLocaleString()} VNĐ</p>
            <button
              onClick={() => setSelectedTour(tour.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Chọn tour
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleBooking} className="mt-8 p-4 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Đặt Tour</h2>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Nhập tên của bạn"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Đặt Ngay
        </button>
      </form>
    </div>
  );
}