import day1 from './day1';
DisplayResolution(day1);
import day2 from './day2';
DisplayResolution(day2);

import day3 from './day3';
DisplayResolution(day3);

import day4 from './day4';
DisplayResolution(day4);

import day5 from './day5';
DisplayResolution(day5);

function DisplayResolution(day: () => void) {
  console.log('\n=================');
  console.log('DISPLAYING RESPONSE');
  day();
  console.log('=================\n');
}
