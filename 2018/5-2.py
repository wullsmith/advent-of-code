# 5-2

inputFile = open("day5_input.txt")
originalString = inputFile.readline()
minLength = len(originalString)

# iterate A-Z
for i in range(ord('A'), ord('Z')+1):
    polymerString = originalString
    c_remove = chr(i)

    # remove current char from polymer
    i = 0
    while i < len(polymerString):
        c = polymerString[i]
        if c.upper() == c_remove:
            polymerString = polymerString[:i] + polymerString[(i+1):]
        else:
            i += 1

    # react polymer
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

    if len(polymerString) < minLength:
        minLength = len(polymerString)
                

print("remaining units: ", minLength)


