import java.nio.file.*;
import java.util.*;
import java.util.function.IntUnaryOperator;

public class Solution {
    private static List<Integer> NUMBERS = new ArrayList<Integer>();

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
        return simulate(NUMBERS.stream().mapToInt(Integer::intValue).toArray(), offset -> 1);
    }
    
    public static int part2() {
        return simulate(NUMBERS.stream().mapToInt(Integer::intValue).toArray(), offset -> (offset >= 3 ? -1 : 1));
    }

    public static void setup(String input) {
        for(String num : input.split("\n")) {
            NUMBERS.add(Integer.parseInt(num));
        }
    }

    private static int simulate(int[] inst, IntUnaryOperator offsetRule) {
        int ptr = 0;
        int jumps = 0;

        while (ptr >= 0 && ptr < inst.length) {
            int offset = inst[ptr];
            inst[ptr] = inst[ptr] + offsetRule.applyAsInt(offset);
            ptr = ptr + offset;
            jumps++;
        }

        return jumps;
    }
}