import java.nio.file.*;
import java.util.*;

public class Solution {
    private static int[] NAUGHTY;

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
        for(int i = 0; i < NAUGHTY.length; i++) {
            if (NAUGHTY[i] == NAUGHTY[(i + 1) % NAUGHTY.length]) {
                sum += i;
            }
        }
        return sum;
    }
    
    public static int part2() {
        int sum = 0;
        for (int i = 0; i < NAUGHTY.length; i++) {
            if (NAUGHTY[i] == NAUGHTY[(i + NAUGHTY.length / 2) % NAUGHTY.length]) {
                sum += i;
            }
        }
        return sum;
    }

    public static void setup(String input) {
        NAUGHTY = new int[input.length()];
        for(int i = 0; i < input.length(); i++) {
            NAUGHTY[i] = input.charAt(i);
        }
    }
}