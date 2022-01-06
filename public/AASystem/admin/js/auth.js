
//checking if the user is already signed in
auth.onAuthStateChanged(function(user) {
		if (user) {
		  // User is signed in.
			var userId = user.id;
			//alert(user.uid);
		}else{
		  window.location.replace("index");
	  	}
});

var cUser = firebase.auth().currentUser;
var userId = "abc";
if(cUser){
	userId = cUser.uid;
}else{
	userId = null;
}

//logout
const logout = document.querySelector('#logout');
	logout.addEventListener('click', (e) => {
	e.preventDefault();
		auth.signOut().then(()=>{
			window.location.replace("index");
		});
	});



//getting logged in teacher data
alert(userId);
var ref = db.ref('teachers/'+userId);
ref.on('value', gotData, errData);

//call back function for teachers data when recieved
function gotData(data){
	
	console.log(data);
}

//call back for error on teachers data
function errData(err){
	console.log('ERROR!');
	console.log(err);
}



