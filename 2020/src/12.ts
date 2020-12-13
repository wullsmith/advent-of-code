// Day 12: Rain Risk
import { readStringList, sleep } from './lib/utils';

class Ship {
  x: number;
  y: number;
  direction: number;
  waypoint: [number, number];
  commandList: Array<string>;

  static NORTH = 0;
  static EAST = 1;
  static SOUTH = 2;
  static WEST = 3;

  static directions = [Ship.NORTH, Ship.EAST, Ship.SOUTH, Ship.WEST];
  static operations = ['N', 'S', 'E', 'W', 'L', 'R', 'F'];

  constructor(commandList: Array<string>) {
    this.commandList = commandList;

    this.x = 0;
    this.y = 0;
    this.direction = Ship.EAST;
    this.waypoint = [10, -1];
  }

  move(direction: number, distance: number) {
    switch (direction) {
      case Ship.NORTH:
        this.y -= distance;
        break;
      case Ship.EAST:
        this.x += distance;
        break;
      case Ship.SOUTH:
        this.y += distance;
        break;
      case Ship.WEST:
        this.x -= distance;
        break;
    }
  }

  moveWaypoint(direction: number, distance: number) {
    switch (direction) {
      case Ship.NORTH:
        this.waypoint[1] -= distance;
        break;
      case Ship.EAST:
        this.waypoint[0] += distance;
        break;
      case Ship.SOUTH:
        this.waypoint[1] += distance;
        break;
      case Ship.WEST:
        this.waypoint[0] -= distance;
        break;
    }
  }

  moveForward(distance: number) {
    this.move(this.direction, distance);
  }

  moveTowardWaypoint(distance: number) {
    const [x, y] = this.waypoint;

    if (x > 0) {
      this.move(Ship.EAST, Math.abs(x * distance));
    } else if (x < 0) {
      this.move(Ship.WEST, Math.abs(x * distance));
    }

    if (y > 0) {
      this.move(Ship.SOUTH, Math.abs(y * distance));
    } else if (y < 0) {
      this.move(Ship.NORTH, Math.abs(y * distance));
    }
  }

  rotateWaypoint(dir: string, deg: number) {
    if (deg === 180) {
      this.rotateWaypoint180();
    } else {
      if (dir === 'L') {
        if (deg === 90) {
          this.rotateWaypointLeft();
        } else if (deg === 270) {
          this.rotateWaypointRight();
        }
      } else if (dir === 'R') {
        if (deg === 90) {
          this.rotateWaypointRight();
        } else if (deg === 270) {
          this.rotateWaypointLeft();
        }
      } else {
        console.log(`Error! Invalid direction "${dir}`);
      }
    }
  }

  // rotate waypoint 90 degrees CCW
  rotateWaypointLeft() {
    const [x, y] = this.waypoint;
    this.waypoint[0] = y;
    this.waypoint[1] = -x;
  }

  // rotate waypoint 90 degress CW
  rotateWaypointRight() {
    const [x, y] = this.waypoint;
    this.waypoint[0] = -y;
    this.waypoint[1] = x;
  }

  rotateWaypoint180() {
    this.waypoint[0] *= -1;
    this.waypoint[1] *= -1;
  }

  turnLeft() {
    let newDirection = this.direction - 1;
    if (newDirection < 0) newDirection = Ship.directions.length - 1;
    this.direction = newDirection;
  }

  turnRight() {
    this.direction = (this.direction + 1) % Ship.directions.length;
  }

  turnAround() {
    this.direction = (this.direction + 2) % Ship.directions.length;
  }

  distanceFromOrigin() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  executeCommand1(command: string) {
    if (command.length < 2) {
      return;
    }

    const op = command[0];
    const arg = parseInt(command.slice(1));

    if (!Ship.operations.includes(op)) {
      console.log(`Error! Invalid operation "${op}"`);
    }

    switch (op) {
      case 'N':
        this.move(Ship.NORTH, arg);
        break;
      case 'E':
        this.move(Ship.EAST, arg);
        break;
      case 'S':
        this.move(Ship.SOUTH, arg);
        break;
      case 'W':
        this.move(Ship.WEST, arg);
        break;
      case 'F':
        this.moveForward(arg);
        break;
      case 'L':
        switch (arg) {
          case 90:
            this.turnLeft();
            break;
          case 180:
            this.turnAround();
            break;
          case 270:
            this.turnRight();
            break;
          default:
            console.log(`Error! Invalid angle given: ${arg}`);
        }
        break;
      case 'R':
        switch (arg) {
          case 90:
            this.turnRight();
            break;
          case 180:
            this.turnAround();
            break;
          case 270:
            this.turnLeft();
            break;
          default:
            console.log(`Error! Invalid angle given: ${arg}`);
        }
    }
  }

  executeCommand2(command: string) {
    if (command.length < 2) {
      return;
    }

    const op = command[0];
    const arg = parseInt(command.slice(1));

    if (!Ship.operations.includes(op)) {
      console.log(`Error! Invalid operation "${op}"`);
    }

    switch (op) {
      case 'N':
        this.moveWaypoint(Ship.NORTH, arg);
        break;
      case 'E':
        this.moveWaypoint(Ship.EAST, arg);
        break;
      case 'S':
        this.moveWaypoint(Ship.SOUTH, arg);
        break;
      case 'W':
        this.moveWaypoint(Ship.WEST, arg);
        break;
      case 'F':
        this.moveTowardWaypoint(arg);
        break;
      case 'L':
        this.rotateWaypoint(op, arg);
        break;
      case 'R':
        this.rotateWaypoint(op, arg);
    }
  }

  executeCommandList1() {
    for (let command of this.commandList) {
      this.executeCommand1(command);
    }
  }

  executeCommandList2() {
    for (let command of this.commandList) {
      this.executeCommand2(command);
    }
  }

  printStatus2() {
    console.log(`Location: (${this.x},${this.y})`);
    console.log(`Waypoint: (${this.waypoint[0]},${this.waypoint[1]})`);
    console.log();
  }
}

// main
const inputFile = '../inputs/12.txt';
const commandList = readStringList(inputFile);

const ship1 = new Ship(commandList);
ship1.executeCommandList1();
console.log(`12-1 answer: ${ship1.distanceFromOrigin()}`);

const ship2 = new Ship(commandList);
ship2.executeCommandList2();
console.log(`12-2 answer: ${ship2.distanceFromOrigin()}`);
