<template>
  <div>
    <input type="checkbox" :checked="todo.done" @change="toggle" />
    <input :value="todo.text" />
    <button @click="remove">delete</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { subscriptionMixin } from "@logux/vuex";
import { nanoid } from "nanoid";
import { Todo, toggle, remove } from "../../../types/todos";
import Base from "./base";

@Component
export default class TodoItem extends Base {
  @Prop()
  todo!: Todo;

  toggle(e: Event) {
    this.commitSync(
      toggle({
        id: this.todo.id,
        done: !this.todo.done
      })
    );
  }

  remove() {
    this.commitSync(
      remove({
        id: this.todo.id
      })
    );
  }
}
</script>

<style scoped>
</style>
