# 8-2

inputFile = open("day8_input.txt", "r")
nums = list(map(int, inputFile.read().split(" ")))
metasum = 0 # output
nodeStack = []    # stack of node indices
childStack = []   # number of children remaining for node

nodeValue = {}    # node : value  
nodeChildren = {} # node : [children]

class Node:
    def __init__(self, index, numChildren, numMetadata):
        self.numChildren = numChildren
        self.remChildren = numChildren # children remaining to iterate through
        self.numMetadata = numMetadata
        self.index = index
        self.children = []
        self.metadata = []
        self.value = 0

    def printData(self):
        print("\tNode {}: {}".format(self.index, self.numChildren))

# init stack with root node
root = Node(0, nums[0], nums[1])
nodeStack.append(root)

i = 2
while i < len(nums):
    curNode = nodeStack[-1]

    # if no children remain, proceed to metadata
    if curNode.remChildren == 0:
        nodeStack.pop()
        end = i + curNode.numMetadata

        # if node has children, sum values of all child nodes
        if curNode.numChildren > 0:
            while i < end:
                childIndex = nums[i] - 1
                if childIndex < curNode.numChildren:
                    index = curNode.children[childIndex]
                    curNode.value += nodeValue[index]
                i += 1
            nodeValue[curNode.index] = curNode.value

        # if node has no children, add up metadata
        else:
            while i < end:
                curNode.value += nums[i]
                i += 1
            nodeValue[curNode.index] = curNode.value

    # curNode has remaining children
    # add node to stack
    else: 
        curNode.remChildren -= 1
        newNode = Node(i, nums[i], nums[i+1])
        curNode.children.append(i)
        nodeStack.append(newNode)
        i += 2

    # debug
    #print("Current values: {}".format(nodeValue))
    #print("{} Current stack: ".format(i))
    #for j in nodeStack:
    #    j.printData()
    #print("")

print("Value of root: {}".format(nodeValue[0]))

    
