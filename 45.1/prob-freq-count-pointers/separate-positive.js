// add whatever parameters you deem necessary
function separatePositive(arr) {
    // array of integers separate to positive left/negative right 
    // Left pointer
    let left = 0;
    // Right pointer 
    let right = arr.length - 1;

    while (left < right) {
        // Swappable condition, negative with positive. Move inwards after
        if (arr[left] < 0 && arr[right] > 0) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
            
        } 
        // Not swappable condition, keep moving inwards 
        else {
            if (arr[left] >= 0) left++;
            if (arr[right] <= 0) right--;
        }
    }
    return arr;
}

    