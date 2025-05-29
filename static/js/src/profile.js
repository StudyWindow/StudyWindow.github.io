import { show_offcanvas,read_user_profile_if_email,update_user_profile_if_email, set_user_image,logout_usr } from "/static/js/utils/utility.js";
import {EDIT_PROFILE} from '/static/js/src/strings.js'
import config_global from '/static/js/utils/globals.js'

export default async function create_profile(supabase){
const user_props =await read_user_profile_if_email(supabase)
const username=user_props["username"].split('@')[0];
const created_on=user_props["created_on"]
const streak=user_props["streak"].split('@')[0]
const user_description=user_props["about"]
const publicUrl=user_props["profile_image_url"]
const topics=user_props["topics"]
const user_profile_image=document.querySelector("#profile-image")
const user_icon=document.querySelector("#user-icon")
set_user_image(publicUrl,user_profile_image);
document.getElementById("username").innerText=username
document.getElementById("user_streak").innerText=streak
config_global['STREAK']+=parseInt(streak,10)
document.getElementById("study-description").innerText=user_description
document.getElementById("topics").innerText=topics
document.getElementById("edit-profile").addEventListener('click',async function(){
  show_offcanvas("edit_profile",EDIT_PROFILE,supabase);
})
logout_usr(supabase)
}
