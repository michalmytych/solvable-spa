export const firstWhere = (items, key, value) => {
  const result = items.filter(item => item[key] === value)
  return result.length ? result[0] : null
}

export const addingIntegersInCpp = `
#include <iostream>
using namespace std;

int main() {

  int first_number, second_number, sum;
    
  cout << "Enter two integers: ";
  cin >> first_number >> second_number;
  sum = first_number + second_number;

  cout << first_number << " + " <<  second_number << " = " << sum;     

  return 0;
}
`
