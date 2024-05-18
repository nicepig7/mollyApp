const dataList = require('./data.js');
const fs = require('node:fs');

// 1. Prepare prob map
let _t = new Date().getTime(), _s;
let result = [];
for(var i=0, ii=9;i<ii;i++) {
    result.push(...(function() {
        const prep = require(`./ssangn.data.prep-${i}.json`);
        let prob = prep.map(line => {
            let lineArray = newArray();
            line.forEach(x => {
                lineArray[x]++;
            });
            return lineArray;
        });
        return prob
    })());
    _s = new Date().getTime();
    console.log(`time(build-${i}) : ${_s - _t} msec`)
    _t = _s;
}
// 2. Write prob file
_t = new Date().getTime();
let path = './ssangn.data.prob.json';
let file = fs.createWriteStream(path);
file.on('close', ()=>{
    _s = new Date().getTime();
    console.log(`write file(${_s-_t} msec) :`, result.length);
    _t = _s;
})
file.write('[');
result.forEach((x,i) => {
    if(i!==0) file.write('\n,');
    file.write(JSON.stringify(x));
});
file.write(']');
file.end();



function newArray(){
    let rtn = [];
    for(var i=0, ii=36;i<ii;i++) {
        rtn[i]=0;
    }
    return rtn;
}