from solution import part1, part2
import unittest
import logging

logging.basicConfig(level=logging.INFO)

class UnitTest(unittest.TestCase):
    
    @classmethod
    def setUp(self):
        logging.addLevelName(111, 'part1')
        logging.addLevelName(222, 'part2')

        with open('../example.txt') as file:
            self.input = [list(map(lambda tupel: list(map(int, tupel.split('-'))), group.split(','))) for group in file.read().split('\n')]


    def test_part1(self):
        print('\n----------------------------------------------------------------------')

        try:
            part_1, expected = part1(self.input), 2
            self.assertEqual(part_1, expected)
            logging.getLogger(' SUCCESS').log(111, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(111, f' [result: {part_1}, expected: {expected}]')


    def test_part2(self):
        print('\n----------------------------------------------------------------------')
        
        try:
            part_2, expected = part2(self.input), 4
            self.assertEqual(part_2, expected)
            logging.getLogger(' SUCCESS').log(222, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(222, f' [result: {part_2}, expected: {expected}]')


if __name__ == '__main__':
    unittest.main()