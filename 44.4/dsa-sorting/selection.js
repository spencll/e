function selectionSort(arr) {

// Outer pointer to the minimum arr[i]
for (i=0;i<arr.length;i++){
    // 2nd pointer arr[j]
    for (j=i+1;j<arr.length;j++){
        if (arr[j]<arr[i]){
            // Swap
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
}
return arr

}

module.exports = selectionSort;