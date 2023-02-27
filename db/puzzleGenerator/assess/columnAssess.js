
//assess columns to see what numbers are used up
function columnAssessor(gridArray,row, column ){
    let returnArrayC = []
    for(let i=0; i<row; i++){
        if(gridArray[i]) returnArrayC.push( gridArray[i][column])
    }
    // console.log("returnArray" , returnArrayC)
    return returnArrayC
}

module.exports={
    columnAssessor    
}