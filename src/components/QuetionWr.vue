<template>
  <div class="add_question_list" :style="{ display: close ? 'block' : 'none' }">
    <div class="__content">
      <a class="btn close_modal" @click="closeModal()"> &times; </a>
      <div class="form">
        <form>
          <div class="question_text">
            <label for="question" class="label">Question</label>
            <textarea
              id="question"
              placeholder="Question"
              v-model="questions.question"
              class="input"
              required
            />
          </div>
          <div class="answers">
            <label for="answerFirst" class="label">
              Answer
              <input
                type="text"
                id="answerFirst"
                class="input"
                v-model="questions.answer"
                name="answer"
                placeholder="Answer"
              />
            </label>
          </div>
          <div class="add">
            <button class="btn" @click.prevent="updateList()" type="submit">
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
      questions: {
        question: "",
        answer: "",
      },
    };
  },
  props: ["close"],
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    updateList() {
      if (this.questions.question && this.questions.answer) {
        setTimeout(() => {
          let question = JSON.parse(localStorage.getItem("questWrite"));
          if (question === null) {
            question = [];
          }
          question.push(this.questions);
          console.log(question);
          localStorage.setItem("questWrite", JSON.stringify(question));
          this.$store.dispatch(
            "getQuestWrite",
            JSON.parse(localStorage.getItem("questWrite"))
          );
          alert("Question added");
          this.questions.question = "";
          this.questions.answer = "";
        }, 700);
      } else {
        var msg = "Please fill all the fields";
        alert(msg);
      }
    },
  },
};
</script>

<style>
.add {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.add_question_list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  height: max-content;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
.close_modal {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
