const nothing=""
export const NAVBAR_STR=`
<div class="container-fluid">
    <a class="navbar-brand" href="#">StudyWindow</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul id="top_nav_bar" class="navbar-nav">
        <li id="home" class="nav-item">
          <a class="nav-link" aria-current="page" href="index"><i class="fas fa-home" style="margin-right:8px;"></i>Home</a>
        </li>
        <li id="streams" class="nav-item">
          <a class="nav-link" href="streams"><i class="fas fa-video" style="margin-right:8px;"></i>Streams</a>
        </li>
        <li id="favorites" class="nav-item">
          <a class="nav-link" href="favorites"><i class="fas fa-star" style="margin-right:8px;"></i>Favorite Streams</a>
        </li>
        <li class="nav-item" id="leaderboard">
          <a class="nav-link" href="leaderboard"><i class="fas fa-trophy" style="margin-right:8px;"></i>LeaderBoard</a>
        </li>
        <li class="nav-item" id="about">
          <a class="nav-link" href="about"> <i class="fas fa-info-circle" style="margin-right:8px;"></i>About</a>
        </li>
        <li class="nav-item dropdown" id="login-profile"></li>

        <div class="container" id="auth-buttons">
          <div class="row text-center">
            <div class="col-6">
              <button class="btn" id="login-btn">Login</button>
            </div>
            <div class="col-6">
              <button class="btn" id="signup-btn">SignUp</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
  ${nothing}
  `
