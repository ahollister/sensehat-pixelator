<template>
  <div class="load-modal">
    <button @click="toggleModal">Load Pixels</button>
    <div class="modal" v-if="modalOpen">
      <button class="button-exit" @click="toggleModal">Exit</button>
      <div class="modal-content">
        <Title level="3" text="Load or delete one of your saved pixels:"/>
        <ul>
          <LoadItem
            @onLoadPixel="onLoadPixel"
            @onDeletePixel="onDeletePixel"
            :pixel="pixel"
            v-for="pixel in savedPixels.savedPixels"
            :key="pixel.name"
          ></LoadItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LoadItem from "./LoadItem.vue";
import Title from "./Title.vue";

export default {
  name: "LoadModal",
  components: {
    LoadItem,
    Title
  },
  data() {
    return {
      modalOpen: false
    };
  },
  props: {
    savedPixels: {}
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.$emit("onModalToggle", this.modalOpen);
    },
    onLoadPixel(e) {
      this.$emit("onLoadPixel", e);
      this.toggleModal();
    },
    onDeletePixel(e) {
      if (this.savedPixels.savedPixels.length === 1) {
        this.toggleModal();
      }
      this.$emit("onDeletePixel", e);
    }
  }
};
</script>

<style>
.load-modal .modal > button {
  position: absolute;
  top: 2em;
  right: 2em;
}
</style>
