import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css"; // <--- ADICIONE ESTA LINHA NO TOPO

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" /> 
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </>
  );
}