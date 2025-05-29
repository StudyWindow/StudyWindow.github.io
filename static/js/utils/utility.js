import { NAVBAR_STR,PUBLIC_PROJECT_AUTH, LOGIN_PROFILE_IMAGE,LOGIN_N_SIGNUP,LOGIN_O_SIGNUP,USER_PROFILE} from '/static/js/src/strings.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import config_global from '/static/js/utils/globals.js'
import StudentStreamer from '/static/js/utils/studentCard.js'
import create_profile from '/static/js/src/profile.js'
import  create_edit_profile from '/static/js/src/edit_profile.js'
import auth_user from '/static/js/src/auth.js'
import TOMODORO from '/static/js/src/tomodoro_html.js'
import create_tomodoro from '/static/js/src/tomodoro.js'

const activated_cards_streams=[]
  const offCanvas = document.getElementById('reusable_Offcanvas')
const activated_cards_favs=[]
const DATA_URL=config_global['DATA_URL']

export async function init(supabase){
const sw_tomodoro=document.getElementById('sw-tomodoro')
const authenticate_user = document.getElementById('auth')
const user_profile=document.getElementById('profile')
sw_tomodoro.innerHTML=""
authenticate_user.innerHTML=""
user_profile.innerHTML=""
const {data:{user},error} = await supabase.auth.getUser()
console.log(user)
if(user==null){
  sw_tomodoro.innerHTML=LOGIN_O_SIGNUP
  authenticate_user.innerHTML=LOGIN_N_SIGNUP
  auth_user(supabase)
}else{
  config_global['IS_AUTH_USER']=true
  user_profile.innerHTML=USER_PROFILE
  create_profile(supabase)
  sw_tomodoro.innerHTML=TOMODORO
  create_tomodoro(supabase)
}
}

async function check_user_status(supabase_instance){
  return await supabase_instance.auth.getUser()
}

export function get_supabase_instance(){
  return createClient(PUBLIC_PROJECT_AUTH['url'],PUBLIC_PROJECT_AUTH['nona_key'])
}

export async function create_user_profile_row_if_email(supabase,user,error){
  if(error){
    console.log(error)
  }else{
  const user_id="@"+user['id']
	const tr = indexedDB.open("pomo-db", 1);
    tr.onsuccess((event)=>{
      const db = event.target.result;
      let arr=db.transaction("records","readonly").
        objectStore('records').index('task').getAll();
      const db_data ={sw_db:arr}
      save_to_supabase_db(supabase,user['id'],db_data)
    })
  await supabase
  .from('User Profiles')
  .insert({user_id:user['id'],username:user['email'].split('@')[0]+user_id,
        streak:"0"+user_id,
        created_on:getCurrentDate(),
        profile_image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFq_O4Hn8W7WKdakJMSYMpPLi-EhhYpxHIEVcAXBxMvQ&s",
        about:"Iam a student learning ...",
        topics:"studying ..,"
})
  }
  }

