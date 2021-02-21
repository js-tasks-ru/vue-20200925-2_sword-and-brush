<template>
  <div class="meetups-list">
    <!-- Требуется scoped-slot для каждого элемента списка -->
    <template v-for="item in items">
      <slot name="default" :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: Array,
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
