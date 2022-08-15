<template>
  <div class="edit_question_list">
    <div class="edit__content">
      <div class="header__edit">
        <div class="back">
          <router-link class="btn" to="/first_test">Back</router-link>
        </div>
        <div class="delete">
          <a class="btn" @click="deleteQuestion($route.params.id)">Delete</a>
        </div>
      </div>
      <div class="form">
        <form>
          <h3>Edit Question</h3>
          <div class="question_text">
            <label for="question" class="label">Question</label>
            <textarea
              type="text"
              id="question"
              placeholder="Question"
              v-model="question.text"
              class="input"
              required
            />
          </div>
          <div class="answers">
            <label for="answerFirst" class="label">
              <input
                type="checkbox"
                id="answerFirst"
                v-model="question.responses[0].correct"
                name="answer"
              />
              Correct answer 1
            </label>
            <input
              type="text"
              id="answer"
              v-model="question.responses[0].text"
              placeholder="Answer 1"
              class="input"
              required
            />
          </div>
          <div class="answers">
            <label for="answerSecond" class="label">
              <input
                type="checkbox"
                id="answerSecond"
                v-model="question.responses[1].correct"
                name="answer"
              />
              Correct answer 2
            </label>
            <input
              type="text"
              id="answer"
              placeholder="Answer 2"
              v-model="question.responses[1].text"
              class="input"
              required
            />
          </div>
          <div class="answers">
            <label for="answerThird" class="label">
              <input
                type="checkbox"
                id="answerThird"
                v-model="question.responses[2].correct"
                name="answer"
              />
              Correct answer 3
            </label>
            <input
              type="text"
              id="answer"
              placeholder="Answer 3"
              v-model="question.responses[2].text"
              class="input"
              required
            />
          </div>
          <div class="add">
            <button
              class="btn edit_btn"
              type="submit"
              @click.prevent="edithQuest()"
            >
              Edit
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
      see: false,
    };
  },
  computed: {
    question() {
      let question = JSON.parse(localStorage.getItem("questions"));
      return question.filter((item) => item.id == this.$route.params.id)[0];
    },
  },
  mounted() {
    console.log(this.question);
  },
  methods: {
    edithQuest() {
      console.log("edit");

      let question = JSON.parse(localStorage.getItem("questions"));
      let index = question.findIndex(
        (item) => item.id == this.$route.params.id
      );
      question[index] = this.question;
      localStorage.setItem("questions", JSON.stringify(question));
      console.log(question);
      alert("Question edited");
    },
    deleteQuestion(id) {
      let question = JSON.parse(localStorage.getItem("questions"));
      let index = question.findIndex((item) => item.id == id);
      question.splice(index, 1);
      localStorage.setItem("questions", JSON.stringify(question));
      alert("Question deleted");
      this.$router.push("/first_test");
    },
  },
};
</script>

<style scoped>
.header__edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.edit_question_list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit__content {
  width: 100%;
  max-width: 350px;
  background-color: transparent;
  margin-top: 30px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.edit_btn {
  float: right;
  margin-top: 20px;
  clear: both;
}
</style>
