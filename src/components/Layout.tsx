import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPaw, FaCalendarAlt, FaUsers, FaRobot, FaNotesMedical, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectPet } from '../store/petSlice';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pets, selectedPetId } = useSelector((state: RootState) => state.pets);

  const handlePetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectPet(e.target.value));
  };

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-5">
        <Link to="/" className={`flex items-center p-2 mb-2 rounded ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
          <FaHome className="mr-2" /> Dashboard
        </Link>
        {selectedPetId && (
          <>
            <Link to={`/pet/${selectedPetId}`} className={`flex items-center p-2 mb-2 rounded ${location.pathname.startsWith('/pet') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <FaPaw className="mr-2" /> Pet Profile
            </Link>
            <Link to={`/medical-history/${selectedPetId}`} className={`flex items-center p-2 mb-2 rounded ${location.pathname.startsWith('/medical-history') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <FaNotesMedical className="mr-2" /> Medical History
            </Link>
            <Link to="/calendar" className={`flex items-center p-2 mb-2 rounded ${location.pathname === '/calendar' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
              <FaCalendarAlt className="mr-2" /> Calendar
            </Link>
          </>
        )}
        <Link to="/community" className={`flex items-center p-2 mb-2 rounded ${location.pathname === '/community' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
          <FaUsers className="mr-2" /> Community
        </Link>
        <Link to="/ai-bitacora" className={`flex items-center p-2 mb-2 rounded ${location.pathname === '/ai-bitacora' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
          <FaRobot className="mr-2" /> AI Bitácora
        </Link>
        
        {Object.keys(pets).length > 0 && (
          <select 
            className="w-full p-2 mt-4 bg-gray-700 rounded"
            value={selectedPetId || ''}
            onChange={handlePetChange}
          >
            <option value="">Select a pet</option>
            {Object.entries(pets).map(([id, pet]) => (
              <option key={id} value={id}>{pet.perfil.nombre}</option>
            ))}
          </select>
        )}
        
        <Link to="/ai-bitacora" className="flex items-center p-2 mt-4 bg-green-500 rounded hover:bg-green-600">
          <FaPlus className="mr-2" /> Add New Pet
        </Link>
      </nav>
      <main className="flex-1 p-5 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;