<div class="sidenav">
  <button class="dropdown-btn"><i class="fa fa-book left-icon"></i> Courses
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="dashboard?section-id=create-course">Create Course</a>
    <a href="dashboard?section-id=assign-course">Assign Course</a>
    <a href="dashboard?section-id=all-course">All Courses</a>
  </div>
  <button class="dropdown-btn"><i class="fa fa-users left-icon"></i> Teachers
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="dashboard?section-id=t-profile">Profile</a>
    <a href="dashboard?section-id=create-teacher">Create Teacher</a>
    <a href="dashboard?section-id=all-teacher">All Teachers</a>
  </div>
  <a href="#about"><i class="fa fa-question-circle left-icon"></i> Queries</a>
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