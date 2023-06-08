package year2022.day01.java;

import java.nio.file.*;
import java.util.*;

public class Solution {
    private static List<Integer> ELVES = new ArrayList<Integer>();
    
    public static void main(String[] args) { 
        try {
            setElfs(Files.readAllLines(Paths.get("../puzzle.txt")));
            System.out.println(part1());
            System.out.println(part2());
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
    
	private static Integer part1() {
        return Collections.max(ELVES);
    }
    
    private static Integer part2() {
        return ELVES.stream().sorted(Collections.reverseOrder())
                .limit(3).mapToInt(Integer::intValue).sum();
    }
    
    private static void setElfs(List<String> input) {
        int sum = 0;
        for(String calory : input) {
            if(calory.isBlank()) {
                ELVES.add(sum);
                sum = 0;
            } else {
                sum += Integer.parseInt(calory);
            }
        }
    }
}