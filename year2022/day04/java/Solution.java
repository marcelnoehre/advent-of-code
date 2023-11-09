import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class Solution {
    private static List<List<List<Integer>>> INPUT = new ArrayList<>();

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
        return (int) INPUT.stream().filter(pairs -> overlaps(pairs.get(0), pairs.get(1))).count();
    }
    
    public static Integer part2() {
        return (int) INPUT.stream().filter(pairs -> contains(pairs.get(0), pairs.get(1))).count();
    }

    public static void setup(List<String> input) {
        INPUT = input.stream().map(group -> Arrays.stream(group.split(",")).map(tuple -> Arrays.stream(tuple.split("-"))
            .map(Integer::parseInt).collect(Collectors.toList())).collect(Collectors.toList())).collect(Collectors.toList());
    }

    private static boolean overlaps(List<Integer> first, List<Integer> second) {
        int firstStart = first.get(0);
        int firstEnd = first.get(1);
        int secondStart = second.get(0);
        int secondEnd = second.get(1);
        return (firstStart <= secondStart && firstEnd >= secondEnd) || (secondStart <= firstStart && secondEnd >= firstEnd);
    }

    private static boolean contains(List<Integer> first, List<Integer> second) {
        int firstStart = first.get(0);
        int firstEnd = first.get(1);
        int secondStart = second.get(0);
        int secondEnd = second.get(1);
        return (firstStart >= secondStart && firstStart <= secondEnd) 
            || (secondStart >= firstStart && secondStart <= firstEnd)
            || (firstEnd <= secondEnd && firstEnd >= secondStart)
            || (secondEnd <= firstEnd && secondEnd >= firstStart);
    }
}