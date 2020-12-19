<template>
  <button @click="localCount++">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: this.count,
    };
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  watch: {
    localCount(newValue) {
      this.$emit('increment', newValue);
    },
    count(newValue) {
      this.localCount = newValue;
    },
  },
};
</script>

<style>

</style>
