import React from 'react';
import { FaPaw, FaCalendarAlt, FaUsers, FaSyringe, FaHeartbeat, FaWeight, FaClipboardList, FaRobot, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { selectPet } from '../store/petSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { pets, selectedPetId } = useSelector((state: RootState) => state.pets);

  const handlePetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectPet(e.target.value));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a Pawa</h1>
      
      {Object.keys(pets).length === 0 ? (
        <p className="text-lg mb-4">Aún no tienes mascotas registradas. ¡Vamos a agregar tu primera mascota!</p>
      ) : (
        <div className="mb-6">
          <label htmlFor="pet-selector" className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona una mascota:
          </label>
          <select
            id="pet-selector"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedPetId || ''}
            onChange={handlePetChange}
          >
            <option value="">Selecciona una mascota</option>
            {Object.entries(pets).map(([id, pet]) => (
              <option key={id} value={id}>{pet.perfil.nombre}</option>
            ))}
          </select>
        </div>
      )}

      <Link
        to="/ai-bitacora"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-6"
      >
        <FaPlus className="mr-2" />
        Agregar {Object.keys(pets).length === 0 ? 'tu primera mascota' : 'nueva mascota'}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard icon={<FaPaw />} title="Perfil de Mascota" link="/pet-profile" />
        <DashboardCard icon={<FaCalendarAlt />} title="Calendario" link="/calendar" />
        <DashboardCard icon={<FaUsers />} title="Comunidad" link="/community" />
        <DashboardCard icon={<FaSyringe />} title="Vacunas" link="/vaccines" />
        <DashboardCard icon={<FaHeartbeat />} title="Salud" link="/health" />
        <DashboardCard icon={<FaWeight />} title="Peso y Nutrición" link="/weight" />
        <DashboardCard icon={<FaClipboardList />} title="Tareas" link="/tasks" />
        <DashboardCard icon={<FaRobot />} title="AI Bitácora" link="/ai-bitacora" />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, link }) => (
  <Link to={link} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <div className="text-3xl text-indigo-600 mr-4">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-gray-600">Accede a {title.toLowerCase()} aquí</p>
  </Link>
);

export default Dashboard;