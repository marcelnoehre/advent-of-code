import hashlib

def main():
  print(part_1())
  print(part_2())


def part_1():
  i, pw = 0, ''

  while len(pw) < 8:
    h = hashlib.md5((input + str(i)).encode()).hexdigest()
    if h.startswith('00000'):
      pw += h[5]
    i += 1

  return pw


def part_2():
  i, pw = 0, ['_'] * 8

  while '_' in pw:
    hash_str = hashlib.md5((input + str(i)).encode()).hexdigest()

    if hash_str.startswith('00000') and 0 <= int(hash_str[5], 16) < 8 and pw[int(hash_str[5], 16)] == '_':
      pw[int(hash_str[5], 16)] = hash_str[6]

    i += 1

  return ''.join(pw)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = file.read()


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()