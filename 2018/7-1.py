# 7-1
import sys

lines = open("day7_input.txt").read().splitlines()

# dict -- step : [prereqs]
prereqs = {}

# steps are at index 5, 36
for line in lines:
    if line[36] in prereqs:
        prereqs[line[36]].append(line[5])
    else:
        prereqs[line[36]] = [line[5]]

    if line[5] not in prereqs:
        prereqs[line[5]] = []



# iterate thru sorted dict, find first step w/ no prereqs,
# append to output, remove from values of all other steps,
# remove from dict
steps = sorted(list(prereqs))
output = []

while (steps):
    print(output)
    steps.sort()
    for i in steps:
        if not prereqs[i]:
            output.append(i)
            steps.remove(i)
            prereqs.pop(i, None)
            for j in prereqs:
                if i in prereqs[j]:
                    prereqs[j].remove(i)
            break

output = ''.join(output)
print(output)
