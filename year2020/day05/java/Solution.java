import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<Integer> SEATS = new ArrayList<Integer>(); 

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
        return Collections.max(SEATS);
    }
    
    public static int part2() {
        Collections.sort(SEATS);
        int missingSeat = 0;
        for (int i = 1; i < SEATS.size(); i++) {
            if (SEATS.get(i) - SEATS.get(i - 1) != 1) {
                missingSeat = SEATS.get(i) - 1;
                break;
            }
        }
        return missingSeat;
    }

    public static void setup(List<String> input) {
        for (String pass : input) {
            int rl = 0;
            int ru = 127;
            int cl = 0;
            int cu = 7;

            for (char charF : pass.substring(0, 7).toCharArray()) {
                if (charF == 'F') {
                    ru = (rl + ru) / 2;
                } else {
                    rl = (rl + ru) / 2 + 1;
                }
            }

            for (char charL : pass.substring(7).toCharArray()) {
                if (charL == 'L') {
                    cu = (cl + cu) / 2;
                } else {
                    cl = (cl + cu) / 2 + 1;
                }
            }
            SEATS.add(rl * 8 + cl);
        }
    }
}