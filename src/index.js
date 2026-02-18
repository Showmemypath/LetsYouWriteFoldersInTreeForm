const textarea = document.querySelector("#autoExpand");
const pre = document.querySelector("pre");

let previous_lvl = 1;
let current_lvl = 1;
let change = false;
let arr = [];
let search_for = '#';
let hold = false;
let manipulate = false;
let constraint1 = 0;

textarea.addEventListener("input",function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});

textarea.addEventListener("keydown", function() {
    if (hold){
        if (event.key==='Backspace'){
            hold = false;
            del();
        }
    }
    hold = false;
    if (event.key==='Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
        constraint1 = 0;
        let hold_my_text = cchecker(this.value);
        this.value = '' ;
        pattern(hold_my_text,arr);
        correctArr(arr);
        change ? (() => {forceDisplay(arr);change = false;})() :
            (() =>{
                manipulate ? (() => {
                displayFromArray();
                manipulate=false;})()
                : display(arr)
            })()
    } else if (event.key==='ArrowRight') {
        lvlManager(1);
    } else if (event.key==='ArrowLeft') {
        lvlManager(-1);
    } else if(event.key==='Shift'){
        hold = true;
    }
    
} );

function correctArr(arr) {
    le = arr.length-1;
    lee = arr[le].length-1;
    console.log(arr);
    arr[le].splice(lee,1,arr[le][lee].replace('\n',''));
    arr[le].splice(0,1,'\n'+ arr[le][0]);
}

function lvlManager(plusOrMinus) {
    let num = plusOrMinus*1
    if (constraint1!=1) {
        if ( current_lvl > 1 ) {
            if (Math.abs(constraint1)<=1){
            current_lvl += num;
            constraint1 += num;
            };
        } else if(current_lvl==1){
            if (num > 0){
                current_lvl += num;
                constraint1 += num;
            }
        }
    }
};

function checkdot(text) {
    if (text.includes('.')) {
        return true;
    } else {
        console.log(1);
        return false;
    }
};

function peel(text,search_for) {
    /* Will use this when Im adding functionality for comments*//*
    let sf_index = 0;
    let new_text = '';
    for (var val of text) {
        val === search_for
        ? (() => {sf_index = text.indexOf(val)}) ()
        : new_text+=val;
    };
    new_text.trimEnd();
    return [new_text,sf_index];
    */
   text.trim()
   return text
}

function cchecker(text) {
    if (!checkdot(text)) {
        text+='/'
    };
    let text2 = peel(text)
    /* use this when you remove the functionality for comments and remove niche wala return 
    return text2[0]   */
    return text2;

}

function pattern(text,arr) {
    console.log(text);
    arr.push([]);

    current_lvl > 1 ? tcols = 2*current_lvl - 1 : tcols = 2*current_lvl ;

    for (let i = tcols;i > 1;i--) {
        let le = arr.length-1 /*last element of array */
        if (current_lvl>1) {
            if (i > tcols - 2) {
                if (i%2==0) {
                    if (current_lvl - previous_lvl > 0){
                        arr[le].splice(0,0,"└──");
                    } else if (current_lvl === previous_lvl){
                        lee = arr[le-1].length;
                        arr[le-1].splice(lee-2,1,"├──");
                        arr[le].splice(0,0,"└──");
                        change = true;
                    } else {
                        arr[le].splice(0,0,"└──");
                        manipulate = true;
                    }
                } else{
                    arr[le].splice(0,0,text);
                }
            } else{
                if (i%2==0){arr[le].splice(0,0," ")}
                else {arr[le].splice(0,0,"   ")};
            }
        } else {
            if (text!=''){
                arr[le].splice(0,0,text)
            }else{
                arr[le].splice(0,0," ")
            }
        };
    }
    previous_lvl = current_lvl;
    if (manipulate){
        manipulateArray();
    };
}

function forceDisplay(arr) {
    let lines = pre.innerText.split("\n");
    lines = lines.slice(0,-1);
    let arr2 = [];
    for (var ele of arr){
        arr2.push(ele.join(''))
    }
    pre.innerText = lines.join('\n');
    pre.innerText = '';
    pre.innerText += arr2.join('');

}

function display(arr){
    console.log(arr[arr.length-1]);
    pre.innerText += arr[arr.length-1].join('');
}

function del() {
    let lines = pre.innerText.split("\n");
    lines = lines.slice(0,-1);
    pre.innerText = lines.join('\n');
}

function manipulateArray(){
    let lee = arr[arr.length-1].length - 2;
    let leee = arr.length-2; /* +ve index of second last element */
    for (i = leee ; i>=0; i--){
        if (arr[i][lee]===' ' || arr[i][lee]==='\n ') {
            let z = arr[i][lee].trimEnd()+'|';
            console.log(z);
            console.log(i,lee);
            arr[i].splice(lee,1,z);
        } else {
            arr[i].splice(lee,1,"├──")
            break;
        }
    };
    console.log(arr);
}

function displayFromArray() {
    let myString = '';
    let arr2 = [];
    for (var ele of arr){
        arr2.push(ele.join(''))
    }
    pre.innerText = '';
    pre.innerText += arr2.join('');
}