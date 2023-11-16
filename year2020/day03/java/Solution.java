import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<String> TREES;

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
        return checkTrees(3, null);
    }
    
    public static long part2() {
        int[] steps = {1, 3, 5, 7};
        return Arrays.stream(steps).mapToLong(step -> checkTrees(step, null)).reduce(1, (acc, result) -> acc * result) * checkTrees(1, 1);      
    }

    public static void setup(List<String> input) {
        TREES = input;
    }

    private static int checkTrees(int step, Integer skip) {
        int index = 0;
        int counter = 0;
        for (int i = 0; i < TREES.size(); i++) {
            if (TREES.get(i).charAt(index) == '#') {
                counter++;
            }
            index = (index + step) % TREES.get(i).length();
            if (skip != null) {
                i += skip;
            }
        }
        return counter;
    }
}