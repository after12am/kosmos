#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import cgi
import sys
import base64

if 'QUERY_STRING' in os.environ:
    query = cgi.parse_qs(os.environ['QUERY_STRING'])
else:
    query = {}

data = os.environ['QUERY_STRING'].split('data=data:image/jpeg;base64,')
data = data[1].split('&name=')
# open('cgi-bin/data', 'w').write(data[0]);

open('img/wolfram/'+query['name'][0]+'.jpeg', 'w').write(base64.b64decode(data[0]));


print "Content-Type: text/html\n\n"
print "ok"