const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

fs.readFile('text-file.txt', () => {
  console.log('i/0 finsined');
  console.log('-------------------');
  setTimeout(() => console.log('timer 2 finished'), 0);
  setTimeout(() => console.log('timer 3 finished'), 3000);
  setImmediate(() => console.log('the immediate one finished'));

  process.nextTick(() => console.log('process.nextTick'));

  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });
});
console.log('hello from the top!');
