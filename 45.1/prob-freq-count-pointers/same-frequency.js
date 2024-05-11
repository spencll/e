// add whatever parameters you deem necessary

function freq(str){
    const obj = {}
    for (let letter of str){
        obj[letter] = obj[letter] + 1 || 1
    }
    return obj
}

function sameFrequency(num1,num2) {
const freq1= freq(num1.toString())
const freq2= freq(num2.toString())
for (let digit in freq1){
    if (freq1[digit]!==freq2[digit]) return false
}
return true
}
