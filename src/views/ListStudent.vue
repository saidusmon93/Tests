<template>
  <div>
    <Modal :close="close" @closeModal="openModal" />

    <div class="list">
      <div class="toogler">
        <button class="modal-btn" @click="openModal()">Add Students</button>
      </div>
      <table>
        <thead>
          <tr>
            <th colspan="6">
              <h1>Students List</h1>
            </th>
          </tr>
          <tr class="filter">
            <th>
              <input
                type="text"
                class="input"
                v-model="firstName"
                placeholder="Search by FirstName"
              />
            </th>
            <th>
              <input
                type="text"
                class="input"
                v-model="lastName"
                placeholder="Search by FirstName"
              />
            </th>
            <th>
              <input
                type="number"
                class="input"
                v-model="phone"
                placeholder="Search by Phone number"
              />
            </th>
            <th colspan="2">
              <select class="btn" v-model="course">
                <option
                  v-for="course in 4"
                  :value="`Course_${course}`"
                  :key="course"
                >
                  {{ `Course_${course}` }}
                </option>
              </select>
            </th>
            <th>
              <button class="btn" @click="AllList()">All</button>
            </th>
          </tr>

          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredStidents" :key="item.id">
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.course }}</td>
            <td>
              <button class="btn" @click="editItem(item.id)">&#9997;</button>
            </td>
            <td>
              <button class="btn" @click="deleteItem(item.id)">&#10006;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Modal from "../components/modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      close: false,
      course: "",
      firstName: "",
      lastName: "",
      phone: "",
      all: false,
      listStudents: [
        {
          firstName: "John",
          lastName: "Doe",
          phone: "+998901234567",
          course: "Course_1",
          id: 1,
        },
        {
          firstName: "Alex",
          lastName: "Alex",
          phone: "+9989932165498",
          course: "Course_3",
          id: 2,
        },
      ],
    };
  },
  computed: {
    student() {
      return this.$store.getters.students;
    },
    filteredStidents() {
      if (this.course) {
        return this.student.filter((item) => item.course === this.course);
      }
      if (this.firstName) {
        return this.student.filter((item) =>
          item.firstName.toLowerCase().includes(this.firstName.toLowerCase())
        );
      }
      if (this.lastName) {
        return this.student.filter((item) =>
          item.lastName.toLowerCase().includes(this.lastName.toLowerCase())
        );
      }
      if (this.phone) {
        return this.student.filter((item) => item.phone.includes(this.phone));
      }
      if (!!this.all) {
        return this.student;
      }
      return this.student;
    },
  },
  mounted() {
    console.log("mounted");
    if (
      JSON.parse(localStorage.getItem("students")) === [] &&
      JSON.parse(localStorage.getItem("students")) !== null
    ) {
      this.$store.dispatch(
        "getStudents",
        JSON.parse(localStorage.getItem("students"))
      );
      console.log(JSON.parse(localStorage.getItem("students")));
    } else {
      this.$store.dispatch("getStudents", this.listStudents);
      localStorage.setItem("students", JSON.stringify(this.listStudents));
      console.log("else", this.listStudents);
    }
  },
  methods: {
    deleteItem(id) {
      let students = JSON.parse(localStorage.getItem("students"));
      students = students.filter((item) => item.id !== id);
      localStorage.setItem("students", JSON.stringify(students));
      this.$store.dispatch(
        "getStudents",
        JSON.parse(localStorage.getItem("students"))
      );
    },
    editItem(id) {
      this.$router.push(`/edit/${id}`);
    },
    openModal() {
      this.close = !this.close;
    },
    AllList() {
      this.all = !this.all;
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      this.course = "";
    },
  },
};
</script>

<style scoped>
.toogler {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}
.modal-btn {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.list {
  margin: 0 auto;
  width: 80%;
  margin-top: 50px;
}

.list table {
  width: 100%;
  border-collapse: collapse;
}

.list table thead tr th {
  border: 1px solid #ddd;
  padding: 8px;
}

.list table tbody tr td {
  border: 1px solid #ddd;
  padding: 8px;
}

.list table tbody tr:nth-child(even) {
  background-color: rgba(242, 242, 242, 0.534);
}

.list table tbody tr:hover {
  background-color: rgba(248, 242, 242, 0.596);
  cursor: auto;
}

.btn {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 16px;
  font-size: 15px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049 transparent;
}
@media screen and (max-width: 600px) {
  .list table {
    width: 100%;
    border: 0;
  }

  .list table thead {
    display: none;
  }

  .list table tbody tr {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid #ddd;
  }

  .list table tbody tr td {
    display: block;
    text-align: right;
  }

  .list table tbody tr td:last-child {
    border-bottom: 0;
  }

  .list table tbody tr td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
