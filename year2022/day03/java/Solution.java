import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class Solution {
  private static List<String> INPUT = new ArrayList<String>();

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
    int sum = 0;
    for (String rucksack : INPUT) {
      String[] compartments = rucksack.split("(?<=\\G.{" + rucksack.length() / 2 + "})");
      sum += getCharValue((char) compartments[0].chars()
          .filter(c -> compartments[1].indexOf(c) != -1)
          .findFirst().orElseThrow());
    }
    return sum;
  }

  public static Integer part2() {
    String[][] groups = IntStream.range(0, INPUT.size() / 3)
        .mapToObj(i -> INPUT.subList(i * 3, (i + 1) * 3)
        .toArray(new String[0]))
        .toArray(String[][]::new);

    return Arrays.stream(groups)
        .mapToInt(group -> getCharValue((char) group[0].chars()
        .filter(c -> group[1].indexOf(c) != -1 && group[2].indexOf(c) != -1)
        .findFirst().orElseThrow())).sum();
  }

  public static void setup(List<String> input) {
    INPUT = input;
  }

  private static int getCharValue(char c) {
    return (int) (Character.isUpperCase(c) ? c - 38 : c - 96);
  }
}