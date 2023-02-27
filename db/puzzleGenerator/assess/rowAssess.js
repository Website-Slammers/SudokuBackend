
//assess rows to see what numbers are used up
function rowAssessor(gridArray,row,column){
    let returnArrayR = []
    for(let i=0; i<9; i++){
        // console.log('hello? ', gridArray[row])
        if(gridArray[row] &&gridArray[row][i]) returnArrayR.push( gridArray[row][i])
    }
    // console.log("returnArray" , returnArrayR)
    return returnArrayR
}

module.exports={rowAssessor}