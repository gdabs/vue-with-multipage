<template>
  <div>
    {{serverTimeStamp}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'home',
  computed: {
    ...mapState({
      serverTimeStamp: (state: any) => state.serverTimeStamp,
    }),
  },
});
</script>
