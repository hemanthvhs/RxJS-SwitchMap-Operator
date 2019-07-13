import {of,from} from 'rxjs'
import {switchAll,switchMap,map,delay} from 'rxjs/operators'

const getnewdata = (param) => {
  return of("The returned Data" + param)
  .pipe( delay(1000))
}

const source$ = from([1,2,3])

//using regular map 

source$.pipe(
  map( num => getnewdata(num))
).subscribe( res => {
  res.subscribe( val => console.log(val))
})

// using map and switchAll
source$.pipe(
  map( num => getnewdata(num)),
  switchAll()
).subscribe(val => console.log(val))

// using switchMap
source$.pipe(
  switchMap( num => getnewdata(num))
).subscribe(val => console.log(val))


/* NOTE 

If you remove the delay from the inner observable then you dont see the switchMap functionality. In the sense , for example  outer observable emits 1st value '1' & now inner observable returned the value (The returned data1) before outer observable emission of next value '2'. So, before emission of next value subscription is completed which leads to mapping of every value of outer observable to inner observable.

                CHECK  BY REMOVING THE DELAY IN THE CODE

*/

/*

SwitchMap has similar behaviour (mergeMap) in that it will also subscribe to the inner Observable for you.

However switchMap is a combination of switchAll and map. 
SwitchAll cancels the previous subscription and subscribes to the new one.

For our scenario where we want to do an API call for each item in the array of the ‘outer’ Observable, switchMap does not work well as it will cancel the first 3 subscriptions and only deals with the last one. This means we will get only one result. 


*/

