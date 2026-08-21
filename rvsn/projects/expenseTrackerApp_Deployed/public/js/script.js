/** user signUp */

const registerForm = document.querySelector('.registration-form');

registerForm.addEventListener('submit',(event)=>{
  event.preventDefault();

  const userObj = {
    name : document.getElementById('userName').value,
    email:document.getElementById('email').value,
    password: document.getElementById('password').value
  }

  console.log("userObj", userObj);
  axios.post("http://localhost:5000/user/register",userObj)
  .then((user)=>{
    console.log(user.data);
    alert("successfully registered...")
  })
  .catch((err)=>{
    console.log(err.response.data.message);
    alert("email id already registered!");
  })

})


