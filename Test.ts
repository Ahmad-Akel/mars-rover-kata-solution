type Direction = 'N' | 'E' | 'S' | 'W';
type Command = 'L' | 'R' | 'M';

interface Position {
  x: number;
  y: number;
  direction: Direction;
}

class Rover {
  position: Position;

  constructor(x: number, y: number, direction: Direction) {
    this.position = { x, y, direction };
  }

  turnLeft() {
    const directionOrder: Direction[] = ['N', 'W', 'S', 'E'];
    const currentIndex = directionOrder.indexOf(this.position.direction);
    this.position.direction = directionOrder[(currentIndex + 1) % 4];
  }

  turnRight() {
    const directionOrder: Direction[] = ['N', 'E', 'S', 'W'];
    const currentIndex = directionOrder.indexOf(this.position.direction);
    this.position.direction = directionOrder[(currentIndex + 1) % 4];
  }

  move() {
    switch (this.position.direction) {
      case 'N':
        this.position.y += 1;
        break;
      case 'S':
        this.position.y -= 1;
        break;
      case 'E':
        this.position.x += 1;
        break;
      case 'W':
        this.position.x -= 1;
        break;
    }
  }

  execute(commands: Command[]) {
    commands.forEach(command => {
      if (command === 'L') this.turnLeft();
      else if (command === 'R') this.turnRight();
      else if (command === 'M') this.move();
    });
  }

  getPosition(): string {
    return `${this.position.x} ${this.position.y} ${this.position.direction}`;
  }
}

function marsRoverController(input: string): string[] {
  const lines = input.split('\n').map(line => line.trim());
  const results: string[] = [];

  lines.shift();

  while (lines.length) {
    const [x, y, direction] = lines.shift()!.split(' ');
    const commands = lines.shift()!.split('') as Command[];

    const rover = new Rover(parseInt(x), parseInt(y), direction as Direction);
    rover.execute(commands);
    results.push(rover.getPosition());
  }

  return results;
}


