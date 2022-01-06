<div class="container-fluid">
	<div class="row justify-content-end padding-10" style="background-color: #5f5f5f;">
		<div class="top-nav"><a href="#" id="logoutbtn" class="nav-logout"><i class="fa fa-sign-out"></i> LOGOUT</a></div>
	</div>
		<div class="row">
			<div class="col-md-2" style="background-color: #5f5f5f;" id="side-bar">
				<p class="logo-area underline"><img width="40px" height="40px" src="media/logo.png">A A System</p>
				<?php include "teacher-menu.php"; ?>
			</div>
			<div class="col-md-10" style="left: 17%;">
				<?php 
					
					if(isset($_GET['section-id']))
					{
						$section = $_GET['section-id'];
						if($section == "create-course"){
							include "create-course.php";
						}
						elseif ($section=="assign-course") {
							include "assign-course.php";
						}
						elseif ($section=="all-course") {
							include "all-course.php";
						}
						elseif ($section=="create-teacher") {
							include "create-teacher.php";
						}
						elseif ($section=="all-teacher") {
							include "all-teacher.php";
						}
						elseif ($section=="t-profile") {
							include "main-dashboard.php";
						}
						elseif ($section=="t-all-courses") {
							include "t-all-courses.php";
						}
						elseif ($section=="t-assigned-courses") {
							//code...
						}
						elseif ($section=="generate-qr") {
							include "generateQR.php";
						}
						elseif ($section=="manual-attendance") {
							include "manual-attendance.php";
						}
						elseif ($section=="student-list") {
							include "student-list.php";
						}
						elseif ($section=="mainDashboard") {
							include "main-dashboard.php";
						}
					} else{
						include "main-dashboard.php";
					}
				?>
			</div>
		</div>
	</div>
</div>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-database.js"></script>
<script type="text/javascript" src="js/firebaseinit.js"></script>
<script type="text/javascript" src="js/auth.js"></script>
<script type="text/javascript" src="js/main.js"></script>