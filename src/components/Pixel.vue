<template>
  <div class="pixel">
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
  watch: {
    pixelRGB() {
      this.$emit("pixelChange", { rgb: this.pixelRGB, index: this.index });
    },
    rgb() {
      this.pixelRGB = this.rgb;
    }
  },
  methods: {
    onPixelChange(e) {
      this.pixelRGB = this.defaultRGB;
      if (e.target.checked) this.pixelRGB = this.currentRGB;
    }
  }
};
</script>