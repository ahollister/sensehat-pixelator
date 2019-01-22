<template>
  <div class="component component--save-modal">
    <button @click="toggleModal">Save Pixels</button>
    <div class="modal" v-if="modalOpen">
      <button class="button-exit" @click="toggleModal">Exit</button>
      <div class="modal-content">
        <div class="save">
          <Title level="3" text="Give your pixel art a unique name and save:"/>
          <form class="save-form" v-on:submit.prevent="onSave">
            <input type="text" @input="onType" v-model="saveName" placeholder="Give it a name">
            <button>Save</button>
          </form>
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
  props: {
    savedPixels: {},
    pixels: {},
    deviceOrEmu: ""
  },
  data() {
    return {
      modalOpen: false,
      saveName: "",
      errorEmpty: false,
      errorNameExists: false
    };
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.$emit("onModalToggle", this.modalOpen);
    },
    // When user types, get rid of error msgs
    onType() {
      this.errorEmpty = false;
      this.errorNameExists = false;
    },
    // When user saves, validate set data in localStorage and pass state back to App
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
      this.saveName = "";
      this.toggleModal();
    },
    // Overwrite an existing saved option with new data
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
      this.saveName = "";
      this.toggleModal();
    }
  }
};
</script>