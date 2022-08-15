<template>
  <div>
    <Navs />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import Navs from "@/components/navs.vue";
export default {
  components: {
    Navs,
  },
};
</script>
<style>
body {
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(29, 248, 253, 0.835171568627451) 57%,
    rgba(252, 176, 69, 1) 100%
  );
}
nav a.router-link-exact-active {
  color: #fff;
}
</style>
