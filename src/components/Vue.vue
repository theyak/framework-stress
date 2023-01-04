<script>
const token = () => Math.random().toString(36).substring(2, 10);
const endAt = Date.now() + 10000;

export default {
  name: "Vue",
  data: () => ({
    list: [],
    count: 0,
    lots: [...Array(30000).keys()],
  }),

  created() {
    for (let i = 0; i < 500; i++) {
      this.list.push({
        name: token(),
        id: i,
      });
    }
  },

  mounted() {
    const go = () => {
      this.list.forEach((item) => {
        item.name = token();
      });
      this.count++;
      if (Date.now() < endAt) {
        setTimeout(() => go(), 1);
      }
    };

    go();
  },

  methods: {},
};
</script>

<template>
  <h1>Vue ({{ count }})</h1>
  <ul>
    <template :key="index" v-for="(item, index) in list">
      <li>{{ item.name }}</li>
    </template>
  </ul>
  <template :key="index" v-for="(item, index) in lots">
    <div>{{ item }}</div>
  </template>
</template>
