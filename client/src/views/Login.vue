<template>
    <form class="container w-50 mt25" @submit.prevent="loginaccount">
        <div v-if="errorMessage" id="error"
    class="alert alert-warning" role="alert">{{ errorMessage }}</div>
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
            <input v-model="email"
            type="email" class="form-control" placeholder="Email"
            required="required">
        </div>
        <div class="form-group">
            <input v-model="password"
            type="password" class="form-control" placeholder="Password"
            required="required">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Log in</button>
     <div class="signupButton">
         <p class="text-center">
             <router-link :to="{ name: 'signup' }">
             Create an Account
             </router-link>
         </p>
     </div>
    </form>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useRouter } from '@u3u/vue-hooks';

export default {
  setup() {
    const errorMessage = ref('');
    const { router } = useRouter();
    const email = ref('');
    const password = ref('');
    const LOGIN_URL = 'http://localhost:5252/api/v1/auth/login';

    watch([email, password], () => {
      errorMessage.value = '';
    });

    async function loginaccount() {
      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        const result = await response.json();
        console.log(result);
        localStorage.token = result.token;
        if (response.ok) {
          router.push({
            name: 'home',
          });
        }
      } catch (error) {
        console.error(error);
        errorMessage.value = 'Wrong credentials';
      }
    }

    return {
      email,
      password,
      loginaccount,
      errorMessage,
    };
  },
};
</script>

<style scoped lang='scss'>
#error {
  text-align: center;
  }
</style>
