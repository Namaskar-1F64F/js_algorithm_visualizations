/* randomize elements in array using Knuth Shuffle */
export const shuffleArray = (arr) => {
    if (arr == null) throw 'randomize() given null input!';
    if (!Array.isArray(arr)) throw 'randomize() given non-array input!';
    
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
}