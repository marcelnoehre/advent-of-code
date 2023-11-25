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
    int sum = 0;
    for (int num : NUMBERS) {
      sum += num;
    }
    return sum;
  }

  public static int part2() {
    Set<Integer> frequencies = new HashSet<>();
    int frequency = 0;
    while (true) {
      for (int num : NUMBERS) {
        if (frequencies.contains(frequency += num)) {
          return frequency;
        }
        frequencies.add(frequency);
      }
    }
  }

  public static void setup(String input) {
    NUMBERS = Arrays.stream(input.split("\n")).mapToInt(Integer::parseInt).toArray();
  }
}