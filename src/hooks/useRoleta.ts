import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Easing } from "react-native";
// Importar Audio
import { Audio } from 'expo-av';

export const prizes = [
  { label: "5", id: 1 }, { label: "32", id: 2 }, 
  { label: "12", id: 3 }, { label: "100", id: 4 },
  { label: "20", id: 5 }, { label: "48", id: 6 }, 
  { label: "8", id: 7 }, { label: "75", id: 8 },
];

export const SEGMENT_ANGLE = 360 / prizes.length;

// REMOVIDO: export const WHEEL_SIZE... (Isso agora vem do roletaStyles)

export const useRoleta = () => {
  // Estados da Roleta
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [prizeWon, setPrizeWon] = useState("0");
  
  // Estado do Áudio
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Estados dos Giros e Anúncios
  const [dailySpins, setDailySpins] = useState(0); 
  const [isAdPlaying, setIsAdPlaying] = useState(false); 
  const [adUnlocked, setAdUnlocked] = useState(false); 

  // Valores de Animação
  const rotationValue = useRef(new Animated.Value(0)).current;
  const ledOpacity = useRef(new Animated.Value(0)).current;

  // --- LÓGICA DOS BOTÕES E GIROS ---

  const getButtonText = () => {
    if (dailySpins >= 3) return "VOLTE AMANHÃ";
    if (dailySpins === 0) return "GIRAR GRÁTIS"; 
    if (adUnlocked) return "GIRAR AGORA"; 
    return "ASSISTIR VÍDEO"; 
  };

  const handlePressButton = () => {
    if (dailySpins >= 3) {
       Alert.alert("Limite Atingido", "Você já usou seus 3 giros de hoje!");
       return;
    }

    if (dailySpins === 0 || adUnlocked) {
      spin();
    } else {
      setIsAdPlaying(true);
    }
  };

  const onAdFinished = () => {
    setIsAdPlaying(false); 
    setAdUnlocked(true);   
  };

  // --- FUNÇÕES DE AUDIO ---
  
  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/giro_silvio.mp3') 
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Erro ao tocar som', error);
    }
  }

  async function stopSound() {
    try {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
    } catch (error) {
        console.log('Erro ao parar som', error);
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // --- FUNÇÕES DE ANIMAÇÃO ---

  const startBlinking = () => {
    Animated.sequence([
      Animated.timing(ledOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(ledOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(ledOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(ledOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(ledOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(ledOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const stopBlinking = () => {
    ledOpacity.stopAnimation();
    ledOpacity.setValue(0);
  };

  const closePopup = () => {
    stopSound(); 
    setShowPopup(false);
    setIsSpinning(false);
    stopBlinking();

    setDailySpins(prev => prev + 1);
    setAdUnlocked(false);
  };
  
  const spin = async () => {
    if (isSpinning) return;

    stopBlinking();
    setIsSpinning(true);
    rotationValue.setValue(0);

    await playSound();

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const currentAngle = prizeIndex * SEGMENT_ANGLE;
    const angleToTop = 360 - currentAngle;
    
    const randomSpins = 5; 
    const targetAngle = (randomSpins * 360) + angleToTop;

    Animated.timing(rotationValue, {
      toValue: targetAngle,
      duration: 6000, 
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(async () => {
        
        const prize = prizes[prizeIndex];
        startBlinking();
        setPrizeWon(prize.label);
        
        setTimeout(() => {
            setShowPopup(true);
        }, 2000); 
    });
  };

  return {
    prizes,
    isSpinning,
    rotationValue,
    ledOpacity,
    showPopup,
    prizeWon,
    closePopup,
    dailySpins,
    isAdPlaying,
    handlePressButton,
    getButtonText,
    onAdFinished
  };
};