export const LOGIN_PROFILE_IMAGE=`
      <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
        <img alt="User" class="rounded-circle me-2 img-loading-animation p-2" width="40" height="40" id="login-image">
        <span id="login-username"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li><a class="dropdown-item" href="profile">Profile</a></li>
        <li id="logout-btn"><a class="dropdown-item" href="#">Logout</a></li>
    </ul>
    ${nothing}
`
export const PUBLIC_PROJECT_AUTH={
  url:"https://kmxhrbmsuunryhjdogwb.supabase.co",
  nona_key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtteGhyYm1zdXVucnloamRvZ3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Nzg1NzAsImV4cCI6MjA2MzE1NDU3MH0.VCkrVPTRHbBKAgmkI-V75TxUCV9UImHkh237KsDumkg'}

export const LOGIN_N_SIGNUP=`
  <div class="container mt-5">
    <ul class="nav nav-tabs" id="authTabs" role="tablist">
        <li class="nav-item">
            <button type="button" class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" role="tab" aria-controls="login" aria-selected="true">Login</button>
        </li>
        <li class="nav-item">
            <button type="button" class="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" role="tab" aria-controls="signup" aria-selected="false">Sign Up</button>
        </li>
    </ul>
    <div class="tab-content" id="authTabsContent">
        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
            <div class="container d-flex mt-2">
                <div class="card p-4" style="width: 350px;">
                    <h2 class="text-center mb-3">Log in</h2>
                    <form>
                        <div class="mb-3">
                            <input type="email" id="email-entry" class="form-control" placeholder="Email or phone number" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" id="password-entry" class="form-control" placeholder="Password" required>
                        </div>
                        <button type="button" id="login-form-submit" class="btn btn-primary w-100">Log In</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <form>
                            <h2 class="mb-4 text-center text-light">Sign Up</h2>
                            <div class="mb-3">
                                <input id="email-entry" type="text" class="form-control" placeholder="Email or Phone Number" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" id="password-entry" class="form-control" placeholder="Password" required>
                            </div>
                            <button type="button" id="signup-form-btn" class="btn btn-primary w-100">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  ${nothing}
`
export const USER_PROFILE=`
<div class="container mt-5">
        <div class="card mx-auto" style="max-width: 600px;">
            <div class="card-header bg-dark text-white text-center">
                <h2>Bio</h2>
            </div>
            <div class="card-body text-center bg-dark text-light">
              <img id="profile-image" class="rounded-circle mb-3 img-loading-animation" alt="Profile Picture"> <button id="edit-profile" type="button" class="btn btn-primary"><i class="fas fa-pen"></i></button>
                <h4 id="username"></h4>
                <p class="text-muted" id="topics"></p>
                <p id="study-description">
                                </p>
                <hr>
                <div class="d-flex justify-content-between pt-2">
      <span>Focus Time(minutes)</span>
      <span id="user_streak" class="text-light"></span>
    </div>
    <hr>
      <button id="logout-btn" type="button" class="btn btn-danger">Logout</button>
    ${nothing}
`
export const STREAMS=`
<div class="card bg-dark h-100"id="studentOverview_streams">

      <div class="card-body bg-dark h-100" id="card_student"></div>
    </div>
    <div class="progress rounded-0" style="position:fixed;top:0;bottom:0;left:0;right:0;height:5px;">
                <div id="updatePageContent_streams" class= "progress-bar progress-bar-striped progress-bar-animated bg-success" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria_valuemax="100"></div>

        </div>
        <div>
       <nav class="w-100 overflow-scroll" aria-label="Pagination">
  <ul id="pagination-unit_streams" class="pagination pagination-sm justify-content-center">
  </ul>
</nav>
        </div>
        `
export const FAV_STREAMS=`
<div class="card bg-dark h-100" id="studentOverview_fav">

      <div class="card-body bg-dark h-100" id="card_student_fav"></div>
    </div>
    <div class="progress rounded-0" style="position:fixed;top:0;bottom:0;left:0;right:0;height:5px;">
                <div id="updatePageContent_fav" class= "progress-bar progress-bar-striped progress-bar-animated bg-success" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria_valuemax="100"></div>

        </div>
        <div>
       <nav class="w-100 overflow-scroll" aria-label="Pagination">
  <ul id="pagination-unit_fav" class="pagination pagination-sm justify-content-center">
  </ul>
</nav>
        </div>
        `
export const LEADERBOARD=`
<div id="leaderboard-parent"></div>
`
export const ABOUT=`
<div class="card">
          <div class="card-body">
            <h3 class="card-title">About StudyWindow Website</h3>
            <p class="card-text">
            <b>Our Mission: Empowering Students to Study Together</b>

            At StudyWindow, we understand the challenges that students face when studying alone. Our journey began during my high school years when I often found myself studying in isolation. I longed for a supportive environment where I could connect with fellow learners, but the resources available were limited. Internet data costs in my country made it difficult to access live study streams or join interactive platforms like Discord, which consumed too much data.

            Recognizing that many students share similar struggles, I envisioned creating a platform that serves as a "window" into the study habits of others. StudyWindow is designed to foster a sense of community among students, allowing them to feel connected and motivated while pursuing their academic goals.
            </p>
            <h5 class="card-title">
              What We Offer: A Unique Study Experience
            </h5>
            <p class="card-text">
            <b>Community Connection:</b> StudyWindow provides a virtual space where students can observe and engage with others who are studying. This connection helps alleviate the feeling of isolation and encourages a collaborative learning atmosphere.
<br>
<b>Personalized Study Channels:</b> Users will soon have the ability to select their favorite study channels, tailoring their experience to suit their preferences and study styles.
<br>
<b>Progress Tracking:</b> We are excited to introduce features that allow users to track their study progress and store their data securely for future reference. This will help students stay organized and motivated as they work towards their academic goals.
<br>
<b>Continuous Improvement: </b> We are committed to enhancing the StudyWindow experience. More features and functionalities are on the way, ensuring that our platform evolves to meet the needs of our users.
            </p>
          </div>
        </div>
        <footer class="bg-dark text-white text-center py-1">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h5>About Us</h5>
        <h4>StudyWindow</h4>
      </div>
      <div class="col-md-4">
        <h5>Contact</h5>
        <p>Email: johndelvin51@gmail.com</p>
        <p>Whatsapp/Phone: +256752541757</p>
      </div>
      <div class="col-md-4">
        <h5>Follow Us</h5>
        <i class="fab fa-github fa-2x"></i> <a href="https://github.com/John4650-hub" class="text-white me-2">Github</a>
      </div>
    </div>
    <div class="mt-3">
      <p>&copy; 2025 StudyWindow. All rights reserved.</p>
      <p>
        <a href="https://github.com/StudyWindow" class="text-white me-2">Free OpenSource</a>
      </p>
    </div>
  </div>
</footer>
`
export const EDIT_PROFILE=`
<div class="container mt-4">
        <h2>Edit Profile</h2>
        <form class="needs-validation" id="userForm" novalidate>
            <!-- Name Field -->
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name-entry" name="name" required>
            </div>

            <!-- Description Field -->
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description-entry" name="description" rows="3" required></textarea>
            </div>

            <!-- Topics Field -->
            <div class="mb-3">
                <label for="topics" class="form-label">Topics (comma-separated)</label>
                <input type="text" class="form-control" id="topics-entry" name="topics" required>
            </div>

            <!-- Image Upload Field -->
            <div class="mb-3">
                <label for="image" class="form-label">Profile Picture</label>
                <input type="file" class="form-control" id="image-upload" name="image" accept="image/*">
            </div>

            <!-- Submit Button -->
            <button type="submit" id="save-btn" class="btn btn-primary">Save Entries</button>
        </form>
    </div>
`
export const CONFIRM_EMAIL=`
<p>🎉 <strong>Thank you for signing up!</strong> To complete your registration, please check your email inbox for a confirmation email.</p>

        <p>📧 Inside the email, you will find a confirmation link. Click on this link to verify your account.</p>

        <p>🔒 Once your account is verified, return to the login page and log in using your email and password.</p>

        <p>❗ If you do not see the email in your inbox, please check your spam or junk folder.</p>

`
export const LOGIN_O_SIGNUP=`
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Access Restricted!</strong> To use the timer feature, please sign up or log in to your account.
</div>
`
