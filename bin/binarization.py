import os
import re
import Image

input_path = '../www/img/wolfram'
IMAGE_NAME_REGX = re.compile(r'^(?P<name>[0-9]+\.jpeg)$')
IMAGE_PATH_REGX = re.compile(r'^.*/(?P<name>[0-9]+\.jpeg)$')

# image binarization module

def images():
    return [os.path.join(base, f) for base, folders, files in \
        os.walk(input_path) for f in files if IMAGE_NAME_REGX.match(f)]

def get_name(path):
    return IMAGE_PATH_REGX.match(path).group('name')

def _binarization_filter(p):
    if p > 125:
        return 255
    else:
        return 0

def reversal_filter(p):
    if p > 125:
        return 0
    else:
        return 255

def binarization(path):
    image = Image.open(path)
    return image.point(_binarization_filter)

def reversal(path):
    image = Image.open(path)
    return image.point(reversal_filter)

def main():
    for i, f in enumerate(images()):
        new_image = reversal(f)

if __name__ == '__main__': main()