import React, { useState } from 'react';
import { format } from 'date-fns';
import { useStore } from '../store';

export const VehiclesPage: React.FC = () => {
  const { vehicles, currentUser, addRentalRequest, addComment } = useStore();
  const darkMode = useStore(state => state.darkMode);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');

  const handleRentalRequest = (vehicleId: string) => {
    if (!currentUser || !startDate || !endDate) return;

    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * vehicle.pricePerDay;

    addRentalRequest({
      vehicleId,
      userId: currentUser.id,
      startDate,
      endDate,
      totalPrice
    });

    setSelectedVehicle(null);
    setStartDate('');
    setEndDate('');
  };

  const handleComment = (vehicleId: string) => {
    if (!currentUser || !comment.trim()) return;

    addComment({
      vehicleId,
      userId: currentUser.id,
      text: comment
    });

    setComment('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className={`${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white'
          } rounded-lg shadow-lg overflow-hidden`}
        >
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              {vehicle.description}
            </p>
            <p className="text-lg font-semibold mb-4">
              ${vehicle.pricePerDay} per day
            </p>

            {selectedVehicle === vehicle.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className={`w-full px-3 py-2 border rounded-md ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || format(new Date(), 'yyyy-MM-dd')}
                    className={`w-full px-3 py-2 border rounded-md ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRentalRequest(vehicle.id)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setSelectedVehicle(vehicle.id)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Rent Now
              </button>
            )}

            <div className="mt-6">
              <textarea
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                }`}
                rows={3}
              />
              <button
                onClick={() => handleComment(vehicle.id)}
                className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};