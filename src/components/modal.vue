<template>
  <div class="modal" :style="{ display: close ? 'block' : 'none' }">
    <div class="modal_content">
      <span class="close" @click="closeModal()">&times;</span>

      <div class="form">
        <form action="" class="form-froup">
          <h2>Add Students</h2>
          <hr />
          <div>
            <label for="firstName" class="label">FirstName</label>
            <input
              type="text"
              id="firstName"
              placeholder="FirstName"
              class="input"
              v-model="list.firstName"
              required
            />
          </div>
          <div>
            <label for="lastName" class="label">LastName</label>
            <input
              type="text"
              class="input"
              id="lastName"
              placeholder="LastName"
              v-model="list.lastName"
              required
            />
          </div>
          <div>
            <label for="Phone" class="label">Phone</label>
            <input
              type="text"
              class="input"
              id="Phone"
              placeholder="Phone"
              v-model="list.phone"
              required
            />
          </div>
          <div>
            <label for="Course" class="label">Course</label>
            <select id="Course" v-model="list.course">
              <option value="Course_1">Course_1</option>
              <option value="Course_2">Course_2</option>
              <option value="Course_3">Course_3</option>
              <option value="Course_4">Course_4</option>
            </select>
          </div>

          <div>
            <button class="btn" type="submit" @click.prevent="addStudent()">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        firstName: "",
        lastName: "",
        phone: "",
        course: "",
      },
      msg: "",
    };
  },
  props: ["close"],
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    addStudent() {
      if (
        this.list.firstName &&
        this.list.lastName &&
        this.list.phone &&
        this.list.course
      ) {
        setTimeout(() => {
          let students = JSON.parse(localStorage.getItem("students"));
          if (students === null) {
            students = [];
          }
          this.list.id = students.length + 1;
          students.push(this.list);
          localStorage.setItem("students", JSON.stringify(students));
          this.$emit("closeModal", false);
          this.$store.dispatch(
            "getStudents",
            JSON.parse(localStorage.getItem("students"))
          );
          this.list.firstName = "";
          this.list.lastName = "";
          this.list.phone = "";
          this.list.course = "";
        }, 1000);
      } else {
        this.msg = "Please fill all the fields";
        alert(this.msg);
      }
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
}

.modal_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 380px;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  display: block;
}

.modal_content .close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 25px;
  cursor: pointer;
  background: red;
  border-radius: 5px;
  padding: 0px 7px;
}
@media screen and (max-width: 600px) {
  .modal_content {
    width: 90%;
    height: 90%;
  }
}
</style>
