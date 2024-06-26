import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import styles from '../../styles/search';

const JobSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, isLoading, error, dynamicFetch } = useFetch({
    params: {
      query: params.id,
      page: page.toString(),
    },
  });

  const handleSearch = async () => {
    dynamicFetch({
      query: params.id,
      page: page.toString(),
    });
  };

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />

      {!!data.length && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <NearbyJobCard
              item={item}
              handleNavigate={() =>
                router.push(`/job-details/${item.job_id}`)
              }
            />
          )}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{
            padding: SIZES.medium,
            rowGap: SIZES.medium,
          }}
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <Text style={styles.searchTitle}>{params.id}</Text>
                <Text style={styles.noOfSearchedJobs}>
                  Job Opportunities
                </Text>
              </View>
              <View style={styles.loaderContainer}>
                {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                  />
                ) : (
                  error && <Text>Oops something went wrong</Text>
                )}
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('left')}>
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => handlePagination('right')}>
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default JobSearch;
