<template>
  <div>
    <template v-for="item in slotList">
      <slot :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    page: Number,
    perPage: Number,
    items: Array,
  },

  computed: {
    slotList() {
      if (this.items) {
        return this.items.slice(
          this.perPage * (this.page - 1),
          this.perPage * this.page,
        );
      } else {
        return [];
      }
    },
  },
};
</script>

<style></style>
