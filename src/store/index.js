import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: sessionStorage.getItem("auth"),
    students: [],
    questions: [],
    questWrite: [],
  },
  getters: {
    auth(state) {
      return state.auth;
    },
    students(state) {
      return state.students;
    },
    questions(state) {
      return state.questions;
    },
    questWrite(state) {
      return state.questWrite;
    },
  },
  mutations: {
    setauth(state, auth) {
      state.auth = auth;
    },
    setStudents(state, students) {
      state.students = students;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setQuestWrite(state, questWrite) {
      state.questWrite = questWrite;
    },
  },
  actions: {
    loggedIn({ commit }, auth) {
      try {
        commit("setauth", auth);
      } catch (e) {
        console.log(e);
      }
    },
    logout({ commit }) {
      commit("setauth", false);
    },
    getStudents({ commit }, students) {
      try {
        commit("setStudents", students);
        console.log("is vuex",students);
      } catch (error) {
        console.log(error);
      }
    },
    getQuestions({ commit }, questions) {
      try {
        commit("setQuestions", questions);
      } catch (error) {
        console.log(error);
      }
    },
    getQuestWrite({ commit }, questions) {
      try {
        commit("setQuestWrite", questions);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
