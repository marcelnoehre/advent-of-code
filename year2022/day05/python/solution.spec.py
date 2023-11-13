from solution import part_1, part_2, setup_stacks
import unittest
import logging

logging.basicConfig(level=logging.INFO)

class UnitTest(unittest.TestCase):
    
    @classmethod
    def setUp(self):
        logging.addLevelName(111, 'part_1')
        logging.addLevelName(222, 'part_2')

        with open('../example.txt') as file:
            input = file.read().split('\n\n')
            self.intial_stacks = setup_stacks(input[0].split('\n')[:-1][::-1])
            self.instructions = [[int(value) if value.isdigit() or (value[1:].isdigit() and value[0] == '-') else float('nan') for value in row.split(' ')] for row in input[1].split('\n')]


    def test_part_1(self):
        print('\n----------------------------------------------------------------------')

        try:
            solution_1, expected = part_1(self.intial_stacks, self.instructions), 'CMZ'
            self.assertEqual(solution_1, expected)
            logging.getLogger(' SUCCESS').log(111, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(111, f' [result: {solution_1}, expected: {expected}]')


    def test_part_2(self):
        print('\n----------------------------------------------------------------------')
        
        try:
            solution_2, expected = part_2(self.intial_stacks, self.instructions), 'MCD'
            self.assertEqual(solution_2, expected)
            logging.getLogger(' SUCCESS').log(222, '')
            
        except AssertionError:
            logging.getLogger(' FAILED').log(222, f' [result: {solution_2}, expected: {expected}]')


if __name__ == '__main__':
    unittest.main()