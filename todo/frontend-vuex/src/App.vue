<template>
  <div id="app">
    <Login v-if="!logged" />
    <TodoList v-if="logged" />
  </div>
</template>

<script lang="ts">
import { Component, Vue,  } from "vue-property-decorator";
import Login from "./components/Login.vue";
import TodoList from "./components/TodoList.vue";

@Component({
  components: {
    Login,
    TodoList
  }
})
export default class App extends Vue {
  get logged(): boolean {
    return this.$store.state.auth.status == "logged";
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 60px auto;
  width: 720px;
}
</style>
