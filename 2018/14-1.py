# 14-1
# Hot Chocolate
# input: 293801

puzzleInput = 293801
recipes = [3, 7]
iA = 0
iB = 1

i = 0
while len(recipes) < puzzleInput + 10:
    # sum recipes, add digits to end of list
    rA = recipes[iA]
    rB = recipes[iB]
    rSum = rA + rB
    digits = list(str(rSum))

    while digits:
        recipes.append(int(digits.pop(0)))

    # choose next recipes
    iA = (iA + rA + 1) % len(recipes)
    iB = (iB + rB + 1) % len(recipes)

# get 10 recipes after puzzle input
iStart = puzzleInput
out = recipes[iStart : iStart + 10]
out = ''.join(list(map(str, out)))
print(out)
