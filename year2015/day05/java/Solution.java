import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

public class Solution {
    private static List<String> STRINGS;

    public static void main(String[] args) { 
        try {
            setup(Files.readAllLines(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	public static int part1() {
        return validate(List.of("^(?!.*ab)(?!.*cd)(?!.*pq)(?!.*xy).*$", "^(.*[aeiou]){3}.*$", "(.)\\1"));
    }
    
    public static int part2() {
        return validate(List.of("([a-z][a-z]).*\\1", "([a-z])[a-z]\\1"));
    }

    public static void setup(List<String> input) {
        STRINGS = input;
    }

    private static int validate(List<String> validators) {
        return (int) STRINGS.stream().filter(str -> validators.stream().allMatch(pattern -> Pattern.compile(pattern).matcher(str).find())).count();
    }
}