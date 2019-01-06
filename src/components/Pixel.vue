<template>
  <input type="checkbox" class="pixel" @click="onPixelClick">
</template>

<script>
export default {
  name: "Pixel",
  props: {
    defaultRGB: String
  },
  data() {
    return {
      rgb: this.defaultRGB
    };
  },
  methods: {
    onPixelClick() {
      this.rgb = "test";
    }
  },
  watch: {
    rgb() {
      this.$emit("pixelChange", this.rgb);
    }
  }
};
</script>