from solution import setup, part_1
import unittest
import logging

logging.basicConfig(level=logging.INFO)

class UnitTest(unittest.TestCase):

  @classmethod
  def setUp(self):
    setup('../example.txt')
    logging.addLevelName(111, 'part_1')


  def test_part_1(self):
    print('\n----------------------------------------------------------------------')

    try:
      solution_1, expected = part_1(), None
      self.assertEqual(solution_1, expected)
      logging.getLogger(' SUCCESS').log(111, '')

    except AssertionError:
      logging.getLogger(' FAILED').log(111, f' [result: {solution_1}, expected: {expected}]')


if __name__ == '__main__':
  unittest.main()