import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { savePet } from '../storage/petStorage';

export default function PublicarScreen({ pets, setPets, setScreen }) {
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [razao, setRazao] = useState('');
  const [imagem, setImagem] = useState(null);

  // funcao pra pegar imagem da galeria
  async function pickImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  }

  async function handlePublicar() {
    if (!tipo || !raca || !idade || !razao || !imagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const novoPet = {
      id: Date.now().toString(),
      tipo,
      raca,
      idade,
      razao,
      imagem,
    };

    const novaLista = [...pets, novoPet];
    setPets(novaLista);
    await savePet(novaLista);
    // salva e vai pra tela de adotar

    Alert.alert('Sucesso! 🎉', 'Pet publicado com sucesso!', [
      { text: 'Ver pets', onPress: () => setScreen('adotar') }
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>Publicar Adoção</Text>
          <Text style={styles.subtitle}>Ajude um pet a encontrar um lar 🏡</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="paw-outline" size={20} color="#FF6B9D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Tipo do pet (ex: Cachorro, Gato)"
              value={tipo}
              onChangeText={setTipo}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="heart-outline" size={20} color="#FF6B9D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Raça (ex: Vira-lata, Persa)"
              value={raca}
              onChangeText={setRaca}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={20} color="#FF6B9D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Idade (ex: 2 anos, 6 meses)"
              value={idade}
              onChangeText={setIdade}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="chatbox-outline" size={20} color="#FF6B9D" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Motivo da adoção"
              value={razao}
              onChangeText={setRazao}
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={pickImage}
            activeOpacity={0.8}
          >
            {imagem ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagem }} style={styles.imagePreview} />
                <View style={styles.changeImageOverlay}>
                  <Ionicons name="camera" size={30} color="#fff" />
                  <Text style={styles.changeImageText}>Trocar foto</Text>
                </View>
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <Ionicons name="camera-outline" size={50} color="#FF6B9D" />
                <Text style={styles.uploadText}>Adicionar Foto</Text>
                <Text style={styles.uploadSubtext}>Toque para selecionar</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonPublish} 
            onPress={handlePublicar}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Publicar Adoção</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.95,
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333'
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  uploadContent: {
    alignItems: 'center',
    padding: 40,
  },
  uploadText: {
    color: '#FF6B9D',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  uploadSubtext: {
    color: '#999',
    fontSize: 14,
    marginTop: 5,
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 250,
  },
  changeImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  buttonPublish: {
    backgroundColor: '#FF6B9D',
    padding: 18,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
