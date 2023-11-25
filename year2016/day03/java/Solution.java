import java.nio.file.*;
import java.util.*;
import java.util.stream.*;


public class Solution {
  private static int[][] TRIANGLES;

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
    return (int) Arrays.stream(TRIANGLES).filter(triple -> checkTriangle(triple[0], triple[1], triple[2])).count();
  }

  public static int part2() {
    int sum = 0;
    for (int i = 0; i < TRIANGLES.length; i += 3) {
      for (int j = 0; j < 3; j++) {
        if (checkTriangle(TRIANGLES[i][j], TRIANGLES[i + 1][j], TRIANGLES[i + 2][j])) {
          sum++;
        }
      }
    }
    return sum;
  }

  public static void setup(String input) {
    TRIANGLES = Arrays.stream(input.split("\n"))
        .map(row -> Arrays.stream(row.trim().split("\\s+"))
        .mapToInt(Integer::parseInt)
        .toArray())
        .toArray(int[][]::new);
  }

  private static boolean checkTriangle(int a, int b, int c) {
    return Arrays.stream(new int[]{a + b, a + c, b + c}).allMatch(sum -> sum > (a + b + c - sum));
  }
}