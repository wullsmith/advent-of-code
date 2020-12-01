file = open("day2_input.txt")

twos = 0
threes = 0

lines = file.readlines()

for line in lines:
    ht = {}
    f_twos = False
    f_threes = False

    for c in line:
        if c in ht:
            ht[c] = ht[c] + 1
        else:
            ht[c] = 1

    for x, y in ht.items():
        if y == 2 and not f_twos:
            twos += 1
            f_twos = True
        if y == 3 and not f_threes:
            threes += 1
            f_threes = True

print("twos: ", twos)
print("threes: ", threes)
print("checksum: ", twos * threes)
