import os
import shutil
import requests

def main():
    year = input('Year:')
    day = input('Day:')
    lang = input('Lang:')
    while lang not in ['typescript', 'java', 'python']: lang = input('Lang:').lower()

    remove_empty_folders('year' + year)
    response = requests.get(f'https://adventofcode.com/{year}/day/{day}/input', cookies={'session': os.getenv('AOC')})

    if response.status_code == 200:
        os.makedirs(os.path.dirname(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}')), exist_ok=True)
        shutil.copytree(os.path.join('templates', (lang + day) if int(day) == 25 else lang), os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang))
        lang_specific_changes(lang, year, day)

        with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', 'puzzle.txt'), 'w', encoding='utf-8') as f:
            f.write(response.text.rstrip())

        if not os.path.exists(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', 'example.txt')):
            with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', 'example.txt'), 'w', encoding='utf-8') as f:
                pass

    else:
        print(f'Failed to retrieve puzzle input. Response: {response.status_code, response.text}')


def lang_specific_changes(lang, year, day):
    if lang == 'typescript':
        with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang, 'test.sh'), 'r', encoding='utf-8') as f:
            ts_test_sh = f.read()

        with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang, 'test.sh'), 'w', encoding='utf-8') as f:
            f.write(ts_test_sh.replace('jest solution-YYYY-DD.spec.ts', f'jest solution-{year}-{day if int(day) > 9 else "0" + day}.spec.ts'))

        with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang, 'solution.spec.ts'), 'r', encoding='utf-8') as f:
            ts_spec = f.read()

        with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang, 'solution.spec.ts'), 'w', encoding='utf-8') as f:
            f.write(ts_spec.replace('Advent of Code {YYYY}, Day {DD}', f'Advent of Code {year}, Day {day if int(day) > 9 else "0" + day}'))

        os.rename(os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang, 'solution.spec.ts'), os.path.join(f'year{year}', f'day{day if int(day) > 9 else "0" + day}', lang, f'solution-{year}-{day if int(day) > 9 else "0" + day}.spec.ts'))


def remove_empty_folders(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)
            
            if not any(os.listdir(folder_path)):
                os.rmdir(folder_path)
                print(f"Removed empty folder: {folder_path}")


if __name__ == '__main__':
    main()