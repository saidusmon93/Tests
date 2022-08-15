<template>
  <div
    class="add_question_list"
    :style="{ display: isClose ? 'block' : 'none' }"
  >
    <div class="__content">
      <a class="btn close_modal" @click="editModal()"> &times; </a>
      <div class="form">
        <form>
          <div class="question_text">
            <label class="label">Question</label>
            <textarea
              v-model="questionWr.question"
              placeholder="Question"
              id="f"
              class="input"
              required
            />
          </div>
          <div class="answ">
            <label class="label">
              Answer
              <input
                type="text"
                class="input"
                id="d"
                v-model="questionWr.answer"
                placeholder="Answer"
              />
            </label>
          </div>
          <div class="add">
            <button class="btn" type="submit" @click.prevent="editWrQuest()">
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
  props: {
    isClose: {
      type: Boolean,
      default: false,
    },
    questionIndex: {
      type: Number,
    },
  },
  computed: {
    questionWr() {
      return this.$store.getters.questWrite[this.questionIndex];
    },
  },
  methods: {
    editModal() {
      this.$emit("editModal", false);
    },
    editWrQuest() {
      console.log(this.questionWr);
      let q = JSON.parse(localStorage.getItem("questWrite"));
      q[this.questionIndex] = this.questionWr;
      localStorage.setItem("questWrite", JSON.stringify(q));
      console.log(q);
      alert("Question edited");
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
  padding: 40px 20px 20px 20px;
}
.close_modal {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
