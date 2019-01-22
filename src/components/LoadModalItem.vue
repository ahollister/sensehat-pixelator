<template>
  <li class="component component--load-modal-item">
    <span>{{pixel.name}}</span>
    <button @click="loadPixels">Load</button>
    <button class="button-invisible" @click="deletePixels">
      <v-icon name="trash-alt" scale="1.25"/>
    </button>
  </li>
</template>

<script>
export default {
  name: "LoadModalItem",
  props: {
    pixel: {}
  },
  methods: {
    // Emit an event to tell App which pixel data to load
    loadPixels() {
      this.$emit("onLoadPixel", this.pixel);
    },
    // Emit an event to tell App which pixel data to delete
    deletePixels() {
      this.$emit("onDeletePixel", this.pixel);
    }
  }
};
</script>