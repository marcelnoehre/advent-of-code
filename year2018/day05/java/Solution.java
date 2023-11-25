import java.nio.file.*;
import java.util.*;

public class Solution {
  private static String[] INPUT;

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
    return react(INPUT).size();
  }

  public static int part2() {
    int minLength = INPUT.length;
    for (int i = 0; i < 26; i++) {
      List<String> filteredInput = new ArrayList<>();
      for (String unit : INPUT) {
        if (!String.valueOf(unit).toLowerCase().equals(String.valueOf((char) ('a' + i)))) {
          filteredInput.add(unit);
        }
      }
      List<String> reacted = react(filteredInput.toArray(new String[0]));
      if (reacted.size() < minLength) {
        minLength = reacted.size();
      }
    }
    return minLength;
  }

  public static void setup(String input) {
    INPUT = input.split("");
  }

  private static List<String> react(String[] input) {
    List<String> chars = new ArrayList<String>();
    for (String unit : input) {
      if (chars.size() > 0 && Math.abs(unit.charAt(0) - chars.get(chars.size() - 1).charAt(0)) == 32) {
        chars.remove(chars.size() - 1);
      } else {
        chars.add(unit);
      }
    }
    return chars;
  }
}