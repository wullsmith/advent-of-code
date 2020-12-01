# 6-2
import sys

inputFile = open("day6_input.txt")
lines = inputFile.read().splitlines()

# each coordinate: [x, y, area]
coordinates = {}

min_x = 500
min_y = 500
max_x = 0
max_y = 0

for i in range(len(lines)):
    pair = lines[i].split(",", 2)
    x = int(pair[0])
    y = int(pair[1])

    if x > max_x:
        max_x = x
    if x < min_x:
        min_x = x
    if y > max_y:
        max_y = y
    if y < min_y:
        min_y = y
        
    coordinates[i] = [x, y, 0]


# compare every point in grid to each coordinate
safeRegionSize = 0

for i in range(min_x, max_x+1):
    for j in range(min_y, max_y+1):
        sumDist = 0
        
        for k in coordinates:
            point = coordinates[k]
            dist = abs(point[0] - i) + abs(point[1] - j)
            sumDist += dist

        #print("{}, {}: {}".format(i, j, sumDist))
        if sumDist < 10000:
            safeRegionSize += 1

print("Safe region size: ", safeRegionSize)

