var titleForm = 'Login',
	titleTag = document.getElementById('titleForm'),
	inputUsername= document.getElementById('user'),
    inputPassword= document.getElementById('password'),
    inputAdmin= document.getElementById('admin'),
    userError= document.getElementById('userError'),
    passError= document.getElementById('passError'),
    submitForm= document.getElementById('formSubmit'),
    infoForm= document.getElementById('infoForm'),
    infoUser= document.getElementById('infoUser'),
    btnSignOut= document.getElementById('btnSignOut'),
    avatar= document.getElementById('avatar'),
    content= document.getElementById('content'),
    bodyTag = document.getElementById('Login'),
    slide = document.getElementById('slide'),
    comicsObj = document.getElementById('comics'),
    tagSelect = document.getElementById('tagSelect'),
    firstLogin = true,
    userOk = false,
    passOk = false,
    objUsers,
    users = localStorage.getItem("users") || "",
    userArray = users?JSON.parse(users):[],
    admin;

	if (localStorage.getItem('userLogued')){
		logued();
	}

	showComics();

	//console.log(JSON.parse(users));

function btnLogin() {
	titleForm = 'Login';
	titleTag.innerHTML = titleForm;
	bodyTag.id = titleForm;
	submitForm.value = 'Sign In';
	infoForm.innerHTML = '';
	resetErrors();
}

function btnRegister() {
	titleForm = 'Register';
	titleTag.innerHTML = titleForm;
	bodyTag.id = titleForm;
	submitForm.value = 'Sign Up';
	infoForm.innerHTML = '';
	resetErrors()
}

function formAccess(event) {
	event.preventDefault();
	var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=",
		check = function(string){
		 	for(i = 0; i < specialChars.length;i++){
			    if(string.indexOf(specialChars[i]) > -1){
			       	return true
		    	}
			}
			return false;
		};
	
	//Validation Username
	if (inputUsername.value.length == 0) {
		userError.innerHTML = 'Username requier';
	} else if(check(inputUsername.value) == true) {
		userError.innerHTML = 'Username has special character';
	} else {
		userError.innerHTML = '';
		userOk = true;
	}

	//Validation Password
	if (inputPassword.value.length == 0) {
		passError.innerHTML = 'Password requier';
	} else if(inputPassword.value.length < 7) {
		passError.innerHTML = 'Very short';
	} else if(check(inputPassword.value) == true) {
		passError.innerHTML = 'Password has special character';
	} else {
		passError.innerHTML = '';
		passOk = true;
	}

	if (userOk && passOk) {
		//Register function
		if (titleForm === 'Register'){
			/*userArray.forEach(function(entry) {
				if (inputUsername.value == entry.username) {
					passError.innerHTML = 'This username already exist';
					throw breakFor;
				} else {
					objUsers = {"username":inputUsername.value, "password":inputPassword.value, "admin":inputAdmin.checked};
		    		userArray.push(objUsers);
		    		localStorage.setItem("users", JSON.stringify(userArray));
		    		infoForm.innerHTML = 'The user has been created successfully';
		    	}
	    	});*/
			objUsers = {"username":inputUsername.value, "password":inputPassword.value, "admin":inputAdmin.checked};
			userArray.push(objUsers);
			localStorage.setItem("users", JSON.stringify(userArray));
			infoForm.innerHTML = 'The user has been created successfully';
		} 
		//Login function
		else {
			var userPassOk = false;

			userArray.forEach(function(entry) {
				if(inputUsername.value === entry.username && inputPassword.value === entry.password){
					userPassOk = true;
				} else {
					userPassOk = false;
				}

				if(userPassOk) {
					passError.innerHTML = '';
					localStorage.setItem("userLogued", entry.username);
					localStorage.setItem("admin", entry.admin);
					logued();
				} else {
					userError.innerHTML = '';
					passError.innerHTML = 'Incorrect user or password';
				}
			});
		}
	}
}

function resetErrors() {
	userError.innerHTML = '';
	passError.innerHTML = '';
}

function logued() {
	(localStorage.getItem('admin')=="true") ? admin = true : admin = false;

	infoUser.innerHTML = 'Welcome ' + localStorage.getItem('userLogued');
	btnSignOut.innerHTML = 'Sign Out';
	bodyTag.id = 'logued';

	if (admin){
		avatar.src = 'images/avatar.png';
		content.id = 'adminContent';
	} else {
		avatar.src = 'images/register.png';
	}

	if (firstLogin) {
		showContent();
		firstLogin = false;
	}
}

function signOut() {
	localStorage.removeItem('userLogued');
	localStorage.removeItem('admin');
	infoUser.innerHTML = '';
	btnSignOut.innerHTML = '';
	bodyTag.id = titleForm;
	content.id = 'content';
	resetErrors();
}

function showContent(){
	advertising.forEach(function(item, id) {
		var itemSlide = document.createElement("div");
		itemSlide.id = 'item-slide-'+id;
		itemSlide.className = 'item-slide';
		slide.appendChild(itemSlide);
		document.getElementById('item-slide-'+id).innerHTML = '<img src="'+item.imgSrc+'" title="item.title">';
	});
}

function showComics(){
	comics.forEach(function(item, id) {
		var itemComic = document.createElement("div");

		itemComic.id = 'item-comic-'+id;
		itemComic.className = 'item-comic '+ item.tags;
		comicsObj.appendChild(itemComic);
		document.getElementById('item-comic-'+id).innerHTML = 
		'<a id="modal-1" onclick="openComic('+id+')"><h3>'+item.title+'</h3><img src="'+item.imgSrc+'"title="'+item.title+'"><div class="description-comic"><div><b>Publish: </b>'+item.date+'</div><div><b>Writer: </b>'+item.writer+'</div><div><b>Artist: </b>'+item.artist+'</div></div></a>';
	});
}

function filter(){
	if (tagSelect.value != 'all') {
		comicsObj.className = tagSelect.value + ' filtered';
	} else {
		comicsObj.className = '';
	}
}

function openComic(id) {
	var thisComic = comics[id];

	Modal.open({
		content: '<img class="coverPopup" src="'+thisComic.imgSrc+'"title="'+thisComic.title+'"><div class="description-comic descriptionPopup"><h3 class="titlePopup">'+thisComic.title+'</h3><div><b>Publish: </b>'+thisComic.date+'</div><div><b>Writer: </b>'+thisComic.writer+'</div><div><b>Artist: </b>'+thisComic.artist+'</div><p class="descriptiontextPopup"><b>Description: </b>'+thisComic.description+'</p></div>',
		draggable: true
	});
}
