console.log(sessionStorage.getItem('auth'))

export default function (to, from, next) {
  if (sessionStorage.getItem("auth")) {
    next();
  }
  else {
    next("/login?redirect=" + to.path);
  }
}
