<template>
  <nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand">University of Knowledge</a>
  <form class="form-inline">
    <button @click="logout()" class="btn btn-outline-success my-2 my-sm-0"
    type="submit">Log out</button>
  </form>
</nav>
</template>

<script>
import { useRouter } from '@u3u/vue-hooks';

export default {
  setup() {
    const { router } = useRouter();

    // eslint-disable-next-line consistent-return
    function exists() {
      if (localStorage.token !== '') {
        return true;
      }
    }

    function logout() {
      localStorage.token = '';
      router.push({
        name: 'login',
      });
    }

    return {
      logout,
      exists,
    };
  },
};
</script>

<style>
</style>
