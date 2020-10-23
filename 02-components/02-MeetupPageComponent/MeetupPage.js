import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <div>
    <meetup-view v-if="rawMeetup" :meetup="rawMeetup"></meetup-view>
    </div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      rawMeetup: null,
    };
  },

  mounted() {
    this.fetchMeetup();
  },

  methods: {
    async fetchMeetup() {
      this.rawMeetup = await fetchMeetup(MEETUP_ID);
    },
  },
};
