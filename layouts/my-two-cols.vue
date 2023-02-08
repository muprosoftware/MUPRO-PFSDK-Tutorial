<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
})
</script>

<template>
  <div class="w-full h-full slidev-layout">
    <slot name="title"/>
    <div class="two-columns grid grid-cols-2 mt-0">
      <div class="col-left" :class="props.class">
        <slot name="left"/>
      </div>
      <div class="col-right" :class="props.class">
        <slot name="right" />
    </div>
  </div>
</div>
</template>