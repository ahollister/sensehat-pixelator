<template>
  <div class="save-modal">
    <button @click="toggleModal">Save Pixels</button>
    <div class="modal" v-if="modalOpen">
      <button @click="toggleModal">Exit</button>
      <div class="modal-content">
        <div class="save">
          <Title level="3" text="Give your pixel art a unique name and save:"/>
          <input type="text" @input="onType" v-model="saveName" placeholder="Give it a name">
          <button @click="onSave">Save pixels</button>
          <div v-if="errorEmpty">Please enter a name for your pixels :)</div>
          <div v-if="errorNameExists">You already have a save under that name, please pick another</div>
        </div>
        <div v-if="savedPixels.savedPixels && savedPixels.savedPixels.length">
          <Title level="3" text="Or overwrite an existing save:"/>
          <ul>
            <li v-for="p in savedPixels.savedPixels" :key="p.name">
              {{p.name}}
              <button @click="onOverwrite(p)">Save</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./Title.vue";
export default {
  name: "SaveModal",
  components: {
    Title
  },
  data() {
    return {
      modalOpen: false,
      saveName: "",
      errorEmpty: false,
      errorNameExists: false
    };
  },
  props: {
    savedPixels: {},
    pixels: {},
    deviceOrEmu: ""
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
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
      this.toggleModal();
    },
    onOverwrite(p) {
      let pixelData = JSON.parse(localStorage.getItem("savedPixels"));
      this.saveName = p.name;
      let pixelSave = {
        name: this.saveName,
        deviceOrEmu: this.deviceOrEmu,
        pixels: this.pixels
      };
      pixelData.savedPixels = pixelData.savedPixels.filter(item => {
        return item.name !== p.name;
      });
      pixelData.savedPixels.push(pixelSave);
      localStorage.setItem("savedPixels", JSON.stringify(pixelData));
      this.$emit("onSavePixel", pixelData);
      this.toggleModal();
    }
  }
};
</script>

<style>
.save-modal .modal {
  position: fixed;
  top: 0%;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
}
.save-modal .modal > button {
  position: absolute;
  top: 2em;
  right: 2em;
}
.modal-content {
  position: fixed;
  top: 50%;
  width: 280px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1em;
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}
.save-modal .modal ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.save-modal .modal li {
  border-top: 1px solid #ddd;
  padding: 0.75em 0;
}
.save-modal .modal li:first-of-type {
  border-top: none;
}
</style>
