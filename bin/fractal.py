from binarization import images, get_name, reversal_filter
import os
import re
import Image
from math import *

OUTPUT = './fractal.csv'

# image size has to be 256 * 256
def box_counting(image):
    
    # calculate fractal dimension by box-counting method
    # see http://en.wikipedia.org/wiki/Fractal_dimension
    
    # if background is mainly covered with white, there is a tendency to be high fractal dimension.
    # In that case, we invert colors.
    for color in image.getcolors():
        if color[1] == (0,0,0):
            if color[0] < (65536 / 2):
                image = image.point(reversal_filter)
    
    def getbbox(x, y, size):
        box = (x, y, x + size, y + size)
        box_image = image.crop(box)
        return box_image.getbbox()
    
    data = []
    w, h = image.size
    box_size = [1, 2, 4, 8, 32, 64, 128, 256]
    
    for bsize in box_size:
        n = 0
        for i in range(w / bsize):
            for j in range(h / bsize):
                if getbbox(i * bsize, j * bsize, bsize):
                    n += 1
        data.append([log(bsize, 10), log(n, 10)])
    
    # calculate average of slope
    avg = 0;
    for i in range(len(data) - 1):
        x1, y1 = data[i]
        x2, y2 = data[i + 1]
        avg += (y1 - y2) / (x1 - x2)
    
    # fractal dimension
    return abs(avg / (len(data) - 1))

def main():
    
    # create empty csv file
    open(OUTPUT, 'w').close()
    
    fmt = '../www/img/wolfram/%s.jpeg'
    images = [fmt % str(i) for i in range(0, 256)]
    
    for i, f in enumerate(images):
        image = Image.open(f)
        name = get_name(f)
        dimension = box_counting(image)
        open(OUTPUT, 'a').write(name + ',' + str(dimension) + '\n')
        print name, dimension

if __name__ == '__main__': main()