<template>
<TicketForm
  :ticket="ticket"
  :submitForm="editTicket"
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
    const { router, route } = useRouter();
    const ticket = ref({
      name: '',
      email: '',
      question: '',
    });

    const API_URL = 'http://localhost:5252/api/v1/tickets';

    async function editTicket() {
      const { id } = route.value.params;
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: ticket.name.value,
          email: ticket.email.value,
          question: ticket.question.value,
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

    async function getCurrentTicket() {
      const { id } = route.value.params;
      const response = await fetch(`${API_URL}/${id}`);
      const json = await response.json();
      ticket.value = json;
      // gets the object but doesn't populate the Form
      console.log(json);
      console.log(ticket);
    }

    getCurrentTicket();

    return {
      ticket,
      editTicket,
    };
  },
};
</script>

<style></style>
