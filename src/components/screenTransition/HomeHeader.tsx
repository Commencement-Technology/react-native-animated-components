import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {typography} from '@utils/typography';
import {MAX_FONT_UPSCALE_FACTOR, MED_FONT_UPSCALE_FACTOR} from '@utils/device';
import {TWelcomeNavigationProps} from '@screens/ScreenTransition/ScreenTransitionStack';

const HomeHeader = () => {
  const navigation = useNavigation<TWelcomeNavigationProps>();

  const onPress = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={[styles.container, styles.rowCenter]}>
      <View style={styles.rowCenter}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/2.jpg'}}
          style={styles.logo}
        />
        <View style={{gap: 2}}>
          <Text
            style={styles.name}
            maxFontSizeMultiplier={MAX_FONT_UPSCALE_FACTOR}>
            Erica Hawkins
          </Text>
          <Text
            style={styles.grade}
            maxFontSizeMultiplier={MED_FONT_UPSCALE_FACTOR}>
            6th grade
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.bellContainer}>
        <MaterialCommunityIcons name="bell" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
  },
  logo: {
    marginRight: 12,
    height: 52,
    width: 52,
    borderRadius: 16,
  },
  name: {
    fontFamily: typography.bold,
    fontSize: 18,
  },
  grade: {
    fontFamily: typography.semiBold,
    fontSize: 14,
    color: '#a3a3a3',
  },
  bellContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#e5e5e5',
  },
});
