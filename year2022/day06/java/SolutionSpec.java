import java.nio.file.*;
import java.util.*;

public class SolutionSpec {
  public static void main(String[] args) {
    try {
      Solution.setup(Files.readString(Paths.get("../example.txt")));
      test(1, Solution.part1(), 7);
      test(2, Solution.part2(), 19);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  public static void test(int part, int solution, int expected) {
    assert solution == expected : "Part_" + part + ": FAILED - " + "[expected: " + expected + ", solution: " + solution + "]";
    System.out.println("Part_" + part + ": SUCCESS");
  }
}