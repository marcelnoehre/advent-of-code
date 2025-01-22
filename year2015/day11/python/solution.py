def main():
  print(part_1())
  print(part_2())


def part_1():
  return next(password)


def part_2():
  next(password)
  return next(password)


def next_pws(pw):
  while True:
    idx = -1
    while pw[idx] == 'z':
      pw[idx] = 'a'
      idx -= 1
    pw[idx] = chr(ord(pw[idx]) + 1)
    yield pw
    

his = lambda pw_nums: (any(a == b-1 == c-2 for a, b, c in zip(pw_nums, pw_nums[1:], pw_nums[2:])))
hit = lambda pw: any(l in pw for l in "iol")
htp = lambda pw: len({a for a, b in zip(pw, pw[1:]) if a == b}) >= 2


def setup(path):
  global input, password

  with open(path, 'r') as file:
    input = file.read().strip()

  password = (pw for pw in (''.join(pw) for pw in next_pws(list(input))) if his(list(map(ord, pw))) and not hit(pw) and htp(pw))


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()