import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ... (mantén las interfaces existentes)

interface PetsState {
  pets: Record<string, PetState>;
  selectedPetId: string | null;
}

const initialState: PetsState = {
  pets: {},
  selectedPetId: null
};

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    addPet: (state, action: PayloadAction<{ id: string; pet: PetState }>) => {
      state.pets[action.payload.id] = action.payload.pet;
      if (!state.selectedPetId) {
        state.selectedPetId = action.payload.id;
      }
    },
    updatePetProfile: (state, action: PayloadAction<{ id: string; profile: Partial<PetState['perfil']> }>) => {
      if (state.pets[action.payload.id]) {
        state.pets[action.payload.id].perfil = { ...state.pets[action.payload.id].perfil, ...action.payload.profile };
      }
    },
    selectPet: (state, action: PayloadAction<string>) => {
      state.selectedPetId = action.payload;
    },
    // ... (mantén los otros reducers, adaptándolos para trabajar con el id de la mascota)
  },
});

export const { addPet, updatePetProfile, selectPet } = petsSlice.actions;

export default petsSlice.reducer;