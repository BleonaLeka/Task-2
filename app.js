const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const hostname = '127.0.0.1';
const port = 8080;


// const server = http.createServer((req,res) => {
//     res.statusCode = 200;
//     res.end('Hello World');
// });

app.get('/', (req,res) => {
    res.end("Running...")
})
function implementLogic(minNumber,maxNumber,feature){
    var response = []
    // If min munber taken from body is 0 or less we return a message
    if(minNumber <= 0)
        return "Min number must be greater than 0";
    // if there is no options in feature array taken from body we return a message
    else if(feature.length == 0){
        return "Feature array is empty";
    } 
    //here we go to implementation
    else{
        if(feature.includes("palindrome")){
            response.push(
                palindromeNumbers(minNumber,maxNumber)
            )
        } 
        if(feature.includes("prime")){
            response.push(
                prime(minNumber,maxNumber)
            )
        } 
        
        if(feature.includes("prime") && feature.includes("palindrome")){
            response.push(
                primeAndPalindrome(response[0],response[1])
            )
        }

        return response;
    }
}

 isPalindrome = (num) => {
    var numString = num.toString();
    return numString.split("").reverse().join("") == numString;
}


 palindromeNumbers = (min,max) => {
    let palindrome = []
    let i;
    for (i = min; i <= max; i++)
        if(isPalindrome(i)){
            console.log(i);
            palindrome.push(i)
        }   
    return palindrome;
 };

 prime = (lowerNumber,higherNumber) => {
    primes = [];
    for (let i = lowerNumber; i <= higherNumber; i++) {
        let flag = 0;
            for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }
            if (i > 1 && flag == 0) {
            primes.push(i)
        }
    }
    return primes
 }

 primeAndPalindrome = (palindrome,prime) => {
    return  palindrome.filter(value => prime.includes(value));
 }
// Creating a post request and test in postman
app.post('/post/', (req,res) => {
    res.send(implementLogic(req.body.minNumber,req.body.maxNumber,req.body.feature)) 
})


app.listen(port, hostname), () => {
    console.log("Server is run and listening to port", port);
}