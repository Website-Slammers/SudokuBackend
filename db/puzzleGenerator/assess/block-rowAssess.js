//assesses current block to see what numbers aren't used up, minus the current row (for replacement 
//(this is to prevent the row assessor from clashing with the block assessor because the row assessor is 
//finding an alternate number for the current box that has already been placed and swapping it))
function blockAssessorMinusRow(gridArray,row,column){
    let returnSet = new Set()
    let rowStart =0;
    let rowEnd=1 ;
    let columnStart = 0;
    let columnEnd =2;
    if(row<=5 &&row>2)rowStart =3, rowEnd=row-1;
    if(row>5) rowStart =6, rowEnd=row-1;
    if(column<=5 && column >2) columnStart =3, columnEnd=5;
    if(column>5) columnStart=6, columnEnd =8
    for(let i=rowStart; i<=rowEnd; i++){
        for(let j=columnStart; j<=columnEnd; j++){
            if(gridArray && gridArray[i] && gridArray[i][j]) returnSet.add(gridArray[i][j])
        }
    }
    if(returnSet.has(undefined)) returnSet.delete(undefined)
    // console.log(returnSet)
    return Array.from(returnSet)
}

module.exports={
    blockAssessorMinusRow
}