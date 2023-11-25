import java.nio.file.*;
import java.util.*;

public class Solution {
  private static List<int[]> PANEL;
  private static List<int[]> WIRE1;
  private static List<int[]> WIRE2;

  private static final Map<Character, int[]> DIRECTIONS = Map.of(
      'U', new int[]{0, 1},
      'D', new int[]{0, -1},
      'L', new int[]{-1, 0},
      'R', new int[]{1, 0}
  );

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
    int minDistance = Integer.MAX_VALUE;
    for (int[] point : PANEL) {
      int distance = Math.abs(point[0]) + Math.abs(point[1]);
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
    return minDistance;
  }

  public static int part2() {
    int minSum = Integer.MAX_VALUE;
    for (int[] panel : PANEL) {
      int sumOfIndices = findIndex(WIRE1, panel) + findIndex(WIRE2, panel);
      if (sumOfIndices < minSum) {
        minSum = sumOfIndices;
      }
    }
    return minSum + 2;
  }

  public static void setup(String input) {
    String[] lines = input.split("\n");
    String[][] arr = new String[input.split("\n").length][];
    for (int i = 0; i < input.split("\n").length; i++) {
      arr[i] = input.split("\n")[i].split(",");
    }
    WIRE1 = decodeWire(arr[0]);
    WIRE2 = decodeWire(arr[1]);
    PANEL = findIntersections(WIRE1, WIRE2);
  }

  private static List<int[]> findIntersections(List<int[]> wire1, List<int[]> wire2) {
    List<int[]> intersections = new ArrayList<>();
    for (int[] point1 : wire1) {
      for (int[] point2 : wire2) {
        if (point1[0] == point2[0] && point1[1] == point2[1]) {
          intersections.add(point1);
        }
      }
    }
    return intersections;
  }

  private static List<int[]> decodeWire(String[] wire) {
    List<int[]> visited = new ArrayList<>();
    int x = 0;
    int y = 0;
    for (String cmd : wire) {
      int distance = Integer.parseInt(cmd.substring(1));
      int[] direction = DIRECTIONS.get(cmd.charAt(0));
      for (int i = 0; i < distance; i++) {
        x += direction[0];
        y += direction[1];
        visited.add(new int[]{x, y});
      }
    }
    return visited;
  }

  private static int findIndex(List<int[]> wire, int[] point) {
    for (int i = 0; i < wire.size(); i++) {
      if (wire.get(i)[0] == point[0] && wire.get(i)[1] == point[1]) {
        return i;
      }
    }
    return -1;
  }
}