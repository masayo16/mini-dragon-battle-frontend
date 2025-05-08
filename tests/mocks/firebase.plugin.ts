export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebase: {
        auth: {},
      },
    },
  };
});
