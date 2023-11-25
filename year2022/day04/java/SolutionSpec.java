import java.nio.file.*;

public class SolutionSpec {
  public static void main(String[] args) {
    try {
      Solution.setup(Files.readAllLines(Paths.get("../example.txt")));
      test(1, Solution.part1(), 2);
      test(2, Solution.part2(), 4);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  public static void test(int part, int solution, int expected) {
    assert solution == expected : "Part_" + part + ": FAILED - " + "[expected: " + expected + ", solution: " + solution + "]";
    System.out.println("Part_" + part + ": SUCCESS");
  }
}