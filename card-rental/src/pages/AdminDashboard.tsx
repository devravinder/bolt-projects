import React, { useState } from 'react';
import { PlusCircle, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

export const AdminDashboard: React.FC = () => {
  const {
    vehicles,
    rentalRequests,
    addVehicle,
    updateRentalRequest,
    darkMode
  } = useStore();

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: '',
    image: '',
    pricePerDay: 0,
    description: ''
  });

  const totalIncome = rentalRequests
    .filter(request => request.status === 'approved')
    .reduce((sum, request) => sum + request.totalPrice, 0);

  const pendingRequests = rentalRequests.filter(
    request => request.status === 'pending'
  );

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle({ ...newVehicle, available: true });
    setNewVehicle({
      name: '',
      type: '',
      image: '',
      pricePerDay: 0,
      description: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Vehicles</h3>
            <PlusCircle className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold mt-2">{vehicles.length}</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Income</h3>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold mt-2">${totalIncome}</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <Clock className="text-orange-500" size={24} />
          </div>
          <p className="text-3xl font-bold mt-2">{pendingRequests.length}</p>
        </div>
      </div>

      {/* Add New Vehicle Form */}
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
        <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
        <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={newVehicle.name}
            onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
            className={`px-3 py-2 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
            required
          />
          <input
            type="text"
            placeholder="Vehicle Type"
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            className={`px-3 py-2 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newVehicle.image}
            onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.value })}
            className={`px-3 py-2 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
            required
          />
          <input
            type="number"
            placeholder="Price per Day"
            value={newVehicle.pricePerDay || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, pricePerDay: Number(e.target.value) })}
            className={`px-3 py-2 border rounded-md ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
            required
          />
          <textarea
            placeholder="Description"
            value={newVehicle.description}
            onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
            className={`px-3 py-2 border rounded-md md:col-span-2 ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
            }`}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 md:col-span-2"
          >
            Add Vehicle
          </button>
        </form>
      </div>

      {/* Pending Requests */}
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
        <h2 className="text-xl font-bold mb-4">Pending Rental Requests</h2>
        <div className="space-y-4">
          {pendingRequests.map(request => {
            const vehicle = vehicles.find(v => v.id === request.vehicleId);
            return (
              <div
                key={request.id}
                className={`${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } p-4 rounded-lg flex items-center justify-between`}
              >
                <div>
                  <p className="font-semibold">{vehicle?.name}</p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {request.startDate} to {request.endDate}
                  </p>
                  <p className="font-medium">Total: ${request.totalPrice}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateRentalRequest(request.id, 'approved')}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateRentalRequest(request.id, 'rejected')}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
          {pendingRequests.length === 0 && (
            <p className="text-center text-gray-500">No pending requests</p>
          )}
        </div>
      </div>
    </div>
  );
};