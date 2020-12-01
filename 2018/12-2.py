# 12-2
# pot
import matplotlib.pyplot as plt

lines = open("day12_input.txt").read().splitlines()
state = lines[0].split(": ")[1]
state = list(state)
notes = lines[2:]

# create dict to map plant arrangement to result
rules = {}
for note in notes:
    s = note.split(" => ")
    rules[s[0]] = s[1]

# pots with negative index
prePots = 0

# number of generations
generations = 1000
plantSum = 0
plantSums = []

for gen in range(generations):
    if "#" in state[:3]:
        state = list("...") + state
        prePots += 3
    if "#" in state[-3:]:
        state = state + list("...")

    # debug --------------------------
    # print("{}: {}".format(gen, ''.join(state)))
    # /debug -------------------------

    # create next state
    nextState = state.copy()
    for i in range(2, len(state)-2):
        pot = state[i]
        seq = ''.join(state[i-2:i+3])
        if seq in rules:
            nextState[i] = rules[seq]
        else:
            nextState[i] = "."

    # find sum
    prevSum = plantSum
    plantSum = 0
    for i in range(len(state)):
        if state[i] == "#":
            plantSum += (i - prePots)
    plantSums.append(plantSum)

    #print("Gen {:02d} sum: {}".format(gen, plantSum))
    #print("Increase from prev gen: {}".format(plantSum - prevSum))

    state = nextState.copy()

# plot it
graph = plt.plot(plantSums)
plt.show()

# rate of change stabilizes after gen 124: +88 each gen
# add gen 124's sum to (88*(50b - 124)) to get 4,400,000,000,304





