from solution import part1
import unittest
import logging

logging.basicConfig(level=logging.INFO)

class UnitTest(unittest.TestCase):
    
    @classmethod
    def setUp(self):
        logging.addLevelName(111, 'part1')

        with open('../example.txt') as file:
            self.input = [row for row in file]


    def test_part1(self):
        print('\n----------------------------------------------------------------------')

        try:
            part_1, expected = part1(self.input), None
            self.assertEqual(part_1, expected)
            logging.getLogger(' SUCCESS').log(111, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(111, f' [result: {part_1}, expected: {expected}]')


if __name__ == '__main__':
    unittest.main()