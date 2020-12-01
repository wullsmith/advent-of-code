text = open("pots.txt").read()

total = 0
for i in range(len(text)):
    if text[i] == "#":
        total += (i-3)
print(total)
        
