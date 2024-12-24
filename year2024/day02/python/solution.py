def main():
  print(part_1())
  print(part_2())


def part_1():
    return len([levels for levels in input if is_safe(levels)])

def part_2():
    return len([
        levels for levels in input
        if is_safe(levels) or any(
            is_safe([levels[j] for j in range(len(levels)) if j != i])
            for i in range(len(levels))
        )
    ])

def is_safe(levels):
    diffs = [levels[i + 1] - levels[i] for i in range(len(levels) - 1)]
    return (
        all(1 <= abs(d) <= 3 for d in diffs) and
        (all(d > 0 for d in diffs) or all(d < 0 for d in diffs))
    )



def setup(path):
  global input

  with open(path, 'r') as file:
    input = [[int(item) for item in line.split()] for line in file]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()