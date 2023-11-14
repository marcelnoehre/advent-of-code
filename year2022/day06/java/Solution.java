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
        return getMarker(4);
    }
    
    public static Integer part2() {
        return getMarker(14);
    }

    public static void setup(String input) {
        CHARS = input.split("");
    }

    private static int getMarker(int len) {
        for (int i = 0; i < CHARS.length - 3; i++) {
            List<String> key = new ArrayList<String>();
            for (int j = 0; j <= len - 1; j++) {
                key.add(CHARS[i + j]);
            }
            if (new HashSet<>(key).size() == key.size()) {
                return i + len;
            }
        }
        return -1;
    }
}