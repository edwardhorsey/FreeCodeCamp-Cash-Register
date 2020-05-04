function checkCashRegister(price, cash, cid) {
    let changeObj = { 'status': '', 'change': [] };
    let changeDue = cash * 100 - price * 100;
    let totalInDrawer = totalCID(cid) * 100;
    // console.log(changeDue, totalindrawer);

    // return if cash-in-drawer is less that change due
    if (changeDue > totalInDrawer) {
        changeObj['status'] = "INSUFFICIENT_FUNDS";
        return changeObj;
    }

    // return if cash-in-drawer is equal to change due
    if (changeDue === totalInDrawer) {
        changeObj['status'] = "CLOSED";
        changeObj['change'] = cid;
        return changeObj;
    }

    // find total money in cash register
    function totalCID(money) {
        let total = 0;
        money.forEach(e => { total += (e[1]) });
        return total;
    }

    // make new CID array of arrays which contains coin values too, and convert everything to pennies.
    function makenewCID(cash) {
        let coinvalues = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
        let output = [...cash];
        for (let i = 0; i < cid.length; i++) {
            output[i][1] = Math.round(output[i][1] * 100);
            output[i].push(coinvalues[i]);
        }
        return output;
    }

    let newCID = makenewCID(cid);
    // console.log(newCID);
    /*
       [ [ 'PENNY', 101, 1 ],
         [ 'NICKEL', 205, 5 ],
         [ 'DIME', 310, 10 ],
         [ 'QUARTER', 425, 25 ],
         [ 'ONE', 9000, 100 ],
         [ 'FIVE', 5500, 500 ],
         [ 'TEN', 2000, 1000 ],
         [ 'TWENTY', 6000, 2000 ],
         [ 'ONE HUNDRED', 10000, 10000 ] ]
    */

    // gap for a breather!

    // push our change into new 'change' object and destructively change 'newCID'. work down from highest coin value.
    let changeCoins = {};
    for (let i = newCID.length - 1; i >= 0; i--) {
        // console.log(changeDue, i, totalCID(newCID), newCID[i][2]) // to keep track of things
        while (
            changeDue >= newCID[i][2] &&
            newCID[i][1] > 0 &&
            changeDue > 0
        ) {
            //add or combine change into object
            if (changeDue >= newCID[i][2]) {
                changeCoins[newCID[i][0]] ? changeCoins[newCID[i][0]] += newCID[i][2] : changeCoins[newCID[i][0]] = newCID[i][2];
                newCID[i][1] -= newCID[i][2];
                changeDue -= newCID[i][2];
            }
        }
    }

    // console.log(changeCoins);
    // look like: { QUARTER: 50 }

    //  if you had perfect change changeDue would be 0 so convert change object back into AoA.
    if (changeDue === 0) {
        changeObj['status'] = 'OPEN';
        for (let prop in changeCoins) {
            changeObj['change'].push([prop, changeCoins[prop] / 100])
        }
    }

    // if you didn't have right coins changeDue would be >0 so can return the empty change [] as set at beginning of solution.
    if (changeDue > 0) {
        changeObj['status'] = 'INSUFFICIENT_FUNDS';
    }

    // console.log(changeObj);
    return changeObj;
}

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]);
