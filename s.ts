

//      FILTER, MAP, REDUCE
// const testsResults = [
//     { name: 'login', status: 'pass', duration: 30 },
//     { name: 'Reset', status: 'fail', duration: 20 },
//     { name: 'logout', status: 'pass', duration: 10 },
// ];

import { error } from "node:console";

// //find all failed tests
// const failedTests = testsResults.filter((test) => {
//     return test.status === 'fail';
// })

// //find names of failed tests
// const failedTestNames = testsResults.filter((test) => test.status === 'fail').map((test) => test.name);


// //find total duration
// const totalDuration = testsResults.reduce((total, test) => {
//     total = total + test.duration;
//     return total;
// }, 0);

// //find total duration by status
// const durationByStatus = testsResults.reduce((countsArr, test) => {
//     countsArr[test.status] = (countsArr[test.status] || 0) + test.duration;
//     return countsArr;
// }, {[]});

// console.log(totalDuration);

//----
// let scores: number[] = [10, 20, 30]; //explict
// let results: [string, number] = ['type', 10]; //implicit. // Tuple

//      ENUMS
// enum Status {
//     Active,
//     Inactive,
//     Pending
// }

// const curStatus: Status = Status.Active;

// //----
// //      TYPE ALIAS
// type userId = number | string; //
// type userName = string;
// type arr = number[];

// //object type
// type Emp = {
//     id: userId;
//     name: userName;
//     age: number;
// }

// const user : Emp = {
//     id: 123,
//     name: 'ram',
//     age: 12,
// }

// //      INTERFACES
// interface Person {
//     id: number;
//     name: userName;
//     age: number;
// }
// ----

//    THIS
// const obj = {
//     name: 'raj',
//     regular: function () { console.log(this.name); },
//     arrow: () => { console.log(this.name); }
// };

// obj.regular();
// obj.arrow();

// --
//  DESTRUCTURING
// const user = { uname: 'Alice', role: 'admin', password: 'secret' };
// const { uname, role } = user;
// // const { password } = user;

// const { password, ...hello } = user;
// console.log(hello);

//---
// REDUCE
// retry<T>(fn: () => Promise<T>, times: number): Promise<T>

// async function flakResolve<T>(fn: () => Promise<T>, times: number): Promise<T> {
//     let result: T | undefined;
//     for (let i = 0; i < times; i++) {
//         try {
//             result = await fn();
//             return result;
//         } catch (err) {
//             if (i === times - 1) {
//                 console.log(`${i}} attempts done. exiting`);
//                 throw err;
//             } else {
//                 console.log(`attempt ${i} failed. Retrying`);
//             }
//         }
//     }
//     throw result;
// }