import os
import re
import requests

def main():
    year = input('Year:')
    day = input('Day:')
    response = requests.get(f'https://adventofcode.com/{year}/day/{day}', cookies={'session': os.getenv('AOC_SESSION_COOKIE')})

    with open(os.path.join('templates', 'readme', 'readme-day.md' if int(day) != 25 else 'readme-day-25.md'), 'r', encoding='utf-8') as f:
        readme = parser(f.read(), response.text, year, day)
    
    if readme is not None:
        with open(os.path.join(f'year{year}', f'day{("0" + day) if int(day) < 10 else day}', 'README.md'), 'w', encoding='utf-8') as f:
            f.write(readme)


def parser(template, puzzle, year, day):
    try:
        patterns = {
            'answers': r'<p>Your puzzle answer was <code>(.*?)</code>.</p>',
            'links': r'<a\b[^>]*>(.*?)</a>',
            'parts': r'<article class="day-desc">(.*?)</article>'
        }
        
        answer = re.findall(patterns['answers'], puzzle, re.DOTALL)
        description = re.findall(patterns['parts'], re.sub(patterns['links'], r'\1', puzzle), re.DOTALL)
        template = template.replace('YYYY', year).replace('SOLUTION_PART_1', answer[0])
        
        if int(day) != 25:
            template = template.replace('SOLUTION_PART_2', answer[1])
        
        return template + "\n\n" + "\n".join(description)
    
    except Exception as e:
        print(f'Failed to parse puzzle description.\nError: {e}')
        return None


if __name__ == '__main__':
    main()