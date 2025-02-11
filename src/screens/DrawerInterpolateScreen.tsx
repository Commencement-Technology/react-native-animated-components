import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useDrawerStatus,
  useDrawerProgress,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

import Text from '@components/Text';
import {typography} from '@utils/typography';
import StatusBarManager from '@components/StatusBarManager';
import DrawerContent from '@components/drawerInterpolate/DrawerContent';
import {DrawerTypes, TDrawerList} from '@components/drawerInterpolate/types';

const Drawer = createDrawerNavigator<TDrawerList>();

const DrawerInterpolateScreen = () => {
  const screenOptions = {
    headerShown: false,
    drawerType: 'slide' as DrawerTypes,
    overlayColor: 'transparent',
    sceneContainerStyle: styles.sceneContainerStyle,
    drawerStyle: styles.drawerStyle,
  };

  return (
    <View style={styles.navigatorContainer}>
      <Drawer.Navigator
        screenOptions={screenOptions}
        drawerContent={props => (
          <DrawerContent navigation={props.navigation} />
        )}>
        <Drawer.Screen name="DrawerInterpolateNested">
          {(props: any) => <DrawerInterpolate {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const DrawerInterpolate = ({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}) => {
  const insets = useSafeAreaInsets();
  const drawerStatus = useDrawerStatus();
  const drawerProgress = useDrawerProgress();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);

    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 34]);

    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  useEffect(() => {
    if (drawerStatus === 'open') {
      StatusBar.setBarStyle('light-content');
    } else if (drawerStatus === 'closed') {
      StatusBar.setBarStyle('dark-content');
    }
  }, [drawerStatus]);

  return (
    <>
      <StatusBarManager />
      <Animated.View style={[styles.container, animatedStyles]}>
        <TouchableOpacity
          onPress={() => {
            StatusBar.setBarStyle('light-content');
            navigation.openDrawer();
          }}
          style={[
            styles.menuContainer,
            {
              paddingTop: insets.top > 0 ? insets.top + 8 : 28,
            },
          ]}>
          <Entypo name="menu" size={26} />
          <Text style={styles.label}>Menu</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigatorContainer: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
  },
  label: {
    fontSize: 18,
    paddingLeft: 8,
    fontFamily: typography.semiBold,
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  drawerStyle: {
    flex: 1,
    width: '65%',
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
});

export default DrawerInterpolateScreen;
