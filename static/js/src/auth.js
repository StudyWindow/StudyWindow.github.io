import {updateUI,show_offcanvas,read_user_profile_if_email,getCurrentDate,create_user_profile_row_if_email,alertUser} from "/static/js/utils/utility.js";
import {CONFIRM_EMAIL} from '/static/js/src/strings.js'

export default async function auth_user(supabase){
const submit_button_login =document.getElementById("login-form-submit")
const email_entry=document.getElementById("email-entry")
const password_entry = document.getElementById("password-entry")
  //we are on a login page
    submit_button_login.addEventListener('click',async function(){
    submit_button_login.classList.add('btn-loading');
    const {data,error}=await supabase.auth.signInWithPassword({
      email:email_entry.value,
      password:password_entry.value
    })
    if(error){
      alert(error.message)
      submit_button_login.classList.remove('btn-loading');
    }else{
      await read_user_profile_if_email(supabase)
      updateUI('profile',supabase)
    }
      })
  //signup
  const submit_button_signup=document.getElementById("signup-form-btn")
  submit_button_signup.addEventListener('click',async function(){
  this.classList.add('btn-loading');
  const {data:{user},error} = await supabase.auth.signUp(
  {
    email:email_entry.value,
    password:password_entry.value,
  }
)
  await create_user_profile_row_if_email(supabase,user,error)
  this.classList.remove('btn-loading');
  show_offcanvas('confirm',CONFIRM_EMAIL,supabase)
  })
}
