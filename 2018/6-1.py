# 6-1
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
for i in range(-400, 400):
    for j in range(-400, 400):
        minDist = 1000
        i_closestPoint = -1
        
        for k in coordinates:
            point = coordinates[k]
            dist = abs(point[0] - i) + abs(point[1] - j)
            if dist < minDist:
                minDist = dist
                i_closestPoint = k
            # check for tie
            elif dist == minDist:
                i_closestPoint = -1 

        # increase area of closest coordinate
        if i_closestPoint != -1:
            coordinates[i_closestPoint][2] += 1

# find largest area
maxArea = 0
winner = -1

for i in coordinates:
    point = coordinates[i]
    x = point[0]
    y = point[1]
    area = point[2]

    # check for edge point
    if x > min_x and x < max_x and y > min_y and y < max_y:
        if area > maxArea:
            maxArea = area
            winner = point
            
print("Point with largest area: ", winner[0], ", ", winner[1])
print("Area: ", maxArea)

# debug ----------------------
sizes = []
for i in coordinates:
    size = coordinates[i][2]
    sizes.append(size)
    print("point {} has size {}".format(i, size))

outFile = open("sizes2.txt", "w")
for n in sizes:
    outFile.write("{}\n".format(n))
outFile.close()

print("total area: ", sum(sizes))
# ---------------------------
