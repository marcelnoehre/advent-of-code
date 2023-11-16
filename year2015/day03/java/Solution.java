import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

public class Solution {
    private static String[] INSTRUCTIONS;
    private static String[] ODDS;
    private static String[] EVENS;

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
        return decodeInstructions(INSTRUCTIONS).stream().distinct().collect(Collectors.toList()).size();
    }
    
    public static int part2() {
        List<String> combined = new ArrayList<>();
        combined.addAll(decodeInstructions(ODDS));
        combined.addAll(decodeInstructions(EVENS));
        return combined.stream().distinct().collect(Collectors.toList()).size();
    }

    public static void setup(String input) {
        INSTRUCTIONS = input.split("");
        List<String> odds = new ArrayList<String>();
        List<String> evens = new ArrayList<String>();
        for (int i = 0; i < input.length(); i++) {
            if (i % 2 == 1) {
                odds.add(input.split("")[i]);
            } else {
                evens.add(input.split("")[i]);
            }
        }
        ODDS = odds.toArray(new String[0]);
        EVENS = evens.toArray(new String[0]);
    }

    private static List<String> decodeInstructions(String[] instructions) {
        List<String> houses = new ArrayList<>();
        houses.add("0,0");
        int x = 0;
        int y = 0;
        for (String instruction : instructions) {
            int[] direction = getDirection(instruction);
            x += direction[0];
            y += direction[1];
            houses.add(x + "," + y);
        }
        return houses;
    }

    private static int[] getDirection(String instruction) {
        switch (instruction) {
            case "^":
                return new int[]{0, 1};
            case "v":
                return new int[]{0, -1};
            case "<":
                return new int[]{-1, 0};
            case ">":
                return new int[]{1, 0};
            default:
                return new int[]{0, 0};
        }
    }
}