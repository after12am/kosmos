
ca.Automata = function(rule, width, height) {
    
    // image data filled with #ffffff in initialize
    function factoryImage() {
        var image = new Image();
        image.width = width;
        image.height = height;
        return image;
    };
    
    this.width = width;
    this.height = height;
    this.rule = rule;
    
    // I think that steps is better to switch from public to private.
    this.steps = 0;
    
    // canvas is dom of implemented.
    this.canvas = ca.canvas();
    this.texture = this.canvas.texture(factoryImage());
    
    // draw texture on canvas　in advance for reading pixels from canvas.
    this.canvas.draw(this.texture);
    
    // reduce cost for getting pixel array each time
    this.pixels = this.canvas.getPixelArray();
};

// set pixel
ca.Automata.prototype.set = function(x, y, c) {
    
    // c means color.
    // and make sure that color value has to be 0 or 1 which 
    // represent off or on, in other words dead or alive.
    
    var i  = (x + y * this.width) * 4;
    var c = c == 0 ? 0 : 255;
    
    this.pixels[i] = c;
    this.pixels[i + 1] = c;
    this.pixels[i + 2] = c;
    this.pixels[i + 3] = 255;
};

// get pixel
ca.Automata.prototype.get = function(x, y) {
    
    // get pixel data from canvas
    var i  = (x + y * this.width) * 4;
    
    return this.pixels[i] / 255;
};

// return true if completed termination condition.
// else return false.
ca.Automata.prototype.completed = function() {
    console.warn('termination condition is not defined. please define termination condition for performance by overriding');
    return false;
};

// proceed to evolute celluer automata
ca.Automata.prototype.proceed = function() {
    
    // apply rule
    this.rule.proceed(this);
    
    // draw on canvas
    gl.bindTexture(gl.TEXTURE_2D, this.texture._.id);
    gl.texImage2D(gl.TEXTURE_2D, 0, this.canvas._.gl.RGBA, this.width, this.height, 0, this.canvas._.gl.RGBA, this.canvas._.gl.UNSIGNED_BYTE, this.pixels);
    this.canvas.draw(this.texture).update();
    
    // step up generation
    this.steps++;
};