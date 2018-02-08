#include <vector>
#include <cmath>
#include <iostream>


void findPrimes(std::vector<short unsigned int>& primes,int amount)
{
	primes = std::vector<short unsigned int>(amount,1);
	primes[0]=primes[1]=0;

	size_t endCond=std::sqrt(amount);

	for(size_t i=2;i<endCond;++i) 
	{
	if(primes[i]==0)	// if a==0
		continue;
	for(int l=i*2,factor=3; l<amount;l=(++factor)*i)
		primes[l]=0;
	}
}

void printPrimes(std::vector<short unsigned int> primes)
{
	int primeNo=0;
	int amount = primes.size();
	for(int i=0;i<amount;++i)
	{
		if(primes[i]==1)
		{
			++primeNo;
			//if((++primeNo)%10==0)
				//std::cout << '\n';
			//std::cout << i << ' ';
		}
	}
	

	std::cout << '\n' << "Number of primes: " << primeNo << std::endl;
}



int main(int argc,char** argv)
{
	std::vector<short unsigned int>primes;
	findPrimes(primes,std::stoi(argv[1]));
	printPrimes(primes);
	return 0;
}