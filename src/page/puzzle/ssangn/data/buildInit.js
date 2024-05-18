const {data:dataList} = require('./data.js');
const propList = require('./ssangn.data.prob.json');


const SUM = 17264;
// 3. Calc ratio
let rating = propList.map((x, i) => {
    let sum = 0;
    x.forEach(v => {
        if(!v) return;
        let ratio = v/SUM;
        let entropy = -Math.log2(ratio)
        sum += ratio*entropy;
    })
    return [dataList[i], sum];
});

rating.sort((x,y) => y[1] - x[1]);
rating.slice(0,20).forEach((x,i) => console.log(x));