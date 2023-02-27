//I'm going to make 3 different functions at a minimum
// I was thinking about using a random number generator to pick which algorythm to use to remove numbers as 
// well as an algorythm that pays attention to blocks and where numbers are to prevent an estranged disbalance
//to sum up my sudo code
// sudPuzAlgo(){
    //blockselector (picks blocks based on a random algorithym that also pays attention to amounts of numbers left)
    //logical solver algorithym (removes one number based on a percentage based random choice (aka, 
    //the final pieces of the sudoku puzzle always involve alogrithym 1, what number is left so the first 10 ish pieces will be removed by this algo)
    // after the iterator of blocks removed hits a certain amount it'll start using the second algorithym (mixed in with the first)
    // to determine which blocks to remove and then the third algorithym (the most complicated for sure)
    // easy mode (43 blocks removed) 10 : algo 1(100%), 10-20 algo 1(30%)algo2 (70%), 20-43 algo2(90%) algo3(10%)
    //
    //(in the specific block), analyzes it for valid logic)

//}


const {squareAssess} = require ('../assess/SquareAssess')

const sudPuzAlgo =(gridArray)=>{
    //have to parse the array into a string and back so that it's not assigned by reference. 
    let arrayGrid = JSON.parse(JSON.stringify(gridArray));
    let numberOfBlocksRemoved = 0;
    let easy = 43;
    let medium =52;
    let hard = 57;
    let rowRemoved = []
    let modeValue = easy;
    let currentRowNum =0;
    let deleteArray = [0,1,2,3,4,5,6,7,8]

    //this logic is passing the gridArray into the row selector finding a location and returning a row
    //the literally impossible chance of hitting a 9 exactly prevented
    let rowStep =0
    while(numberOfBlocksRemoved < easy){
        

        //remove 1 from each row  (9)
        // this code works because the memory space for gridArray and rowRemoved = gridArray[rowStep] is the same 
        if(arrayGrid != undefined && rowStep <9){
            let random = Math.floor(Math.random()*deleteArray.length)
            rowRemoved = arrayGrid[rowStep];
            rowStep +=1
            //pull a row and the replace one spot with an X
            rowRemoved[deleteArray[random]] = "X"
            deleteArray.splice(random,1)
            numberOfBlocksRemoved ++;
        }else if(numberOfBlocksRemoved <easy){
            //much code such wow
            let numPickedRow = rowSelector(arrayGrid)
            // console.log(numPickedRow)
            let indexArray = validIndex(arrayGrid[numPickedRow])
            let randomIndexColumn = indexArray[Math.floor(Math.random()*indexArray.length)]
            // console.log('row ', numPickedRow, ' column ' , randomIndexColumn)
            let isValid = squareAssess(arrayGrid, numPickedRow, randomIndexColumn);
            
            numberOfBlocksRemoved += 1
        }else {
            numberOfBlocksRemoved += 1
            
        }   
        // console.log("number of blocks removed ", numberOfBlocksRemoved)
    }
    return arrayGrid
}

const rowSelector = (arrayGrid)=>{
    //return an array from 0-8 telling us how many numbers (unhidden) are in each row ()
    //then determine which row should be pulled from. with a math.random, 
    //a higher chance of rerolling if the number
    // is below certain thresholds
    let rowArray = [0,0,0,0,0,0,0,0,0]
    for(let row = 0; row<9; row++){
        for(let column=0; column<9; column++){
            if(arrayGrid[row][column] != 'x' && arrayGrid[row][column] != 'X'){
                rowArray[row] = rowArray[row]+1
            }
        }
    }
    if(rowArray != undefined){
        let rowIndex = pickingAlgo(rowArray)
        return rowIndex
    }else{ rowSelector(arrayGrid)}
    // console.log(rowIndex)
    //if the selected row is above rounded value, set the index and return it
    
}

 //return valid index numbers for a random algo to shuffle through that are all valid because they are not 'X'
const validIndex = (rowArray) =>{
    let indexArray = [];
    for(let i = 0; i<rowArray.length; i++){
        if(rowArray[i] != 'x' && rowArray[i] != 'X'){
            indexArray.push(i)
        }
    }
    return indexArray
}


//picking algo needs to recieve information about the number of empty spots on the grid (what a dangerous function, it has so much recursion it could destroy you.)
const pickingAlgo = (rowArray)=>{
    let arrayMean = meanOfArray(rowArray)
    let binary = false;
    if(binary == true){
        return rowArray
    }
    //picks a random location 
    // console.log("row array", rowArray);
    let rowSelect = Math.floor(Math.random()*8.9999999);
    let rowIndex = rowSelect
    if(rowArray[rowSelect] >= arrayMean ){
        // console.log(rowIndex, "row index, ", arrayMean, " array mean", )
        binary = true;
        return rowIndex
    }else if(rowArray[rowSelect] < arrayMean ){
        let rowReset = Math.random()
        //if selected row is less than the mean of the other rows then 20 percent reroll
        if(rowReset < .2){
            rowIndex= pickingAlgo(rowArray)
        }else if(rowArray[rowSelect]< arrayMean ){
            // console.log(rowArray[rowSelect], ' row array at row select')
            rowIndex= pickingAlgo(rowArray)
        }else{
            binary = true
            return rowIndex
        }
    }
    return rowIndex
}


const meanOfArray = (rowArray) =>{
    const initialValue = 0;
    let roundedValue = 8;
    if(rowArray){
        roundedValue = Math.round(rowArray.reduce((accumulator, currentValue)=>
        accumulator + currentValue, initialValue
        )/9)
    }
    
    // console.log("rounded value", roundedValue);
    return roundedValue
}

// ░░░░░░░░░▄░░░░░░░░░░░░░░▄░░░░
// ░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌░░░
// ░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐░░░
// ░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐░░░
// ░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐░░░
// ░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌░░░ 
// ░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌░░
// ░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐░░
// ░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌░
// ░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌░
// ▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐░
// ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
// ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐░
// ░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌░
// ░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐░░
// ░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌░░
// ░░░░▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀░░░
// ░░░░░░▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀░░░░░
// ░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▀▀░░░░░░░░
module.exports={sudPuzAlgo}