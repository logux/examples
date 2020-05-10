<template>
  <div class="auth">
    <label>
      Name:
      <input required :disabled="wait" v-model="userId" />
    </label>
    <div class="login">
      <button :disabled="wait" @click="logIn">log in</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./base";
import { login } from "../../../types/auth";

@Component
export default class Login extends Base {
  private userId: string = "my_login";

  logIn() {
    this.commitSync(login({ userId: this.userId }));
  }

  get wait(): boolean {
    return this.$store.state.auth.status == "waitLogin";
  }
}
</script>

<style scoped>
.auth {
  width: 300px;
  margin: 0 auto;
}

.login {
  margin-top: 4px;
  margin-right: auto;
}
</style>
