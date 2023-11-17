import java.nio.file.*;
import java.util.*;

public class Solution {
    private static int[] CODES;

    public static void main(String[] args) { 
        try {
            setup(Files.readString(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            setup(Files.readString(Paths.get("../puzzle.txt")));
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	public static int part1() {
        return simulate(CODES, 12, 2);
    }
    
    public static int part2() {
        for (int noun = 0; noun < CODES.length; noun++) {
            for (int verb = 0; verb < CODES.length; verb++) {
                if (simulate(Arrays.copyOf(CODES, CODES.length), noun, verb) == 19690720) {
                    return 100 * noun + verb;
                }
            }
        }
        return -1;
    }

    public static void setup(String input) {
        CODES = Arrays.stream(input.split(",")).mapToInt(Integer::parseInt).toArray();
    }

    private static int simulate(int[] codes, int noun, int verb) {
        codes[1] = noun;
        codes[2] = verb;
        for(int i = 0; codes[i] != 99; i += 4) {
            if (codes[i] == 1) {
                codes[codes[i + 3]] = codes[codes[i + 1]] + codes[codes[i + 2]];
            } else {
                codes[codes[i + 3]] = codes[codes[i + 1]] * codes[codes[i + 2]];
            }
        }
        return codes[0];
    }
}