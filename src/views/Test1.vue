<template>
  <div class="container">
    <QuestionWr :close="close" @closeModal="openModal" />
    <EditModal
      :questionIndex="questionIndex"
      :isClose="isClose"
      @editModal="editModal"
    />
    <div class="header">
      <h1>Test</h1>
    </div>
    <div class="content">
      <div class="column">
        <div class="column_content">
          <div class="question_for">
            <div class="add_question">
              <a class="btn" @click="openModal()">Add Question</a>
            </div>
            <div class="edit_question">
              <a
                class="btn"
                @click="editModal()"
                v-if="questionIndex < questions.length"
                :key="questionIndex"
                >Edit Question</a
              >
            </div>
          </div>
          <div class="result_content" v-if="questionIndex >= questions.length">
            <div v-if="questions.length">
              <h2>Result</h2>
              <h2>{{ score }}/ {{ questions.length }}</h2>
              <button class="btn" @click="restart()">Restart</button>
            </div>
            <div v-else>
              <h2>Add questions</h2>
            </div>
          </div>
          <div
            class="question_content"
            v-if="questionIndex < questions.length"
            :key="questionIndex"
          >
            <h2>Question</h2>
            <h2>{{ questionIndex + 1 }} / {{ questions.length }}</h2>
            <div class="_content_test">
              <div class="question">
                <div class="delete_quest">
                  <a class="btn del" @click="deleteQuestion()"> &#10060; </a>
                </div>
                <div class="question_content">
                  <h3>{{ questions[questionIndex].question }}</h3>
                </div>
                <div class="writitng_answer">
                  <textarea
                    type="text"
                    class="input"
                    resize
                    placeholder="Answer"
                    @focusout="submit(questions[questionIndex])"
                    v-model.trim.lazy="answer"
                  />
                </div>
              </div>
              <div class="pagination">
                <div class="prev">
                  <button
                    v-show="questionIndex > 0"
                    class="btn"
                    @click="prev()"
                  >
                    Prev
                  </button>
                </div>
                <div class="next">
                  <button class="btn" @click="next()">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionWr from "@/components/QuetionWr.vue";
import EditModal from "@/components/EditWriteQuestion.vue";
export default {
  components: {
    QuestionWr,
    EditModal,
  },
  data() {
    return {
      close: false,
      isClose: false,
      questionIndex: 0,
      userRes: [],
      score: 0,
      answer: "",
      question: [
        {
          question:
            "Choose the correct answer.\nAt Heathrow airport we heard that the . . .\nwas delayed.",
          answer: "flight",
        },
        {
          question:
            "Choose the correct answer.\nYou annoy me because you don’t listen to\nwhat I say. I wish you . . . to what I say.",
          answer: "would listen",
        },
        {
          question: "What is the passage mostly about?\n",
          answer: "An incident at the airport",
        },
        {
          question:
            "According to the passage when was the\nwoman astonished?\n",
          answer: "When she found her biscuits",
        },
        {
          question:
            "According to the passage, whose biscuits were\nthey eating?",
          answer: "the young man’s",
        },
        {
          question:
            "According to the passage which country rules\nNorth Sentinel Island now?",
          answer: "India",
        },
        {
          question:
            "What is another factor that makes this island\ninaccessible to outsiders?",
          answer: "The Indian military ships",
        },
      ],
    };
  },
  computed: {
    questions() {
      return this.$store.getters.questWrite;
    },
  },
  mounted() {
    this.userRes = Array(this.questions.length).fill(null);
    if (
      JSON.parse(localStorage.getItem("questWrite")) === [] &&
      JSON.parse(localStorage.getItem("questWrite")) === null
    ) {
      this.$store.dispatch(
        "getQuestWrite",
        JSON.parse(localStorage.getItem("questWrite"))
      );
      console.log(JSON.parse(localStorage.getItem("questWrite")));
    } else {
      this.$store.dispatch("getQuestWrite", this.question);
      localStorage.setItem("questWrite", JSON.stringify(this.question));
      console.log(this.question);
    }
  },
  watch: {
    questionIndex(val) {
      console.log(val);
    },
  },
  methods: {
    openModal() {
      this.close = !this.close;
    },
    editModal() {
      this.isClose = !this.isClose;
    },
    submit(index) {
      if (index.answer.toLowerCase() === this.answer.toLowerCase()) {
        this.score++;
        this.$set(this.userRes, this.questionIndex, index.answer);
        console.log(this.userRes);
      }
    },
    prev() {
      if (this.questions.length > 0)
        if (this.questionIndex > 0) this.questionIndex--;
    },
    next() {
      if (this.questionIndex < this.questions.length) {
        this.questionIndex++;
        this.answer = "";
      }
    },
    deleteQuestion() {
      let d = JSON.parse(localStorage.getItem("questWrite"));
      d.splice(this.questionIndex, 1);
      localStorage.setItem("questWrite", JSON.stringify(d));
      this.$store.dispatch("getQuestWrite", d);
      alert("Question deleted");
    },
    restart() {
      this.questionIndex = 0;
      this.userRes = Array(this.questions.length).fill(null);
    },
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.column {
  width: 50%;
  /* border: 1px solid black; */
  padding: 10px;
}
.question {
  border-radius: 5px;
}
.column_content .question,
.result_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
}
.column_content h2 {
  text-align: center;
  margin: 1px;
}

.pagination {
  margin-top: 10px;
}
.delete_quest {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
