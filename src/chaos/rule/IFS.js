
exports.IFS = function(x) {
    
    this.steps = 0;
    this.x = x;
    this.y = x;
    this.xx = 0;
    this.yy = 0;
};

exports.IFS.prototype.next = function(chaos) {
    
    this.x = this.y;
    this.y = 4 * this.x * (1 - this.x);
    //this.y = 3.3 * this.x * (1 - this.x);
    
    chaos.set(this.xx + this.steps, this.yy + parseInt(this.y * 5), 1);
    
    this.steps++;
    
    if (this.steps % chaos.width == 0) {
        this.xx = 0;
        this.yy += 5;
    }
};