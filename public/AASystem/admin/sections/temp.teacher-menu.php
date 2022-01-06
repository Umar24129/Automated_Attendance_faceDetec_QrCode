<div class="sidenav">
  <button class="dropdown-btn"><i class="fa fa-sticky-note left-icon"></i> Courses
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <button class="dropdown-btn"><i class="fa fa-sticky-note left-icon"></i>Physics
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="dashboard.php?section-id=generate-qr">Generate QRcode</a>
     <a href="dashboard.php?section-id=student-list">student list</a>
     <a href="dashboard.php?section-id=manual-attendance">Manual Attendance</a>
   <a href="dashboard.php?section-id=manual-attendance">Course Attendance</a>
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