package year2022.day01.java;

import java.nio.file.*;
import java.util.*;

public class Solution {
    private static Map<Integer, Integer> ELFS = new HashMap<Integer, Integer>();
    
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
        return Collections.max(ELFS.values());
    }
    
    private static Integer part2() {
        return ELFS.values().stream().sorted(Collections.reverseOrder())
                .limit(3).mapToInt(Integer::intValue).sum();
    }
    
    private static void setElfs(List<String> input) {
        int elf = 1;
        int sum = 0;
        for(String calory : input) {
            if(calory.isBlank()) {
                ELFS.put(elf, sum);
                sum = 0;
                elf++;
            } else {
                sum += Integer.parseInt(calory);
            }
        }
    }
}