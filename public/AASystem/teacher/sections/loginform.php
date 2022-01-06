<div class="container-fluid">
		<div class="row justify-content-center">
			<div class="card text-center margin-top-10" >
			  <div class="card-header">
			    <h4>Automated Attendance System</h4>
			  </div>
			  <div class="card-body">
			    <center><img src="media/logo.png" width="80px" height="80px" class="mb-4"></center>
			    <form id="signin-form">
				  <div class="form-group">
				    <input type="text" class="form-control" id="signin-email" aria-describedby="emailHelp" placeholder="Enter Id">
				  </div>
				  <div class="form-group">
				    <input type="password" class="form-control" id="signin-password" placeholder="Password">
				  </div>
				  <button type="submit" class="form-control btn btn-dark">LOGIN</button>
				</form>
			  </div>
			</div>
		</div>
	</div>
		<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-auth.js"></script>
	<script type="text/javascript" src="js/firebaseinit.js"></script>
	<script type="text/javascript">
		//sign in form

		const signinForm = document.querySelector('#signin-form');
		signinForm.addEventListener('submit', (e) => {
			e.preventDefault();

			//getting user info
			const email = signinForm['signin-email'].value;
			const password = signinForm['signin-password'].value;

			auth.signInWithEmailAndPassword(email,password).then(cred => {
				window.location.replace("dashboard");
			}).catch(function(error){
				var errorMessage = error.message;
				alert(errorMessage);
			});
		});
	</script>