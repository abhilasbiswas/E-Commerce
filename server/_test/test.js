import CryptoJS from 'crypto-js';
import md5 from 'md5';

var data = CryptoJS.SHA256("Teszxdfsdt3");
// console.log(md5("text"));

const password = Math.random().toString(36).slice(2, 10);
// console.log(password);

const date = new Date();
console.log(md5(md5(date)+password));