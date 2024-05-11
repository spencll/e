// add whatever parameters you deem necessary

function isSubsequence(sub,str) {

// Substring pointer sub[subIdx]
let subIdx = 0

// Going through the whole string searching for sub letters 
for (let letter of str){
    // Found, time to move to next sub letter
    if (letter===sub[subIdx]) subIdx ++
    // Able to get subIdx all the way up to the length through one iteration
    if (subIdx===sub.length) return true
}
return false

}

