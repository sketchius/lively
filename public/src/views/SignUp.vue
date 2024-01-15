<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="form.firstName" required />
    </div>

    <div>
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="form.lastName" required />
    </div>

    <div>
      <label for="age">Age</label>
      <input type="number" id="age" v-model.number="form.age" min="0" />
    </div>

    <div>
      <label for="gender">Gender</label>
      <select id="gender" v-model="form.gender">
        <option disabled value="">Please select one</option>
        <option>Female</option>
        <option>Male</option>
        <option>Non-binary</option>
        <option>Prefer not to say</option>
      </select>
    </div>

    <div>
      <label for="occupation">Occupation</label>
      <input type="text" id="occupation" v-model="form.occupation" required />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "UserInfoForm",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        age: null,
        gender: "",
        occupation: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // Handle the form submission, such as sending data to an API or storing in Vuex
      console.log(this.form);
      alert("Form submitted! Check the console for the form data.");
    },
  },
};
</script>

<style scoped>
form {
  align-self: center;
  justify-self: center;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 8px;
  margin: 15px;
}

div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
}

input[type="text"],
input[type="number"],
select {
  width: calc(100% - 22px); /* Adjust width to account for padding and border */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  margin-top: 4px; /* Aligns text with label */
}

button {
  background-color: #4caf50; /* Green */
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

button:hover {
  background-color: #45a049;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  form {
    margin: 15px;
    width: calc(100% - 30px); /* Provide some space on the sides */
  }
}
</style>
