<template>
  <div>
    <div class="card m-2" v-for="user in users" :key="user._id">
  <div class="card-body">
    <h5 class="card-title">{{users.name}}</h5>
    <p class="card-text">ID:{{users._id}}, Email:{{users.email}},
        Created on:{{users.date}}
    </p>
    <button @click="editUser(users._id)" class="btn btn-warning ml-3 mr-3">Edit User</button>
    <button @click="removeUser(users._id)" class="btn btn-danger ml-3">Remove User</button>
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
    const users = ref([]);

    const API_URL = 'http://localhost:5252/api/v1/users';

    async function getUsers() {
      const response = await fetch(API_URL);
      const json = await response.json();
      users.value = json;
    }
    getUsers();

    async function removeUser(_id) {
      await fetch(`${API_URL}/${_id}`, {
        method: 'DELETE',
      });
      getUsers();
    }

    function editUser(_id) {
      router.push({
        name: 'edit',
        params: {
          id: _id,
        },
      });
    }

    return {
      users,
      removeUser,
      editUser,
    };
  },
};
</script>

<style></style>
