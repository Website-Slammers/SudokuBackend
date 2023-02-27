// this little piece of code is going to return 1 current location block, 2 off row blocks, 2 off columnblocks

const {assessAll} =require ("./assessAll")

const squareAssess = (gridArray,row,column)=>{
    let number = gridArray[row][column]
    gridArray[row][column] = "X"
    let exitBoolean = true
    // console.log(number)
    //exit if number is already 'x'
    if(number == 'x' || number == "X"){
        // console.log('already removed')
        return false
    }
    
    let rowStart =0;
    let rowEnd=2 ;
    let columnStart = 0;
    let columnEnd =2;
    if(row<=5 &&row>2)rowStart =3, rowEnd=5;
    if(row>5) rowStart =6, rowEnd=8;
    if(column<=5 && column >2) columnStart =3, columnEnd=5;
    if(column>5) columnStart=6, columnEnd =8
    for(let i=rowStart; i<=rowEnd; i++){
        for(let j=columnStart; j<=columnEnd; j++){
            if(gridArray[i][j] == 'x'|| gridArray[i][j]=='X'){
                if(assessAll(gridArray,i,j).includes('number')){
                    if(row != i && column != j){
                        exitBoolean = false;
                        // console.log("row ", row, " i ", i, " column ", column, " j ", j)
                    }
                    
                }
            }
        }
    }
    if(exitBoolean == false){
        gridArray[row][column] = number
    }

}

const blockAnalysis =(row, column) =>{
    let currentBlock = 0
    if(row <2){
        if(column <2)currentBlock =0
        if(column >2 && column <=5) currentBlock = 1
        if(column >5)currentBlock = 2

    }else if(row>2 && row <=5){
        if(column <= 2) currentBlock = 3
        if(column >2 && column <=5) currentBlock = 4
        if(column >5) currentBlock = 5

    }else if(row>5){
        if(column<=2)currentBlock =6
        if(column>2 && column<=5)currentBlock =7
        if(column>5)currentBlock = 8 
    }
    return currentBlock
}
//first lets slice all the arrays up into blocks
// function blockSelector(gridArray){
//     let momSaidGlobalVariablesAreBad = 9;
//     // left to right, top to bottom 0-8
//     //  ___ ___ ___
//     // | 0 | 1 | 2 |
//     //  --- --- --- 
//     // | 3 | 4 | 5 |
//     //  --- --- ---
//     // | 6 | 7 | 8 |
//     //  --- --- --- 
//     let blockArray = [];
//     let blockNumber = 0
//     let iterator =0;
    
//     for(let row=0; row<momSaidGlobalVariablesAreBad; row+=3){
//         for(let column= 0; column <momSaidGlobalVariablesAreBad; column +=3){
//             if(row )
//             let currentRow = gridArray[row]
//             let currentSlice = currentRow.slice(column, column+3)
//             console.log("currentSlice", currentSlice)
//             blockArray[blockNumber] = [currentSlice]
//         }
        
//     }
    
module.exports={squareAssess}