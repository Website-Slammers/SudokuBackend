// import React from 'react'
const {columnAssessor} = require ("../assess/columnAssess");
const {rowAssessor} = require ("../assess/rowAssess");
const {blockAssessor} = require ("../assess/blockAssess");
const {blockAssessorMinusRow} = require ("../assess/block-rowAssess");
const {assessAll} = require ("../assess/assessAll");

const sudGenerator=()=>{
    let gridArray = []
    let tempArray = [1,2,3,4,5,6,7,8,9];
    let currentRow = []
    let iterator = 0;
    let secondIterator = 0
    let thirdIterator = 0
    for(let row =0; row<9; row++){
        // console.log("current row", row)
        let passArray = []
        currentRow = []

        for(let column=0; column<9; column++){
            let validArray = assessAll(gridArray, row, column)
            // console.log(validArray)
            if(validArray[0] != undefined){
                //if validNumber = empty /null , check any previous(random) number for a valid switchout.
                let validNumber = validArray[Math.floor(Math.random()*validArray.length)]
                        
                currentRow.push(validNumber)
                gridArray[row] = currentRow; 
            }else{
                //assess each option and pick one that works, if there is an option.
                //this is getting nutty ok
                // console.log('hey')
                let rowCheck= noRow(gridArray, row, column)
                for(let i=0; i<rowCheck.length; i++){
                    //check grid array at location of current row for location of 
                    
                    let columnLocation = gridArray[row].findIndex((col)=> rowCheck[i] == col)
                    let replacer = gridArray[row][columnLocation]
                    let previousLocation = assessAll(gridArray,row,columnLocation)
                    let rand = previousLocation[Math.round(Math.random()*previousLocation.length)]
                    
                    if(rand != undefined && iterator <1 ){
                        currentRow.splice(columnLocation,1,rand)
                        
                        i=9
                        currentRow.push(replacer)
                

                        // replace a row if it doesn't work, then replace two rows if replacing a row doesn't work, else restart the entire puzzle generation
                    }else{
                        i=9
                        if(iterator <10) {
                            currentRow = []
                            gridArray[row] = []
                            iterator ++
                            column = -1
                        }else if(secondIterator <10){
                            thirdIterator +=3;
                            iterator = 3 +thirdIterator;
                            currentRow = []
                            gridArray[row-1] == []
                            row --
                            column = -1
                            secondIterator ++
                        }else {
                            row = 0
                            gridArray=[]
                            currentRow =[]
                            column =-1
                        }
                    }
                    
                }
            }
                // currentRow.push('x')
                gridArray[row] = currentRow
        }
        passArray = []
        tempArray = [1,2,3,4,5,6,7,8,9];
    }
        
    // console.log("grid Array" , gridArray)
    return gridArray

}

//this function shows all possible answers in a spot 


//acts like the other assesor but doesn't check the row 
function noRow(gridArray,row,column){
    let finalSet = new Set([1,2,3,4,5,6,7,8,9])
    let maxArray = []

    maxArray.push(...columnAssessor(gridArray, row, column))
    maxArray.push(...blockAssessorMinusRow(gridArray, row,column))
    // assess the set against another set of numbers to get the numbers that can still be used.
    //make a for loop to run through each array and apply them to the set then push the set back into an array and return it.
    for(let i=0; i<maxArray.length; i++){
        if(finalSet.has(maxArray[i])){
            finalSet.delete(maxArray[i])
        }
        
    }
    
    // console.log("final set minus row: row",row+1," " , Array.from(finalSet));
    return Array.from(finalSet)
}


sudGenerator();
module.exports={sudGenerator}

    // original puzzle maker, figured I'd leave this in the code (it doesn't make functional sudoku puzzles)
    //     for(let j =0; j<9; j++){
    //         let location =Math.floor(Math.random()*tempArray.length)
    //         let addedNumber = tempArray[location]
    //         console.log('tempArray ', tempArray, tempArray.length)
    //         console.log("added ", addedNumber)
    //         passArray.push(addedNumber)
    //         tempArray.splice(location,1)
    //         // console.log(passArray)
    //     }
        
      