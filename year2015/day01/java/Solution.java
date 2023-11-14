import java.nio.file.*;
import java.util.*;

public class Solution {
    private static String[] CHARS;

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
        for (String ch : CHARS) {
            sum += ch.equals("(") ? 1 : -1;
        }
        return sum;
    }

    public static Integer part2() {
        for (int i = 0, sum = 0; i < CHARS.length; i++) {
            sum += CHARS[i].equals("(") ? 1 : -1;
            if (sum == -1) {
                return i + 1;
            }
        }
        return -1;
    }

    public static void setup(String input) {
        CHARS = input.split("");
    }
}