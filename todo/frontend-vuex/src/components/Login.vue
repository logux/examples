<template>
  <div>
    <div v-if="logged" class="logged">
      <span>{{ loggedLogin }}</span>
      <button @click="logout" class="logout"></button>
    </div>
    <div v-else class="auth">
      <input class="new-todo" required placeholder="my login" :disabled="wait" v-model="login" @keyup.enter="doLogin" />
      <button class="login" :disabled="wait" @click="doLogin"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./base";
import { login } from "../../../types/auth";

@Component
export default class Login extends Base {
  private login: string = "";

  doLogin() {
    this.commitSync(login({ login: this.login }));
  }

  logout() {
    this.commitCrossTab({ type: "auth/logout" });
  }

  get wait(): boolean {
    return this.$store.state.auth.status == "waitLogin";
  }

  get logged(): boolean {
    return this.$store.state.auth.status == "logged";
  }

  get loggedLogin(): boolean {
    return this.$store.state.auth.login;
  }
}
</script>

<style scoped>

.auth .new-todo {
  width: 100%;
  padding-left: 20px;
  padding-right: 60px;
}

.login {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M362.197,242.048C375.957,221.632,384,197.077,384,170.667V128C384,57.408,326.592,0,256,0S128,57.408,128,128v42.667 c0,26.411,8.043,50.965,21.803,71.381C85.888,278.912,42.667,347.733,42.667,426.667V448c0,35.285,28.715,64,64,64h298.667 c35.285,0,64-28.715,64-64v-21.333C469.333,347.733,426.112,278.912,362.197,242.048z M170.667,128 c0-47.061,38.272-85.333,85.333-85.333S341.333,80.939,341.333,128v42.667C341.333,217.728,303.061,256,256,256 s-85.333-38.272-85.333-85.333V128z M426.667,448c0,11.755-9.579,21.333-21.333,21.333H106.667 c-11.755,0-21.333-9.579-21.333-21.333v-21.333c0-66.965,38.784-125.013,95.061-152.939 c21.227,15.595,47.317,24.939,75.605,24.939s54.379-9.344,75.605-24.939c56.277,27.925,95.061,85.973,95.061,152.939V448z' fill='%23000000'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}

.logged {
  position: absolute;
  top: -120px;
  width: 100%;
  text-align: right;
  font-size: 20px;
}

.logged a {
  text-decoration: underline;
  color: blue;
}

.logout {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15 c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724 c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262 C276.412,478.129,266.908,468.625,255.15,468.625z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173 H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173 c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575 c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
  height: 20px;
  width: 20px;
  vertical-align: top;
  margin-left: 10px;
}
</style>
