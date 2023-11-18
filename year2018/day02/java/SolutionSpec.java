import java.nio.file.*;
import java.util.*;

public class SolutionSpec {
    public static void main(String[] args) { 
        try {
            Solution.setup(Files.readString(Paths.get("../example.txt")));
            testInt(1, Solution.part1(), 12);
            testString(2, Solution.part2(), "abcde");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public static void testInt(int part, int solution, int expected) {
        assert solution == expected : "Part_" + part + ": FAILED - " + "[expected: " + expected + ", solution: " + solution + "]";
        System.out.println("Part_" + part + ": SUCCESS");
    }

    public static void testString(int part, String solution, String expected) {
        assert solution.equals(expected) : "Part_" + part + ": FAILED - " + "[expected: " + expected + ", solution: " + solution + "]";
        System.out.println("Part_" + part + ": SUCCESS");
    }
}