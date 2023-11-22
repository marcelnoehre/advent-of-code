import java.nio.file.*;
import java.util.*;

public class Solution {
    private static String[] INSTRUCTIONS;
    private static Map<Integer, int[]> DIRECTIONS = new HashMap<>();


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
        int[] pos = new int[]{0, 0};
        int direction = 0;

        for (String instruction : INSTRUCTIONS) {
            direction = (direction + (instruction.charAt(0) == 'R' ? 1 : -1) + 4) % 4;
            int distance = Integer.parseInt(instruction.substring(1));
            pos[0] += distance * DIRECTIONS.get(direction)[0];
            pos[1] += distance * DIRECTIONS.get(direction)[1];
        }

        return Math.abs(pos[0] + pos[1]);
    }
    
    public static int part2() {
        Set<String> visited = new HashSet<>();
        int[] pos = new int[]{0, 0};
        int direction = 0;

        for (String instruction : INSTRUCTIONS) {
            direction = (direction + (instruction.charAt(0) == 'R' ? 1 : -1) + 4) % 4;
            int max = Integer.parseInt(instruction.substring(1)) * DIRECTIONS.get(direction)[DIRECTIONS.get(direction)[0] == 0 ? 1 : 0];

            for (int i = 0; i < (max < 0 ? max * -1 : max); i++) {
                pos[0] += DIRECTIONS.get(direction)[0];
                pos[1] += DIRECTIONS.get(direction)[1];
                String currentPos = pos[0] + "," + pos[1];

                if (visited.contains(currentPos)) {
                    int result = Math.abs(pos[0] + pos[1]);
                    return result;
                    
                } else {
                    visited.add(currentPos);
                }
            }
        }
        return -1;
    }

    public static void setup(String input) {
        INSTRUCTIONS = input.split(", ");
        DIRECTIONS.put(0, new int[]{0, 1});
        DIRECTIONS.put(1, new int[]{1, 0});
        DIRECTIONS.put(2, new int[]{0, -1});
        DIRECTIONS.put(3, new int[]{-1, 0});
    }
}