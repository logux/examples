<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <Login />
      <input
        v-if="logged"
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="text"
        @keyup.enter="append"
      />
    </header>
    <section class="main" v-if="logged">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="allDone"
        @click="toggleAll(!allDone)"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <TodoItem v-for="todo in list" v-bind:key="todo.id" :todo="todo" />
      </ul>
    </section>
    <footer class="footer" v-if="logged" v-show="all.length">
      <span class="todo-count">
        <strong v-text="remaining"></strong>
        {{remainingText}} left
      </span>
      <ul class="filters">
        <li>
          <a @click="visibility = 'all'" :class="{selected: visibility == 'all'}">All</a>
        </li>
        <li>
          <a @click="visibility = 'active'" :class="{selected: visibility == 'active'}">Active</a>
        </li>
        <li>
          <a
            @click="visibility = 'completed'"
            :class="{selected: visibility == 'completed'}"
          >Completed</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="completed.length > 0"
      >Clear completed</button>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { loguxMixin } from "@logux/vuex";
import { nanoid } from "nanoid";
import { Todo, add, remove, toggle } from "../../types/todos";

import Base from "./components/base";
import Login from "./components/Login.vue";
import TodoItem from "./components/TodoItem.vue";

@Component({
  components: { Login, TodoItem },
  mixins: [loguxMixin]
})
export default class App extends Base {
  get logged(): boolean {
    return this.$store.state.auth.status == "logged";
  }

  text: string = "";
  visibility: "all" | "active" | "completed" = "all";

  get channels() {
    const userId = this.$store.state.auth.userId;
    return this.logged ? [`todos/${userId}`] : [];
  }

  get all(): Todo[] {
    return this.$store.state.todo.list;
  }

  get active() {
    return this.all.filter(x => !x.done);
  }

  get completed() {
    return this.all.filter(x => x.done);
  }

  get allDone() {
    return this.active.length == 0;
  }

  get list() {
    switch (this.visibility) {
      case "all":
        return this.all;
      case "active":
        return this.active;
      case "completed":
        return this.completed;
      default:
        return [];
    }
  }

  get remaining() {
    return this.active.length;
  }

  get remainingText() {
    return this.remaining === 1 ? "item" : "items";
  }

  removeCompleted() {
    this.completed.forEach(x =>
      this.commitSync(
        remove({
          id: x.id
        })
      )
    );
  }

  toggleAll(done: boolean) {
    this.all
      .filter(x => x.done != done)
      .forEach(x =>
        this.commitSync(
          toggle({
            id: x.id,
            done
          })
        )
      );
  }

  append() {
    this.commitSync(
      add({
        id: nanoid(),
        text: this.text,
        done: false
      })
    );
    this.text = "";
  }
}
</script>

<style>
</style>
