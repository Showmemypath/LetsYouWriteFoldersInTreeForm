const textArea = document.querySelector<HTMLTextAreaElement>("#autoExpand");
const pre : EventTarget = document.querySelector("pre");

let previousLvl : number  = 1
let currentLvl : number= 1
let change : Boolean = false
let arr = []

textarea.addEventListener("input",function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

textarea.addEventListener("keydown", function() {
    if (event.key==='Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
        pre.innerText += this.value ;
        this.value = '' ; 
    }
} );