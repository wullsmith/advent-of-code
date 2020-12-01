# 8-1

inputFile = open("day8_input.txt", "r")
nums = list(map(int, inputFile.read().split(" ")))
metasum = 0 # output
childStack = []
dataStack = [] 

i = 0
while i < len(nums):
    if childStack:
        if childStack[-1] > 0:
            childStack[-1] -= 1
            childStack.append(nums[i])
            dataStack.append(nums[i+1])
            i += 2

        # if no children remain, proceed to metadata
        else:
            childStack.pop()
            end = i + dataStack.pop()
            while i < end:
                metasum += nums[i]
                i += 1

    # stack is empty
    else:
        childStack.append(nums[i])
        dataStack.append(nums[i+1])
        i += 2

    # debug
    # print("C, D, sum:\t{}, {}, {}".format(childStack, dataStack, metasum))

print("Metadata sum: {}".format(metasum))

    
