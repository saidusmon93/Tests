<template>
  <div class="navbar light">
    <ul class="navs">
      <li class="navs__item" v-if="auth">
        <router-link to="/first_test">Test </router-link>
      </li>
      <li class="navs__item" v-if="auth">
        <router-link to="/second_test">TestWr</router-link>
      </li>
      <li class="navs__item" v-if="auth">
        <router-link to="/form">Form</router-link>
      </li>
      <li class="navs__item" v-if="auth">
        <router-link to="/list">List</router-link>
      </li>
    </ul>
    <div class="log dropdown" v-if="auth">
      <a class="dropdown__toggle">Logout</a>
      <ul class="dropdown__menu">
        <li class="dropdown__item logout">
          <a @click="logout()"> Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    auth() {
      if (this.$store.getters.auth) {
        return true;
      }
      return false;
    },
  },

  name: "Navs",
  methods: {
    logout() {
      if (this.$route.path != "/login") {
        sessionStorage.removeItem("auth");
        this.$store.dispatch("loggedIn", false);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: rgb(132, 175, 176);
  background: linear-gradient(
    0deg,
    rgba(132, 175, 176, 1) 67%,
    rgba(126, 148, 137, 0.8939950980392157) 100%
  );
 
}
@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 20px 20px;
  }
  .navs {
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    width: 100%;
    padding: 0;
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
  .dropdown__toggle {
    padding: 10px 0 !important;
  }
  .log,
  .dropdown__toggle {
    display: inline-block;
  }
}

.navs {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navs__item {
  margin-right: 20px;
}
.navs__item a {
  text-decoration: none;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.dropdown {
  position: relative;
}

.dropdown__toggle {
  display: block;
  padding: 10px 20px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown__item {
  padding: 10px 20px;
}

.dropdown:hover .dropdown__menu {
  display: block;
}

.dropdown:hover .dropdown__toggle {
  color: black;
}

.dropdown__menu a {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.dropdown__menu a.router-link-exact-active,
.navs__item a.router-link-exact-active {
  color: #fff;
}

.log {
  margin-left: auto;
}
</style>
