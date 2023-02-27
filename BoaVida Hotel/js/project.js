document.getElementById('formulario').addEventListener('submit',registarCliente);

function registarCliente(e){
	var nomeCliente=document.getElementById('nomeCliente').value;
	var email=document.getElementById('email').value;
	var tipoAlojamento=document.getElementById('tipoAlojamento').value;
	var horaEntrada = new Date();
	
	if(!nomeCliente || !email || !tipoAlojamento){
		alert("Preencha todos os campos!");
		return false;
	}
	
	var hotel={
		nome: nomeCliente,
		email: email,
		tipoAlojamento: tipoAlojamento,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes()
	};
	
	if(localStorage.getItem('estadia') === null){
		var hoteis = [];
		hoteis.push(hotel);
		localStorage.setItem('estadia',JSON.stringify(hoteis));
	}
	else{
		var hoteis=JSON.parse(localStorage.getItem('estadia'));
		hoteis.push(hotel);
		localStorage.setItem('estadia',JSON.stringify(hoteis));
	}
	
	document.getElementById('formulario').reset();
	mostraClientes();
	e.preventDefault();
}

function mostraClientes(){
	var hoteis=JSON.parse(localStorage.getItem('estadia'));
	var clientesResultado=document.getElementById('resultados');
	
	clientesResultado.innerHTML='';

    for (var i=0;i<hoteis.length;i++){
		var nome=hoteis[i].nome;
		var email=hoteis[i].email;
		var alojamento=hoteis[i].alojamento;
		var hora=hoteis[i].hora;
		var minutos=hoteis[i].minutos;

		clientesResultado.innerHTML+='<tr><td>'+nome+'</td>'+
		'<td>'+email+'</td>'+
		'<td>'+tipoAlojamento+
		'<td>'+hora+':'+minutos+'</td><td><button onclick="saidaHotel(\''+tipoAlojamento+'\')" class="btn btn-danger">RemoverEstadia</button></td></tr>';

	}		
	
}

function saidaHotel(tipoAlojamento){
	var hoteis=JSON.parse(localStorage.getItem('estadia'));
	console.log(hoteis);

	// ciclo para percorer os items do ARRAY
	for(var i=0;i<hoteis.length;i++){
		if(hoteis[i].tipoAlojamento==tipoAlojamento){
			var horaAtual=new Date();
			var entrada=hoteis[i].hora*60+hoteis[i].minutos;
			var saida=horaAtual.getHours()*60+horaAtual.getMinutes();
			var pagar=(saida-entrada)*0.01;
			hoteis.splice(i,1);
			alert("O valor a pagar da sua estadia, com base no tipo de alojamento é de :"+pagar.toFixed(2));
		}
	}
	localStorage.setItem('estadia',JSON.stringify(hoteis));
	mostraClientes();
}

//o botao remover decidiu nao dar, a pouco quando falei consigo formador, ele estava a dar.
















