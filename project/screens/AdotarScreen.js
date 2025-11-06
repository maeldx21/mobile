import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getPets } from '../storage/petStorage';

export default function AdotarScreen({ pets, setPets, setScreen }) {
  // carrega os pets salvos
  useEffect(() => {
    async function carregar() {
      const data = await getPets();
      if (data) setPets(data);
    }
    carregar();
  }, []);

  const renderPet = ({ item }) => (
    <View style={styles.card}>
      {item.imagem && (
        <Image source={{ uri: item.imagem }} style={styles.petImage} />
      )}
      <View style={styles.cardContent} >
        <View style={styles.badge}>
          <Ionicons name="paw" size={16} color="#FF6B9D" />
          <Text style={styles.petType}>{item.tipo}</Text>
        </View>
        <Text style={styles.petName}>{item.raca}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.petInfo}>{item.idade}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="information-circle-outline" size={16} color="#666" />
          <Text style={styles.petInfo}>{item.razao}</Text>
        </View>
        <TouchableOpacity style={styles.btnConhecer} activeOpacity={0.8}>
          <Ionicons name="heart" size={18} color="#fff" />
          <Text style={styles.btnConhecerText}>Quero Conhecer!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FF6B9D', '#C44569']} style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>Pets para Adoção</Text>
          <Text style={styles.subtitle}>Encontre seu novo melhor amigo 💕</Text>
        </View>
      </LinearGradient>

      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum pet disponível ainda</Text>
          <Text style={styles.emptySubtext}>Seja o primeiro a publicar! 🐾</Text>
        </View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={renderPet}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  petImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 15,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5EF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
    gap: 5,
  },
  petType: {
    color: '#FF6B9D',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
    marginBottom: 10
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  petInfo: {
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
  btnConhecer: {
    backgroundColor: '#FF6B9D',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnConhecerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
  },
});
