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

<style scoped>
.pixel-grid {
  width: 256px;
  font-size: 0;
  margin: 0 auto;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}
</style>
