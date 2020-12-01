#1-2
import sys

file = open("day1_input.txt")


sum = 0
ht = {}

i = 0
lines = file.readlines()

while True:
    for line in lines:
        sum += int(line)
        if sum in ht:
            print("sum: ", sum)
            sys.exit()
        ht[sum] = 1;
    i += 1
    print("loops: ", i)


    


