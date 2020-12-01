import sys

file = open("day2_input.txt")

lines = file.readlines()
id_length = len(lines[0])
length = len(lines)

for i in range(length):
    for j in range(i, length):
        diffs = 0
        for k in range(id_length-1):
            if lines[i][k] != lines[j][k]:
                diffs += 1

        if diffs == 1:
            print("Box IDs: \t{0} \t\t{1}".format(lines[i], lines[j]))
            sys.exit()
        
