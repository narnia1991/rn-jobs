import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import useFetch from '../../../hook/useFetch';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch({
    endpoint: 'search',
    params: {
      query: 'React developer',
      num_pages: 1,
    },
  });

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong {error.toString()}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                keyExtractor={(item) => item?.job_id}
                handleCardPress={handleCardPress}
              />
            )}
            contentContainerStyle={{
              columnGap: SIZES.medium,
            }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
