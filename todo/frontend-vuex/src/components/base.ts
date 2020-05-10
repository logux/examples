import { Vue } from "vue-property-decorator";

export default class Base extends Vue {
  commitSync(action: {type: string}) {
    (this.$store.commit as any).sync(action)
  }
}
