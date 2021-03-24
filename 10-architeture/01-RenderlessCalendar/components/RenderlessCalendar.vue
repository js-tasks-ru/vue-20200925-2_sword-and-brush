<script>
export default {
  name: 'RenderlessCalendar',

  render(h) {
    let content = this.$scopedSlots.default();
    return Array.isArray(content) && content.length > 1
      ? h('div', content)
      : content;
  },
};
</script>
