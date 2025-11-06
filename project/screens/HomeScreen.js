import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ setScreen }) {
  // tela inicial do app
  return (
    <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={80} color="#fff" style={styles.icon} />
        <Text style={styles.logo}>Audoção</Text>
        <Text style={styles.subtitle}>Conectando corações e patinhas 🐾</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => setScreen('adotar')}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={24} color="#C44569" style={styles.buttonIcon} />
          <Text style={styles.buttonTextPrimary}>Quero Adotar</Text>
          <Text style={styles.buttonSubtext}>Encontre seu novo amigo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => setScreen('publicar')}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonTextSecondary}>Publicar Adoção</Text>
          <Text style={styles.buttonSubtextSecondary}>Ajude um pet a encontrar um lar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Feito com ❤️ para os animais</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.95,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    gap: 20,
  },
  buttonPrimary: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonIcon: {
    marginBottom: 8,
  },
  buttonTextPrimary: {
    color: '#C44569',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  buttonTextSecondary: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  buttonSubtext: {
    color: '#666',
    fontSize: 13,
  },
  buttonSubtextSecondary: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.9,
  },
  footer: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});
