
const tickerA = async () => {
    console.log("waiting 5 seconds");
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("✅ - waited.") 
}


let repeat2 = Promise.resolve().then(function resolver() {
    return tickerA()
    .then(() => console.log("👍 waiting 3 seconds..."))
    .then(() => setTimeout(resolver, 3000));
}).catch((error) => {
    console.log("Error: " + error);
});

