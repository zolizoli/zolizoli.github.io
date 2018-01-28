import codecs
from array import array

inf = codecs.open('data/word_vecs.tsv', 'r', 'utf-8')
of = open('data/word_vecs.bytes', 'wb')

c = 0
for l in inf:
    l = l.strip().split('\t')
    vec = array('d', [float(n) for n in l])
    vec.tofile(of)
    c += 1
of.close()
print(c)
