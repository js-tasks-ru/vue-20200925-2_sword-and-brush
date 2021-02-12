<script>
function cloneVNode(vnode, VNode) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}

export default {
  name: 'FadeTransitionGroup',

  render(h) {
    let slotList = this.$slots.default;

    return h(
      'transition-group',
      {
        class: {
          'fade-list': true,
        },
        attrs: {
          ...this.$attrs,
          name: 'fade-list',
        },
        on: {
          ...this.$listeners,
        },
      },

      slotList.map((item) => {
        let slotItem = cloneVNode(item, item.__proto__.constructor);
        slotItem.data.staticClass
          ? (slotItem.data.staticClass += ' fade-list-item')
          : (slotItem.data.staticClass = 'fade-list-item');
        return slotItem;
      }),
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
