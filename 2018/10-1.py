# 10-1, 10-2
import re
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.animation import FuncAnimation

# get points, velocities
lines = open("day10_input.txt").read().splitlines()

px = []
py = []
vx = []
vy = []

for line in lines:
    x, y, velx, vely = list(map(int, re.findall("-?\d+", line)))
    px.append(x)
    py.append(y)
    vx.append(velx)
    vy.append(vely)

# advance time close to message
speed = 10519
for i in range(len(px)):
    px[i] += (vx[i] * speed)
    py[i] += (vy[i] * speed)

# ---------------------------------
speed = 1

def update(frame):
    for i in range(len(px)):
        px[i] += (vx[i] * speed)
        py[i] += (vy[i] * speed)
    graph.set_data(px, py)
    return graph,

fig = plt.figure()
graph, = plt.plot(px, py, 'bo')

#ani = FuncAnimation(fig, update, 30, interval=3000)
plt.show()




