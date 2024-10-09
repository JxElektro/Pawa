import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaSyringe, FaNotesMedical } from 'react-icons/fa';

const HistoryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  color: #4a90e2;
  margin-bottom: 15px;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const MedicalHistory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { vacunas, historial_medico } = useSelector((state: RootState) => state.pet.historial_salud);

  return (
    <HistoryContainer>
      <h1>Medical History</h1>
      <Section>
        <SectionTitle>
          <Icon><FaSyringe /></Icon>
          Vaccinations
        </SectionTitle>
        <List>
          {vacunas.map((vacuna, index) => (
            <ListItem key={index}>
              <strong>{vacuna.nombre_vacuna}</strong>
              <p>Date: {vacuna.fecha}</p>
              <p>Next dose: {vacuna.proxima_dosis}</p>
            </ListItem>
          ))}
        </List>
      </Section>
      <Section>
        <SectionTitle>
          <Icon><FaNotesMedical /></Icon>
          Medical Records
        </SectionTitle>
        <List>
          {historial_medico.map((record, index) => (
            <ListItem key={index}>
              <strong>{record.condicion}</strong>
              <p>Diagnosis date: {record.fecha_diagnostico}</p>
              <p>Treatment: {record.tratamiento}</p>
              <p>Notes: {record.notas}</p>
            </ListItem>
          ))}
        </List>
      </Section>
    </HistoryContainer>
  );
};

export default MedicalHistory;