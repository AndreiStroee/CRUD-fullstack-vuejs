<template>
  <div class="home">
    <router-link :to="{ name: 'create' }" class="btn btn-success m-2">Create ticket</router-link>
    <TicketsList />
    <!-- <AccountsList /> -->
  </div>
</template>

<script>
import TicketsList from '@/components/TicketsList.vue';
// import AccountsList from '@/components/AccountsList.vue';
// import { onMounted } from '@vue/composition-api';

// const API_URL = 'http://localhost:5252/';

export default {
  components: {
    TicketsList,
    // AccountsList,
  },
  // async setup() {
  //   const response = await fetch(API_URL, {
  //     headers: {
  //       'auth-token': localStorage.token,
  //     },
  //   });
  //   const result = response.data.json();
  //   console.log(result);
  // },
};
</script>
