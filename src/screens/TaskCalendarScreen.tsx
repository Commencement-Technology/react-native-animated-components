import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Animated, {LinearTransition} from 'react-native-reanimated';

import {
  TEvent,
  TNavigation,
  TCalendarState,
} from '@components/taskCalendar/types';
import Event from '@components/taskCalendar/Event';
import Header from '@components/taskCalendar/Header';
import Loading from '@components/taskCalendar/Loading';
import {MONTHS} from '@components/taskCalendar/constants';
import ListEmpty from '@components/taskCalendar/ListEmpty';
import StatusBarManager from '@components/StatusBarManager';
import {useCalendarEvents} from '@components/taskCalendar/hooks/useCalendarEvents';

export const today = new Date();

const initialState = {
  loading: true,
  month: MONTHS[new Date().getMonth()],
  transitionEnd: false,
  selectedDate: today,
};

const TaskCalendarScreen = ({navigation}: TNavigation) => {
  const [state, setState] = React.useState<TCalendarState>(initialState);

  const filteredEvents = useCalendarEvents(state);

  const events = state.loading ? [] : filteredEvents;

  const onSelecteMonth = useCallback((month: number) => {
    setState(prev => ({
      ...prev,
      month: MONTHS[month],
      loading: true,
    }));
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TEvent; index: number}) => {
      return <Event {...item} key={index} />;
    },
    [state.month],
  );

  const selectDate = useCallback((date: Date) => {
    setState(prev => ({...prev, selectedDate: date, loading: true}));
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('transitionEnd', () => {
      setState(prev => ({...prev, transitionEnd: true}));
    });

    return listener;
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

    timeout = setTimeout(() => {
      setState(prev => ({...prev, loading: false}));
    }, 600);

    return () => {
      !!timeout && clearTimeout(timeout);
    };
  }, [state.selectedDate, state.month]);

  return (
    <View style={styles.container}>
      <StatusBarManager barStyle={'light'} />
      <Loading loading={state.loading} />
      {state.transitionEnd && (
        <Animated.FlatList
          style={styles.container}
          layout={LinearTransition}
          data={events}
          bounces={false}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentStyle}
          ListEmptyComponent={
            <ListEmpty
              loading={state.loading}
              selectedDate={state.selectedDate}
            />
          }
          ListHeaderComponent={
            <Header
              month={state.month}
              selectedDate={selectDate}
              onSelecteMonth={onSelecteMonth}
            />
          }
        />
      )}
    </View>
  );
};

export default TaskCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentStyle: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});