$(".gifs").on("click", function() {
    indexNumber = source.indexOf(this.src);
    indexNumber2 = alternativeSource.indexOf(this.src);
    console.log(indexNumber);
    console.log(indexNumber2);
    if (indexNumber < 10) {
        
    }
    if (this.src === source[indexNumber]) {
        console.log(this.src);
         return this.src = alternativeSource[indexNumber];
         
         
    } else {
        console.log(this.src);
        return this.src = source[indexNumber2];
    }
});