import AsyncStorage from '@react-native-async-storage/async-storage';

const PETS_KEY = 'pets';

// busca os pets salvos
export async function getPets() {
  try {
    const data = await AsyncStorage.getItem(PETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('Erro ao carregar pets:', e);
    return [];
  }
}

// salva a lista de pets
export async function savePet(pets) {
  try {
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
  } catch (e) {
    console.log('Erro ao salvar pets:', e);
  }
}
