
//assess current block to see what numbers are used up
function blockAssessor(gridArray,row,column){
    let returnSet = new Set()
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
            if(gridArray && gridArray[i] && gridArray[i][j]) returnSet.add(gridArray[i][j])
        }
    }
    if(returnSet.has(undefined)) returnSet.delete(undefined)
    // console.log(returnSet)
    return Array.from(returnSet)
}

module.exports={
    blockAssessor
}