import { defineComponent } from 'vue';
import './index.less';
export default defineComponent({
  name: 'rankEmpty',
  props: {
    title: {
      type: String,
      // default: '榜单未开启，敬请期待'
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div class={`act_score_empty ${props.className}`}>
        <i class="act_score_empty_icon"></i>
        <p>{ props.title }</p>
      </div>
    )
  }
});

