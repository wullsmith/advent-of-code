# 7-2
import sys

lines = open("day7_input.txt").read().splitlines()

# dict -- step : [[prereqs], completionTime]
# init with completion time for each step: A = 61, B = 62, etc
prereqs = {}
completionTime = 61 # time for first step (A)
first = "A"
last = "Z"
for i in range(ord(first), ord(last)+1):
    prereqs[chr(i)] = [[], completionTime]
    completionTime += 1

# steps are at index 5, 36
for line in lines:
    prereq = line[5]
    step = line[36]
    prereqs[step][0].append(prereq)

# debug ------------
print("Prerequisites for each step:")
for i in prereqs:
    print("{} : {}".format(i, "".join(prereqs[i][0])))
# ------------------

# iterate thru sorted dict, find first step w/ no prereqs,
# append to output, remove from values of all other steps,
# remove from dict
steps = sorted(list(prereqs))
numWorkers = 5
working = {} # {step : remaining time}
totalTime = 0

while (steps):  
    steps.sort()
    for step in steps:
        if len(working) < numWorkers: # if any workers free            
            if not prereqs[step][0]: # step is ready to execute
                working[step] = prereqs[step][1]
        else:
            break

    # remove steps in progress from list
    steps = [s for s in steps if s not in working]

    # if steps are in progress: remove step closest to completion, add to total time
    # subtract that step's time from other in-progress steps' remaining time
    # remove that step from prereq lists
    if working:
        print("Steps in progress: {}".format(", ".join(working))) # debug
        finishedStep = min(working, key=working.get)      
        time = working[finishedStep]
        totalTime += time
        working.pop(finishedStep, None)
        prereqs.pop(finishedStep, None)
        print("{} done! {} seconds (total: {})".format(finishedStep, time, totalTime)) # debug
        for step in working:
            working[step] -= time
        for step in prereqs:
            if finishedStep in prereqs[step][0]:
                prereqs[step][0].remove(finishedStep)

print("Total time: ", totalTime)

# sanity check: time for just 1 worker to complete
#oneTime = 0
#for i in range(1, 27):
#    oneTime += (i+60)
#print ("Time for one worker: ", oneTime)
