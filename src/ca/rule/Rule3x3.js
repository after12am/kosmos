
// life game rule
// http://en.wikipedia.org/wiki/Conway's_Game_of_Life

exports.Rule3x3 = function() {
    
    // rule binary length has to match matrix[0] * matrix[1]
    this.rules = []
    
    // matrix represent [column, row].
    // row value has to be odd number.
    this.matrix = [3, 3];
};

// I think this is standard way to apply rule to cellular automata.
// if you want to change definition, please override.
exports.Rule3x3.prototype.proceed = function(automata) {
    
    var pixels = new Uint8Array(automata.pixels.length);
    var w = automata.width;
    var h = automata.height;
    
    // set pixel
    function set(x, y, c) {
        
        var i  = (x + y * w) * 4;
        var c = c == 0 ? 0 : 255;
        
        pixels[i] = c;
        pixels[i + 1] = c;
        pixels[i + 2] = c;
        pixels[i + 3] = 255;
    }
    
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            
            var n = 0;
            for (var k = i - 1; k <= i + 1; k++) {
                for (var l = j - 1; l <= j + 1; l++) {
                    if (k == i && l == j) continue;
                    if (automata.get(k, l)) n++;
                }
            }
            
            var s = automata.get(i, j);
            
            if (s) {
                // dead
                if (n <= 1) {
                    set(i, j, 0);
                    continue;
                }
                // alive
                if (n == 2 || n == 3) {
                    set(i, j, 1);
                    continue;
                }
                // dead
                if (n >= 4) {
                    set(i, j, 0);
                    continue;
                }
            }
            
            if (!s) {
                // birth
                if (n == 3) {
                    set(i, j, 1);
                    continue;
                }
            }
        }
    }
    
    automata.pixels = pixels;
};