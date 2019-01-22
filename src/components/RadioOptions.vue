<template>
  <div class="component component--radio-options">
    <span class="radio-option" v-for="(option, index) in radioOptions.options" :key="index">
      <label :for="option.name">{{option.label}}</label>
      <input
        type="radio"
        :name="radioOptions.name"
        :value="option.name"
        :id="option.name"
        v-model="checked"
        @change="onRadioChange"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "RadioOptions",
  props: {
    radioOptions: {}
  },
  data() {
    return {
      checked: this.radioOptions.options[0].name
    };
  },
  methods: {
    // When radio option selected, pass data to App
    onRadioChange(e) {
      this.$emit("radioChange", this.checked);
    }
  }
};
</script>