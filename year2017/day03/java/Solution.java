import java.nio.file.*;
import java.util.*;

public class Solution {
  private static int DATA;

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
    int steps = Integer.MAX_VALUE;
    int layer = (int)Math.floor(Math.sqrt(DATA - 1) /2) + 1;
    int x = (int)Math.pow(((layer * 2) - 1), 2);
    int y = (int)Math.pow(((layer * 2) + 1), 2);

    for (int i = 0; i < 4; i++) {
      steps = Math.min(steps, Math.abs(DATA - (int)((1 - (i / 4.0 + 0.125)) * x + (i / 4.0 + 0.125) * y)));
    }

    return steps + layer;
  }

  public static int part2() {
    Map<String, Integer> grid = new HashMap<>();
    int x = 0;
    int y = 0;
    int dx = 1;
    int dy = 0;
    int s = 0;
    int i = 1;

    while (true) {
      int value = generateValue(grid, x, y);

      if (value > DATA) {
        return value;
      }

      grid.put(x + "," + y, value);

      i++;
      x += dx;
      y += dy;

      if (i >= Math.pow((s * 2 + 1), 2)) {
        s += 1;
      }

      if (Math.abs(x + dx) > s || Math.abs(y + dy) > s) {
        int temp = dx;
        dx = dy;
        dy = -temp;
      }
    }
  }

  public static void setup(String input) {
    DATA = Integer.parseInt(input);
  }

  private static int generateValue(Map<String, Integer> grid, int x, int y) {
    int sum = 0;
    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        if (!(i == 0 && j == 0)) {
          sum += grid.getOrDefault((x + i) + "," + (y + j), 0);
        }
      }
    }
    return sum == 0 ? 1 : sum;
  }
}