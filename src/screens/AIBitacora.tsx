import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addPet } from '../store/petSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BitacoraContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ChatContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 400px;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 20px;
`;

const Message = styled.div<{ $isAI: boolean }>`
  background-color: ${props => props.$isAI ? '#f0f0f0' : '#e3f2fd'};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 70%;
  ${props => props.$isAI ? 'margin-right: auto;' : 'margin-left: auto;'}
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SendButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const AIBitacora: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>([
    { text: "¡Hola! Soy tu asistente virtual para crear el perfil de tu mascota. ¿Cómo se llama tu mascota?", isAI: true }
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [petProfile, setPetProfile] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = [
    { field: 'nombre', question: "¿Cómo se llama tu mascota?" },
    { field: 'especie', question: "¿Qué tipo de animal es? (perro, gato, etc.)" },
    { field: 'raza', question: "¿Cuál es su raza?" },
    { field: 'edad', question: "¿Cuántos años tiene?" },
    { field: 'sexo', question: "¿Es macho o hembra?" },
    { field: 'color', question: "¿De qué color es?" },
  ];

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, isAI: false }]);
      
      if (currentStep < steps.length) {
        setPetProfile(prev => ({ ...prev, [steps[currentStep].field]: input }));
      }
      
      setInput('');
      
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: steps[currentStep + 1].question, isAI: true }]);
          setCurrentStep(currentStep + 1);
        }, 1000);
      } else if (currentStep === steps.length - 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: "¡Genial! Hemos completado el perfil básico de tu mascota. ¿Quieres guardarlo? (Responde 'sí' para guardar)", isAI: true }]);
          setCurrentStep(currentStep + 1);
        }, 1000);
      } else if (currentStep === steps.length && input.toLowerCase() === 'sí') {
        try {
          const newPetId = Date.now().toString();
          dispatch(addPet({ id: newPetId, pet: { perfil: petProfile } }));
          toast.success('Mascota agregada exitosamente');
          navigate('/');
        } catch (error) {
          console.error('Error al agregar mascota:', error);
          toast.error('Hubo un error al agregar la mascota. Por favor, intenta de nuevo.');
        }
      }
    }
  };

  return (
    <BitacoraContainer>
      <h1>Bitácora IA - Creación de Perfil de Mascota</h1>
      <ChatContainer>
        {messages.map((message, index) => (
          <Message key={index} $isAI={message.isAI}>
            {message.isAI ? <FaRobot /> : null} {message.text}
          </Message>
        ))}
      </ChatContainer>
      <InputContainer>
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu respuesta aquí..."
        />
        <SendButton onClick={handleSend}>
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
    </BitacoraContainer>
  );
};

export default AIBitacora;