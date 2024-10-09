import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaCalendarAlt, FaSyringe, FaStethoscope } from 'react-icons/fa';

const Calendar: React.FC = () => {
  const { pets, selectedPetId } = useSelector((state: RootState) => state.pets);
  const selectedPet = selectedPetId ? pets[selectedPetId] : null;

  if (!selectedPet) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        <p>Please select a pet to view their calendar.</p>
      </div>
    );
  }

  const citas = selectedPet.calendario_citas || [];
  const vacunas = selectedPet.historial_salud?.vacunas || [];

  // Combine appointments and vaccinations into a single array of events
  const events = [
    ...citas.map(cita => ({ ...cita, type: 'appointment' })),
    ...vacunas.map(vacuna => ({ 
      type: 'vaccine',
      fecha: vacuna.proxima_dosis,
      tipo_cita: `${vacuna.nombre_vacuna} Vaccination`,
      notas: 'Next dose'
    }))
  ].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar for {selectedPet.perfil.nombre}</h1>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li key={index} className="bg-white shadow rounded-lg p-4 flex items-start">
            <div className="text-2xl text-blue-500 mr-4">
              {event.type === 'appointment' ? <FaStethoscope /> : <FaSyringe />}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{event.tipo_cita}</h2>
              <p className="text-gray-600">{event.fecha} {(event as any).hora || ''}</p>
              <p className="text-sm text-gray-500">{event.notas}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;