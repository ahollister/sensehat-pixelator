<template>
  <div class="pixel">
    <label :for="id" v-bind:style="{ backgroundColor: rgb }">{{id}}</label>
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
      id: `pixel-${this.index}`
    };
  },
  methods: {
    onPixelChange(e) {
      if (e.target.checked) {
        this.rgb = this.currentRGB;
      } else {
        this.rgb = this.defaultRGB;
      }
    }
  },
  watch: {
    rgb() {
      this.$emit("pixelChange", { rgb: this.rgb, index: this.index });
    }
  }
};
</script>

<style scoped>
.pixel {
  display: inline-block;
  width: 32px;
  height: 32px;
  position: relative;
  margin: 0;
}

.pixel label {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  outline: 1px solid white;
}

.pixel input[type="checkbox"] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
</style>
