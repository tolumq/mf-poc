<template>
<!-- <button>Hello from tolumide</button> -->
<div v-html="button"></div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import ReactDOMServer from "react-dom/server";

const props = defineProps<{
  text: string; type: "button" | "submit" | "reset",
  elem: string,
}>();


async function fetchImport(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = (await import("home/Button")).default;
      resolve(
        ReactDOMServer.renderToString(
          res({
            text: "React Button with Tolumide from here",
          })
        )
      );
    } catch (err) {
      reject(err);
    }
  });
}


const data = ref<string | null>(null);

(async () => {data.value = await fetchImport()})()

const button = computed(() => {
    return data.value;
});
</script>