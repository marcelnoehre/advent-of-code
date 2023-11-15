import java.nio.file.*;
import java.util.*;

public class Solution {
    private static int[] NUMBERS;

    public static void main(String[] args) { 
        try {
            setup(Files.readString(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	public static Integer part1() {
        int sum = 0;
        for (int i = 0; i < NUMBERS.length - 1; i++) {
            if (NUMBERS[i + 1] > NUMBERS[i]) {
                sum++;
            }
        }
        return sum;
    }
    
    public static Integer part2() {
        int count = 0;
        for (int i = 0; i < NUMBERS.length - 2; i++) {
            if (sum(NUMBERS, i + 1, i + 4) > sum(NUMBERS, i, i + 3)) {
                count++;
            }
        }
        return count;
    }

    private static int sum(int[] array, int start, int end) {
        int sum = 0;
        for (int i = start; i < end && i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }

    public static void setup(String input) {
        NUMBERS = Arrays.stream(input.split("\n")).mapToInt(Integer::parseInt).toArray();
    }
}