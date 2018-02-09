function findPrimes() {
	console.log('finding primes...');
	let amount = document.getElementById('numberOfPrimesInput');
	amount = parseInt(amount.value);
	console.log(amount);
	let a = Array(amount).fill(1);
	a[0]=a[1]=0;

	let endCond=Math.sqrt(a.length);

	for(let i=2;i<endCond;++i) {
		if(a[i]==0)	// if a==0
			continue;
		for(let l=i*2,factor=3; l<a.length;l=(++factor)*i)
			a[l]=0;
	}
	fillPrimeTable(a);
}

function fillPrimeTable(a) {
	
	let table = document.createElement('table');
	table.id='primeTable';
	let row = document.createElement('tr');
	let cellNo=-1;
	for(let i = 0; i<a.length;++i){
		if(a[i])
		{
			if(++cellNo%10==0) {
				table.appendChild(row);
				row = document.createElement('tr');
			}
			let cell = document.createElement('td');
			cell.innerHTML=i;
			row.appendChild(cell);			
		}
	}
	table.appendChild(row);

	let oldTable = document.getElementById('primeTable');
	console.log(oldTable);
	oldTable.parentElement.replaceChild(table,oldTable);

	document.getElementById('numberOfPrimes').innerHTML=table.getElementsByTagName('td').length;
}




















	


