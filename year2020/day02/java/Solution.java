import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class Solution {
  private static List<String[]> PASSWORDS;

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
    int count = 0;
    for (String[] pw : PASSWORDS) {
      int chars = countOccurrences(pw[2], pw[1].charAt(0));
      if (Integer.parseInt(pw[0].split("-")[0]) <= chars && chars <= Integer.parseInt(pw[0].split("-")[1])) {
        count++;
      }
    }
    return count;
  }

  public static int part2() {
    int count = 0;
    for (String[] pw : PASSWORDS) {
      if ((pw[2].charAt(Integer.parseInt(pw[0].split("-")[0]) - 1) == pw[1].charAt(0)) != (pw[2].charAt(Integer.parseInt(pw[0].split("-")[1]) - 1) == pw[1].charAt(0))) {
        count++;
      }
    }
    return count;
  }

  public static void setup(String input) {
    PASSWORDS = Arrays.stream(input.split("\n")).map(password -> password.split(" ")).collect(Collectors.toList());
  }

  private static int countOccurrences(String str, char target) {
    int count = 0;
    for (char c : str.toCharArray()) {
      if (c == target) {
        count++;
      }
    }
    return count;
  }
}