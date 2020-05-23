import { Vue } from "vue-property-decorator";
import { LoguxCommit } from '@logux/vuex/create-logux';

export default class Base extends Vue {
  commitSync(action: {type: string}) {
    (this.$store.commit as LoguxCommit).sync(action)
  }
  commitCrossTab(action: {type: string}) {
    (this.$store.commit as LoguxCommit).crossTab(action)
  }
}
