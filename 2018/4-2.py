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


maxMinuteSleeps = 0
maxSleeper = 0
sleepiestMinute = 0

# get sleepiest minute of all
for i in sleepTracker:
    for minuteSleeps in sleepTracker[i]:
        if minuteSleeps > maxMinuteSleeps:
            maxMinuteSleeps = minuteSleeps
            sleepiestMinute = sleepTracker[i].index(minuteSleeps)
            maxSleeper = i

maxSleeper = int(maxSleeper)

print("Guard w/ sleepiest minute: #", maxSleeper)
print("Guard's sleepiest minute: ", sleepiestMinute)
print("multiplied: ", maxSleeper * sleepiestMinute)
    
