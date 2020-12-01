# 14-2
# Hot Chocolate
# input: 293801
import time

puzzleInput = 293801
inputString = str(puzzleInput)
inputLength = len(inputString)
inputList = list(inputString)

recipes = '37'
iA = 0
iB = 1

i = 0
found = False

while inputString not in recipes[-7:]:
    # debug
    #print(i)

    # sum recipes, add digits to end of list
    rA = int(recipes[iA])
    rB = int(recipes[iB])
    recipes += str((rA + rB))

    # choose next recipes
    iA = (iA + rA + 1) % len(recipes)
    iB = (iB + rB + 1) % len(recipes)

# num recipes to the left of sequence = i - 1
print('\nAnswer: {}'.format(recipes.index(inputString)))
