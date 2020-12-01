# 5-1

inputFile = open("day5_input.txt")
polymerString = inputFile.readline()

i = 0

while i < len(polymerString)-1:
    c = polymerString[i]
    
    if ord(c) <= ord("Z"):
        # uppercase - check for lowercase; if found, destroy i & i+1
        if polymerString[i+1] == c.lower():
            polymerString = polymerString[:i] + polymerString[(i+2):]
            i = i-1 if i > 0 else 0
        else:
            i += 1
    else:
        # lowercase - check for uppercase
        if polymerString[i+1] == c.upper():
            polymerString = polymerString[:i] + polymerString[(i+2):]
            i = i-1 if i > 0 else 0
        else:
            i += 1
                

print("remaining units: ", len(polymerString))


