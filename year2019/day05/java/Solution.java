import java.nio.file.*;
import java.util.*;

public class Solution {
  private static int[] NUMBERS;

  public static void main(String[] args) {
    try {
      setup(Files.readString(Paths.get("../puzzle.txt")));
      System.out.println(part1());
      System.out.println(part2());
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

	public static int part1() {
    return calc(1);
  }

  public static int part2() {
    return calc(5);
  }

  public static void setup(String input) {
    NUMBERS = Arrays.stream(input.replace("\n", "").split(",")).mapToInt(Integer::parseInt).toArray();
  }

  private static int calc(int mode) {
    int[] program = NUMBERS.clone();
    int result = -1;
    int i = 0;
    while (program[i] % 100 != 99) {
      if (program[i] % 100 == 1 || program[i] % 100 == 2 || program[i] % 100 == 7 || program[i] % 100 == 8) {
        int p1 = program[i + 1];
        int p2 = program[i + 2];
        int p3 = program[i + 3];
        int val1 = getValue(p1, program, (program[i] / 100) % 10);
        int val2 = getValue(p2, program, (program[i] / 1000) % 10);
        if (program[i] % 100 == 1) program[p3] = val1 + val2;
        else if (program[i] % 100 == 2) program[p3] = val1 * val2;
        else if (program[i] % 100 == 7) program[p3] = val1 < val2 ? 1 : 0;
        else if (program[i] % 100 == 8) program[p3] = val1 == val2 ? 1 : 0;
        i += 4;
      } else if (program[i] % 100 == 5 || program[i] % 100 == 6) {
        int p1 = program[i + 1];
        int p2 = program[i + 2];
        int val1 = getValue(p1, program, (program[i] / 100) % 10);
        int val2 = getValue(p2, program, (program[i] / 1000) % 10);
        if ((program[i] % 100 == 5 && val1 != 0) || (program[i] % 100 == 6 && val1 == 0)) {
          i = val2;
        } else {
          i += 3;
        }
      } else if (program[i] % 100 == 3) {
        program[program[i + 1]] = mode;
        i += 2;
      } else if (program[i] % 100 == 4) {
        result = getValue(program[i + 1], program, (program[i] / 100) % 10);
        i += 2;
      }
    }
    return result;
  }

  private static int getValue(int param, int[] program, int mode) {
    return mode == 1 ? param : program[param];
  }
}