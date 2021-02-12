<script>
export default {
  name: 'NodesPagination',

  render(createElement) {
    if (this.$slots.default) {
      let slotList = this.$slots.default;

      let filteredSlotList = () => {
        let filteredList = [];
        for (let i = 0; i < Math.ceil(slotList.length / this.perPage); i++) {
          filteredList.push([
            slotList.slice(
              this.perPage * (this.page - 1),
              this.perPage * this.page,
            ),
          ]);
        }
        return filteredList[this.page - 1];
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
