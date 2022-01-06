<div class="sidenav">
  <a href="dashboard.php?section-id=mainDashboard" class="">Dashboard</a>
  <button class="dropdown-btn"><i class="fa fa-sticky-note left-icon"></i> Courses
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <button class="dropdown-btn"><i class="fa fa-sticky-note left-icon"></i>Computer Vision
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="dashboard.php?section-id=generate-qr">Generate QRcode</a>
     <a href="dashboard.php?section-id=student-list">student list</a>
     <a href="dashboard.php?section-id=manual-attendance">Manual Attendance</a>
  </div>
  <button class="dropdown-btn"><i class="fa fa-sticky-note left-icon"></i>Data Science
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="dashboard.php?section-id=generate-qr">Generate QRcode</a>
     <a href="dashboard.php?section-id=student-list">student list</a>
     <a href="dashboard.php?section-id=manual-attendance">Manual Attendance</a>
  </div>
  <button class="dropdown-btn"><i class="fa fa-sticky-note left-icon"></i>Artifical Inteligence
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="dashboard.php?section-id=generate-qr">Generate QRcode</a>
     <a href="dashboard.php?section-id=student-list">student list</a>
     <a href="dashboard.php?section-id=manual-attendance">Manual Attendance</a>
  </div>
</div>  
</div>


<script type="text/javascript">
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
</script>