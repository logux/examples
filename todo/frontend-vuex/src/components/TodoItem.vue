<template>
  <li class="todo" :class="{completed: todo.done, editing: edit}">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.done" @change="toggle" />
      <label @dblclick="edit = true">{{todo.text}}</label>
      <button class="destroy" @click="remove"></button>
    </div>
    <input
      class="edit"
      type="text"
      :value="todo.text"
      v-focus="edit"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
    />
  </li>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { nanoid } from "nanoid";
import { Todo, toggle, remove } from "../../../types/todos";
import Base from "./base";

@Component({
  directives: {
    focus: {
      update(el, binding) {
        console.log(binding, el)
        if (binding.value) {
					el.focus()
				}
      }
    }
  }
})
export default class TodoItem extends Base {
  @Prop()
  todo!: Todo;
  edit: boolean = false;

  toggle(e: Event) {
    this.commitSync(
      toggle({
        id: this.todo.id,
        done: !this.todo.done
      })
    );
  }

  doneEdit(e: Event) {
    console.log(e);
    this.edit = false
  }

  cancelEdit() {
    this.edit = false
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
