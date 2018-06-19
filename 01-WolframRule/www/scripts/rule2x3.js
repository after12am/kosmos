// wolfram's rule

var Rule2x3 = Rule2x3 || {};

Rule2x3 = function(seed) {
    ca.Rule.call(this, seed, 8);
};

Rule2x3.prototype = Object.create(ca.Rule.prototype);
Rule2x3.prototype.update = function(automata) {
    
    var y = automata.steps;
    
    for (var i = 1; i < automata.size - 1; i++) {
        
        var power = 2;
        var n = 0;
        
        for (var j = i - 1; j <= i + 1; j++) {
            n += automata.get(j, y - 1) * Math.pow(2, power);
            power--;
        }
        
        automata.set(i, y, this.rule[this.rule.length - n - 1]);
    }
};