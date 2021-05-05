<template>
<form class="container" @submit.prevent="submitForm">
<div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input v-model="ticket.name.value" type="text"
    class="form-control" id="exampleFormControlInput1"
    placeholder="Enter name" required />
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input v-model="ticket.email.value" type="email"
    class="form-control" id="exampleFormControlInput1"
    placeholder="name@example.com" required />
  </div>
  <!-- <div class="form-group">
    <label for="exampleFormControlSelect1">Department</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Student support</option>
      <option>Financial support</option>
      <option>Student wellbeing</option>
      <option>Disability support</option>
      <option>Careers advice</option>
      <option>IT help</option>
    </select>
  </div> -->
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Ticket</label>
    <textarea v-model="ticket.question.value" class="form-control" id="exampleFormControlTextarea1"
    rows="4" placeholder="Please enter the question" required></textarea>
  </div>
  <button class="btn btn-success" type="submit">Create ticket</button>
</form>
</template>

<script>
export default {
  props: ['submitForm', 'ticket'],
  // setup(props) {
  //   return {
  //     name: props.ticket.name,
  //     email: props.ticket.email,
  //     question: props.ticket.question,
  //   };
  // },
};
</script>

<style></style>
