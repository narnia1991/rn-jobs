import {
  Stack,
  useRouter,
} from 'expo-router';
import {
  SafeAreaView,
  View,
} from 'react-native';

import { COLORS } from '../constants';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          COLORS.lightWhite,
      }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor:
              COLORS.lightWhite,
          },
        }}></Stack.Screen>
    </SafeAreaView>
  );
};

export default Home;
