import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import styles from './welcome.style';
import { SIZES, icons } from '../../../constants';

const jobType = ['Full-time', 'Part-time', 'Contractor'];

const Welcome = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');

  const handleRenderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.tab(activeJobType, item)}
        onPress={() => {
          setActiveJobType(item);
          router.push(`/search/${item}`);
        }}>
        <Text style={styles.tabText(activeJobType, item)}>
          {item}
        </Text>
      </TouchableOpacity>
    ),
    [router]
  );

  return (
    <View>
      <View style={styles.component}>
        <Text style={styles.userName}>Hello Narnia</Text>
        <Text style={styles.welcomeMessage}>
          Find your perfect job
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="what are you looking for?"
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={handleSearch}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobType}
          renderItem={handleRenderItem}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            columnGap: SIZES.small,
          }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
