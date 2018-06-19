#!/opt/local/bin/python2.6

def histogram():
    data = [[] for i in range(100)]
    
    for l in open('./fractal.csv').readlines():
        name, dimension = l.strip().split(',')
        k = int(str(dimension)[2:4])
        data[k].append(name)
    
    for i, d in enumerate(data):
        bar = ''
        for j in range(len(d)):
            bar += '='
        print '1.' + str(i), bar

def main():
    histogram()

if __name__ == '__main__': main()