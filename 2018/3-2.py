import re
import sys

file = open("day3_input.txt")

lines = file.readlines()
out = 0

grid = [[0] * 1000 for i in range(1000)]

#debug
#print(list(map(int, (re.findall("\d+", lines[0])))))
#sys.exit()

for line in lines:
    n, x, y, a, b = list(map(int, re.findall("\d+", line)))
    for i in range(x, x+a):
        for j in range(y, y+b):
            grid[i][j] += 1

for line in lines:
    n, x, y, a, b = list(map(int, re.findall("\d+", line)))
    found = True
    for i in range(x, x+a):
        for j in range(y, y+b):
            if grid[i][j] != 1:
                found = False
    if found:
        print("ID: ", n)

print("answer: ", out)
