<template>
  <verte display="vertical-widget" :model="model" v-model="rgb"/>
</template>

<script>
import verte from "verte";
import "verte/dist/verte.css";

export default {
  name: "ColorPicker",
  components: {
    verte
  },
  props: {
    model: String,
    defaultRGB: String
  },
  data() {
    return {
      rgb: this.defaultRGB
    };
  },
  watch: {
    rgb() {
      this.$emit("rgbChange", this.rgb);
    }
  }
};
</script>

<style>
.verte {
  z-index: 99;
}
</style>
