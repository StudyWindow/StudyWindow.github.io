import { read_user_profile_if_email,update_user_profile_if_email,updateUI} from "/static/js/utils/utility.js";
export default async function create_edit_profile(supabase,offcanvasInstance){
let file;
document.getElementById('image-upload').addEventListener('change', async function() {

    if (this.files.length > 0) {
      file=this.files[0]
      if (file) {
    // Validate file size (~1MB limit)
    if (file.size > 1024 * 1024) {
      alert('File size exceeds 1MB.');
      this.value=""
      file=null;
      return
    }
      }
    } else {
      file=null
    }
  });

var forms = document.getElementsByClassName('needs-validation');
const user_props =await read_user_profile_if_email(supabase)
const user_id="@"+user_props["user_id"]
const username=user_props["username"].split('@')[0]
const topics=user_props["topics"]
const user_description=user_props["about"]

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      const username_entry=form.querySelector("#name-entry")
      const bio_entry = form.querySelector("#description-entry")
      const topics_entry = form.querySelector("#topics-entry")
      //fill in current values
      username_entry.value=username
        topics_entry.value=topics
      bio_entry.value=user_description

      form.addEventListener('submit', async function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          event.preventDefault();
          event.stopPropagation();
          form.querySelector("#save-btn").classList.add('btn-loading');
          const username=form.querySelector("#name-entry").value
          const bio = form.querySelector("#description-entry").value
          const topics = form.querySelector("#topics-entry").value
          await update_user_profile_if_email(supabase,username_entry.value+user_id,bio_entry.value, topics_entry.value,file)
          offcanvasInstance.toggle()
          updateUI('profile',supabase)
        }
        form.classList.add('was-validated');
      }, false);
    });
}
