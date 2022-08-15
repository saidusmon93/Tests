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
    text: "Vagonning tezlanishi 36000 km/h2 . Bu necha m/s2 ?",
    responses: [
      { text: "2,8 ", correct: true },
      { text: "1,4", correct: false },
      { text: "0,28", correct: false },
    ],
    id: 3,
  },
  {
    text: "Mis va alyuminiy jismlarning hajmlari va impulslari teng. Ulardan qay birining tezligi kattaroq?",
    responses: [
      { text: "mis jismniki", correct: false },
      { text: "alyuminiy jismniki", correct: true },
      {
        text: "agar ular shar shaklida bo‘lsa mis jismniki, kub shaklida bo‘lsa alyuminiy jismniki",
        correct: false,
      },
    ],
    id: 4,
  },
  {
    text: "Issiqlik almashinuvi ro‘y bermaydigan termodinamik jarayon qaysi?",
    responses: [
      { text: "izotermik", correct: false },
      { text: "adiabatik", correct: true },
      { text: "izoxorik", correct: false },
    ],
    id: 5,
  },
  {
    text: "Agar a + 1 son 3 ga qoldiqsiz bo‘linsa, 4 + 7a soni quyidagilardan qaysi biriga qoldiqsiz bo‘linadi (a ∈ N)?",
    responses: [
      { text: "11", correct: false },
      { text: "7", correct: false },
      { text: "3", correct: true },
    ],
    id: 6,
  },
  {
    text: "Choose the correct answer. It is often . . . to look for solutions than run away from your problems.",
    responses: [
      { text: "easier", correct: true },
      { text: "most easy", correct: false },
      { text: "easiest", correct: false },
    ],
    id: 5,
  },
  {
    text: "Choose the correct answer. − I like to attend evening lectures, and what about you, Feruza?",
    responses: [
      { text: "So does she", correct: false },
      { text: "So do I", correct: true },
      { text: "She likes too", correct: false },
    ],
    id: 6,
  },
  {
    text: "Choose the correct answer. We have enough milk in the fridge so we . . . buy any more.",
    responses: [
      { text: "should", correct: false },
      { text: "needn’t", correct: true },
      { text: "can’t", correct: false },
    ],
    id: 7,
  },
  {
    text: 'Choose the correct answer. "Do you play rugby?" said Peter.',
    responses: [
      { text: "Peter asked if I was playing rugby.", correct: false },
      { text: "Peter wonders if you play rugby.", correct: false },
      { text: "Peter wondered if I played rugby.", correct: true },
    ],
    id: 8,
  },
  {
    text: "Choose the correct answer. I wonder if you could . . . me a small favour",
    responses: [
      { text: "make", correct: false },
      { text: "do", correct: true },
      { text: "create", correct: false },
    ],
    id: 9,
  },
  {
    text: " Choose the correct answer. Would you mind if I . . . your book?",
    responses: [
      { text: "borrowed", correct: true },
      { text: "borrows", correct: false },
      { text: "would borrowed", correct: false },
    ],
    id: 10,
  },
]
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
    if (JSON.parse(localStorage.getItem("students")).length) {
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
