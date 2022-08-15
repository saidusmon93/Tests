<template>
  <div class="add_question_list" :style="{ display: close ? 'block' : 'none' }">
    <div class="__content">
      <a class="btn close_modal" @click="closeModal()"> &times; </a>
      <div class="form">
        <form>
          <div class="question_text">
            <label for="question" class="label">Question</label>
            <input
              type="text"
              id="question"
              placeholder="Question"
              v-model="list.text"
              class="input"
              required
            />
          </div>
          <div class="answers">
            <label for="answerFirst" class="label">
              <input
                type="checkbox"
                id="answerFirst"
                v-model="list.responses[0].correct"
                name="answer"
              />
              Correct answer 1
            </label>
            <input
              type="text"
              id="answer"
              v-model="list.responses[0].text"
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
                name="answer"
                v-model="list.responses[1].correct"
              />
              Correct answer 2
            </label>
            <input
              type="text"
              id="answer"
              v-model="list.responses[1].text"
              placeholder="Answer 2"
              class="input"
              required
            />
          </div>
          <div class="answers">
            <label for="answerThird" class="label">
              <input
                type="checkbox"
                id="answerThird"
                name="answer"
                v-model="list.responses[2].correct"
              />
              Correct answer 3
            </label>
            <input
              type="text"
              id="answer"
              v-model="list.responses[2].text"
              placeholder="Answer 3"
              class="input"
              required
            />
          </div>
          <div class="add">
            <button class="btn" type="submit" @click.prevent="pushQuest()">
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
  props: ["close"],
  data() {
    return {
      list: {
        text: "",
        responses: [
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
          {
            text: "",
            correct: false,
          },
        ],
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    },
    pushQuest() {
      if (
        this.list.text &&
        this.list.responses[0].text &&
        this.list.responses[1].text &&
        this.list.responses[2].text
      ) {
        setTimeout(() => {
          let question = JSON.parse(localStorage.getItem("questions"));
          if (question === null) {
            question = [];
          }
          this.list.id = question.length + 1;
          question.push(this.list);
          console.log(question);
          localStorage.setItem("questions", JSON.stringify(question));
          this.$store.dispatch("getQuestions",
            JSON.parse(localStorage.getItem("questions"))
          );
          this.list.text = "";
          this.list.responses[0].text = "";
          this.list.responses[1].text = "";
          this.list.responses[2].text = "";
        }, 700);
      } else {
        this.msg = "Please fill all the fields";
        alert(this.msg);
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
