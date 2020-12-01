# 15-1
# Goblins
import matplotlib.pyplot as plt
import matplotlib.colors as colors
from matplotlib.animation import FuncAnimation
import numpy as np
import random as rand
import time
import operator

# wrong answers: 
# 197400 (too high)

# to do: target prioritization (lowest HP)
# to do: ensure shortest path ties are broken correctly
# to do: end program when game is over

# Globals
units = []
rounds = 1
arena = open('day15_input.txt').read().splitlines()
arena = [list(row) for row in arena]
height = len(arena)
width = len(arena[0])
adjArr = [(0, -1), (-1, 0), (1, 0), (0, 1)]

# Setup
WALL = 0
SPACE = 1
ELF = 2
GOBLIN = 3

CHARMAP = {
    '#': WALL,
    '.': SPACE,
    'E': ELF,
    'G': GOBLIN
}

for i in range(height):
    for j in range(width):
        arena[i][j] = CHARMAP[arena[i][j]]

WALL_COLOR = 'black'
SPACE_COLOR = 'white'
ELF_COLOR = 'blue'
GOBLIN_COLOR = 'green'

# Plot
cmap = colors.ListedColormap([WALL_COLOR, SPACE_COLOR, ELF_COLOR, GOBLIN_COLOR])
norm = colors.BoundaryNorm([0, 1, 2, 3, 4], cmap.N)

plt.rc('grid', color='black')
fig, ax = plt.subplots(figsize=(8, 8))
ax.grid(True)
ax.set_xticks(np.arange(0, width))
ax.set_yticks(np.arange(0, height))
ax.set_xticklabels(map(str, range(width)))
ax.set_yticklabels(map(str, range(height)))

# Get tile, with bounds checking
def tileAt(x, y):
    if x >= width or y >= height or x < 0 or y < 0:
        return WALL
    else:
        return arena[y][x]

# Node class, used for A* pathfinding
class Node:
    def __init__(self, parent=None, position=None):
        self.parent = parent
        self.position = position

        self.g = 0
        self.h = 0
        self.f = 0

    def __eq__(self, other):
        return self.position == other.position


# Elf/Goblin class
class Unit:
    def __init__(self, team, x, y):
        self.team = team
        self.x = x
        self.y = y
        self.health = 200
        self.power = 3
        self.alive = True


# Build unit list
def getUnits():
    units = []
    for y in range(height):
        for x in range(width):
            c = tileAt(x, y)
            if c == ELF or c == GOBLIN:
                units.append(Unit(c, x, y))
    return units

# Build enemy list
def getEnemies(team):
    enemyTeam = GOBLIN if team == ELF else ELF
    enemies = [unit for unit in units if unit.team == enemyTeam]
    return enemies

# Move a unit
def moveUnit(unit, x, y):
    arena[unit.y][unit.x] = SPACE
    #print('moving {} from {} to {}'.format(unit.team, (unit.x, unit.y), (x, y)))
    unit.x = x
    unit.y = y
    arena[y][x] = unit.team

# Damage a unit
def damageUnit(unit, power):
    unit.health -= power
    if unit.health <= 0:
        unit.alive = False
        arena[unit.y][unit.x] = SPACE
        print(f'Unit at ({unit.x}, {unit.y}) has been killed!')

# Determine if a target has an open space next to it
def isInRange(unit):
    x = unit.x
    y = unit.y
    return arena[x][y - 1] == SPACE or arena[x][y + 1] == SPACE or arena[x - 1][y] == SPACE or arena[x + 1][y] == SPACE

