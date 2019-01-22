<template>
  <div class="component component--load-modal">
    <button @click="toggleModal">Load Pixels</button>
    <div class="modal" v-if="modalOpen">
      <button class="button-exit" @click="toggleModal">Exit</button>
      <div class="modal-content">
        <Title level="3" text="Load or delete one of your saved pixels:"/>
        <ul>
          <LoadModalItem
            @onLoadPixel="onLoadPixel"
            @onDeletePixel="onDeletePixel"
            :pixel="pixel"
            v-for="pixel in savedPixels.savedPixels"
            :key="pixel.name"
          ></LoadModalItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LoadModalItem from "./LoadModalItem.vue";
import Title from "./Title.vue";

export default {
  name: "LoadModal",
  components: {
    LoadModalItem,
    Title
  },
  props: {
    savedPixels: {}
  },
  data() {
    return {
      modalOpen: false
    };
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.$emit("onModalToggle", this.modalOpen);
    },
    // Originates in LoadModalItem, pass data to App
    onLoadPixel(e) {
      this.$emit("onLoadPixel", e);
      this.toggleModal();
    },
    // Originates in LoadModalItem, pass data to App and close modal if there are no items left
    onDeletePixel(e) {
      if (this.savedPixels.savedPixels.length === 1) {
        this.toggleModal();
      }
      this.$emit("onDeletePixel", e);
    }
  }
};
</script>