let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
  email = id("email"),
  password = id("password"),
  form = id("form"),
  
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");


form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let engine = (id, serial, message) => {}

let engine = (id, serial, message) => {

  if (id.value.trim() === "") {
  } 
  
  else {
  }
}
