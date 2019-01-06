<template>
  <div>
    <div v-for="(option, index) in radioOptions.options" :key="index">
      <label :for="option.name">{{option.label}}</label>
      <input
        type="radio"
        :name="radioOptions.name"
        :value="option.name"
        :id="option.name"
        v-model="checked"
        @change="onRadioChange"
      >
    </div>
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
    onRadioChange(e) {
      this.$emit("radioChange", this.checked);
    }
  }
};
</script>