export function getCurrentDate(){
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`

}
export async function read_user_profile_if_email(supabase){
  const {data,error} = await supabase.auth.getUser()
  if(error){
    console.log(error)

  }else{
    const user_id=data['user']['id']
    const user_data = await supabase
    .from('User Profiles')
    .select('*')
    .eq('user_id',user_id);
    return user_data['data'][0]
  }
}

export async function update_user_profile_if_email(supabase,Username,About,topics,file){
const {data,error} = await supabase.auth.getUser()
  if(error){
    console.log(error)
  }else{
    const user_id=data['user']['id']
    const profileImageUrl = file!=null?await uploadProfilePicture(supabase,data,file):null
    if (profileImageUrl==null){
      const suc = await supabase
    .from('User Profiles')
    .update({username:Username,about:About,topics:topics})
    .eq('user_id',user_id);
      return;
    }
    const suc = await supabase
    .from('User Profiles')
    .update({username:Username,about:About,profile_image_url:profileImageUrl,topics:topics})
    .eq('user_id',user_id);
  }
}

async function uploadProfilePicture(supabase,user_data,file) {
  const user=user_data["user"]
  if (!user || !file) return null;
  const fileExt = "jpg";
  const fileName = `${user.id}/profile.${fileExt}`;
  const { data, error } = await supabase.storage
    .from('profile-pictures')
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  const user_id=user['id']
  return await get_user_profile_img(supabase,user_id+'/'+'profile.jpg')
}

async function get_user_profile_img(supabase,fileName){
  //call this when uploading image
  const {data:{publicUrl}} = await supabase.storage
    .from('profile-pictures')
    .getPublicUrl(fileName);
  return publicUrl//+"?timestamp="+Date.now()
}

export function set_user_image(url,imgElement){
  //imgElement.classList.add("img-loading-animation")
  if (imgElement.getAttribute('id')=="profile-image"){
  }else{
  }
  imgElement.src=url
  imgElement.addEventListener('load',()=>{
    imgElement.classList.remove("img-loading-animation")
    if (imgElement.complete) { //for browsers that cache img
    imgElement.classList.remove('loading-animation');
  }
  })
}

export async function save_to_supabase_db(supabase,user_id,json_data,time){
  //write to user's from supabase table
  //when the user registers, call save to upload his current streak
  document.getElementById("user_streak").innerText=time
  await supabase
    .from("User Profiles")
    .update({"pomo_db":json_data,"streak":time+'@'+user_id})
    .eq('user_id',user_id)
}
export async function read_from_supabase_db(supabase,user_id){
  //read from user's supabase table
  const {data,error} = await supabase
    .from("User Profiles")
    .select("pomo_db->sw_db")
    .eq('user_id',user_id)
  if(error){
    console.log(error)
    return null;
  }
  return data[0]['sw_db']
}

export async function save_pomo_settings(supabase,user_id){
  let pomo_selected_task = localStorage.getItem("pomo-selected-task")
  pomo_selected_task=pomo_selected_task?pomo_selected_task:"Default Task"
  const pomo_theme = localStorage.getItem("pomo-theme","dark")
  let pomo_theme_accent = localStorage.getItem("pomo-theme-accent")
  pomo_theme_accent = pomo_theme_accent?pomo_theme_accent:"lavender"
  let pomo_tasks = localStorage.getItem("pomo-tasks")
  pomo_tasks = pomo_tasks?JSON.parse(pomo_tasks):["Default Task"]
  let pomo_config = localStorage.getItem("pomo-config")
  pomo_config=pomo_config?JSON.parse(pomo_config):{"focus":60,"short":300,"long":900,"longGap":4}
  const data = {
    'pomo-selected-task':pomo_selected_task, 'pomo-theme':pomo_theme, 'pomo-theme-accent':pomo_theme_accent,'pomo-tasks':pomo_tasks,'pomo-config':pomo_config
  }
  await supabase
    .from("User Profiles")
    .update({"pomo_settings":data})
    .eq('user_id',user_id)
}
export async function read_tomodoro_settings(supabase,user_id){
  //read from user's supabase table
  const {data,error} = await supabase
    .from("User Profiles")
    .select("pomo_settings")
    .eq('user_id',user_id)
  if(error){
    console.log(error)
    return null;
  }
  return data
}
export function timePassedSince(timestamp_in_seconds) {
    // Get the current timestamp in seconds

    const currentTime=new Date()
    const currentTimeUTC=new Date(currentTime.toISOString())
    const currentTimestamp = Math.floor(currentTimeUTC.getTime()/1000)
    // Calculate the difference in seconds
    const diffInSeconds = currentTimestamp - timestamp_in_seconds;

    // Convert the difference to hours, minutes, and seconds
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    if(hours>=24){
      const days=Math.floor(hours/24)
      const todayMidnight=new Date(currentTimeUTC.setUTCHours(0,0,0,0));
      const todayMidnightSeconds= Math.floor(todayMidnight.getTime()/1000)
      const adjDiffInSeconds = currentTimestamp - todayMidnightSeconds

      const adjHours = Math.floor(adjDiffInSeconds / 3600);
      const adjMinutes = Math.floor((adjDiffInSeconds % 3600) / 60);
      const adjSeconds = adjDiffInSeconds % 60;
      const adjFormattedTime = `${days.toString()} days ,${adjHours.toString().padStart(2, '0')}:${adjMinutes.toString().padStart(2, '0')}:${adjSeconds.toString().padStart(2, '0')}`;
      return adjFormattedTime;
    }
    // Format the results as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
}
export function calculateDayPercentage(parTimeString) {
    let timeString=parTimeString
    const IsdaysInString = parTimeString.search("days")
   if(IsdaysInString!= -1){
     timeString = parTimeString.substring(IsdaysInString+6);
    }
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    // Calculate the total seconds that have passed since the start of the day
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    // Total seconds in a full day (24 hours)
    const totalSecondsInDay = 24 * 3600;
    // Calculate the percentage of the day that has passed
    const percentage = (totalSeconds / totalSecondsInDay) * 100;
    return percentage.toFixed(0); // Returning the percentage rounded to 0 decimal places
}
export function alertUser(msg){
  document.body.innerHTML+=`
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  ${msg}</strong>.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
`
}
export function toggleUserLove(this_element){
  const is_liked= this_element.getAttribute('is_liked')
  const channel_name=this_element.getAttribute('aria-label')
  let  user_fav_list= JSON.parse(localStorage.getItem('sw_favorite_students'))
  if(is_liked=="true"){// runs if user has liked this channel alraedy
    this_element.classList.remove("text-danger")
    this_element.classList.add("text-light")
    const updated_user_fav_list=user_fav_list.filter(n=>n!==channel_name)// remove channel from favourites
    const user_fav_list_str=JSON.stringify(updated_user_fav_list)
    localStorage.setItem('sw_favorite_students',user_fav_list_str)
    this_element.setAttribute("is_liked","false")
  }else{//runs if user hasn't liked this channel yet
    this_element.classList.remove('text-light')
    this_element.classList.add('text-danger')
    this_element.setAttribute('is_liked',"true")
    if (user_fav_list==null){// if it's a new user or one without love yet
      user_fav_list=[channel_name]
      const user_fav_list_str=JSON.stringify(user_fav_list)
      localStorage.setItem("sw_favorite_students",user_fav_list_str)
    }else{//user with love giving showing even more love
      user_fav_list.push(channel_name)
      const user_fav_list_str=JSON.stringify(user_fav_list)
      localStorage.setItem("sw_favorite_students",user_fav_list_str)
    }
  }
}
function updateTimeProgress(wait_time,arr_students2){
  setInterval(function(){
    fetch(DATA_URL,{method:"GET"})
    .then(i=>i.json()).then(function(data){
   arr_students2.forEach((s)=>{
     s.refreshStudentCard(data)})
    })
  }
    ,1000*60*2)//2 minutes
}
export async function create_page_numbers(pages_obj,is_favorite_page){
  const page_numbers_par_elm=is_favorite_page?document.getElementById('pagination-unit_fav'):document.getElementById('pagination-unit_streams')
  return new Promise((resolve)=>{
    const pages_obj_length=is_favorite_page?pages_obj['length']:pages_obj['length']-1
      //dont subtract 1 because the user could have 1 fav streamer
for (let i=1;i<=pages_obj_length;i++){
    page_numbers_par_elm.innerHTML+=is_favorite_page?`<li id="${i}_fav" class="page-item"><a class="page-link" >${i}</a></li>`:`<li id="${i}_streams" class="page-item"><a class="page-link" >${i}</a></li>`
    setTimeout(()=>{is_favorite_page?document.getElementById(i+"_fav").addEventListener('click',function(){displayPageContent(pages_obj,i,this,is_favorite_page);}):document.getElementById(i+"_streams").addEventListener('click',function(){displayPageContent(pages_obj,i,this,is_favorite_page);})},100);
  }
    resolve()
})
}
export function displayPageContent(pages_obj,page_id_index,page,is_favorite_page){
  const page_id=is_favorite_page?`page_${page_id_index}_fav`:`page_${page_id_index}_streams`
  let active_card=null
  let activated_cards=is_favorite_page?activated_cards_favs:activated_cards_streams

  page.classList.add('active')
  if (pages_obj[page_id]['exists_in_dom']){
    // find it's id which should correspond with page_id
    if(activated_cards.length>0){
       activated_cards[0].classList.add('hidden')
       activated_cards[1].classList.remove('active')
       activated_cards.length=0 //remove all itemes
      if(is_favorite_page){
        activated_cards_favs.length=0
      }else{
        activated_cards_streams.length=0
      }
     }
    active_card = document.getElementById(page_id)
    active_card.classList.remove('hidden')
    activated_cards.push(active_card,page)
    is_favorite_page?activated_cards_favs.push(active_card,page):activated_cards_streams.push(active_card,page)
  }else{
    // add the contents to the div element and display change the exists_in_dom to true
     if(activated_cards.length>0){
       activated_cards[0].classList.add('hidden')
       activated_cards[1].classList.remove('active')
       activated_cards.length=0
       if(is_favorite_page){
         activated_cards_favs.length=0
       }else{
         activated_cards_streams.length=0
       }
     }
     active_card= document.getElementById(page_id)
    activated_cards.push(active_card,page)
is_favorite_page?activated_cards_favs.push(active_card,page):activated_cards_streams.push(active_card,page)

     active_card.classList.remove('hidden')
     pages_obj[page_id]['exists_in_dom']=true
     pages_obj[page_id]['students'].forEach((e)=>{
       e.createStudent(active_card);
       e.updateStudentStatus();
       e.UpdateStudentHour();
   })
  }
}
export async function page_update_time(is_favorite_page){
  fetch(config_global["COMMITS_URL"],
    {
      method:"GET",
      headers:
      {
        "Accept": "application/vnd.github+json",
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
  .then(res=>{
    if(!res.ok){
      throw new Error("Network response was not ok")
      alertUser("Check your Internent Connection please! Refresh the page please")
    }
    return res.json();
  })
  .then(async function(data){
    const last_updated_date=new Date(data[0]["commit"]["committer"]["date"])
    const last_updated_date_secs = Math.floor(last_updated_date.getTime()/1000);
    const passedTime= timePassedSince(last_updated_date_secs)
    const [hours,minutes,seconds] = passedTime.split(':').map(Number)
    const wait_time= hours*3600+minutes*60+seconds
   const {arr_students2,pages_obj} = await getDataJson(is_favorite_page)
    await create_page_numbers(pages_obj,is_favorite_page)
    is_favorite_page?displayPageContent(pages_obj,1,document.getElementById('1_fav'),is_favorite_page):displayPageContent(pages_obj,1,document.getElementById('1_streams'),is_favorite_page)
    updateTimeProgress(wait_time,arr_students2)
  })
  .catch(error =>{
    console.error('There was a problem with the fetch operation:', error);
    alertUser("We are having trouble fetching information from our database, please check that you are not blocking access to endpoint *.github.*, refresh the page please")
  })
}

export function getDataJson(is_favorite_page){
  let page_count = 0
  let main_student_card=is_favorite_page?document.getElementById('studentOverview_fav'):document.getElementById('studentOverview_streams')
  let arr_students=[]
  let arr_students2=[]
  let pages_obj={}
  let page_label=""
  let user_fav_list=JSON.parse(localStorage.getItem("sw_favorite_students"))
  if (user_fav_list==null){
    user_fav_list=[]
  }
  let results=[]
  return new Promise((resolve)=>{
    fetch(DATA_URL,{method:"GET"})
    .then(i=>i.json()).then(function(res){
      let id, student,name,time,status,icon,views,index=0;
      for(let i of Object.keys(res)){
        let user_love_status="false";
        if (is_favorite_page){
        if(index>0 && index%20==0){
          /*
           * This is still under discussion
           * add twenty elements per each page
           */
        }
        name=res[i]['name']
        //add only students that the user loves
        if (user_fav_list.indexOf(name)!=-1){
          user_love_status="true"
          time=res[i]['release_timestamp']
          status=res[i]['live_status']
          icon=res[i]['url']
          views=res[i]['concurrent_view_count']
          id=res[i]['id']
          student= new StudentStreamer(id,name,time,status,icon,views,index,user_love_status)
          arr_students.push(student);
          arr_students2.push(student)
          index+=1;
        }
      }
      else{
        let user_love_status="false";
        if(index>0 && index%9==0){ //add nine elements per each page
          page_count+=1
          page_label=is_favorite_page?`page_${page_count}_fav`:`page_${page_count}_streams`
          const new_students_elm_carrier=document.createElement("div")
          new_students_elm_carrier.setAttribute('id',page_label)
          new_students_elm_carrier.setAttribute('class',"card-body bg-dark h-100")
          new_students_elm_carrier.classList.add('hidden')
          main_student_card.appendChild(new_students_elm_carrier)
          pages_obj[page_label]={
            "students":arr_students.slice(),
            "exists_in_dom":false
          }
          arr_students.length=0
        }
        name=res[i]['name']
        if (user_fav_list.indexOf(name)!=-1){
          user_love_status="true"
        }
        time=res[i]['release_timestamp']
        status=res[i]['live_status']
        icon=res[i]['url']
        views=res[i]['concurrent_view_count']
        id=res[i]['id']
        student= new StudentStreamer(id,name,time,status,icon,views,index,user_love_status)
        arr_students.push(student);
        arr_students2.push(student)
        index+=1;
        }
      }
      //if anystudent actually remain
      if (arr_students.length>0){
          page_count+=1
          page_label=is_favorite_page?`page_${page_count}_fav`:`page_${page_count}_streams`
          const new_students_elm_carrier=document.createElement("div")
          new_students_elm_carrier.setAttribute('id',page_label)
          new_students_elm_carrier.setAttribute('class',"card-body bg-dark h-100")
          new_students_elm_carrier.classList.add('hidden')
          main_student_card.appendChild(new_students_elm_carrier)
          pages_obj[page_label]={
            "students":arr_students.slice(),
            "exists_in_dom":false
          }
          arr_students.length=0
        resolve({'arr_students2':arr_students2, 'pages_obj':(()=>{pages_obj["length"]=page_count;return pages_obj;})()})
      }
         //set the number of pages
    })
}
  )}
export function show_offcanvas(content_for,content,supabase){
  const offcanvasInstance=new bootstrap.Offcanvas(offCanvas)
  offcanvasInstance._element.children[1].innerHTML=content
  offcanvasInstance.show();
  switch(content_for){
    case "edit_profile":
      create_edit_profile(supabase,offcanvasInstance);
      break;
    case "confirm":
      break;
    default:
  }
}
export function updateUI(content_for,supabase){
  switch(content_for){
    case 'profile':
      init(supabase);
      break;
    default:
      return;
  }
}
export async function logout_usr(supabase){
document.getElementById("logout-btn").addEventListener('click',async function(){
      this.classList.add('btn-loading');
      await supabase.auth.signOut();
      updateUI('profile',supabase)
    }
)
}
