<template>
  <div class="form-section form-section_inner">
    <button @click="$emit('remove')" type="button" class="remove-button">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="localAgenda.type"
      />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgenda.startsAt"
            @click="oldStartAt = $event.target.value"
            @change="changeAgendaStartsAt($event)"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgenda.endsAt"
          />
        </div>
      </div>
    </div>

    <div v-for="agendaField in selectedAgenda[localAgenda.type]"
         :key="agendaField.field"
         class="form-group">
      <label class="form-label">{{ agendaField.title }}</label>
      <component
        :options="agendaField.props.options"
        :multiline="agendaField.props.multiline"
        :is="agendaField.component"
        v-model="localAgenda[agendaField.field]"
        @change="changeAgendaItem"
      >
      </component>
    </div>

  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  data() {
    return {
      localAgenda: this.agendaItem,
      selectedAgenda: getAgendaItemsFieldSpecifications(),
      oldStartAt: this.agendaItem.startsAt,
    };
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    changeAgendaItem() {
      this.$emit('update:agendaItem', this.localAgenda);
    },

    changeAgendaStartsAt(newValue) {
      let oldStartAtMinutes = this.oldStartAt.split(':').reduce((acc, value) => +acc * 60 + +value);
      let newStartAtMinutes = newValue.split(':').reduce((acc, value) => +acc * 60 + +value);
      let oldEndsMinutes = this.localAgenda.endsAt.split(':').reduce((acc, value) => +acc * 60 + +value);
      let newEndsAtMinutes = (oldEndsMinutes + (newStartAtMinutes - oldStartAtMinutes) + 24 * 60) % (24 * 60);

      let hours = (newEndsAtMinutes / 60).toFixed(0);
      let minutes = newEndsAtMinutes % 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      this.localAgenda.endsAt = `${hours}:${minutes}`;
      this.changeAgendaItem();
    },
  },
};
</script>

<style></style>
