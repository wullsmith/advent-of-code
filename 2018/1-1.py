file = open("day1_input.txt")

sum = 0;
x = 0;

for line in file:
    sum += int(line)

print("sum: ", sum)
