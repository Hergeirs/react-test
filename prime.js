function checkIfArrayIsUnique(myArray) {
	return myArray.length === new Set(myArray).size;
  }

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
	let cells = [...table.getElementsByTagName('td')]; 
	let primes = [];
	
	for(let i=0; i<cells.length;++i)
		primes.push(cells[i].innerHTML);
	console.log(primes);
	
	document.getElementById('numberOfPrimes').innerHTML=table.getElementsByTagName('td').length+" unique: " + checkIfArrayIsUnique(primes);
}

function testForPrimality(toTest) {
	let endCond=Math.floor(Math.sqrt(toTest));
	let a = Array(endCond).fill(1);
	a[0]=a[1]=0;
	if(toTest%2===0) {
		return false;
	} 
	for(let i=2;i<endCond;++i) {
		if(a[i]===0)	// if a==0
			continue;
		for(let l=i*2,factor=3; l<a.length;l=(++factor)*i) {
			if(l==toTest)
				return false;
			a[l]=0;
		}
	}
	return true;
}




















	


