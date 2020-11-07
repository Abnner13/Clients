import myapi from '/Repository/Api.js';

window.onload = initPage;
const button = document.getElementById('Acao').onclick = sendFormData

async function initPage(){
	const clients = await GetAll( )
	console.log(clients)
	show(clients)
}


async function sendFormData(event) {
	const dataForm = getFormData( )
	await CreateClient(dataForm)
}

function getFormData() {
	const _firstName = document.getElementById('firstName').value
	const _lastName = document.getElementById('lastName').value
	const _phoneNumber = document.getElementById('phoneNumber').value
	const _email = document.getElementById('email').value
	const _password = document.getElementById('password').value

	const data = {
		firstName: _firstName,
		lastName: _lastName,
		phoneNumber: _phoneNumber,
		email: _email,
		password: _password
	}
	return JSON.stringify(data)
}

function show(clients) {
	const myDiv = createDiv()
	const idSpan = document.createElement('span')
	const nameLi = document.createElement('li')
	let elements = [];
	debugger

	for (let client of clients) {
		idSpan.innerHTML = client.id
		nameLi.innerHTML = client.firstName
		nameLi.prepend(idSpan)
		nameLi.append(myDiv)
		elements.push(nameLi)
	}
	for(let li of elements) {
		document.querySelector('#UlList').append(li)
	}
}

function createDiv() {
	const imgPen = document.createElement('img')
	imgPen.setAttribute('src', 'assets/lapis.svg')

	const imgLixo = document.createElement('img')
	imgLixo.setAttribute('src', 'assets/lixeira.svg')

	const divAttr = document.createElement('div')
	divAttr.append(imgPen, imgLixo)
	return divAttr
}

async function GetAll(event) {
	try {
		const response = await myapi.get('/Clients')
		return response.data
	} catch (error) {
		console.error(error)
	}
}

async function CreateClient(dataClient) {
	try {
		const response = await myapi.post('/Clients', dataClient, { headers: { "Content-type": "application/json"} })
		console.log(response)
	} catch (error) {	
		console.error(error)
	}
}

