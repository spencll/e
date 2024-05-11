// add whatever parameters you deem necessary

function freq(str){
    const obj = {}
    for (let letter of str){
        obj[letter] = obj[letter] + 1 || 1
    }
    return obj
}

function constructNote(msg, letters) {
// checks if letters can make msg 
    let freq1= freq(msg)
    let freq2= freq(letters)
    for (let letter in freq1){
        if (!freq2[letter] || freq1[letter]>freq2[letter]) return false
    }
    return true
}