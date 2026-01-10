import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const IS_WEB = Platform.OS === 'web';

// MELHORIA 1: No celular, usamos Math.min para garantir que em telas
// muito largas (tablets/celulares gigantes) ela não fique monstruosa.
const APP_WIDTH = IS_WEB ? 400 : Math.min(width, 400); 

// MELHORIA 2: Diminuímos de 0.85 para 0.65 (65% da tela)
// Cálculo: 0.65 (roda) * 1.5 (pino) = 0.975 (97.5% da tela)
// Assim, o pino fica quase na borda, mas DENTRO da tela.
export const WHEEL_SIZE = APP_WIDTH * 0.75; 

export const FRAME_SIZE = WHEEL_SIZE * 1.15;

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    // Ajuste de padding: Na web não precisa de tanto espaço em cima
    paddingTop: IS_WEB ? 20 : 90, 
    paddingBottom: 150,
    width: '100%', 
  },
  header: {
    alignItems: 'center',
    marginBottom: 20, 
    zIndex: 10,
  },
  title: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold', 
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 16,
    marginTop: 5,
    fontWeight: '400'
  },
  
  // --- Camadas da Roleta ---
  wheelContainer: {
    height: FRAME_SIZE, 
    width: FRAME_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, 
  },
  layersContainer: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: 'absolute',
    resizeMode: 'contain',
  },
  spinningContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheel: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  lightImage: {
    width: WHEEL_SIZE * 1.294,
    height: WHEEL_SIZE * 1.294,
    position: 'absolute',
    resizeMode: 'contain',
  },
  centerPin: {
    width: WHEEL_SIZE * 1.5,
    height: WHEEL_SIZE * 1.5,
    position: 'absolute',
    resizeMode: 'contain',
  },
  pointer: {
    width: WHEEL_SIZE * 1.33,
    height: WHEEL_SIZE * 1.4,
    position: 'absolute',
    resizeMode: 'contain',
  },
  
  // --- Texto e Moeda ---
  prizeTextContainer: {
    position: 'absolute',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 0, 
  },
  prizeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20, 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    marginTop: 0, 
  },

  // --- Rodapé e Botão ---
  footer: { 
    position: 'absolute', 
    bottom: IS_WEB ? 90 : 130, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100, 
  },
  
  spinsCounterText: {
    color: '#FFD700', 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, 
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },

  spinButton: {
    backgroundColor: '#8C14FC', 
    width: '80%',               
    paddingVertical: 18,        
    borderRadius: 50,           
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    // @ts-ignore
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)', 
  },
  spinButtonText: {
    color: 'white',
    fontSize: 22,    
    fontWeight: 'bold',
    textTransform: 'uppercase', 
    letterSpacing: 1,
  },

  silvioAnimation: {
    width: WHEEL_SIZE * 2.2, 
    height: WHEEL_SIZE * 2.2,
    transform: [
        { translateY: 180 } 
    ],
  }
});