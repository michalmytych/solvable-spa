import Pusher from "pusher-js"

export const firstWhere = (items, key, value) => {
  const result = items.filter(item => item[key] === value)
  return result.length ? result[0] : null
}

export const initChannel = (channelName, onReceived) => {
  const pusher = new Pusher('d1bdabed3a3f56fe70ec', {
    cluster: 'eu',
    encrypted: true
  })
  const channel = pusher.subscribe(channelName)
  channel.bind(
    'executed-new-solution-test',
    data => onReceived(data),
    channel.unbind()
  )
}

export const uniqueByKey = (arr, key) => [
  ...new Map(arr.map(item => [item[key], item])).values()
];

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
