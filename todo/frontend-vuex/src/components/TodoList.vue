<template>
  <div class="list">
    <label>
      Add todo:
      <input required v-model="text" @keyup.enter="append" />
    </label>
    <ul>
      <li v-for="todo in list" v-bind:key="todo.id">
        <Todo :todo="todo" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { subscriptionMixin } from "@logux/vuex";
import { nanoid } from "nanoid";
import { add } from "../../../types/todos";
import Base from "./base";
import Todo from "./TodoItem.vue";

@Component({
  components: { Todo },
  mixins: [subscriptionMixin]
})
export default class TodoList extends Base {
  text: string = "";

  get channels() {
    const userId = this.$store.state.auth.userId;
    return [`todos/${userId}`];
  }

  get list() {
    return this.$store.state.todo.list;
  }

  append() {
    this.commitSync(
      add({
        id: nanoid(),
        text: this.text,
        done: false
      })
    );
  }
}
</script>

<style scoped>
</style>
