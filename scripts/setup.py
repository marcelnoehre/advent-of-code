import os
import shutil
import requests

def main():
    year = input('Year:')
    day = input('Day:')
    lang = input('Lang:')
    while lang not in ['typescript', 'java']: lang = input('Lang:').lower()

    response = requests.get(f'https://adventofcode.com/{year}/day/{day}/input', cookies={'session': os.getenv('AOC_SESSION_COOKIE')})

    if response.status_code == 200:
        os.makedirs(os.path.dirname(os.path.join(f'year{year}', f'day{day}')), exist_ok=True)
        shutil.copytree(os.path.join('templates', lang), os.path.join(f'year{year}', f'day{day}', lang))

        if lang == 'java':
            with open(os.path.join(f'year{year}', f'day{day}', lang, 'Solution.java'), 'r', encoding='utf-8') as f:
                java = f.read()

            with open(os.path.join(f'year{year}', f'day{day}', lang, 'Solution.java'), 'w', encoding='utf-8') as f:
                f.write(java.replace('package yearYYYY.dayDD.java;', f'package year{year}.day{day}.java;'))

        with open(os.path.join(f'year{year}', f'day{day}', 'puzzle.txt'), 'w', encoding='utf-8') as f:
            f.write(response.text)

        if not os.path.exists(os.path.join(f'year{year}', f'day{day}', 'example.txt')):
            with open(os.path.join(f'year{year}', f'day{day}', 'example.txt'), 'w', encoding='utf-8') as f:
                pass

    else:
        print(f'Failed to retrieve puzzle input. Response: {response.status_code, response.text}')


if __name__ == '__main__':
    main()