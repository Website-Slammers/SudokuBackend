//I was gonna make this code make sure the entire puzzle was valid and could
//use it as finisher code but right now I just wanna make sure the array is valid in size
//(because I'm feeling a bit lazy on this aspect and want to just get the puzzle algorithym started)
const sudValidator=(gridArray)=>{
    let validator = true
    // console.log(gridArray, "grid Array")
    if(gridArray){
        for(let i=0; i< gridArray.length;i++){
            // console.log(gridArray[i])
            if(gridArray[i].length != 9){
                
                validator = false
            }
        }
    }
    return validator
}


sudValidator()
module.exports= {sudValidator}