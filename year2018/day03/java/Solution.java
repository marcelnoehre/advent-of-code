import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class Solution {
  private static List<List<Integer>> CODES;

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
    int[][] fabric = new int[1000][1000];
    int overlaps = 0;
    for (List<Integer> claim : CODES) {
      for (int i = claim.get(1); i < claim.get(1) + claim.get(3); i++) {
        for (int j = claim.get(2); j < claim.get(2) + claim.get(4); j++) {
          if (fabric[i][j]++ == 1) {
            overlaps++;
          }
        }
      }
    }
    return overlaps;
  }

  public static int part2() {
    int[][] fabric = new int[1000][1000];
    Set<Integer> noOverlap = new HashSet<>();
    for (List<Integer> claim : CODES) {
      noOverlap.add(claim.get(0));
      for (int i = claim.get(1); i < claim.get(1) + claim.get(3); i++) {
        for (int j = claim.get(2); j < claim.get(2) + claim.get(4); j++) {
          if (fabric[i][j] == 0) {
            fabric[i][j] = claim.get(0);
          } else {
            noOverlap.remove(claim.get(0));
            noOverlap.remove(fabric[i][j]);
          }
        }
      }
    }
    return noOverlap.isEmpty() ? -1 : noOverlap.iterator().next();
  }

  public static void setup(String input) {
    CODES = Arrays.stream(input.split("\n"))
        .map(claim -> Arrays.stream(claim.split("\\D+"))
        .filter(s -> !s.isEmpty())
        .map(Integer::parseInt)
        .collect(Collectors.toList()))
        .collect(Collectors.toList());
  }
}