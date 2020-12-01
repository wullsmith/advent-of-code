# 13-2: minecarts
import sys

grid = open("day13_input.txt").read().splitlines()
grid = list(map(list, grid))
height = len(grid)
width = len(grid[0])

# turn sequence: left, straight, right
turns = [-1, 0, 1]
cartChars = ['>', 'v', '<', '^']    

class cart:
    def __init__(self, x, y, direction):
        # E, S, W, N : 0, 1, 2, 3
        self.x = x
        self.y = y
        self.direction = direction
        self.nextTurn = 0
        self.active = True
        if direction == 0 or direction == 2:
            # East or West facing
            self.trackPiece = '-'
        else:
            # North or South facing
            self.trackPiece = '|'

    # move forward
    def proceed(self):
        # get next piece of track and move forward
        # TODO: check for collision
        newX = self.x
        newY = self.y
        
        if self.direction == 0: # East
            newX = self.x + 1
        elif self.direction == 1: # South
            newY = self.y + 1
        elif self.direction == 2: # West
            newX = self.x - 1
        elif self.direction == 3: # North
            newY = self.y - 1

        grid[self.y][self.x] = self.trackPiece;
        self.x = newX;
        self.y = newY;
        nextPiece = grid[self.y][self.x]
        self.trackPiece = nextPiece;

        # check for collision
        if nextPiece in cartChars:
            # remove both carts from list
            for i in range(len(carts)):
                if carts[i].x == self.x and carts[i].y == self.y:
                    carts[i].active = False
                    rem = carts[i]
                    if rem.trackPiece not in cartChars:
                        grid[self.y][self.x] = rem.trackPiece
            return -1

        # turn if necessary
        if nextPiece == '\\':
            if self.isHorizontal():
                self.turnRight()
            else:
                self.turnLeft()
        elif nextPiece == '/':
            if self.isHorizontal():
                self.turnLeft()
            else:
                self.turnRight()
        elif nextPiece == '+':
            self.turnIntersection()

        # place new char
        grid[self.y][self.x] = cartChars[self.direction]

        return 0

    def turnLeft(self):
        self.direction = (self.direction - 1) % 4

    def turnRight(self):
        self.direction = (self.direction + 1) % 4
        
    # at intersection; turn left, right, or none
    def turnIntersection(self):
        self.direction = (self.direction + turns[self.nextTurn]) % 4
        self.nextTurn = (self.nextTurn + 1) % 3

    # check if facing East or West
    def isHorizontal(self):
        return self.direction == 0 or self.direction == 2

# debug
##def dump():
##    for row in grid:
##        print(''.join(row))
##    for i in range(len(carts)):
##        print('Cart {}: {}'.format(i, (carts[i].x, carts[i].y)))
##    sys.exit()

# create list of carts
carts = []
for y in range(height):
    for x in range(width):
        track = grid[y][x]
        if track in cartChars:
            carts.append(cart(x, y, cartChars.index(track)))

# move carts until single cart is left
ticks = 0
while len(carts) > 1:
    for cart in carts:
        if cart.active:
            cart.proceed()
    ticks += 1
    carts = [cart for cart in carts if cart.active]

lastCart = carts[0]

print('Ticks: {}'.format(ticks))
print('Last cart location: {}'.format((lastCart.x, lastCart.y)))
        
