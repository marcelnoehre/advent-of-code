def main():
  print(part_1())
  print(part_2())


def part_1():
  sum = 0
  for round in input:
    if RPS[round[0]]['shape'] == RPS[round[1]]['shape']:
      sum += 3

    elif RPS[round[1]]['shape'] == RPS[round[0]]['nemesis']:
      sum += 6

    sum += RPS[round[1]]['score']

  return sum


def part_2():
  sum = 0
  for round in input:
    if RPS[round[1]]['result'] == 'win':
      sum += 6 + (3 if (RPS[round[0]]['score'] + 1) % 3 == 0 else (RPS[round[0]]['score'] + 1) % 3)

    elif RPS[round[1]]['result'] == 'draw':
      sum += 3 + RPS[round[0]]['score']

    elif RPS[round[1]]['result'] == 'lose':
      sum += (RPS[round[0]]['score'] - 1) if RPS[round[0]]['score'] - 1 >= 1 else 3

  return sum


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row.replace('\n', '').split() for row in file]


RPS = {
  'A': {'shape': 'rock', 'score': 1, 'result': 'lose', 'nemesis': 'paper'},
  'B': {'shape': 'paper', 'score': 2, 'result': 'draw', 'nemesis': 'scissors'},
  'C': {'shape': 'scissors', 'score': 3, 'result': 'win', 'nemesis': 'rock'},
  'X': {'shape': 'rock', 'score': 1, 'result': 'lose', 'nemesis': 'paper'},
  'Y': {'shape': 'paper', 'score': 2, 'result': 'draw', 'nemesis': 'scissors'},
  'Z': {'shape': 'scissors', 'score': 3, 'result': 'win', 'nemesis': 'rock'}
}


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()