# 11-2
import numpy as np

# input (grid serial number): 3463
gsn = 3463

# get hundreds digit
def hundreds(n):
    return (n // 100) % 10


# find sum using aux matrix
def squareSum(x, y, size, aux):
    xx = x + size - 1
    yy = y + size - 1
    s1 = 0
    s2 = 0
    a = 0

    if x > 0:
        s1 = aux[x-1][yy]
    if y > 0:
        s2 = aux[xx][y-1]
    if x > 0 and y > 0:
        a = aux[x-1][y-1]

    out = aux[xx][yy] - s1 - s2 + a
    return out


# create 300x300 grid
grid = [[0] * 300] * 300
grid = np.array(grid)

# populate with power levels
for i in range(300):
    for j in range(300):
        x = i + 1
        y = j + 1
        rackID = x + 10
        level = rackID * y
        level += gsn
        level *= rackID
        level = hundreds(level)
        level -= 5
        grid[i][j] = level


# create aux matrix to make summing faster
aux = [[0] * 300] * 300
aux = np.array(aux)

for i in range(300):
    for j in range(300):
        aux[i][j] = np.sum(grid[:i+1, :j+1])

# search for square w/ highest power
highest = -1
maxPower = 0
for i in range(300):
    for j in range(300):
        maxSize = min(300 - i, 300 - j)
        for size in range(maxSize):
            power = squareSum(i, j, size, aux)
            if power > maxPower:
                maxPower = power
                highest = (i+1, j+1, size)
    #print(i) # debug

print("GSN {}\nHighest power @ ({}, {}, {}): {}".format(gsn, highest[0], highest[1], highest[2], maxPower))
                


