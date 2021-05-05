<template>
<TicketForm
  :ticket="ticket"
  :submitForm="createTicket"
/>
</template>

<script>
import TicketForm from '@/components/TicketForm.vue';
import { ref } from '@vue/composition-api';
import { useRouter } from '@u3u/vue-hooks';

export default {
  components: {
    TicketForm,
  },
  setup() {
    const { router } = useRouter();
    const name = ref('');
    const email = ref('');
    const question = ref('');

    const API_URL = 'http://localhost:5252/api/v1/tickets';

    async function createTicket() {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          question: question.value,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        // redirect!
        router.push({
          name: 'home',
        });
      } else {
        // TODO: show an error
      }
    }

    return {
      ticket: {
        name,
        email,
        question,
      },
      createTicket,
    };
  },
};
</script>

<style></style>
