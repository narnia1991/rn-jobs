import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashSreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashSreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView =
    useCallback(async () => {
      if (fontsLoaded) {
        await SplashSreen.hideAsync();
      }
    }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      onLayout={onLayoutRootView}></Stack>
  );
};

export default Layout;
