export const firstWhere = (items, key, value) => {
  const result = items.filter(item => item[key] === value)
  return result.length ? result[0] : null
}

export const initChannelAndEvents = (pusherInstance, channelName, eventActionBindings) => {
  if (!pusherInstance) {
    return
  }

  let channel = pusherInstance.channel(channelName)

  if (!channel) {
    channel = pusherInstance.subscribe(channelName)
  }

  eventActionBindings.map(
    binding => channel.bind(
      binding.event,
      data => binding.handler(data)
    )
  )
}

export const regulateText = (text, max = 3) => {
  const number = parseInt(text)

  if (number && number > 99) {
    return '99+'
  }

  if (isNaN(number) && text?.length > max) {
    return `${text.slice(0, max)}...`
  }

  return text
}

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line no-mixed-operators
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const hideAlert = (alert) => {
  alert?.classList.add('alertSlideAndFadeOut')
}

export const uniqueByKey = (arr, key) => [
  ...new Map(arr.map(item => [item[key], item])).values()
];

export const addingIntegersInCpp = `
#include <iostream>
using namespace std;

int main() {

  int first_number, second_number, sum;
    
  cin >> first_number >> second_number;
  cout << first_number;
  cout << '\\n';
  cout << second_number;
  cout << '\\n';
  sum = first_number + second_number;

  cout << sum;     

  return 0;
}
`
