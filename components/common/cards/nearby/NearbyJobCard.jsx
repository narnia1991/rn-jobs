import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './nearbyjobcard.style';
import CImage from '../../image/Image';

const NearbyJobCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <CImage
          imgURL={item?.employer_logo}
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {item?.job_title}
        </Text>
        <Text style={styles.jobType}>
          {item?.job_employment_type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
