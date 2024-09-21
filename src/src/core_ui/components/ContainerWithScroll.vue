<script setup lang="ts">

import {defineEmits, defineProps, ref, toRefs, watch} from "vue";
import {debounce} from "lodash";

interface Props {
  isLoading: boolean,
  items: any[],
  limit: number,
  searchValue: string,
}

const props = defineProps<Props>()
const {isLoading, items, searchValue, limit} = toRefs(props)


if (!limit.value) limit.value = 20


const emit = defineEmits({
  "fetch-items": (page: number, limit: number, searchValue: string) => true
})

const page = ref<number>(0)
const eScrollTarget = ref<any | null>(null)


// method(s)

const onScroll = (e: any) => {
  const {scrollTop, offsetHeight, scrollHeight} = e.target
  eScrollTarget.value = {
    scrollTop,
    offsetHeight,
    scrollHeight
  }
}


// watch(s)
watch(eScrollTarget, debounce((newTarget: any, oldTarget: any) => {
  if (oldTarget?.scrollTop !== newTarget?.scrollTop) {
    const scrollOnTop = newTarget?.scrollTop === 0
    const scrollOnBottom = newTarget?.scrollTop + newTarget?.offsetHeight >= newTarget?.scrollHeight - 1
    const moreItemsToLoad = items.value.length >= limit.value
    const notFirstPage = page.value > 0

    if (scrollOnBottom && !isLoading.value && moreItemsToLoad) {
      // Note: Scroll down case
      page.value++
      emit('fetch-items', page.value, limit.value, searchValue.value)
    } else if (scrollOnTop && notFirstPage && !isLoading.value && moreItemsToLoad) {
      // Note: Scroll up case
      page.value--
      emit('fetch-items', page.value, limit.value, searchValue.value)
    }
  }
}, 100))

watch(searchValue, debounce(async (newSearchValue, oldSearchValue) => {
  if (newSearchValue !== oldSearchValue) {
    window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        }
    )
    page.value = 0;
    await emit("fetch-items", page.value, limit.value, newSearchValue)
  }
}, 200))


</script>

<template>
  <v-container id="scroll-target" class="full-height-container" v-scroll:#scroll-target="onScroll">
    <slot name="container-content"></slot>
  </v-container>
</template>

<style scoped>
.full-height-container {
  height: calc(100vh - 152px);
  overflow-y: auto;
}
</style>