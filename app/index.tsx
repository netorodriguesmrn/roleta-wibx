import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import {
    Animated,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

import { CardWins } from '../src/assets/components/cardWins';
import { IMG } from '../src/assets/img';
import { SEGMENT_ANGLE, useRoleta } from '../src/hooks/useRoleta';
import { styles, WHEEL_SIZE } from '../src/styles/roletaStyles';

/* =====================================================
   COMPONENTE DE VÍDEO (MOBILE x WEBVIEW)
   ===================================================== */
const AdVideo = ({
  source,
  width,
  height,
  onFinish,
}: {
  source: any;
  width: number;
  height: number;
  onFinish: () => void;
}) => {
  // -------- WEB / WEBVIEW (Angular) --------
  if (Platform.OS === 'web') {
    return (
      <video
        src={source}
        autoPlay
        playsInline
        onEnded={onFinish}
        style={{
          width,
          height,
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          backgroundColor: 'black',
        }}
      />
    );
  }

  // -------- MOBILE (Android / iOS) --------
  return (
    <Video
      source={source}
      style={{ width, height }}
      resizeMode={ResizeMode.CONTAIN}
      shouldPlay
      isLooping={false}
      useNativeControls={false}
      onPlaybackStatusUpdate={(status) => {
        // @ts-ignore
        if (status.isLoaded && status.didJustFinish) {
          onFinish();
        }
      }}
    />
  );
};

export default function RoletaPage() {
  const {
    prizes,
    rotationValue,
    isSpinning,
    ledOpacity,
    showPopup,
    prizeWon,
    closePopup,
    handlePressButton,
    getButtonText,
    dailySpins,
    isAdPlaying,
    onAdFinished,
  } = useRoleta();

  const videoRef = useRef(null);

  /* =====================================================
     CÁLCULO DO TAMANHO DO VÍDEO (9:16 REAL)
     ===================================================== */
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const VIDEO_RATIO = 1080 / 1920;

  let videoHeight = screenHeight;
  let videoWidth = videoHeight * VIDEO_RATIO;

  if (videoWidth > screenWidth) {
    videoWidth = screenWidth;
    videoHeight = videoWidth / VIDEO_RATIO;
  }

  /* ===================================================== */

  const wheelRotation = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const getVideoSource = () => {
    if (dailySpins === 2) {
      return require('../src/assets/videos/anuncio1.mp4');
    }
    return require('../src/assets/videos/anuncio.mp4');
  };

  const getCoinIcon = (id: number) => {
    switch (id) {
      case 1:
      case 3:
      case 7:
        return IMG.roleta.coin1;
      case 5:
        return IMG.roleta.coin2;
      case 2:
      case 6:
      case 8:
        return IMG.roleta.coin3;
      case 4:
        return IMG.roleta.coin4;
      default:
        return IMG.roleta.coin1;
    }
  };

  return (
    <LinearGradient
      colors={['#00023A', '#47005D']}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Roleta da Sorte</Text>
        <Text style={styles.subtitle}>Ganhe todo dia um giro grátis</Text>
      </View>

      {/* ROLETA */}
      <View style={styles.wheelContainer}>
        <View style={styles.layersContainer}>
          <Image source={IMG.roleta.bordaRoleta} style={styles.frame} />

          <Animated.View
            style={[
              styles.spinningContainer,
              { transform: [{ rotate: wheelRotation }] },
            ]}
          >
            <Image source={IMG.roleta.fundoRoleta} style={styles.wheel} />

            {prizes.map((prize, index) => {
              const angle = index * SEGMENT_ANGLE;
              return (
                <View
                  key={index}
                  style={[
                    styles.prizeTextContainer,
                    {
                      transform: [
                        { rotate: `${angle}deg` },
                        { translateY: -WHEEL_SIZE * 0.3 },
                      ],
                    },
                  ]}
                >
                  <Image
                    source={getCoinIcon(prize.id)}
                    style={styles.coinIcon}
                  />
                  <Text style={styles.prizeText}>{prize.label}</Text>
                </View>
              );
            })}
          </Animated.View>

          <Image source={IMG.roleta.centroRoletaSBT} style={styles.centerPin} />
          <Image source={IMG.roleta.seletorRoleta} style={styles.pointer} />
          <Animated.Image
            source={IMG.roleta.ledRoleta}
            style={[styles.lightImage, { opacity: ledOpacity }]}
          />
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        {!isSpinning ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={styles.spinsCounterText}>
              GIROS DIÁRIOS {dailySpins}/3
            </Text>

            <TouchableOpacity
              style={[
                styles.spinButton,
                dailySpins >= 3 && { backgroundColor: '#555' },
              ]}
              onPress={handlePressButton}
            >
              <Text style={styles.spinButtonText}>
                {getButtonText()}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <LottieView
            source={require('../src/assets/animations/silvio.json')}
            autoPlay
            loop
            resizeMode="contain"
            style={styles.silvioAnimation}
          />
        )}
      </View>

      <CardWins
        visible={showPopup}
        prize={prizeWon}
        onClose={closePopup}
      />

      {/* =====================================================
          OVERLAY DO VÍDEO (PUBLICIDADE)
          ===================================================== */}
      {isAdPlaying && (
        <View style={localStyles.overlay}>
          <AdVideo
            source={getVideoSource()}
            width={videoWidth}
            height={videoHeight}
            onFinish={onAdFinished}
          />

          <View style={localStyles.badge}>
            <Text style={localStyles.badgeText}>
              Publicidade - Assista até o final
            </Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

/* =====================================================
   STYLES DO OVERLAY DE VÍDEO
   ===================================================== */
const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