# Determine the cost and next move of the shortest path from unit to (x, y), using A*
def findPath(unit, position):
    #print('finding path from {} to {}'.format((unit.x, unit.y), position))
    startNode = Node(None, (unit.x, unit.y))
    endNode = Node(None, position)

    openList = []
    closedList = []

    openList.append(startNode)

    while (openList):
        curNode = openList[0]
        curIndex = 0

        # find node with lowest F
        for index, node in enumerate(openList):
            if node.f < curNode.f:
                curNode = node
                curIndex = index
        
        #print('checking node {} [{}]'.format(curNode.position, curIndex)) # debug

        # move that node to closed list
        openList.pop(curIndex)
        closedList.append(curNode)

        #print('openList: {}...'.format([n.position for n in openList[:10]]))
        #print('closedList: {}...'.format([n.position for n in closedList[:10]]))

        # end found?
        if curNode == endNode:
            path = []
            current = curNode
            while current is not None:
                path.append(current.position)
                current = current.parent
            return (curNode.g, path[-2::-1]) # exclude last element (starting node)

        # generate children
        children = []
        for newPos in [(0, -1), (-1, 0), (1, 0), (0, 1)]:
            nodePos = (curNode.position[0] + newPos[0], curNode.position[1] + newPos[1])

            # in bounds and not a wall or unit?
            if tileAt(nodePos[0], nodePos[1]) != SPACE:
                continue

            newNode = Node(curNode, nodePos)
            children.append(newNode)
            #print('added node at {} to children of {}'.format(newNode.position, curNode.position)) #debug


        for child in children:           
            # check closed list
            skip = False
            for closedChild in closedList:
                if child == closedChild:
                    skip = True
                    break
            if skip:
                continue

            # create g, h, f values
            child.g = curNode.g + 1
            child.h = ((child.position[0] - endNode.position[0]) ** 2) + ((child.position[1] - endNode.position[1]) ** 2)
            child.f = child.g + child.h

            # child already in open list?
            for openNode in openList:
                if child == openNode and child.g >= openNode.g:
                    skip = True
                    break
            if skip:
                continue

            openList.append(child)

        debugList = [n.position for n in openList]
        #print('openList: {}'.format(debugList)) #debug
        
    # No path found
    return (-1, -1)

# Determine if location is reachable by a unit (might not do this)
def isReachable(unit, x, y):
    poop = 3000
    #TODO

# Determine if a unit is adjacent to another
def isAdjacent(a, b):
    posA = (a.x, a.y)
    posB = (b.x, b.y)
    adjPositions = [(a.x, a.y-1), (a.x-1, a.y), (a.x+1, a.y), (a.x, a.y+1)]
    if posB in adjPositions:
        return True
    return False

# Find adjacent enemies & attack
def attackAdjacentEnemy(unit, enemies):
    for e in enemies:
        if e.alive == False:
            continue
        if isAdjacent(unit, e):
            damageUnit(e, unit.power)
            print('Unit at {} attacks unit at {} ({} HP)'.format((unit.x, unit.y), (e.x, e.y), e.health))
            return True
    return False # no attack made


# takeAction: move, attack
# return -2 if no enemies are found: game over
# other return values unused currently
def takeAction(unit):
    if unit.alive == False:
        return -1

    enemies = getEnemies(unit.team)
    if len(enemies) == 0:
        return -2 # no enemies found: game is over

    # look for adjacent enemies; end turn if attack is made
    if (attackAdjacentEnemy(unit, enemies)):
        return 1

    # find shortest path to an enemy
    paths = []
    for e in enemies:
        if e.alive == False:
            continue
        if isInRange(e):
            adjSpots = [(e.x + t[0], e.y + t[1]) for t in adjArr]
            for spot in adjSpots:
                _, path = findPath(unit, spot)
                if path != -1:
                    paths.append(path)
        else:
            continue # enemy has no open adjacent positions; check next enemy

    if len(paths) == 0:
        print(f'Unit at {(unit.x, unit.y)} found no paths')
        return -1 # no paths found

    # path found
    shortestPath = min(paths, key = lambda p: len(p))
    if len(shortestPath) != 0:
        newPos = shortestPath[0]
        moveUnit(unit, newPos[0], newPos[1])
        # print(f'Unit at {(unit.x, unit.y)} moves (destination: {shortestPath[-1]})')

    # look for adjacent enemies
    attackAdjacentEnemy(unit, enemies)
    return 1

# Advance round
def advance():
    global units
    global rounds
    print('Starting round {}!'.format(rounds))
    units = [unit for unit in units if unit.alive] # remove any dead units from list
    units = sorted(units, key = lambda u: (u.y, u.x)) # sort units in READING ORDER

    for i, unit in enumerate(units):
        print(f'unit #{i}\'s turn...')
        res = takeAction(unit)
        if res == -2:
            print('Game over! Full rounds completed: {}'.format(rounds-1))
            healthSum = 0
            for unit in units:
                if unit.health > 0:
                    healthSum += unit.health
            print('Sum of HP of remaining units: {}'.format(healthSum))
            return False # game over
    rounds += 1
    return True

# main
units = getUnits()
im = ax.imshow(arena, cmap=cmap, norm=norm, animated=True)
im.set_array(arena)

def update(*args):
    advance()
    im.set_array(arena)
    return im,

ani = FuncAnimation(fig, update, interval=50, blit=True)
plt.show()

# test w/o plot
# c = True
# while(c):
#     c = advance()
