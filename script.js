//const api_url = "<heroku_app_url>"
const api_url= "https://esdgrp19.herokuapp.com/user"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].username}</td>`;
		table_data += `<td>${records[i].email}</td>`;
		table_data += `<td>${records[i].eventtype}</td>`;
		table_data += `<td>${records[i].eventdescription}</td>`;
		table_data += `<td>${records[i].pay}</td>`;
		table_data += `<td>${records[i].attendies}</td>`;
		table_data += `<td>${records[i].date}</td>`;


		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => {
		console.table(data);
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => {

		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("username").value = data.username;
		document.getElementById("email").value = data.email;
		document.getElementById("eventtype").value = data.eventtype;
		document.getElementById("eventdescription").value = data.eventdescription;
		document.getElementById("pay").value = data.pay;
		document.getElementById("attendies").value = data.attendies;
		document.getElementById("date").value = data.date;
	})
}


function postData() {
	var username = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var eventtype = document.getElementById("eventtype").value;
	var eventdescription = document.getElementById("eventdescription").value;
	var pay = document.getElementById("pay").value;
	var attendies = document.getElementById("attendies").value;
	var date = document.getElementById("date").value;


	data = {username: username, email:email, eventtype:eventtype,eventdescription:eventdescription,pay:pay, attendies:attendies,date:date};

	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		window.location.href = "index.html";
	})
}


function putData() {

	var _id = document.getElementById("id").value;
	var username = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var eventtype = document.getElementById("eventtype").value;
	var eventdescription = document.getElementById("eventdescription").value;
	var pay = document.getElementById("pay").value;
	var attendies = document.getElementById("attendies").value;
	var date = document.getElementById("date").value;


	data = {_id: _id,username: username, email:email, eventtype:eventtype,eventdescription:eventdescription,pay:pay, attendies:attendies,date:date};

	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => {
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			window.location.reload();
		})
	}
}
