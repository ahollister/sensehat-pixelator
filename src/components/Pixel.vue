<template>
  <div class="component component--pixel">
    <label :for="id" v-bind:style="{ backgroundColor: pixelRGB }">{{id}}</label>
    <input :id="id" type="checkbox" @change="onPixelChange">
  </div>
</template>

<script>
export default {
  name: "Pixel",
  props: {
    defaultRGB: String,
    currentRGB: String,
    index: Number,
    rgb: String
  },
  data() {
    return {
      id: `pixel-${this.index}`,
      pixelRGB: this.rgb
    };
  },
  methods: {
    // When a pixel changes, set the pixel color
    onPixelChange(e) {
      this.pixelRGB = this.defaultRGB;
      if (e.target.checked) this.pixelRGB = this.currentRGB;
    }
  },
  watch: {
    // When a pixelRGB changes, pass that data back to App
    pixelRGB() {
      this.$emit("pixelChange", { rgb: this.pixelRGB, index: this.index });
    },
    // Don't mutate props directly
    rgb() {
      this.pixelRGB = this.rgb;
    }
  }
};
</script>