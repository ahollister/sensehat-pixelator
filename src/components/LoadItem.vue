<template>
  <li>
    <span>{{pixel.name}}</span>
    <button @click="loadPixels">Load</button>
    <button class="button-invisible" @click="deletePixels">
      <v-icon name="trash-alt" scale="1.25"/>
    </button>
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
<style scoped>
.button-invisible {
  align-self: center;
}
li span {
  flex-grow: 1;
  align-self: center;
}
li button {
  margin-right: 1em;
}
svg {
  align-self: center;
  fill: #ff6969;
}
svg:hover,
svg:focus {
  fill: #fd8080;
}
</style>
