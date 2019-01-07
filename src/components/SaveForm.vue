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
    }
  }
};
</script>

<style scoped>
.save {
  text-align: center;
}
input[type="text"] {
  border-radius: 5px;
  border: none;
  box-shadow: inset 0px 0px 1px 1px rgba(71, 26, 26, 0.4),
    0px 0px 0px 1px rgba(255, 255, 255, 0.5);
  padding: 10px;
}
button {
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  border: none;
  padding: 10px;
  margin-left: 5px;
  background: #00bfff;
  cursor: pointer;
}
button:hover,
button:focus {
  background: #41d0ff;
}
</style>
