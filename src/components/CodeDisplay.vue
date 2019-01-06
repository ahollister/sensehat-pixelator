<template>
  <pre>
    <code>
      {{code}}
    </code>
  </pre>
</template>

<script>
export default {
  name: "CodeDisplay",
  props: {
    code: ""
  }
};
</script>
<style>
pre,
code {
  width: 100%;
  white-space: pre-line;
  display: block;
  background: grey;
  padding: 0 32px;
}
</style>
