# 9-1
# Weird Marble Game

# inputs (476, 71657)
nPlayers = 476
nMarbles = 7165701

# list of scores
scores = [0] * nPlayers

# circle of marbles
marbles = [0]

i = 1
curPos = 0
curPlayer = 0

# increment function
def incPos(movement):
    global curPos
    global marbles
    
    curPos += movement
    if curPos < 0:
        curPos = len(marbles) - abs(curPos)
    elif curPos >= len(marbles):
        curPos = curPos - len(marbles)
    return

# main
while i < nMarbles:
    # move 2 clockwise and insert marble
    if (i % 23) != 0:
        incPos(2) 
        marbles.insert(curPos, i)

    # multiple of 23 - add to current player's score
    # move 7 ccw, add to score again
    else:
        scores[curPlayer] += i
        incPos(-7)
        scores[curPlayer] += marbles.pop(curPos)

    i += 1
    curPlayer = (curPlayer + 1) % nPlayers

# debug
print("Winning score: {}".format(max(scores)))
print("Winner is player {}".format(scores.index(max(scores))+1))

# circular linked list to store marbles
class Node:
    def __init__(self, value=0, nextNode=None, prevNode=None):
        self.value = value
        self.nextNode = nextNode
        self.prevNode = prevNode

