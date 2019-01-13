<template>
  <li>
    {{pixel.name}}
    <button @click="loadPixels">Load</button>
    <button @click="deletePixels">Delete</button>
  </li>
</template>

<script>
export default {
  name: "LoadItem",
  props: {
    pixel: {}
  },
  methods: {
    loadPixels() {
      this.$emit("onLoadPixel", this.pixel);
    },
    deletePixels() {
      this.$emit("onDeletePixel", this.pixel);
    }
  }
};
</script>