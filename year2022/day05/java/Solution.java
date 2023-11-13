import java.nio.file.*;
import java.util.*;

public class Solution {
    private static String[] INSTRUCTIONS;
    private static HashMap<Integer, LinkedList<Character>> STACKS;

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

    public static String part1() {
        for (String instruction: INSTRUCTIONS) {
            LinkedList<Character> origin = STACKS.get(Integer.parseInt(instruction.trim().split(" ")[3]));
            LinkedList<Character> target = STACKS.get(Integer.parseInt(instruction.trim().split(" ")[5]));
            
            for (int i = 0; i < Integer.parseInt(instruction.trim().split(" ")[1]); i++) {
                target.addFirst(origin.pollFirst());
            }
        }

        return top(STACKS);
    }

    public static String part2() {
        for (String instruction: INSTRUCTIONS) {
            LinkedList<Character> origin = STACKS.get(Integer.parseInt(instruction.trim().split(" ")[3]));
            LinkedList<Character> target = STACKS.get(Integer.parseInt(instruction.trim().split(" ")[5]));
            LinkedList<Character> tmp = new LinkedList<Character>();

            for (int i = 0; i < Integer.parseInt(instruction.trim().split(" ")[1]); i++) {
                tmp.add(origin.pollFirst());
            }

            while (!tmp.isEmpty()) {
                target.addFirst(tmp.pollLast());
            }
        }

        return top(STACKS);
    }

    public static void setup(String input) {
        STACKS = current(input.split("\n\n")[0]);
        INSTRUCTIONS = input.split("\n\n")[1].split("\n");
    }

    private static HashMap<Integer, LinkedList<Character>> current(String state) {
        HashMap<Integer, LinkedList<Character>> stacks = new HashMap<Integer, LinkedList<Character>>();

        for (String row: state.split("\n")) {
            int charIndex = 1;
            int stackId = 1;

            while (row.length() > charIndex) {
                char c = row.charAt(charIndex);
                LinkedList<Character> stack = stacks.getOrDefault(stackId, new LinkedList<>());
                stacks.putIfAbsent(stackId, stack);

                if (c >= 'A' && c <= 'Z') {
                    stack.add(c);
                }

                charIndex += 4;
                stackId++;
            }
        }

        return stacks;
    }

    private static String top(HashMap<Integer, LinkedList<Character>> stacks) {
        return stacks.values().stream().map(LinkedList::peek).collect(StringBuilder::new, StringBuilder::append, StringBuilder::append).toString();
    }
}
