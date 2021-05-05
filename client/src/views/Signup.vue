<template>
<form class="container w-50" @submit.prevent="signup">
    <div v-if="errorMessage" id='error'
    class="alert alert-warning" role="alert">{{ errorMessage }}</div>
        <h2 class="text-center">Create Account</h2>
        <div class="form-group">
            <input v-model="name" type="text"
            class="form-control" placeholder="Full Name" required="required">
        </div>
        <div class="form-group">
            <input v-model="email" type="email"
            class="form-control" placeholder="Email" required="required">
        </div>
        <div class="form-group">
            <input v-model="password" type="password"
            class="form-control" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <input v-model="confirmPassword" type="password"
            class="form-control" placeholder="Confirm Password" required="required">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Sign up</button>
    </form>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useRouter } from '@u3u/vue-hooks';

export default {
  setup() {
    const { router } = useRouter();
    const errorMessage = ref('');
    // const user = reactive({
    //   name: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    // });
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const SIGNUP_URL = 'http://localhost:5252/api/v1/auth/register';

    // eslint-disable-next-line consistent-return
    function validUser() {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match';
        return false;
      } return true;
    }

    watch([name, email, password, confirmPassword], () => {
      errorMessage.value = '';
    });

    async function signup() {
      errorMessage.value = '';
      if (validUser()) {
        const response = await fetch(SIGNUP_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          router.push({
            name: 'login',
          });
        } else {
          // should throw error instead
          console.log('Does not work for some reason');
        }
      }
    }

    return {
      errorMessage,
      name,
      email,
      password,
      confirmPassword,
      signup,
    };
  },
};
</script>

<style scoped lang='scss'>
#error {
  text-align: center;
  }
</style>
