import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch({
    endpoint: 'job-details',
    params: {
      job_id: params.id,
    },
  });

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {
    refetch();
  };

  const displayTabContent = ({ activeTab }) => {
    switch (activeTab) {
      case tabs[0]:
      case tabs[1]:
        return (
          <Specifics
            title={tabs[1]}
            points={data[0].job_highlights?.qualifications ?? 'N/A'}
          />
        );
      case tabs[2]:
      default:
        break;
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
        }}
        headerTitle=""></Stack.Screen>
      <>
        <ScrollView
          showsVerticalScrollIndicator="false"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}></RefreshControl>
          }>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              colors={COLORS.primary}
            />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : !data.length ? (
            <Text>No Data</Text>
          ) : (
            <View
              style={{
                padding: SIZES.medium,
                paddingBottom: 100,
              }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabArray={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
