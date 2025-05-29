import { page_update_time } from "/static/js/utils/utility.js";

export default async function create_streams(){
if (localStorage.getItem("sw_favorite_students")==null){
  const init_student_str=JSON.stringfy([])
  localStorage.setItem("sw_favorite_students",init_student_str)
}
page_update_time(false)
}
