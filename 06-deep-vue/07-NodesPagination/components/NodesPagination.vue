<script>
export default {
  name: 'NodesPagination',

  render(createElement) {
    if (this.$slots.default) {
      let slotList = this.$slots.default;

      let filteredSlotList = () => {
        return slotList.slice(
          this.perPage * (this.page - 1),
          this.perPage * this.page,
        );
      };
      return createElement('div', filteredSlotList());
    } else {
      return createElement('div');
    }
  },

  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },
};
</script>

<style scoped></style>
