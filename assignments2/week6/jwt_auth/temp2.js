

let count = 0
outerLoop  : for (let i = 0; i < 10; i++){
    for (let j = 0; j < 5; j++){
        console.log("hi" , ++count);
        if (count === 30) { 
            break outerLoop
        }
    }
}