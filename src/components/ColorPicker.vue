<template>
  <verte :draggable="false" display="widget" :model="model" v-model="rgb"/>
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
    // When rgb changes, pass data for chosen colour to App
    rgb() {
      this.$emit("rgbChange", this.rgb);
    }
  }
};
</script>