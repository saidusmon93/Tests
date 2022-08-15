<template>
 <!-- Login Аутентификация (логин ва пароль).Валидация булиши керак -->

  <div class="login">
    <form class="form-group">
      <div class="avatar">
        <div class="rounded">
          <img src="../assets/login.png" alt="logo" />
        </div>
      </div>
      <h1>Login</h1>
      <div>
        <label for="email" class="label">Email <span>*</span></label>
        <input type="email" class="input" v-model.trim="email" required />
      </div>
      <div>
        <label for="password" class="label">Password <span>*</span></label>
        <input type="password" class="input" id="password" v-model.trim="password" required />
      </div>
      <div class="alert" v-if="isCorrect">
        <p> {{errorMsg}} </p>
      </div>

      <button class="btn" type="submit" @click.prevent="login()">Login</button>
    </form>
  </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: "admin",
            password: "123",
            isCorrect: false,
            errorMsg : "",
        };
        
    },
    methods: {
        login() {
           if(!this.email  && !this.pasword ) {
            setTimeout(() => {
              this.isCorrect = true;
            this.errorMsg = "Required Login and Password";
            }, 1000);
           }
          else if (this.email === "admin" && this.password === "123") {
            setTimeout(() => {
              sessionStorage.setItem("auth", true);
            this.$store.dispatch("loggedIn", true);
            this.$router.push("/form");
            }, 1000);
           } else {
            setTimeout(() => {
              this.isCorrect = true;
            this.errorMsg = "Incorrect email or password";
            }, 1000);
           }
        }
         }
    };
</script>
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar .rounded {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f3f4;
}
.avatar img {
  width: 100px;
}
.alert {
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
}
</style>
