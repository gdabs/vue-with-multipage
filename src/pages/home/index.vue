<template>
  <div @click="add">
    {{serverTimeStamp}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, useStore } from 'vuex';

interface StoreState {
  serverTimeStamp: number;
}

export default defineComponent({
  name: 'home',
  computed: {
    ...mapState({
      serverTimeStamp: (state: any) => state.serverTimeStamp,
    }),
  },
  methods: {
    add () {
      this.$store.commit('serverTimeStamp', 2)
    }
  }
});
</script>
