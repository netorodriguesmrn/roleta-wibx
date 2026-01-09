import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Ajuste o caminho se necessário
import { IMG } from '../img';

interface CardWinsProps {
  visible: boolean;
  prize: string;
  onClose: () => void;
}

export const CardWins = ({ visible, prize, onClose }: CardWinsProps) => {
  // Se não estiver visível, não renderiza nada
  if (!visible) return null;

  return (
    // Substituímos <Modal> por essa View absoluta que cobre todo o container da Roleta
    <View style={styles.overlay}>
        <View style={styles.card}>
          
          <Image 
            source={IMG.roleta.winHeader} 
            style={styles.chestImage}
          />

          <Text style={styles.title}>PARABÉNS!</Text>
          <Text style={styles.subtitle}>VOCÊ ACABA DE GANHAR:</Text>

          <View style={styles.prizeContainer}>
             <Image source={IMG.roleta.coinWibx} style={styles.coinIcon} />
            <Text style={styles.prizeValue}>{prize}</Text>
            <Text style={styles.currency}>WIBX</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    // Esses estilos fazem a View agir como um Modal, mas preso dentro do container pai
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 0, 50, 0.9)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000, // Garante que fique acima de tudo
    borderRadius: 30, // Se estiver na web com borda, isso acompanha
  },
  card: {
    // CORREÇÃO: Usar porcentagem em vez de width fixo do Dimensions
    width: '90%', 
    backgroundColor: '#47005d9c', 
    borderRadius: 55,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8C14FC', 
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  chestImage: {
    width: 280, // Reduzi um pouco para garantir que caiba bem
    height: 220, 
    resizeMode: 'contain',
    marginBottom: 10, 
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 5,
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 30,
    width: '100%', // Ocupa a largura do card interno
    backgroundColor: 'rgba(127, 100, 152, 0.99)', 
  },
  coinIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    resizeMode: 'contain',
  },
  prizeValue: {
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 6,
  },
  currency: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#853ACB', 
    paddingVertical: 15,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
  }
});