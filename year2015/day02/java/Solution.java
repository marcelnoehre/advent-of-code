import java.nio.file.*;
import java.util.*;

public class Solution {
    private static int[][] SIZES;

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
        int sum = 0;
        for (int[] box : SIZES) {
            Arrays.sort(box);
            sum += 2 * (box[0] * box[1] + box[0] * box[2] + box[1] * box[2]) + box[0] * box[1];
        }
        return sum;
    }
    
    public static int part2() {
        int sum = 0;
        for (int[] box : SIZES) {
            Arrays.sort(box);
            sum += 2 * (box[0] + box[1]) + box[0] * box[1] * box[2];
        }
        return sum;
    }

    public static void setup(String input) {
        SIZES = Arrays.stream(input.split("\n")).map(line -> Arrays.stream(line.split("x")).mapToInt(Integer::parseInt).toArray()).toArray(int[][]::new);
    }
}