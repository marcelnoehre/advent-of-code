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
    
	public static int part1() {
        for (int i = 0; i < NUMBERS.length - 1; i++) {
            for (int j = i + 1; j < NUMBERS.length; j++) {
                if (NUMBERS[i] + NUMBERS[j] == 2020) {
                    return NUMBERS[i] * NUMBERS[j];
                }
            }
        }
        return -1;
    }
    
    public static int part2() {
        for (int i = 0; i < NUMBERS.length; i++) {
            for (int j = i + 1; j < NUMBERS.length; j++) {
                for (int k = j + 1; k < NUMBERS.length; k++) {
                    if (NUMBERS[i] + NUMBERS[j] + NUMBERS[k] == 2020) {
                        return NUMBERS[i] * NUMBERS[j] * NUMBERS[k];
                    }
                }
            }
        }        
        return -1;
    }

    public static void setup(String input) {
        NUMBERS = Arrays.stream(input.split("\n")).mapToInt(Integer::parseInt).toArray();
    }
}