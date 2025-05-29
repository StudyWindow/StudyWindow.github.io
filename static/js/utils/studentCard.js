import {timePassedSince,calculateDayPercentage,toggleUserLove } from "/static/js/utils/utility.js";
export default class StudentStreamer{
  constructor(id,name,stream_hours,status,image_url,views,index,user_love_status){
    this.name=name
    this.stream_hours=stream_hours
    this.status=status
    this.image_url=image_url
    this.views=views
    this.index=index
    this.student_id=id
    this.user_love_status=user_love_status
  }
  createStudent(par_card_elm){
    //image Element
    const icon_student=document.createElement('div');
    const icon_img_student = document.createElement('img')
    icon_img_student.setAttribute("data-lazy-src",this.image_url)
    icon_img_student.setAttribute("loading","lazy")
    icon_img_student.setAttribute("src",this.image_url)
    icon_img_student.setAttribute("class","img-fluid lazy rounded")
    icon_img_student.setAttribute('id',"gif_"+this.student_id)
    icon_student.setAttribute("class","col-8 icon")
    icon_student.appendChild(icon_img_student);
    //Name Element
    const name_student=document.createElement('div')
    const name_p_student=document.createElement('p')
    const views_p_student=document.createElement('div')
    views_p_student.innerHTML=`
    <p><i class="fa fa-eye"></i>${this.views}</p>
    `
    name_p_student.innerText=this.name
    name_student.setAttribute("class","col")
    name_student.appendChild(name_p_student);
    name_student.appendChild(views_p_student)

    //status -> shows a red dot that means a student is live studying
    //favorite_students->the user's lovely companions
    const status_student=document.createElement('div')
    status_student.setAttribute("class","row")
    const favorite_div_student = document.createElement('div')//carrier
    favorite_div_student.setAttribute('class','col')
    const favorite_student = document.createElement('div')//child
    favorite_student.setAttribute('class','text-light')
    let love_template=`<p class="btn text-light" aria-label="${this.name}" is_liked="${this.user_love_status}"><i class="fa-solid fa-heart"></i></p>`
      favorite_student.onclick=function(){toggleUserLove(favorite_student.firstElementChild)}
        if(this.user_love_status=="true"){
      love_template= `<p class="btn text-danger" aria-label="${this.name}" is_liked="${this.user_love_status}"><i class="fa-solid fa-heart"></i></p>`
    }
    favorite_student.innerHTML=love_template
    const status_div_student=document.createElement('div')//carrier
    status_div_student.setAttribute('class','col')
    const status_d_student=document.createElement('div')// child
    status_d_student.setAttribute('class','status_student rounded-circle')

    status_d_student.setAttribute("id",`dot-${this.student_id}`)
    status_div_student.appendChild(status_d_student)
    status_student.appendChild(status_div_student)
    favorite_div_student.append(favorite_student)
    status_student.appendChild(favorite_div_student)
    name_student.appendChild(status_student)
    //hours
    const hours_student=document.createElement('div')
    const hours_p_student=document.createElement('p')
    const hour_24_label=document.createElement('div')
    hour_24_label.setAttribute('class','col')
    const hours_24_hr=document.createElement('p');
    hours_24_hr.setAttribute("class","mt-5 ms-5 mb-0 me-0")
    hours_24_hr.innerText="24:00:00"
    hour_24_label.appendChild(hours_24_hr)
    hours_p_student.setAttribute("id",`t${this.student_id}`)
    hours_p_student.innerText= timePassedSince(this.stream_hours)
    hours_student.setAttribute("class","col mt-5")
    hours_student.appendChild(hours_p_student)

    //progress
    const daily_progress=document.createElement('div')
    daily_progress.setAttribute("class","progress")
    daily_progress.style.height='5px';
    daily_progress.setAttribute('id',`prog${this.student_id}`)
    const row_progress=document.createElement("div")
    row_progress.setAttribute("class","mb-3")
    row_progress.appendChild(daily_progress)
    //like channel
    const heart_love=document.createElement('div')

    const row_student=document.createElement('div')
    row_student.setAttribute("id",this.student_id)
    const about_student=document.createElement("div")
    about_student.setAttribute("class","row text-light")
    row_student.setAttribute("class","row text-light")
    row_student.appendChild(icon_student)
    row_student.appendChild(name_student)
    about_student.appendChild(hours_student)
    about_student.appendChild(hour_24_label)
    par_card_elm.appendChild(row_student)
    par_card_elm.appendChild(about_student)
    par_card_elm.appendChild(row_progress)
    return par_card_elm
      }
  updateStudentStatus(){
    const condition = this.status=="is_live"; // Example condition
    const dotElement = document.getElementById(`dot-${this.student_id}`);
    if (condition) {
        dotElement.classList.add('blinking-red-status_student');
    } else {
        dotElement.classList.remove('blinking-red-status_student');
    }
  }
  UpdateStudentHour(){
    const self=this;
    this.prog_interval_id=setInterval(function(){
      let timepassed=timePassedSince(self.stream_hours);
      document.getElementById(`t${self.student_id}`).innerText=timepassed
      document.getElementById(`prog${self.student_id}`).innerHTML=`<div  class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: ${calculateDayPercentage(timepassed)}%" aria-valuenow="${calculateDayPercentage(timepassed)}" aria-valuemin="0" aria-valuemax="100"></div>`
    },1000)
  }
 async refreshStudentCard(data){
  const main_key = data["map"][this.student_id]
  const gif_elm = document.getElementById("gif_"+this.student_id)
   if(gif_elm!=null){
  gif_elm.src=data[main_key]['url']+"?timestamp="+Date.now()// i will try to make sure everyone displayed is live
   }
  }
}
