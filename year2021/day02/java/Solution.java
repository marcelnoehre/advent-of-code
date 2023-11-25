import java.nio.file.*;
import java.util.*;

public class Solution {
  private static String[] DIRECTIONS;
  private static int[] RANGES;

  public static void main(String[] args) {
    try {
      setup(Files.readAllLines(Paths.get("../puzzle.txt")));
      System.out.println(part1());
      System.out.println(part2());
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

	public static Integer part1() {
    int height = 0;
    int depth = 0;

    for(int i = 0; i < RANGES.length; i++) {
      if (DIRECTIONS[i].equals("forward")) {
        height += RANGES[i];

      } else if (DIRECTIONS[i].equals("up")) {
        depth -= RANGES[i];

      } else if (DIRECTIONS[i].equals("down")) {
        depth += RANGES[i];

      }
    }

    return height * depth;
  }

  public static Integer part2() {
    int aim = 0;
    int height = 0;
    int depth = 0;

    for (int i = 0; i < RANGES.length; i++) {
      if (DIRECTIONS[i].equals("forward")) {
        height += RANGES[i];
        depth += RANGES[i] * (aim * -1);

      } else if (DIRECTIONS[i].equals("up")) {
        aim += RANGES[i];

      } else if (DIRECTIONS[i].equals("down")) {
        aim -= RANGES[i];

      }
    }

    return height * depth;
  }

  public static void setup(List<String> input) {
    DIRECTIONS = input.stream().map(line -> line.split(" ")[0]).toArray(String[]::new);
    RANGES = input.stream().map(line -> Integer.parseInt(line.split(" ")[1])).mapToInt(Integer::intValue).toArray();
  }
}