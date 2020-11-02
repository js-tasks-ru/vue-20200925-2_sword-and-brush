// Полезные функции по работе с датой можно описать вне Vue компонента
function getDateOnlyString(date) {
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',
  template: `
    <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click="previousMonth" class="rangepicker__selector-control-left"></button>
          <div>{{ calendarHeader.month }} {{ calendarHeader.year }}</div>
          <button @click="nextMonth" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in currentMonthList"
             :class="{'rangepicker__cell': true, 'rangepicker__cell_inactive': day.currentMonth === false }">
          {{ day.currentDate }}
          <div v-if="day.haveMeetup !== null">
            <a v-for="meetupTitle in day.haveMeetup" class="rangepicker__event">{{ meetupTitle }}</a>
          </div>
        </div>
      </div>
    </div>
    </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  data() {
    return {
      currentDate: new Date(),
    };
  },

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    calendarHeader() {
      return {
        month: this.currentDate.toLocaleString(navigator.language, {
          month: 'long',
        }),
        year: this.currentDate.getFullYear(),
      };
    },

    currentMonthList() {
      let currentMonth = [];
      let firstDay = new Date(this.currentDate.setDate(1));

      let dayOfWeek = (new Date(firstDay).getDay() === 2) ? new Date(firstDay).setDate(new Date(firstDay).getDate() - 1) :
        (new Date(firstDay).getDay() === 3) ? new Date(firstDay).setDate(new Date(firstDay).getDate() - 2) :
          (new Date(firstDay).getDay() === 4) ? new Date(firstDay).setDate(new Date(firstDay).getDate() - 3) :
            (new Date(firstDay).getDay() === 5) ? new Date(firstDay).setDate(new Date(firstDay).getDate() - 4) :
              (new Date(firstDay).getDay() === 6) ? new Date(firstDay).setDate(new Date(firstDay).getDate() - 5) :
                (new Date(firstDay).getDay() === 0) ? new Date(firstDay).setDate(new Date(firstDay).getDate() - 6) :
                  firstDay;

      for (let i = 0; i < 42; i++) {
        let currentDate = new Date(this.currentDate);
        let currentDay = new Date(dayOfWeek).setDate(new Date(dayOfWeek).getDate() + i);

        let matchingFirstDay = (new Date(currentDate.setMonth(currentDate.getMonth() + 1))
          .getMonth() === new Date(currentDay).getMonth()) && new Date(currentDay).getDay() === 1;
        let matchingLastDay = new Date(currentDay).getMonth() === new Date(currentDate.setMonth(currentDate.getMonth() + 1))
          .getMonth() && new Date(currentDay).getDay() === 0;

        if (matchingFirstDay) break;
        if (matchingLastDay) break;

        let haveMeetup = null;
        for (let meetup of this.meetupsDays) {
          if (getDateOnlyString(new Date(meetup.date)) === getDateOnlyString(new Date(currentDay))) {
            haveMeetup = meetup.title;
          }
        }

        currentMonth.push({
          currentDate: new Date(currentDay).getDate(),
          currentMonth: new Date(this.currentDate).getMonth() === new Date(currentDay).getMonth(),
          haveMeetup: haveMeetup,
        });
      }
      return currentMonth;
    },

    meetupsDays() {
      return this.meetups.map((meetup) => ({
        date: meetup.date,
        title: this.meetups.filter((title) => meetup.date === title.date).map((targetMeetup) => targetMeetup.title),
      }));
    },
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    nextMonth() {
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    },
    previousMonth() {
      this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    },
  },
};
