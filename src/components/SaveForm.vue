<template>
  <div class="save">
    <input type="text" @input="onType" v-model="saveName" placeholder="Give it a name">
    <button @click="onSave">Save pixels</button>
    <div v-if="errorEmpty">Please enter a name for your pixels :)</div>
    <div v-if="errorNameExists">You already have a save under that name, please pick another</div>
  </div>
</template>

<script>
export default {
  name: "SaveForm",
  data() {
    return {
      saveName: "",
      errorEmpty: false,
      errorNameExists: false
    };
  },
  props: {
    pixels: {},
    deviceOrEmu: ""
  },
  methods: {
    onType() {
      this.errorEmpty = false;
      this.errorNameExists = false;
    },
    onSave() {
      // Error: Name field empty
      if (this.saveName === "") {
        this.errorEmpty = true;
        return;
      }

      // Error: Name already exists
      let pixelData = JSON.parse(localStorage.getItem("savedPixels"));
      pixelData.savedPixels.forEach(element => {
        if (element.name === this.saveName) this.errorNameExists = true;
      });
      if (this.errorNameExists) return;

      // No errors - save
      let pixelSave = {
        name: this.saveName,
        deviceOrEmu: this.deviceOrEmu,
        pixels: this.pixels
      };
      pixelData.savedPixels.push(pixelSave);
      localStorage.setItem("savedPixels", JSON.stringify(pixelData));
      this.$emit("onSavePixel", pixelData);
    }
  }
};
</script>

<style scoped>
.save {
  text-align: center;
}
button {
  margin-left: 5px;
}
</style>
