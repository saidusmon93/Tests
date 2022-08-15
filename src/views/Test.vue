<template>
  <section class="container">
    <QuestionModal :close="close" @closeModal="openModal" />
    <div class="question_box">
      <div class="question_for">
        <div class="add_question">
          <a class="btn" @click="openModal()">Add Question</a>
        </div>
        <div class="edit_question">
          <a
            class="btn"
            v-if="questionIndex < tests.length"
            :key="questionIndex"
            @click="editQuest(tests[questionIndex].id)"
            >Edit Question</a
          >
        </div>
      </div>
      <div
        class="questionContainer"
        v-if="questionIndex < tests.length"
        :key="questionIndex"
      >
        <header>
          <h1 class="title is-6">
            Test {{ questionIndex + 1 }}/{{ tests.length }}
          </h1>
        </header>
        <h2 class="title_container title">
          {{ tests[questionIndex].text }}
        </h2>

        <div class="option_container">
          <div
            class="option"
            v-for="(response, index) in tests[questionIndex].responses"
            @click="selectOption(index)"
            :class="{ 'is-selected': userResponses[questionIndex] == index }"
            :key="index"
          >
            {{ response.text }}
          </div>
        </div>
        <footer class="question_footer">
          <nav class="pagination">
            <div>
              <a v-show="questionIndex > 0" class="btn" @click="prev()">
                Back
              </a>
            </div>

            <div>
              <a
                class="btn"
                :class="userResponses[questionIndex] == null ? '' : 'is-active'"
                @click="next()"
                :disabled="questionIndex >= tests.length"
              >
                {{ userResponses[questionIndex] == null ? "Skip" : "Next" }}
              </a>
            </div>
          </nav>
        </footer>
      </div>
      <div
        v-if="questionIndex >= tests.length"
        :key="questionIndex"
        class="test_done"
      >
        <p class="subtitle">Total score: {{ score() }} / {{ tests.length }}</p>
        <br />
        <a class="btn" @click="restart()">Restart </a>
      </div>
    </div>
  </section>
</template>

<script>
import QuestionModal from "../components/QuestModal.vue";
export default {
  components: {
    QuestionModal,
  },
  data() {
    return {
      close: false,
      questionIndex: 0,
      userResponses: "",
      isActive: false,
      list: [
        {
          text: "Vagonning tezlanishi 36000 km/h2 . Bu necha m/s2 ?",
          responses: [
            {
              text: "2,8 ",
              correct: true,
            },
            {
              text: "1,4",
              correct: false,
            },
            {
              text: "0,28",
              correct: false,
            },
          ],
          id: 3,
        },
        {
          text: "Mis va alyuminiy jismlarning hajmlari va impulslari teng. Ulardan qay birining tezligi kattaroq?",
          responses: [
            {
              text: "mis jismniki",
              correct: false,
            },
            {
              text: "alyuminiy jismniki",
              correct: true,
            },
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
            {
              text: "izotermik",
              correct: false,
            },
            {
              text: "adiabatik",
              correct: true,
            },
            {
              text: "izoxorik",
              correct: false,
            },
          ],
          id: 5,
        },
        {
          text: "Agar a + 1 son 3 ga qoldiqsiz bo‘linsa, 4 + 7a soni quyidagilardan qaysi biriga qoldiqsiz bo‘linadi (a ∈ N)?",
          responses: [
            {
              text: "11",
              correct: false,
            },
            {
              text: "7",
              correct: false,
            },
            {
              text: "3",
              correct: true,
            },
          ],
          id: 6,
        },
      ],
    };
  },

  computed: {
    listQuest() {
      return this.$store.getters.questions;
    },
    tests() {
      return this.listQuest.map((item) => {
        var questions = {
          id: item.id,
          text: item.text,
          responses: [
            {
              text: item.responses[0].text,
              correct: item.responses[0].correct,
            },
            {
              text: item.responses[1].text,
              correct: item.responses[1].correct,
            },
            {
              text: item.responses[2].text,
              correct: item.responses[2].correct,
            },
          ],
        };
        return questions;
      });
    },
  },
  mounted() {
    this.userResponses = Array(this.tests.length).fill(null);
    if (JSON.parse(localStorage.getItem("questions")).length) {
      this.$store.dispatch(
        "getQuestions",
        JSON.parse(localStorage.getItem("questions"))
      );
      console.log(JSON.parse(localStorage.getItem("questions")));
    } else {
      this.$store.dispatch("getQuestions", this.list);
      localStorage.setItem("questions", JSON.stringify(this.list));
      console.log(this.list);
    }
  },
  methods: {
    editQuest(id) {
      this.$router.push(`/edit-quest/${id}`);
    },
    openModal() {
      this.close = !this.close;
    },
    restart() {
      this.questionIndex = 0;
      this.userResponses = Array(this.tests.length).fill(null);
    },
    selectOption(index) {
      this.$set(this.userResponses, this.questionIndex, index);
      console.log(this.userResponses);
    },
    next() {
      if (this.questionIndex < this.tests.length) this.questionIndex++;
    },

    prev() {
      if (this.tests.length > 0)
        if (this.questionIndex > 0) this.questionIndex--;
    },
    score() {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
          typeof this.tests[i].responses[this.userResponses[i]] !==
            "undefined" &&
          this.tests[i].responses[this.userResponses[i]].correct
        ) {
          score++;
        }
      }
      return score;
    },

    openModal() {
      this.close = !this.close;
    },
  },
};
</script>
<style scoped></style>
