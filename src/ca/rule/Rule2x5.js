
exports.Rule2x5 = function(seed) {
    
    seed = seed || 0;
    var digits = Math.pow(2, 5); // 32 pattern
    
    // rule binary length has to match matrix[0] * matrix[1]
    this.rules = exports.dec2binAsArr(seed, digits);
    
    // matrix represent [column, row].
    // row value has to be odd number.
    this.matrix = [2, 3];
};

// I think this is standard way to apply rule to cellular automata.
// if you want to change definition, please override.
exports.Rule2x5.prototype.proceed = function(automata) {
    
    if (automata.steps == 0) return;
    
    var w = automata.width;
    var r = this.rules;
    
    for (var i = 1; i < w - 1; i++) {
        
        var power = 4;
        var n = 0;
        
        for (var j = automata.steps; j >= automata.steps - 1; j--) {
            for (var k = i - 1; k <= i + 1; k++) {
                
                if (k == i &&  j == automata.steps) continue;
                
                n += automata.get(k, j) * Math.pow(2, power);
                power--;
            }
        }
        
        automata.set(i, automata.steps, r[r.length - n - 1]);
    }
};