function findPrimes() {
	console.log('finding primes...');
	let a = Array(5).fill(1);
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
	let table = document.getElementById('primeTable');
	let row = document.createElement('tr');
	let cellNo=0;
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

	document.getElementById('numberOfPrimes').innerHTML=document.getElementById('primeTable').getElementsByTagName('td').length;
}




















	


