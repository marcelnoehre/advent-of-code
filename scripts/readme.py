import os
import requests
import readmeDay
import readmeYear
import readmeOverview

def main():
    year = input('Year:')
    day = input('Day:')
    response = requests.get(f'https://adventofcode.com/{year}/day/{day}', cookies={'session': os.getenv('AOC')})

    readmeOverview.build()
    readmeYear.build(year)
    readmeDay.build(year, day, response)

if __name__ == '__main__':
    main()