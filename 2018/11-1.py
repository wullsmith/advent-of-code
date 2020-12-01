# 11-1
import numpy as np

# input (grid serial number): 3463
gsn = 3463

# get hundreds digit
def hundreds(n):
    return (n // 100) % 10

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

# search for 3x3 square w/ highest power
highest = -1
maxPower = 0
for i in range(298):
    for j in range(298):
        power = sum(np.ravel(grid[i:i+3, j:j+3]))
        if power > maxPower:
            maxPower = power
            highest = (i+1, j+1)

print("GSN {}\nHighest power @ ({}, {}): {}".format(gsn, highest[0], highest[1], maxPower))
                


