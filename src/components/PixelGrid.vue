<template>
  <div class="pixel-grid">
    <Pixel
      @pixelChange="onPixelChange"
      :defaultRGB="defaultRGB"
      :currentRGB="currentRGB"
      v-for="i in 64"
      :key="i"
      :index="i"
    />
  </div>
</template>

<script>
import Pixel from "./Pixel.vue";
export default {
  name: "PixelGrid",
  components: {
    Pixel
  },
  props: {
    defaultRGB: String,
    currentRGB: String
  },
  methods: {
    onPixelChange(e) {
      this.$emit("pixelChange", { rgb: e.rgb, index: e.index });
    }
  }
};
</script>

<style>
.pixel-grid {
  width: 256px;
  font-size: 0;
  margin: 0 auto;
}
</style>
