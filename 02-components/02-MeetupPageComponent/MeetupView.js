import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
    <!-- meetup cover -->
    <meetup-cover :link="meetupImage" :title="meetup.title"></meetup-cover>
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <h3>Описание</h3>
          <!-- meetup description -->
          <meetup-description :description="meetup.description"></meetup-description>
          <h3>Программа</h3>
          <!-- meetup agenda -->
          <meetup-agenda :agenda="meetup.agenda"></meetup-agenda>
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="new Date(meetup.date)"></meetup-info>
        </div>
      </div>
    </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
    getMeetupCoverLink,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    meetupImage() {
      return getMeetupCoverLink(this.meetup);
    },
  },
};
