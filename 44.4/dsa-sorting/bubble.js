function bubbleSort(arr) {
// Keep comparing and moving higher value right 

// Going through whole array
for (let i=0;i<arr.length;i++){

    //Making comparisons only up to the recent bubble
    for (let j=0;j<arr.length-i-1;j++){
        // Swap if greater  
        if (arr[j]>arr[j+1]){
            let temp = arr[j]
            arr[j] = arr[j+1]
            arr[j+1] = temp
        }

    }

}
return arr

}




module.exports = bubbleSort;