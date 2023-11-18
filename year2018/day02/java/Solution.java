import java.nio.file.*;
import java.util.*;

public class Solution {
    private static String[] IDS;

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
        int twice = 0;
        int thrice = 0;
        for (String row : IDS) {
            Map<Character, Integer> counter = new HashMap<>();
            for (char c : row.toCharArray()) {
                counter.put(c, counter.getOrDefault(c, 0) + 1);
            }
            twice += counter.values().contains(2) ? 1 : 0;
            thrice += counter.values().contains(3) ? 1 : 0;
        }
        return twice * thrice;
    }
    
    public static String part2() {
        for (int x = 0; x < IDS.length; x++) {
            for (int y = 0; y < IDS.length; y++) {
                int difference = 0;
                int position = 0;
                for (int z = 0; z < IDS[x].length(); z++) {
                    if (IDS[x].charAt(z) != IDS[y].charAt(z)) {
                        position = z;
                        difference++;
                    }
                }
                if (difference == 1) {
                    return IDS[x].substring(0, position) + IDS[x].substring(position + 1);
                }
            }
        }
        return null;
    }

    public static void setup(String input) {
        IDS = input.split("\n");
    }
}