
ca.dec2bin = function(dec) {
    
    return parseInt(dec).toString(2);
};

ca.dec2binAsArr = function(dec, digits) {
    
    return ca.str2arr(ca.dec2bin(dec), digits);
};

ca.str2arr = function(str, digits) {
    
    if (!digits) throw new Error('digits is not defined');
    
    var arr = [];
    
    for (var i = 0; i < digits - str.length; i++) {
        arr.push(0);
    }
    
    for (i in str) {
        arr.push(parseInt(str[i]));
    }
    
    return arr;
};