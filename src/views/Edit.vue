<template>
  <div class="edit">
    <h1>Edit Student List</h1>
    <div class="edit__form">
      <form @submit.prevent="editStudent" class="form-group">
        <div class="edit__form__input">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            class="input"
             v-model="student.firstName"
            placeholder="First Name"
          />
        </div>
        <div class="edit__form__input">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            class="input"
            v-model="student.lastName"
            placeholder="Last Name"
          />
        </div>
        <div class="edit__form__input">
          <label for="phone">Phone</label>
          <input type="number" id="phone"  v-model="student.phone" class="input" placeholder="Phone" />
        </div>
        <div class="edit__form__input">
          <label for="course">Course</label>
          <select id="course" class="input" v-model="student.course">
            <option value="Course_1"> Course_1</option>
            <option value="Course_2"> Course_2</option>
            <option value="Course_3"> Course_3</option>
            <option value="Course_4"> Course_4</option>
          </select>
        </div>
        <div class="edit__form__input">
          <button class="btn" @click="update()">Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    student() {
      let student = JSON.parse(localStorage.getItem("students"));
      return student.filter((item) => item.id == this.$route.params.id)[0];
    },
  },
  methods: {
    update() {
      let students = JSON.parse(localStorage.getItem("students"));
      let index = students.findIndex((item) => item.id == this.$route.params.id);
      students[index] = this.student;
      localStorage.setItem("students", JSON.stringify(students));
      this.$router.push("/list");
    },
  },
};
</script>
