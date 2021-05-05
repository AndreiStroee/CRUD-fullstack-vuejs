<template>
  <div>
    <div class="card m-2" v-for="ticket in tickets" :key="ticket._id">
  <div class="card-body">
    <h5 class="card-title">{{ticket.name}}</h5>
    <p class="card-text">{{ticket.question}}</p>
    <a href="#" class="btn btn-primary mr-3">View Ticket</a>
    <button @click="editTicket(ticket._id)" class="btn btn-warning ml-3 mr-3">Edit ticket</button>
    <button @click="removeTicket(ticket._id)" class="btn btn-danger ml-3">Remove ticket</button>
  </div>
</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { useRouter } from '@u3u/vue-hooks';

export default {
  setup() {
    const { router } = useRouter();
    const tickets = ref([]);

    const API_URL = 'http://localhost:5252/api/v1/tickets';

    async function getTickets() {
      const response = await fetch(API_URL);
      const json = await response.json();
      tickets.value = json;
    }

    async function removeTicket(_id) {
      await fetch(`${API_URL}/${_id}`, {
        method: 'DELETE',
      });
      getTickets();
    }

    getTickets();

    function editTicket(_id) {
      router.push({
        name: 'edit',
        params: {
          id: _id,
        },
      });
    }

    return {
      tickets,
      removeTicket,
      editTicket,
    };
  },
};
</script>

<style></style>
