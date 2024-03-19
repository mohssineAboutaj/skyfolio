<script lang="ts" setup>
// props
const { strings, typeSpeed, eraseSpeed } = defineProps({
  strings: { type: Array, required: true },
  typeSpeed: { type: Number, default: 100 },
  eraseSpeed: { type: Number, default: 100 },
})

// data
const currentIndex = ref(0)
const currentText = ref("")

// methods
/// typing
function startTyping() {
  const currentString = strings[currentIndex.value]
  const currentLength = currentText.value.length
  const currentStringLength = currentString.length

  if (currentLength < currentStringLength) {
    currentText.value = currentString.substring(0, currentLength + 1)
    setTimeout(startTyping, typeSpeed)
  } else {
    setTimeout(eraseText, 1000)
  }
}
/// erasing
function eraseText() {
  const currentString = strings[currentIndex.value]
  const currentLength = currentText.value.length

  if (currentLength > 0) {
    currentText.value = currentString.substring(0, currentLength - 1)
    setTimeout(eraseText, eraseSpeed)
  } else {
    currentIndex.value = (currentIndex.value + 1) % strings.length
    setTimeout(startTyping, 500)
  }
}

// hooks
onMounted(() => {
  startTyping()
})
</script>

<template>
  <div v-bind="$attrs">{{ currentText }}</div>
</template>
