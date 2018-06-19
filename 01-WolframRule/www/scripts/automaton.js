var ca = ca || {};

ca.Automaton = function(rule, size) {
    this.steps = 0;
    this.size = size || 256;
    this.rule = rule;
    this.canvas = fx.canvas();
    this.texture = this.createTexture(this.canvas, size, size);
    this.gl = this.canvas._.gl;
    this.pixels = this.canvas.getPixelArray();
};

ca.Automaton.prototype = fx.canvas();

// create image filled with #fff
ca.Automaton.prototype.createImage = function(width, height) {
    var image = new Image();
    image.width = width;
    image.height = height;
    return image;
}

ca.Automaton.prototype.getImage = function(format) {
    
    switch (format) {
        case 'jpg':
        case 'jpeg':
            format = "image/jpeg";
            break;
        default:
            format = "image/png";
            break;
    }
    
    var image = new Image();
    image.src = this.canvas.toDataURL(format);
    image.width = this.size;
    image.height = this.size;
    return image;
}

// create texture filled with #fff
ca.Automaton.prototype.createTexture = function(canvas, width, height) {
    var texture = canvas.texture(this.createImage(width, height));
    this.canvas.draw(texture);
    return texture;
};

// set color
ca.Automaton.prototype.set = function(x, y, color) {
    var i  = (x + y * this.size) * 4;
    this.pixels[i + 0] = 
    this.pixels[i + 1] = 
    this.pixels[i + 2] = color === 0 ? 0 : 255;
    this.pixels[i + 3] = 255;
};

// get color
ca.Automaton.prototype.get = function(x, y) {
    var i  = (x + y * this.size) * 4;
    return this.pixels[i] / 255;
};

// return true if satisfied termination condition.
// if not, return false.
ca.Automaton.prototype.completed = function() {
    return this.steps > this.size;
};

// evolute statement
ca.Automaton.prototype.proceed = function() {
    this.steps++;
    this.rule.update(this);
    this.draw();
};

// draw statements on canvas
ca.Automaton.prototype.draw = function() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture._.id);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.pixels);
    this.canvas.draw(this.texture).update();
}


// base rule class
ca.Rule = function(seed, digits) {
    this.seed = seed || 0;
    this.rule = this.toBin(seed, digits);
    this.digits = digits;
}

// decimal to binary
ca.Rule.prototype.toBin = function(decimal, digits) {
    var bin = [];
    var ss = parseInt(decimal, 10).toString(2);
    for (var i = 0; i < digits - ss.length; i++) bin.push(0);
    for (i in ss) bin.push(+ss[i]);
    return bin;
};
