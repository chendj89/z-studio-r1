<script setup name="VpSvg">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  }
})

const component = computed(() => {
  return props.prefix === 'icon' ? 'svg' : 'i'
})

const iconName = computed(() => {
  return `#${props.prefix}-${props.name}`
})

const className = computed(() => {
  if (props.prefix === 'icon') {
    return 'svg-icon'
  } else {
    return ''
  }
})
</script>

<template>
  <component :is="component" :class="className" aria-hidden="true">
    <use :href="iconName" />
  </component>
</template>
