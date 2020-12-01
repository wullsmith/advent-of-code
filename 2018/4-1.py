import re

inputFile = open("day4_input.txt")
lines = inputFile.readlines()
sortedLines = sorted(lines)

# dictionary containing 60-element array for each guard
sleepTracker = {}

guard = -1
sleepTime = -1
asleep = False

for line in sortedLines:
    curTime = int(re.findall("(?<=:)\d{2}", line)[0])
    log = re.findall("(?<=] ).*", line)[0]
    if ("Guard" in log):
        guard = re.findall("(?<=#)\d+", log)[0]
        if guard not in sleepTracker:
            sleepTracker[guard] = [0] * 60
    elif ("falls" in log):
        sleepTime = curTime
    elif ("wakes" in log):
        for i in range(sleepTime, curTime):
            sleepTracker[guard][i] = sleepTracker[guard][i] + 1;

maxSleepTime = 0
maxSleeper = 0

for i in sleepTracker:
    sleepTime = sum(sleepTracker[i])
    if sleepTime > maxSleepTime:
        maxSleepTime = sleepTime
        maxSleeper = i

# get highest value in max sleeper's array
maxSleepTime = max(sleepTracker[maxSleeper])
sleepiestMinute = sleepTracker[maxSleeper].index(maxSleepTime)

maxSleeper = int(maxSleeper)
sleepiestMinute = int(sleepiestMinute)

# part 1 answer
print("Sleepiest guard: ", maxSleeper)
print("Sleepiest minute: ", sleepiestMinute)
print("multiplied: ", maxSleeper * sleepiestMinute)
    
