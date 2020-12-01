# 12-1
# pot

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
generations = 20

for gen in range(generations):
    if "#" in state[:3]:
        state = list("...") + state
        prePots += 3
    if "#" in state[-3:]:
        state = state + list("...")

    # debug
    # print("{}: {}".format(gen, ''.join(state)))
    # /debug

    # create next state
    nextState = state.copy()
    for i in range(2, len(state)-2):
        pot = state[i]
        seq = ''.join(state[i-2:i+3])
        if seq in rules:
            nextState[i] = rules[seq]
        else:
            nextState[i] = "."

    state = nextState.copy()

# find sum
plantSum = 0
for i in range(len(state)):
    if state[i] == "#":
        plantSum += (i - prePots)

print("Sum: {}".format(plantSum))



