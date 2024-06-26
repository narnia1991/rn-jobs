import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import useFetch from '../../../hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch({
    endpoint: 'search',
    params: {
      query: 'React developer',
      num_pages: 1,
    },
  });

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((item, index) => (
            <NearbyJobCard
              item={item}
              key={`nearby-job-${item?.job_id || index}`}
              handleNavigate={() =>
                router.push(`/job-details/${item?.job_id}`)
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
