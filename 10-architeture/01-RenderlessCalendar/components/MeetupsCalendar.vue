<template>
  <calendar-view v-bind="$attrs" v-slot="{ day }">
    <calendar-view-event
      v-for="meetup in meetupsDays[day.dateToString]"
      :key="meetup.title"
      tag="router-link"
      :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
      >{{ meetup.title }}</calendar-view-event
    >
  </calendar-view>
</template>

<script>
import CalendarView from './CalendarView';
import CalendarViewEvent from './CalendarViewEvent';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarViewEvent,
    CalendarView,
  },

  computed: {
    meetupsDays() {
      const result = {};
      this.meetups.forEach((meetup) => {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [{ title: meetup.title, id: meetup.id }];
        } else {
          result[dateString].push({ title: meetup.title, id: meetup.id });
        }
      });
      return result;
    },
  },
};
</script>

<style></style>
