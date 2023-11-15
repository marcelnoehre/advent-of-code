from solution import part_1, part_2
import unittest
import logging

logging.basicConfig(level=logging.INFO)

class UnitTest(unittest.TestCase):
    
    @classmethod
    def setUp(self):
        logging.addLevelName(111, 'part_1')
        logging.addLevelName(222, 'part_2')

        with open('../example.txt') as file:
            self.input = [[int(d) for d in row.split('x')] for row in file]


    def test_part_1(self):
        print('\n----------------------------------------------------------------------')

        try:
            solution_1, expected = part_1(self.input), 58
            self.assertEqual(solution_1, expected)
            logging.getLogger(' SUCCESS').log(111, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(111, f' [result: {solution_1}, expected: {expected}]')


    def test_part_2(self):
        print('\n----------------------------------------------------------------------')
        
        try:
            solution_2, expected = part_2(self.input), 34
            self.assertEqual(solution_2, expected)
            logging.getLogger(' SUCCESS').log(222, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(222, f' [result: {solution_2}, expected: {expected}]')


if __name__ == '__main__':
    unittest.main()