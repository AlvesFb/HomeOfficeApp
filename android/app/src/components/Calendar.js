import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

const Calendar = ({ schedule, onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const renderCalendarDay = (date) => {
    const isToday = moment(date).isSame(moment(), 'day');
    const isDisabled = moment(date).isBefore(moment().startOf('day'));
    const isSelected = moment(date).isSame(selectedDate, 'day');
    const dayOfMonth = moment(date).format('D');
    const dayOfWeek = moment(date).format('ddd');

    const dayStyles = [styles.calendarDay];
    const dayTextStyles = [styles.calendarDayText];

    if (isToday) {
      dayStyles.push(styles.calendarDayToday);
      dayTextStyles.push(styles.calendarDayTextToday);
    }

    if (isSelected) {
      dayStyles.push(styles.calendarDaySelected);
      dayTextStyles.push(styles.calendarDayTextSelected);
    }

    if (isDisabled) {
      dayStyles.push(styles.calendarDayDisabled);
      dayTextStyles.push(styles.calendarDayTextDisabled);
    }

    return (
      <TouchableOpacity
        key={date}
        style={dayStyles}
        disabled={isDisabled}
        onPress={() => {
          setSelectedDate(date);
          onDayPress(date);
        }}
      >
        <Text style={dayTextStyles}>
          {dayOfMonth}
        </Text>
        <Text style={dayTextStyles}>
          {dayOfWeek}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCalendarRow = (weekStart) => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = moment(weekStart).add(i, 'days').format('YYYY-MM-DD');
      const daySchedule = schedule[day] || {};
      const numEmployees = Object.keys(daySchedule).length;
      const isFull = numEmployees >= (schedule.maxEmployeesPerDay / 2);

      days.push(
        <View key={day} style={styles.calendarRow}>
          {renderCalendarDay(day)}
          {numEmployees > 0 &&
            <Text style={[styles.calendarNumEmployees, isFull ? styles.calendarNumEmployeesFull : null]}>
              {numEmployees}/{schedule.maxEmployeesPerDay / 2}
            </Text>
          }
        </View>
      );
    }

    return (
      <View key={weekStart} style={styles.calendarWeek}>
        {days}
      </View>
    );
  };

  const calendarRows = [];
  const startOfMonth = moment(selectedDate).startOf('month');
  const endOfMonth = moment(selectedDate).endOf('month');
  let weekStart = moment(startOfMonth);

  while (weekStart.isBefore(endOfMonth)) {
    calendarRows.push(renderCalendarRow(weekStart));
    weekStart = moment(weekStart).add(7, 'days');
  }

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <Text style={styles.calendarMonth}>
          {moment(selectedDate).format('MMMM YYYY')}
        </Text>
      </View>
      <View style={styles.calendarBody}>
        <View style={styles.calendarRow}>
          <Text style={[styles.calendarHeaderDay, styles.calendarHeaderDaySun]}>Sun</Text>
          <Text style={styles.calendarHeaderDay}>Mon</Text>
          <Text style={styles.calendarHeaderDay}>Tue</Text>
          <Text style={styles.calendarHeaderDay}>Wed</Text>
          <Text style={styles.calendarHeaderDay}>Thu</Text>
          <Text style={styles.calendarHeaderDay}>Fri</Text>
          <Text style={styles.calendarHeaderDay}>Wed</Text>
          <Text style={styles.calendarHeaderDay}>Thu</Text>
          <Text style={styles.calendarHeaderDay}>Fri</Text>
          <Text style={[styles.calendarHeaderDay, styles.calendarHeaderDaySat]}>Sat</Text>
        </View>
        {calendarRows}
      </View>
    </View>
  );
};






