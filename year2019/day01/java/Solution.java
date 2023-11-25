import java.nio.file.*;
import java.util.*;

public class Solution {
  private static int[] FUEL;

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
    for(int mass : FUEL) {
      sum += (mass / 3) - 2;
    }
    return sum;
  }

  public static int part2() {
    int sum = 0;
    for(int mass : FUEL) {
      int fuel = (mass / 3) - 2;
      while (fuel > 0) {
        sum += fuel;
        fuel = (fuel / 3) - 2;
      }
    }
    return sum;
  }

  public static void setup(String input) {
    FUEL = Arrays.stream(input.toString().split("\n")).mapToInt(Integer::parseInt).toArray();
  }
}