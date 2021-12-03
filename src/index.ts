import day1 from './day1';
DisplayResolution(day1);
import day2 from './day2';
DisplayResolution(day2);

import day3 from './day3';
DisplayResolution(day3);

function DisplayResolution(day: () => void) {
  console.log('\n=================');
  console.log('DISPLAYING RESPONSE');
  day();
  console.log('=================\n');
}
